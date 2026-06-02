# revctl

Pull your Revenova / Salesforce report data **straight into your systems** — no
browser, no Excel export, no file picker.

It logs into Salesforce with your username + password + security token, then
downloads the exact same CSV report Mass Post uses
(`PrintableViewDownloadServlet`) and writes it to a file or prints it to stdout
(optionally as JSON). Zero dependencies — just Node.

## Requirements
- **Node 18 or newer** (uses the built-in `fetch`). Check with `node --version`.
- Your Salesforce account must be allowed to log in with username/password +
  security token. Some orgs restrict this by IP or block it entirely — see
  Troubleshooting.

## Setup (one time)
```bash
cd "Lane - Custom Integrated Systems/revctl"
node revctl.js login
```
It asks for:
- **Username** (your Salesforce/Revenova login email)
- **Password** (typed hidden)
- **Security token** (typed hidden — get one from Salesforce →
  *Settings → My Personal Information → Reset My Security Token*; it's emailed to
  you. Leave blank only if your org doesn't require one.)
- **Sandbox?** (answer `y` only for a sandbox/test org)
- **Default report** — paste your report's URL or its `00O...` id

Credentials are saved to `~/.revctl/config.json`, readable only by your user.
**Nothing is committed to git** (`config.json`, `.env`, and `*.csv` are
git-ignored).

## Use
```bash
node revctl.js whoami                 # verify login works
node revctl.js pull --out loads.csv   # download the default report to a file
node revctl.js pull                   # print CSV to stdout
node revctl.js pull --json --pretty   # print as JSON
node revctl.js pull --report <url|id> # pull a different report
```

### Piping into another system
```bash
node revctl.js pull --json --quiet | your-importer
```

### Running unattended / on a schedule
Skip the stored config and pass secrets as environment variables (these always
win over the config file), e.g. in a cron job:
```bash
SF_USERNAME=me@co.com SF_PASSWORD=pw SF_TOKEN=tok SF_REPORT=00O... \
  node revctl.js pull --quiet --out /data/loads.csv
```

## How it works
1. **SOAP login** to `https://login.salesforce.com/services/Soap/u/59.0`
   (or `test.salesforce.com` for sandbox) → returns a session id + your
   instance URL.
2. **Download** `https://<instance>/servlet/PrintableViewDownloadServlet?reportId=<id>&xf=csv&...`
   using that session — the same endpoint the browser app already uses.
3. **Output** CSV, or `--json` (an array of row objects keyed by the report's
   column headers).

No CORS issues because this runs server-side (Node), not in a browser.

## Troubleshooting
- **`INVALID_LOGIN`** — wrong password, missing/old security token (reset it),
  or your org blocks username-password login. For a sandbox, re-run `login` and
  answer `y` to "Sandbox?".
- **"Got an HTML page instead of CSV"** — the report id is wrong or your user
  can't open that report. Open the report in Revenova and copy its URL again.
- **"needs Node 18 or newer"** — upgrade Node.

## Commands reference
Run `node revctl.js help`.
