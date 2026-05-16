# 01 — Research workflow

## Goal
Extract a complete, factually-accurate feature inventory and user-flow map of CarrierVet directly from the source HTML, then translate that into a long-form video tutorial script (20–26 min) that a broker can follow end-to-end. The vetting workflow is meaty — every tier rule, factoring flag, and external link must be accounted for.

## Inputs
- `C:/Users/aleca/Desktop/Logistics Suite/Logistics-Suite/site/carrier-analyzer.html` (single ~2700-line HTML, display name "CarrierVet — Targeted Load Compliance")
- `C:/Users/aleca/Desktop/Logistics Suite/tutorials/05-carriervet/CLAUDE.md` (brand spec)

## Constraints
- Every script claim must be traceable to source HTML. No invented buttons, no invented features, no fabricated tier rules.
- File on disk is `carrier-analyzer.html`. Display name in title bar is `CarrierVet`. Use CarrierVet in narration.
- Voice: warm, broker-to-broker. "We built this because we got tired of..." lands. "Leverage synergies" does not.
- Tier rules must match the TIERS object exactly:
  - Tier 1 = 1 of 1 qualification (1 load with B&B in last 6 mo OR Highway Heatmap "Moderate+")
  - Tier 2 = 2 of 3 (6 loads in 12 mo, same-lane history alt, recency 1+ load in 4 mo)
  - Tier 3 = 2 of 3 (10 loads in 12 mo, same-lane history alt, recency 1+ load in 3 mo)
- Factoring claim must be accurate: blocks ONLY when `remitTo` of most recent load matches the blocklist AND is not self-remit. Defaults seeded from `DEFAULT_FACTORING` array, synced via `clis_excludedFactoring` localStorage.
- External link integrations: Highway (`highway.com/broker/carriers/search-results`), FMCSA SAFER, Carrier411 — all by MC#.
- Salesforce/Revenova import: 26-second simulated timeline, uses servlet `PrintableViewDownloadServlet` with `xf=csv`. User must be logged in.

## Deliverable
`wat/tmp/coding-output.md` containing:
1. Feature inventory grouped by surface (Welcome/Setup, Salesforce Pull, Search, Tier Cards, Factoring banner, External Links, Settings → General/Customers/Factoring/Workflow, Tutorial overlay, History)
2. Primary user flow (Salesforce pull → search by carrier name → read 3 tier cards → expand for qualifications → click Highway/FMCSA/Carrier411)
3. Long-form script (20–26 min) with timestamps, narration, and on-screen actions in a parallel column
4. Chapter list with timestamps suitable for a YouTube description
