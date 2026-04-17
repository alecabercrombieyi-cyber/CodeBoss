# Load Manager — Combined Turn 1 + Turn 2 Build

The current bay-and-bay-load-manager.html does NOT have turn 1 yet. No geocoder, no mini-map, no fleet map. Build both in one pass. File is 4,192 lines, single-file HTML, one main <script> at the bottom.

## Pre-flight
- nowCT() already exists (6 references) — DO NOT redefine. Reuse.
- ST map (state name → 2-letter abbrev) exists near line 837 — REUSE, don't redefine.
- normalizeCarrier() exists for the exempt list — DO NOT reuse for cities. Cities need their own normalizer (different rules).
- Leaflet 1.9.4 may or may not already be in <head>. Grep for "leaflet" — if missing, add via unpkg CDN: <link> for CSS and <script> for JS.

## TURN 1 — Geocoder + Mini-map

### Geocoder block
New <script> immediately after <body>, separate from main script. Contents:

1. var US_CITIES = JSON.parse('...') — generated from geonamescache, min_city_population=500, US only, format: state abbr → "city|lat|lng;city|lat|lng". Use JSON.parse of single-quoted string (~2x faster startup than object literal). Escape ' as \'. Generate it with the Python below.

2. var CITY_OVERRIDES = {...} — ~20 freight-hub entries, alphabetized by state then city. MUST include 'beech island|SC': [33.4290, -81.8635] (canary). Also Fontana CA, Edwardsville KS, New Century KS, Mt Juliet TN, Mount Juliet TN, Breinigsville PA, Wilmer TX, Haslet TX, Joliet-area IL warehouse CDPs (Elwood, Wilmington, Channahon, Bolingbrook, Romeoville).

3. normalizeCity(s) — its own function. Lowercase, trim. Strip suffixes: township, twp, city, borough, village. Replace st./st → saint, ft./ft → fort. Strip non-alphanumeric except spaces. Collapse whitespace.

4. geocodeCity(locStr) — input "City, State" (state full name OR 2-letter). Convert state to abbrev via ST map, fall back to uppercase 2-letter, fall back to raw. Lookup order: CITY_OVERRIDES → harvested cache (localStorage['bb_city_cache']) → US_CITIES → null. Never throw.

5. harvestCityCoords(loads) — for each load with truckLoc + truckLat + truckLng:
   - Skip if truckLoc.split(',').length < 2
   - parts = truckLoc.split(','), stateRaw = parts.pop().trim(), city = normalizeCity(parts.join(','))
   - Skip if city empty
   - key = city + '|' + (ST[stateRaw] || stateRaw)  ← parens MANDATORY (precedence bug)
   - Only write if key not in cache
   - Wrap localStorage.setItem in try/catch

### Parser additions
processCSV column map needs three new entries:
- 'Last Reported Geolocation (Latitude)': 'truckLat'
- 'Last Reported Geolocation (Longitude)': 'truckLng'
- 'Last Reported Location': 'truckLoc'

The load object literal pushed into loads[] needs:
- truckLat: parseFloat(rw[ctlat]) || null
- truckLng: parseFloat(rw[ctlng]) || null
- truckLoc: (rw[ctloc] || '').trim()

Add ctlat/ctlng/ctloc to the existing column shorthand var declarations.

### Harvester hook
Inside processCSV, in the SAME try/catch as the existing applyAutoStatus(loads) call (search for it), right before the return {loads, brokers} statement. Single chokepoint — covers both upload and refresh paths.

### Mini-map on card expand
Find the existing chevron toggle on load cards (search for classList.toggle('open') on lc- elements). The chevron is currently a bare <span>▼</span> — add class="lc-chev" to it.

Rewrite the toggle handler to call lcToggleMap(id, btn). lcToggleMap:
- Toggles .open on the parent .lc element, flips chevron ▼/▲
- On open: if .lc-detail has no .lc-map child, create <div class="lc-map" style="height:220px;margin-top:8px;border-radius:6px;"></div>
- If element already has _leafletMap cached, just call invalidateSize() and return
- Otherwise init Leaflet, cache as el._leafletMap
- 4 fallback cases:
  1. origin geocodes + dest geocodes + truck has lat/lng → all 3 pins (green/red/blue), dashed origin→dest line, solid origin→truck line
  2. origin or dest fails BUT truck exists → just truck pin, center on it
  3. origin+dest geocode but no truck → dashed origin→dest only
  4. nothing geocodes → skip map entirely
