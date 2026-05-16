# Workflow 01 — Research

## Goal
Build a clean, accurate feature map of the Load Manager app so every downstream artifact (script, storyboard, thumbnail, marketing copy, QA) cites real behavior. No invented features.

## Source of truth (in priority order)
1. `Logistics-Suite/site/load-manager.html` — the actual single-file app (~5,685 lines, vanilla JS, localStorage state, Leaflet for Fleet Map, XLSX for report parsing, DeepSeek as the Kimbo AI brain, OpenWeatherMap for delivery weather badges)
2. `Logistics-Suite/site/app.html` — the Suite hub, for positioning Load Manager as app #03 of 7
3. `C:/Users/aleca/Desktop/CLAUDE.md` / Mass Post context — for the broader Bay & Bay workflow that Load Manager plugs into

## Constraints
- The Load Manager app's *own* theme is the navy/gold Bay & Bay internal theme (#0B1120 / #C9A96E), NOT the candy Suite palette. The brand-aligned candy palette only applies to the *tutorial deliverables themselves* (thumbnail, storyboard graphics, marketing copy), because those live inside Logistics Suite YouTube channel branding.
- Voice: broker-to-broker. Use words like "lane," "load #," "G2G," "MC," "carrier," "detention," "track and trace." Never say "users," "stakeholders," "leverage," or "enterprise."
- The walkthrough must mirror an actual broker morning: open app → pull today's report → triage Needs Driver → fire G2G batch → flip to Deliveries → handle late/detention → end-of-day handoff.

## Outputs
The Research workflow feeds three parallel Stage-1 sub-agents:
- **Coding** — gets a feature inventory and the broker-morning flow narrative
- **Design** — gets the on-screen visual landmarks (sidebar, mode toggle, stat tabs, load cards, Kimbo bear, Fleet Map)
- **Marketing** — gets the audience definition (small/mid freight brokerage ops, 5-50 loads/day, working out of Salesforce/Revenova)
