# Tutorial: CarrierVet — WAT Project

## Mission
Produce a complete long-form video tutorial production package for **CarrierVet** (app #05 of 7 in the Logistics Suite, left-to-right on `app.html`). Output goes to `deliverables/`.

## Source app
- File: `C:/Users/aleca/Desktop/Logistics Suite/Logistics-Suite/site/carrier-analyzer.html`
- One-line description: Carrier vetting and analysis
- Hub: `C:/Users/aleca/Desktop/Logistics Suite/Logistics-Suite/site/app.html`

## Brand
- Logistics Suite — "The sweet side of freight"
- Tagline: "Built by brokers · for brokers"
- Palette: candy pink (#d4738c / #b85775), cream (#faf7f2), purple (#9b7bb8), mint (#7bc8b5), peach (#e8a87c), gold (#c8a062)
- Fonts: DM Sans (display/body) + JetBrains Mono (tagline/mono accents)
- Voice: warm, broker-to-broker, no enterprise jargon

## WAT layering (Workflows / Agents / Tools)
- `wat/workflows/*.md` — natural-language recipes (goal + constraints, not imperative steps)
- `wat/tools/*.py` (or `.ps1`) — deterministic, single-purpose executables
- `wat/tmp/` — intermediate outputs
- `deliverables/` — final shipped artifacts

## Pipeline (5 specialist sub-agents)
1. **Coding agent** — read the source HTML, build feature inventory, draft walkthrough with on-screen actions
2. **Design agent** — thumbnail SVG, on-screen title cards, brand-aligned visuals
3. **Marketing / trend agent** — title A/B options, description, tags, hook, freight-YouTube trend angle
4. **QA agent** — adversarially picks everything apart: gaps, weak hooks, factual errors, pacing issues
5. **Final-decision agent** — synthesizes, applies fixes, stamps GO verdict + publish checklist, commits

## Self-healing rule
On any failure, fix the workflow or tool file before retrying — don't patch the in-flight run.

## Done when
- `deliverables/00-app-overview.md` — what the app does
- `deliverables/01-tutorial-script.md` — full narrated script w/ timestamps + on-screen actions
- `deliverables/02-storyboard.md` — scene-by-scene shot list
- `deliverables/03-thumbnail.svg` — YouTube thumbnail (brand-aligned)
- `deliverables/04-marketing.md` — title A/B + description + tags + hook
- `deliverables/05-qa-report.md` — adversarial review + fixes applied
- `deliverables/06-go-live.md` — GO verdict + publish checklist
- `deliverables/wat-charter.md` — pipeline transparency log
- Final commit on `tutorial/05-carriervet` branch
