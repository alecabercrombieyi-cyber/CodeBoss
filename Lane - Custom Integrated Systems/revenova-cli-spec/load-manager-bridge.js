// ─────────────────────────────────────────────────────────────────────────
// REVENOVA BRIDGE — drop-in for load-manager.html (v49+)
//
// PASTE this entire block immediately before the closing </script> tag at
// the bottom of load-manager.html. No other edits required. The bridge
// monkey-patches triggerUpdate() / getLoads() at load time. When the
// bridge toggle is off (default), behavior is unchanged.
//
// Companion server: revenova-bridge (Go binary in serve/). Run with:
//   SF_ACCESS_TOKEN=... SF_INSTANCE_URL=https://bayandbaytms.my.salesforce.com \
//   ./revenova-bridge --port 8765
//
// Settings keys (localStorage):
//   bb_bridge_enabled  '1' to use the bridge, anything else falls back
//   bb_bridge_url      default 'http://127.0.0.1:8765'
// ─────────────────────────────────────────────────────────────────────────
(function(){
  function bridgeEnabled(){ return localStorage.getItem('bb_bridge_enabled')==='1'; }
  function bridgeUrl(){ return (localStorage.getItem('bb_bridge_url')||'http://127.0.0.1:8765').replace(/\/+$/,''); }
  function extractReportId(sfUrl){
    if(!sfUrl) return null;
    var m = sfUrl.match(/(00O[a-zA-Z0-9]{12,15})/);
    return m ? m[1] : null;
  }

  // SF Analytics REST → CSV in the column-label shape processCSV expects.
  function analyticsJsonToCSV(j){
    if(!j || !j.reportMetadata || !j.reportExtendedMetadata || !j.factMap){
      throw new Error('Unexpected report payload shape');
    }
    var cols = j.reportMetadata.detailColumns || [];
    var info = j.reportExtendedMetadata.detailColumnInfo || {};
    var headers = cols.map(function(c){ return (info[c] && info[c].label) || c; });
    var bucket = j.factMap['T!T'] || j.factMap['T'] || Object.values(j.factMap)[0];
    var rows = (bucket && bucket.rows) || [];

    function esc(v){
      if(v==null) return '';
      var s = String(v);
      if(/[",\n\r]/.test(s)) s = '"'+s.replace(/"/g,'""')+'"';
      return s;
    }
    var out = [headers.map(esc).join(',')];
    rows.forEach(function(r){
      var cells = (r && r.dataCells) || [];
      out.push(cells.map(function(c){
        // Prefer .label (human-readable, matches CSV export); fall back to .value
        var v = (c && (c.label !== undefined && c.label !== null && c.label !== '')) ? c.label : (c && c.value);
        return esc(v);
      }).join(','));
    });
    return out.join('\n');
  }

  function showBridgeProgress(title){
    if(typeof showProgress==='function'){
      showProgress(title||'Fetching from Revenova',
        'Direct API · no download',
        ['Calling bridge','Parsing report','Refreshing dashboard']);
      if(typeof progStep==='function') progStep(1,15,'Calling bridge...');
    }
  }

  async function fetchViaBridge(){
    var sfUrl = localStorage.getItem('bb_sf_url');
    var rid = extractReportId(sfUrl);
    if(!rid){ throw new Error('Could not find report Id in saved Salesforce URL'); }
    var resp = await fetch(bridgeUrl()+'/report/'+rid, {method:'GET'});
    if(!resp.ok){
      var body = '';
      try{ body = await resp.text(); }catch(e){}
      throw new Error('Bridge HTTP '+resp.status+': '+body.slice(0,200));
    }
    var json = await resp.json();
    if(typeof progStep==='function') progStep(2,55,'Converting to CSV...');
    return analyticsJsonToCSV(json);
  }

  function withBridgeFallback(origFn, label){
    return function(){
      var args = arguments;
      if(!bridgeEnabled()) return origFn.apply(this, args);
      showBridgeProgress(label);
      if(typeof setUpdateState==='function') setUpdateState('loading');
      fetchViaBridge().then(function(csv){
        if(typeof finishUpdate==='function'){
          finishUpdate(csv);
        }else{
          // Initial load path: no finishUpdate yet — synthesize the file flow
          if(typeof processCSV==='function'){
            var result = processCSV(csv);
            if(result && result.loads && result.loads.length){
              window.ALL_LOADS = result.loads;
              window.LOADS = result.loads;
              window.BROKERS = result.brokers;
              if(typeof setLastUpdated==='function') setLastUpdated();
              if(typeof renderStats==='function') renderStats();
              if(typeof renderLoads==='function') renderLoads();
              if(typeof hideProgress==='function') hideProgress();
            }else{
              if(typeof hideProgress==='function') hideProgress();
              alert('Bridge returned no loads.');
            }
          }
        }
      }).catch(function(err){
        if(typeof hideProgress==='function') hideProgress();
        if(typeof setUpdateState==='function') setUpdateState('default');
        console.error('[BRIDGE] failed, falling back:', err);
        if(confirm('Bridge call failed:\n'+err.message+'\n\nFall back to the old iframe download?')){
          origFn.apply(null, args);
        }
      });
    };
  }

  if(typeof window.triggerUpdate === 'function'){
    window.triggerUpdate = withBridgeFallback(window.triggerUpdate, 'Updating Report');
  }
  if(typeof window.getLoads === 'function'){
    window.getLoads = withBridgeFallback(window.getLoads, 'Downloading Report');
  }

  // ── Settings UI injection ────────────────────────────────────────────
  // Adds a "Use direct bridge" checkbox + URL field into #scr-settings.
  // Idempotent: runs once on DOMContentLoaded or immediately if already loaded.
  function injectSettings(){
    var host = document.getElementById('scr-settings');
    if(!host || document.getElementById('bb-bridge-block')) return;
    var block = document.createElement('div');
    block.id = 'bb-bridge-block';
    block.style.cssText = 'margin-top:20px;border-top:1px solid #24303F;padding-top:16px';
    block.innerHTML =
      '<div class="label">REVENOVA BRIDGE (DIRECT API)</div>'+
      '<div style="font-size:10px;color:#64748B;margin-bottom:8px;line-height:1.5">Skip the CSV download. Requires the revenova-bridge binary running locally.</div>'+
      '<label style="display:flex;align-items:center;gap:8px;font-size:13px;color:#F1F5F9;margin-bottom:10px;cursor:pointer">'+
        '<input type="checkbox" id="bb-bridge-toggle" style="width:auto;margin:0"> Use direct bridge'+
      '</label>'+
      '<div class="label">BRIDGE URL</div>'+
      '<input type="text" id="bb-bridge-url" placeholder="http://127.0.0.1:8765" style="margin-bottom:8px;font-size:13px">'+
      '<button class="btn btn-a" onclick="window.bbSaveBridge()" style="width:100%;justify-content:center;padding:10px;margin-bottom:6px">Save Bridge</button>'+
      '<button class="btn btn-g btn-sm" onclick="window.bbTestBridge()" style="width:100%;justify-content:center;padding:8px">Test Connection</button>'+
      '<div id="bb-bridge-status" style="font-size:11px;margin-top:8px;color:#94A3B8"></div>';
    host.appendChild(block);
    document.getElementById('bb-bridge-toggle').checked = bridgeEnabled();
    document.getElementById('bb-bridge-url').value = localStorage.getItem('bb_bridge_url') || 'http://127.0.0.1:8765';
  }

  window.bbSaveBridge = function(){
    var on = document.getElementById('bb-bridge-toggle').checked;
    var u  = document.getElementById('bb-bridge-url').value.trim() || 'http://127.0.0.1:8765';
    localStorage.setItem('bb_bridge_enabled', on?'1':'0');
    localStorage.setItem('bb_bridge_url', u);
    var s = document.getElementById('bb-bridge-status');
    if(s){ s.textContent='Saved.'; s.style.color='#6BBF8E'; setTimeout(function(){s.textContent=''},2000); }
  };

  window.bbTestBridge = function(){
    var s = document.getElementById('bb-bridge-status');
    s.textContent='Testing...'; s.style.color='#94A3B8';
    fetch((document.getElementById('bb-bridge-url').value.trim() || bridgeUrl())+'/health')
      .then(function(r){ return r.json(); })
      .then(function(j){
        s.style.color = j && j.ok ? '#6BBF8E' : '#C87D75';
        s.textContent = j && j.ok ? ('OK — '+j.instance) : 'Bridge reachable but unhealthy';
      })
      .catch(function(err){
        s.style.color='#C87D75';
        s.textContent='Unreachable: '+err.message;
      });
  };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', injectSettings);
  }else{
    injectSettings();
  }
})();
