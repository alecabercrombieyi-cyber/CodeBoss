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
