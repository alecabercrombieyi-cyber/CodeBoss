#!/usr/bin/env node
'use strict';

// revctl — pull Revenova / Salesforce report data straight into your systems.
//
// No browser, no Excel export, no file picker. Logs into Salesforce with your
// stored username + password + security token (SOAP login), then downloads the
// same CSV report your Mass Post app uses (PrintableViewDownloadServlet) and
// writes it to a file or stdout.
//
// Zero dependencies. Requires Node 18+ (uses the built-in global fetch).
//
// Quick start:
//   node revctl.js login          # one-time: save your credentials + report
//   node revctl.js whoami         # verify the login works
//   node revctl.js pull           # pull the default report to stdout
//   node revctl.js pull --out loads.csv
//   node revctl.js pull --json | your-system

const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');

const CONFIG_DIR = path.join(os.homedir(), '.revctl');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
const API_VERSION = '59.0';

// ── tiny helpers ─────────────────────────────────────────────

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Pull a Salesforce report id (00O...) out of a raw id or a full report URL.
function extractReportId(input) {
  if (!input) return null;
  const m = String(input).match(/00O[a-zA-Z0-9]{12,15}/);
  return m ? m[0] : null;
}

// Origin (scheme + host) of a URL, e.g. https://acme.my.salesforce.com
function originOf(url) {
  try {
    const u = new URL(url);
    return u.protocol + '//' + u.host;
  } catch (e) {
    return null;
  }
}

// Minimal RFC-4180-ish CSV parser → array of row arrays. Handles quoted
// fields, embedded commas/newlines, and "" escaped quotes.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else { field += c; }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n') {
      row.push(field); field = ''; rows.push(row); row = [];
    } else if (c === '\r') {
      // swallow; \r\n handled by the \n branch
    } else {
      field += c;
    }
  }
  // trailing field / row
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

// CSV text → array of objects keyed by the header row.
function csvToObjects(text) {
  const rows = parseCSV(text).filter(r => r.length && !(r.length === 1 && r[0] === ''));
  if (!rows.length) return [];
  const headers = rows[0].map(h => h.trim());
  return rows.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = r[i] !== undefined ? r[i] : ''; });
    return obj;
  });
}

// ── config ───────────────────────────────────────────────────

function loadConfig() {
  let cfg = {};
  try {
    cfg = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  } catch (e) { /* no config yet */ }
  // Environment variables always win — lets you run unattended / on a schedule
  // without writing secrets to disk.
  if (process.env.SF_USERNAME)  cfg.username = process.env.SF_USERNAME;
  if (process.env.SF_PASSWORD)  cfg.password = process.env.SF_PASSWORD;
  if (process.env.SF_TOKEN)     cfg.token    = process.env.SF_TOKEN;
  if (process.env.SF_LOGIN_URL) cfg.loginUrl = process.env.SF_LOGIN_URL;
  if (process.env.SF_REPORT)    cfg.report   = process.env.SF_REPORT;
  if (!cfg.loginUrl) cfg.loginUrl = 'https://login.salesforce.com';
  return cfg;
}

function saveConfig(cfg) {
  try { fs.mkdirSync(CONFIG_DIR, { recursive: true, mode: 0o700 }); } catch (e) {}
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2), { mode: 0o600 });
  try { fs.chmodSync(CONFIG_FILE, 0o600); } catch (e) {}
}

function prompt(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    process.stdout.write(question);
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) {
      // Suppress echo of typed characters (no echo at all — robust across terminals).
      rl._writeToOutput = function () {};
    }
    rl.question('', (answer) => {
      rl.close();
      if (hidden) process.stdout.write('\n');
      resolve(answer.trim());
    });
  });
}

// ── salesforce ───────────────────────────────────────────────

