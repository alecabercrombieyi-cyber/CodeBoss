# 01 — Research workflow

## Goal
Extract a complete, factually-accurate feature inventory and user-flow map of Mass Post directly from the source HTML, then translate that into a long-form video tutorial script (22–28 min) that a broker can follow end-to-end.

## Inputs
- `C:/Users/aleca/Desktop/Logistics Suite/Logistics-Suite/site/mass-post.html` (single ~8300-line HTML)
- `C:/Users/aleca/Desktop/Logistics Suite/CLAUDE.md` (project notes — equipment mapping, rate formula, DAT scraping flow)
- `C:/Users/aleca/Desktop/Logistics Suite/tutorials/01-mass-post/CLAUDE.md` (brand spec)

## Constraints
- Every script claim must be traceable to source HTML (no invented buttons, no invented features).
- Headline flow is the 10-step Bulk Export → DAT Quick Rate Lookup → Revenova writeback roundtrip.
- Voice: warm, broker-to-broker. Never enterprise-y. Phrases like "we built this because" land; "leverage synergies" does not.
- Mention both bookmarklets (Fill DAT and Mass Post Helper) and the rate formula stepper.
- Be honest about gotchas: must be logged into Salesforce/Revenova in same browser, 4-second-per-lane DAT scrape, bookmarklets must be re-dragged after updates.

## Deliverable
`wat/tmp/coding-output.md` containing:
1. Feature inventory grouped by surface (Settings, Bulk Export modal, Preview Table, Bookmarklets, Rate Formula, etc.)
2. Primary user flows (especially the 10-step roundtrip), plus secondary flows (Express Export, single-load Fill DAT, rate-formula tweaking)
3. Long-form script (22–28 min) with timestamps, narration, and on-screen actions in a parallel column
4. Chapter list with timestamps suitable for a YouTube description
