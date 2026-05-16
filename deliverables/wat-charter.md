# WAT Charter — Data Wash Tutorial (Pipeline Transparency Log)

**Branch:** `tutorial/06-data-wash`
**App under test:** `Logistics-Suite/site/data-wash.html`
**Final verdict:** GO

---

## Pipeline overview

```
Stage 0  workflows authored   →   wat/workflows/*.md
Stage 1  parallel sub-agents  →   wat/tmp/{coding,thumbnail,title-cards,visual-spec,marketing}-output
Stage 2  QA (adversarial)     →   wat/tmp/qa-report.md
Stage 3  final decision       →   deliverables/00..06 + wat-charter.md (this file)
Stage 4  commit               →   git commit -m "tutorial(06-data-wash): GO — long-form package ready"
```

---

## Stage 0 — Workflows authored

| File | Purpose |
|---|---|
| `wat/workflows/01-coding-walkthrough.md` | Feature inventory + chaptered script (15–22 min) |
| `wat/workflows/02-design.md` | Thumbnail SVG + title cards + visual spec, candy brand |
| `wat/workflows/03-marketing.md` | Titles, description, tags, hook, trend angle |
| `wat/workflows/04-qa.md` | Adversarial review against source HTML |
| `wat/workflows/05-final-decision.md` | Synthesis, fix application, GO/NO-GO, commit |

---

## Stage 1 — Specialist sub-agents

### Coding agent
- **Read:** `Logistics-Suite/site/data-wash.html` (981 lines)
- **Produced:** feature inventory keyed to file:line evidence; user flows; 19-minute walkthrough script with VO, on-screen actions, and YouTube chapter timestamps
- **Output:** `wat/tmp/coding-output.md`
- **Key finding:** App is a *synthetic data generator*, not a CSV de-duper as initially described in the orchestrator brief. Realigned the pipeline to the actual app — privacy-safe data sharing for vendor evaluations.

### Design agent
- **Produced:**
  - `wat/tmp/thumbnail.svg` — 1280×720 candy-branded thumbnail; before/after data blocks flanking a central soap bubble with sparkles; bold "Hide PII in 2 minutes" tagline
  - `wat/tmp/title-cards.md` — 9 chapter cards + 6 on-screen callouts + persistent lower-third spec
  - `wat/tmp/visual-spec.md` — recording setup, B-roll list, editing cadence, accessibility notes
- **Key finding:** Brand mismatch between the Data Wash app's emerald UI and the candy Suite palette. Resolution: persistent pink ribbon overlay during in-app footage; all title cards and surrounding shots remain candy-branded.

### Marketing agent
- **Produced:** 5 titles + 1500-char description + 25 tags + verbatim 30-sec hook + trend angles + 3-persona target + pinned comment + cross-promotion plan
- **Output:** `wat/tmp/marketing-output.md`
- **Key angle:** "Stop emailing customer PII to vendors" — pain-first, time-anchored, free signal. Rides the "show me the actual software" anti-SaaS micro-trend.

---

## Stage 2 — QA agent

- **Input:** all four Stage 1 outputs + source HTML
- **Output:** `wat/tmp/qa-report.md` (mirrored to `deliverables/05-qa-report.md`)
- **Verdict:** CONDITIONAL GO pending 9 surgical fixes

### Issues flagged

| # | Issue | Severity |
|---|---|---|
| 1 | Hard-coded fake names ("Phoenix Tanaka," "Wren Singh") could mismatch actual seed-42 output during recording | HIGH |
| 2 | "1950–2010" date range claim — actual range is 1950–2009 | LOW (cosmetic) |
| 3 | "Free forever" overclaim | LOW |
| 4 | "$200/month SaaS" unverified price | MEDIUM |
| 5 | Pinned comment overclaimed "no upload" across the entire suite | HIGH |
| 6 | Configure chapter (03:30–08:00) was 4m30s — too long for utility content | MEDIUM |
| 7 | Caption-review note missing from go-live checklist | MEDIUM |
| 8 | Title #5 ("lawsuit waiting to happen") risked YouTube sensitive-content flag | MEDIUM |
| 9 | "Fully offline" claim conflicts with SheetJS CDN dependency | HIGH |

### Verified correct (high-confidence)
- 4-step flow, 3 input formats, 3 output formats, auto-detection field list (id/department/etc.), row multiplier values, seed default 42, ±20% variance preserve-distribution, 13-line CSV comment block, two-sheet XLSX export, character-class scramble logic — all cross-checked to specific line numbers in source.

---

## Stage 3 — Final decision agent

All 9 QA fixes applied to the deliverables. Specifically:

- Script reworded fake-name references to "something like Phoenix Tanaka" (fix #1)
- Date range changed to "random historical dates" (fix #2)
- "Free forever" removed; replaced with "free, no signup" (fix #3)
- Hook line softened to "SaaS that wants your credit card on file" (fix #4)
- Pinned comment now distinguishes Data Wash/Load Manager (100% local) from suite apps that connect to external systems (fix #5)
- Configure chapter split with a second title card at 06:30 "Multiplier · seed · format toggles" (fix #6)
- Caption-review checklist item added to `06-go-live.md` (fix #7)
- Title #5 dropped from rotation; primary remains title #1 (fix #8)
- "Browser-only, no backend" replaces "fully offline" throughout script and marketing copy (fix #9)

### Deliverables shipped

| File | Status |
|---|---|
| `deliverables/00-app-overview.md` | ✅ |
| `deliverables/01-tutorial-script.md` | ✅ (QA fixes applied) |
| `deliverables/02-storyboard.md` | ✅ |
| `deliverables/03-thumbnail.svg` | ✅ |
| `deliverables/04-marketing.md` | ✅ (QA fixes applied) |
| `deliverables/05-qa-report.md` | ✅ |
| `deliverables/06-go-live.md` | ✅ |
| `deliverables/wat-charter.md` | ✅ (this file) |

---

## Stage 4 — Commit

Committed on `tutorial/06-data-wash` worktree branch with the exact subject line specified by orchestrator brief. No push.

---

## Self-healing log

No workflow or tool retries were necessary during this run. The orchestrator brief's app-description mismatch ("CSV de-duper" vs. actual "synthetic data generator") was caught at Stage 1 and reconciled inside the coding agent's output without rewriting the workflow files — the workflows are app-agnostic enough to accommodate either framing.

---

## Discipline check

- Worktree-bound: ✅ (working in `tutorials/06-data-wash` worktree on `tutorial/06-data-wash` branch)
- Voice broker-to-broker: ✅ (no enterprise jargon, no "ecosystem"/"synergy"/"leverage")
- Candy brand applied to overlays/thumbnails despite emerald app UI: ✅
- 8 deliverables in `deliverables/`: ✅
- No push: ✅
</content>
</invoke>