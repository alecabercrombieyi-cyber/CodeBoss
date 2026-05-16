# CarrierVet — App Overview

**Slot:** App 5 of 7 in the Logistics Suite.
**File on disk:** `Logistics-Suite/site/carrier-analyzer.html` (the display name is CarrierVet; the file kept its original codename).
**One-line:** Carrier vetting and analysis — type a carrier name, get three tier cards back in under a second, see a red banner if their factoring company is on your blocklist.

## What it does

CarrierVet ingests your shop's Revenova/Salesforce carrier-history report (CSV or XLSX) and renders, for any carrier you type into the search box, a vetting dashboard with three components:

1. **A header strip** with the carrier's name, MC#, DOT#, and deep-links to Highway, FMCSA SAFER, and Carrier411 (those services aren't called by CarrierVet — it just opens a tab in your existing session).
2. **Three tier cards** evaluating the carrier against your shop's Tier 1 / Tier 2 / Tier 3 customer rules. Each card is green (pass), amber (one qualification short — references can cover), or red (not eligible). Expand a card for the qualifications detail.
3. **A red factoring banner** at the top of the dashboard if the carrier's most recent remit-to matches a company on your blocklist. Self-remit (remit-to = carrier name) is ignored.

## Who it's for

Freight brokers, dispatchers, and carrier reps at mid-size brokerages who:
- Already use Revenova or a similar Salesforce-based TMS
- Already use Highway / Carrier411 / FMCSA for authority and insurance checks
- Want the first 30 minutes of "is this carrier vetted" collapsed into 10 seconds before they pick up the phone

## Key features

- **Salesforce auto-pull** — paste a Lightning report URL, get a 26-second simulated download progress bar; uses session cookies, no API key needed
- **CSV / XLSX upload** — for shops not on Salesforce, or for ad-hoc reports
- **3-tier evaluation engine** — Tier 1 needs 1 of 1 qualification, Tiers 2 & 3 need 2 of 3 (load volume, similar-lane history, recency). Rules are hard-coded but the customer list per tier is user-editable.
- **Factoring blocklist** — shared via localStorage with Mass Post and other Logistics Suite apps. Default list seeded, fully user-editable.
- **Customers tab** — edit which customers belong to which tier; powers the gold lock badge ("proven experience at this tier").
- **Tutorial overlay** — three-step onboarding, auto-shows once per browser, replayable from Settings.

## What it explicitly does NOT do

- Does not score carrier fraud risk algorithmically.
- Does not pull from FMCSA, Highway, or Carrier411 in real time — it deep-links to those services.
- Does not check authority age, insurance currency, or safety scores — Highway is your tool for that.
- Does not book loads. CarrierVet is the screen BEFORE the call.
