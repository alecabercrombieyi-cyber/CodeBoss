# Revenova CLI Spec (Bay & Bay)

Hand-written minimal OpenAPI spec used to generate a real Revenova/Salesforce CLI
via the Printing Press factory. Wraps the Salesforce REST endpoints the Load
Manager needs: Analytics Reports, SOQL, and sObject GET/PATCH.

## Files

- `revenova-openapi.yaml` — the spec (Servers: `bayandbaytms.my.salesforce.com`)

## Tracking report

The "Tracking" report in Alec's folder is report Id `00OPe00000kBFfZMAW`.
Lightning URL:
https://bayandbaytms.lightning.force.com/lightning/r/Report/00OPe00000kBFfZMAW/view

The CLI's hero command runs that report:

```
revenova-pp-cli services run-report 00OPe00000kBFfZMAW --include-details
```

## Regenerate the CLI

```
# 1. Install the Printing Press factory (one-time)
go install github.com/mvanhorn/cli-printing-press/v4/cmd/printing-press@latest

# 2. Generate from this spec
printing-press generate \
  --spec ./revenova-openapi.yaml \
  --name revenova \
  --spec-source community

# 3. Build the binary
cd ~/printing-press/library/revenova
go build -o ~/go/bin/revenova-pp-cli ./cmd/revenova-pp-cli
```

## Auth

The CLI expects a Salesforce OAuth Bearer token. Easiest path:

```
sf org login web -a baybay
ACCESS=$(sf org display -o baybay --json | jq -r .result.accessToken)
revenova-pp-cli auth set-token "$ACCESS"
```

The server URL in `revenova-openapi.yaml` is `bayandbaytms.my.salesforce.com` —
change it if the org's My Domain URL is different.

## Why a hand-written spec?

Salesforce's official OpenAPI generator is org-specific (requires logging into
the org with the Beta toggle enabled) and produces a full sObject catalog.
This minimal spec covers just what Load Manager needs today; swap in the
org-generated spec later if you want full coverage of every custom field.

## Load Manager direct-update bridge

The factory CLI is great for terminal/agent use, but Load Manager runs in the
browser from `file://` — browser `fetch()` to `*.my.salesforce.com` is blocked
by CORS, which is why the current code uses the hidden-iframe CSV download.

`serve/` is a tiny standalone Go HTTP shim (~120 LOC, no factory deps) that
runs on `127.0.0.1:8765` and proxies the browser to Salesforce while emitting
permissive CORS. Holds the access token server-side. Companion JS
(`load-manager-bridge.js`) monkey-patches `triggerUpdate()` / `getLoads()` to
fetch JSON from the bridge instead of triggering the iframe download.

### Build & run the bridge

```
cd serve
go build -o ~/bin/revenova-bridge .

SF_ACCESS_TOKEN=$(sf org display -o baybay --json | jq -r .result.accessToken) \
SF_INSTANCE_URL=https://bayandbaytms.my.salesforce.com \
revenova-bridge --port 8765
```

Endpoints:
- `GET /health` — sanity check
- `GET /report/<reportId>` — runs `POST /analytics/reports/<id>?includeDetails=true`
- `GET /soql?q=...` — pass-through SOQL
- `GET|PATCH /sobjects/<Name>/<Id>` — record fetch / update (Posted Amount,
  Benchmark Rate, Status writebacks)

### Wire Load Manager to it

Open `load-manager.html` (v49+), paste the contents of `load-manager-bridge.js`
immediately before the closing `</script>` tag at the bottom of the file. No
other edits required.

Then in the app: Settings → check **Use direct bridge** → Save → click
**Test Connection**. Once it's green, the Refresh button fetches JSON from the
bridge instead of yanking a CSV through the iframe. The old iframe path stays
as a fallback if a bridge call fails.

Storage keys added: `bb_bridge_enabled` (`'1'`/`'0'`), `bb_bridge_url`.