// SOAP login → { sessionId, instanceUrl }. Throws with a readable message on failure.
async function login(cfg) {
  if (!cfg.username || !cfg.password) {
    throw new Error('Missing credentials. Run "revctl login" first (or set SF_USERNAME / SF_PASSWORD / SF_TOKEN).');
  }
  if (typeof fetch !== 'function') {
    throw new Error('This CLI needs Node 18 or newer (built-in fetch). Your Node is too old — upgrade and retry.');
  }
  const loginOrigin = originOf(cfg.loginUrl) || 'https://login.salesforce.com';
  const endpoint = loginOrigin + '/services/Soap/u/' + API_VERSION;
  const pass = cfg.password + (cfg.token || ''); // SF wants password+securitytoken concatenated
  const body =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<env:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
    ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
    ' xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<env:Body><n1:login xmlns:n1="urn:partner.soap.sforce.com">' +
    '<n1:username>' + xmlEscape(cfg.username) + '</n1:username>' +
    '<n1:password>' + xmlEscape(pass) + '</n1:password>' +
    '</n1:login></env:Body></env:Envelope>';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/xml; charset=UTF-8', 'SOAPAction': 'login' },
    body
  });
  const text = await res.text();

  const fault = text.match(/<faultstring>([\s\S]*?)<\/faultstring>/);
  if (fault) {
    let msg = fault[1].replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    if (/INVALID_LOGIN/.test(text)) {
      msg += '\nTip: check your password, append/refresh your SECURITY TOKEN, and confirm your org allows ' +
             'username-password login (some orgs block it or restrict by IP). For a sandbox, set login URL to https://test.salesforce.com.';
    }
    throw new Error('Salesforce login failed: ' + msg);
  }
  const sid = text.match(/<sessionId>([\s\S]*?)<\/sessionId>/);
  const surl = text.match(/<serverUrl>([\s\S]*?)<\/serverUrl>/);
  if (!sid || !surl) {
    throw new Error('Login response could not be parsed (no sessionId). HTTP ' + res.status + '.');
  }
  const instanceUrl = originOf(surl[1]);
  if (!instanceUrl) throw new Error('Could not determine your Salesforce instance URL from the login response.');
  return { sessionId: sid[1], instanceUrl };
}

// Download a report as CSV text using an authenticated session.
async function fetchReportCSV(session, reportId) {
  const url = session.instanceUrl + '/servlet/PrintableViewDownloadServlet' +
    '?reportId=' + encodeURIComponent(reportId) +
    '&xf=csv&enc=UTF-8&csvDelimiter=comma';
  const res = await fetch(url, {
    headers: { 'Cookie': 'sid=' + session.sessionId, 'Authorization': 'Bearer ' + session.sessionId },
    redirect: 'follow'
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error('Report download failed (HTTP ' + res.status + ').');
  }
  // A login/redirect page means the session cookie wasn't accepted.
  if (/^\s*<(!DOCTYPE|html)/i.test(text) || /<title>[^<]*login/i.test(text)) {
    throw new Error('Got an HTML page instead of CSV — the session was rejected for this report. ' +
      'Confirm the report id is correct and that your user can open that report in Revenova.');
  }
  return text;
}

// ── commands ─────────────────────────────────────────────────

async function cmdLogin() {
  const existing = (() => { try { return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); } catch (e) { return {}; } })();
  console.log('Set up revctl — credentials are stored only on this machine (' + CONFIG_FILE + ', readable by you only).\n');

  const username = await prompt('Salesforce/Revenova username (email): ');
  const password = await prompt('Password (hidden): ', { hidden: true });
  const token    = await prompt('Security token (hidden, press Enter if none): ', { hidden: true });
  const sandbox  = (await prompt('Sandbox org? [y/N]: ')).toLowerCase().startsWith('y');
  const reportIn = await prompt('Default report URL or id' + (existing.report ? ' [' + existing.report + ']' : '') + ': ');

  const cfg = {
    username: username || existing.username,
    password: password || existing.password,
    token:    token    || existing.token || '',
    loginUrl: sandbox ? 'https://test.salesforce.com' : 'https://login.salesforce.com',
    report:   extractReportId(reportIn) || reportIn || existing.report || ''
  };
  if (!cfg.username || !cfg.password) {
    console.error('\nUsername and password are required.');
    process.exit(1);
  }
  saveConfig(cfg);
  console.log('\nSaved. Verifying login...');
  try {
    const s = await login(cfg);
    console.log('✓ Logged in. Instance: ' + s.instanceUrl);
    console.log('Now run:  node revctl.js pull --out loads.csv');
  } catch (e) {
    console.error('⚠ Saved, but the login test failed:\n  ' + e.message);
    process.exit(1);
  }
}

