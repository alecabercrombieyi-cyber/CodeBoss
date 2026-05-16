# Workflow 02 — Parallel Build (Stage 1)

## Goal
Run three specialist sub-agents in parallel to draft the full long-form package. They never block each other; QA reconciles in Stage 2.

## Coding agent
Writes `wat/tmp/coding-output.md` containing:
- Feature inventory grouped by surface (Loader screen, Shipping mode, Deliveries mode, Fleet Map, Kimbo, Settings, Spotlight tour, Workflow Benefits modal)
- Data-flow diagram (Salesforce report → XLSX parser → in-memory loads array → localStorage cache → render loops; OpenWeather hits weather badges; DeepSeek powers Kimbo + Smart Shuffle + AI templates)
- A 20-to-26-minute walkthrough script with timestamps every 30-60 seconds
- Chapter list (YouTube-format `0:00 Title` lines)

## Design agent
Writes three files:
- `wat/tmp/thumbnail.svg` — 1280x720, candy palette, a stylized load board / dashboard hero with a few load cards stacked and a chunky title. Pink accent, cream base, JetBrains Mono for the "EP 03" stamp, DM Sans for the headline.
- `wat/tmp/title-cards.md` — one card per section break (intro / loader / shipping triage / deliveries / Kimbo / Fleet Map / outro). Each card lists: copy, accent color, suggested duration, mono/sans pairing.
- `wat/tmp/visual-spec.md` — palette swatches, font stack, lower-third format, callout-arrow style, B-roll list ("hover the Needs Driver tab," "open Smart Shuffle," "scroll the Fleet Map cluster").

## Marketing agent
Writes `wat/tmp/marketing-output.md` containing:
- 5 candidate YouTube titles (broker-to-broker tone, < 70 chars, no clickbait but high hook density)
- One 1500-character description with chapters block
- 18-25 tags (mix of broad: "freight broker," and long-tail: "salesforce broker dashboard")
- The 10-second hook copy
- A trend angle ("why freight ops YouTube is leaning into single-operator tools in 2026")
- Target-viewer persona

## Constraints all three share
- Cite only features present in `load-manager.html`. If you can't grep it, you can't claim it.
- Treat Logistics Suite as the channel/brand, Load Manager as the app — but Bay & Bay is the *real* operator the app was built around. Mention that lineage; it's the credibility.
