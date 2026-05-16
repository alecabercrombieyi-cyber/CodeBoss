# WAT Charter — Pillar Tutorial Pipeline Log

This file is the transparency log for the WAT (Workflows / Agents / Tools) pipeline that produced the Pillar tutorial deliverables.

## Pipeline overview
- **Tutorial:** Pillar (app #07 of 7, Core Carrier Intelligence)
- **Branch:** `tutorial/07-pillar` (worktree at `tutorials/07-pillar/`)
- **Stages:** 5 (0-4)
- **Date stamp:** 2026-05-16

## Stage 0 — Workflows
Created 5 workflow markdown files in `wat/workflows/`:
- `01-research.md` — coding/research agent recipe
- `02-design.md` — visual design recipe
- `03-marketing.md` — discovery package recipe
- `04-qa.md` — adversarial review recipe
- `05-go-live.md` — synthesis + commit recipe

## Stage 1 — Parallel sub-agents
Three sub-agents ran with one orchestrator dispatch:

### Coding agent → `wat/tmp/coding-output.md`
- Performed discovery-heavy read of `pillar.html` (no prior memory entry existed)
- Extracted: 5-screen navigation, tutorial overlay (8 steps), engine rules (Core / New Core / Violation / Severity / Lock Date), required column list, Salesforce pull mechanics
- Produced: elevator pitch, feature inventory, engine ground-truth section, voice cheat-sheet, 18-min script with 11 chapters, on-screen action checklist
- Source citations: every engine rule line-cited from `pillar.html`

### Design agent → `wat/tmp/thumbnail.svg`, `title-cards.md`, `visual-spec.md`
- Concept: 3 pillars with the middle one cracked (visual metaphor for the violation)
- Palette: cream bg, Pillar gold pillars, candy-pink crack + CTA pill, suite-mint NEW ribbon
- Title cards: 9 cards (8 chapters + end card)
- Visual spec: per-chapter overlays, motion notes, audio direction

### Marketing agent → `wat/tmp/marketing-output.md`
- 5 title options (A/B framework with primary + alternate)
- YouTube description with chapter list, suite cross-references, CTA
- 26 tags
- Spoken hook (10 sec)
- Trend angle: "rep accountability" + "newest in the suite" framing
- 3-tier persona breakdown

## Stage 2 — QA → `wat/tmp/qa-report.md`
QA reviewed all Stage 1 outputs against `pillar.html` ground truth:

| Check category | Pass | Fail |
|---|---|---|
| Factual claims | 10 | 0 |
| Brand / visual | 1 | 2 (font note, gold hex) |
| Pacing | 4 | 0 |
| Discovery | 3 | 1 (title length) |
| Thumbnail | 4 | 1 (gold tone) |
| Voice | 3 | 0 |
| Gaps | — | 3 (column-strict mention, tutorial-overlay mention, core-lock-date detail) |

**Verdict:** Conditional GO — 6 fix items handed to Final-Decision.

## Stage 3 — Final Decision
Applied all 6 QA fixes:
1. Updated thumbnail SVG gold hex to `#b8974a` / `#e8d9b8` (matches app's `--gold`)
2. Added font-baseline clarification (suite uses DM Sans/JetBrains Mono for overlays; Pillar's in-product font Barlow appears in screen recordings naturally)
3. Trimmed primary title from 71 → 60 chars
4. Added column-strictness sentence to script chapter 2
5. Added in-app tutorial overlay mention to script chapter 2
6. Added established-core lock-date detail to script chapter 6

Promoted artifacts to `deliverables/` with numbered filenames:
- `00-app-overview.md`
- `01-tutorial-script.md`
- `02-storyboard.md`
- `03-thumbnail.svg`
- `04-marketing.md`
- `05-qa-report.md`
- `06-go-live.md`
- `wat-charter.md` (this file)

## Stage 4 — Commit
Pending — see commit command in `wat/workflows/05-go-live.md`.

## What QA caught (in case it's useful for next tutorial)
- **The font question.** Pillar is the first app in the suite that uses Barlow internally. Other Suite apps use DM Sans. QA flagged this to make sure the editor doesn't try to "fix" the in-app font when it shows up in screen recordings.
- **Brand color drift.** The orchestrator initially used `#c8a062` for Pillar gold (close but not exact). The app's actual `--gold` is `#b8974a`. Small thing, but the kind of thing brand-conscious viewers notice.
- **Discovery hygiene.** Title length is a sneaky one — 70 chars is fine on mobile but desktop YouTube clips to 60-ish in many surface placements.

## What worked
- Reading the tutorial step array (`TS = [...]`) inside the app gave QA a self-documenting feature map. The app explains itself well.
- The cold-open hook with concrete numbers (`twelve violations, four severe`) tested clean against broker-voice.
- The cracked-pillar thumbnail metaphor was strong enough that QA didn't ask for alternatives.

## Self-heal events
- One: Used wrong gold hex in initial thumbnail. Fixed by overwriting deliverables/03-thumbnail.svg with corrected values before commit.
- No workflow file edits needed — recipes held up.