async function cmdWhoami() {
  const cfg = loadConfig();
  const s = await login(cfg);
  console.log('✓ Login OK');
  console.log('  user:     ' + cfg.username);
  console.log('  instance: ' + s.instanceUrl);
  console.log('  report:   ' + (cfg.report || '(none set — pass --report)'));
}

async function cmdPull(args) {
  const cfg = loadConfig();
  const reportArg = args.report || cfg.report;
  const reportId = extractReportId(reportArg) || reportArg;
  if (!reportId) {
    throw new Error('No report specified. Pass --report <url-or-id> or set a default with "revctl login".');
  }
  if (!/^00O/.test(reportId)) {
    throw new Error('"' + reportId + '" does not look like a report id (should start with 00O) or a report URL.');
  }
  const log = (m) => { if (!args.quiet) process.stderr.write(m + '\n'); };

  log('Logging in as ' + cfg.username + '...');
  const session = await login(cfg);
  log('Pulling report ' + reportId + ' from ' + session.instanceUrl + '...');
  const csv = await fetchReportCSV(session, reportId);

  let out = csv;
  if (args.json) {
    out = JSON.stringify(csvToObjects(csv), null, args.pretty ? 2 : 0);
  }

  if (args.out) {
    fs.writeFileSync(args.out, out);
    const rows = args.json ? JSON.parse(out).length : Math.max(0, parseCSV(csv).length - 1);
    log('✓ Wrote ' + rows + ' row(s) to ' + args.out);
  } else {
    process.stdout.write(out);
    if (!out.endsWith('\n')) process.stdout.write('\n');
  }
}

function printHelp() {
  console.log([
    'revctl — pull Revenova / Salesforce reports without exporting a file',
    '',
    'Usage:',
    '  node revctl.js login                 Save credentials + default report (one time)',
    '  node revctl.js whoami                Verify the saved login works',
    '  node revctl.js pull [options]        Download the report',
    '',
    'pull options:',
    '  --report <url|id>   Report URL or id (00O...). Defaults to the one saved at login.',
    '  --out <file>        Write to a file instead of stdout.',
    '  --json              Output JSON (array of row objects) instead of CSV.',
    '  --pretty            Pretty-print the JSON.',
    '  --quiet             Suppress progress messages (good for piping/cron).',
    '',
    'Credentials (config file or env vars; env wins):',
    '  SF_USERNAME  SF_PASSWORD  SF_TOKEN  SF_LOGIN_URL  SF_REPORT',
    '',
    'Examples:',
    '  node revctl.js pull --out loads.csv',
    '  node revctl.js pull --report https://acme.lightning.force.com/.../00O... --json --pretty',
    '  SF_USERNAME=me@co.com SF_PASSWORD=pw SF_TOKEN=tok node revctl.js pull --quiet > loads.csv'
  ].join('\n'));
}

// ── arg parsing + dispatch ───────────────────────────────────

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out')        args.out = argv[++i];
    else if (a === '--report') args.report = argv[++i];
    else if (a === '--json')   args.json = true;
    else if (a === '--pretty') args.pretty = true;
    else if (a === '--quiet')  args.quiet = true;
    else if (a === '-h' || a === '--help') args.help = true;
    else args._.push(a);
  }
  return args;
}

async function main() {
  const argv = process.argv.slice(2);
  const args = parseArgs(argv);
  const cmd = args._[0];

  if (args.help || !cmd || cmd === 'help') { printHelp(); return; }

  try {
    if (cmd === 'login')       await cmdLogin();
    else if (cmd === 'whoami') await cmdWhoami();
    else if (cmd === 'pull')   await cmdPull(args);
    else { console.error('Unknown command: ' + cmd + '\n'); printHelp(); process.exit(1); }
  } catch (e) {
    console.error('✗ ' + e.message);
    process.exit(1);
  }
}

// Run when invoked directly; export pure helpers for testing when required.
if (require.main === module) {
  main();
} else {
  module.exports = { xmlEscape, extractReportId, originOf, parseCSV, csvToObjects };
}
