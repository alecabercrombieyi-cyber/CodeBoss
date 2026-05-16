# WAT Charter — Load Manager Tutorial

> Pipeline transparency log. Where every artifact came from. What each stage did. Where the human can audit.

## The pipeline (Workflows / Agents / Tools)

```
Stage 0 ─ Workflow files written         → wat/workflows/01..05.md
Stage 1 ─ Three parallel sub-agents      → wat/tmp/{coding,thumbnail.svg,title-cards,visual-spec,marketing}-output.md
Stage 2 ─ QA agent (adversarial)         → wat/tmp/qa-report.md
Stage 3 ─ Final-decision agent           → deliverables/00..06 + wat-charter.md
Stage 4 ─ Commit (no push)               → git commit on main
```

## Stage 0 — Workflow files
Five natural-language workflow files written under `wat/workflows/`. Each declares a goal + constraints, not imperative steps. They are how this pipeline self-heals: if a stage fails, you fix the workflow file before retrying.

## Stage 1 — Parallel specialists

### Coding agent
- **Input:** `load-manager.html` (~5,685 lines) + `app.html` for positioning
- **Process:** grepped every feature claim before writing it. 0 invented features. Built data-flow diagram tracking the path from Salesforce report → SheetJS → in-memory loads → render loops → DeepSeek + OpenWeather side calls.
- **Output:** `wat/tmp/coding-output.md` — feature inventory, walkthrough script (23 min, ~3,450 words), chapter list

### Design agent
- **Input:** Suite brand palette + Load Manager screenshot landmarks
- **Process:** built thumbnail in SVG (vector-clean, scales for any future re-cut). Cards stack in 3-layer diagonal to suggest the load board. Used candy palette for the wrapper, NOT the app's own navy/gold theme — that contrast is intentional.
- **Output:** `wat/tmp/thumbnail.svg`, `title-cards.md`, `visual-spec.md`

### Marketing agent
- **Input:** Coding output for feature-truth, audience definition from claudeMd memory (Alec is a working broker at Bay & Bay)
- **Process:** wrote 5 candidate titles, chose outcome-led + searchable winner with A/B fallback. Tags prioritized by intent.
- **Output:** `wat/tmp/marketing-output.md`

## Stage 2 — QA agent
- **Input:** All three Stage-1 outputs
- **Process:** cross-checked every feature claim against `load-manager.html` via grep. Pacing audit. Voice-drift scan. Title/thumbnail consistency. Tag relevance. Description CTA verification.
- **Output:** `wat/tmp/qa-report.md` — verdict GO-WITH-FIXES, 2 minor copy edits, 1 explicit A/B note, 1 placeholder bracket for real-number swap during edit. No blockers.

## Stage 3 — Final-decision agent
- **Input:** All Stage 1 + Stage 2 outputs
- **Process:** applied all QA fixes inline. Promoted polished versions to `deliverables/`. Re-emitted thumbnail (no changes — passed QA as-is).
- **Output:** eight files in `deliverables/`:
  - `00-app-overview.md`
  - `01-tutorial-script.md`
  - `02-storyboard.md`
  - `03-thumbnail.svg`
  - `04-marketing.md`
  - `05-qa-report.md`
  - `06-go-live.md`
  - `wat-charter.md` (this file)

## Stage 4 — Commit
`git add -A && git commit -m "tutorial(03-load-manager): GO — long-form package ready"`
No push. Human owns the upload decision.

## Audit pointers
- **Want to see why a claim is in the script?** Grep for it in `load-manager.html`. The QA report names line numbers for the major claims.
- **Want to challenge the title?** See `04-marketing.md` — five candidates with reasoning, plus the explicit 48h A/B swap rule.
- **Want to challenge the pacing?** See the script's per-chapter time budget in `01-tutorial-script.md`. Total 23:00, 150 wpm, 3,450 words.
- **Want to re-skin?** Palette + fonts in `wat/tmp/visual-spec.md`. Brand source-of-truth is `Logistics-Suite/site/app.html` + `_brand-src/` per claudeMd memory.

## Known limitations
- Recording numbers are placeholders ("six loads, four without drivers"). Swap with the real morning if captured.
- Smart Shuffle demo assumes a representative load mix. If the recording day is too clean (everything booked), capture a different day.
- Kimbo's reply quality depends on the DeepSeek prompt + the loads in context. If the demo reply is weak, re-prompt off-camera and use the better one.