- fitBounds when >1 point. invalidateSize() on 50ms timeout (Leaflet measures stale dims if container just became visible).

### Turn 1 canary
After turn 1 done, in browser console: geocodeCity("Beech Island, SC") must return [33.429, -81.8635]. If null, embed broke.

## TURN 2 — Fleet Map

### lc-chev was already added in turn 1 above. Skip.

### Sidebar entry
Find existing sidebar nav items (grep for emoji like 🌧 or 📅), mirror pattern. Add "🗺️ Fleet Map" near top of sidebar, hook onclick to openFleetMap().

### Full-page fleet view
- New <div id="fleet-map-page" style="display:none;position:fixed;inset:0;z-index:200;background:#0F1620"> covering viewport
- Inside: Leaflet map taking full width minus 320px right-side <aside>
- openFleetMap(): hide main view, show fleet-map-page, init Leaflet on first call, cache as window._fleetMap
- closeFleetMap(): hide fleet-map-page, show main view
- Loads source: myLoads() (current broker active loads only)
- Pin position: prefer truckLat/truckLng, else geocodeCity(load.origin), else SKIP that load
- Pin colors:
  - green = in transit on time, has truckLat/truckLng
  - red = isLate(load) or isShipLate(load) returns true
  - purple = on site (shipChecks[load.load].onsite OR deliveryChecks[load.load].onsite)
  - grey = falling back to origin (no truck location) — RECOMMEND OMIT entirely
- L.divIcon or L.circleMarker, doesn't matter
- fitBounds to all pins on first open

### Click → side panel
Pin click populates right aside: load #, carrier, origin → dest, status, ETA if computable. "Open Load" button at bottom of aside with EXACT handler:

```js
closeFleetMap();
sbNav('loads','active');
setTimeout(function f(){
  var el = document.getElementById('lc-'+loadId);
  if(!el){ setTimeout(f, 200); return; }  // retry ONCE
  el.scrollIntoView({behavior:'smooth', block:'center'});
  lcToggleMap(loadId, el.querySelector('.lc-chev'));
}, 400);
```

Order matters: close map → nav → wait 400ms → scroll → open card. Retry once at +200ms if element not found yet.

### Don't re-litigate
nowCT exists, don't redefine. ST map exists, don't redefine. normalizeCarrier exists for exempt list, do NOT reuse for cities.

## Budget guidance (Claude Code)
- File is 4,192 lines. NEVER read top-to-bottom. Use grep + view with line ranges.
- Run `node --check` on the inline script after each major edit (extract <script> body to /tmp/c.js, run node --check on it).
- Plan all edits before writing. Show diffs before applying.
- If anything balloons, stop at clean checkpoint and write HANDOFF-next.md describing what's done and what remains.

## Generating the city DB
Run this Python ONCE before starting (saves ~569KB to /tmp/cities.json):

```python
import geonamescache, json, re

def normalize(s):
    s = s.lower().strip()
    for sfx in [' township',' twp',' city',' borough',' village']:
        if s.endswith(sfx): s = s[:-len(sfx)].strip()
    s = s.replace('st.','saint').replace('st ','saint ').replace('ft.','fort').replace('ft ','fort ')
    s = re.sub(r'[^a-z0-9 ]','',s)
    return re.sub(r'\s+',' ',s).strip()

gc = geonamescache.GeonamesCache(min_city_population=500)
us = [v for v in gc.get_cities().values() if v.get('countrycode')=='US']
by_state = {}
for c in us:
    name, state, pop = normalize(c['name']), c['admin1code'], c.get('population',0)
    if state not in by_state: by_state[state] = {}
    if name not in by_state[state] or by_state[state][name][2] < pop:
        by_state[state][name] = [round(c['latitude'],4), round(c['longitude'],4), pop]

state_strings = {st: ';'.join(f"{n}|{v[0]}|{v[1]}" for n,v in cities.items()) for st,cities in by_state.items()}
with open('/tmp/cities.json','w') as f:
    json.dump(state_strings, f, separators=(',',':'))
print("Done:", len(state_strings), "states")
```

Install with: `pip install geonamescache` (or `pip install --break-system-packages geonamescache` on Linux). Then embed the contents of /tmp/cities.json as the US_CITIES JSON.parse string.
