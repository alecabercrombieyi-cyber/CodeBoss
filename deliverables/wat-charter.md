# WAT Charter — CarrierVet pipeline transparency log

## Pipeline overview

The CarrierVet tutorial was produced by a 5-stage WAT (Workflows / Agents / Tools) pipeline orchestrated as a single Claude run on branch `tutorial/05-carriervet`.

| Stage | Role | Output |
|---|---|---|
| 0 | Workflow scaffolding | `wat/workflows/01-research.md` … `05-go-live.md` |
| 1 | Coding agent (parallel) | `wat/tmp/coding-output.md` |
| 1 | Design agent (parallel) | `wat/tmp/thumbnail.svg`, `wat/tmp/title-cards.md`, `wat/tmp/visual-spec.md` |
| 1 | Marketing agent (parallel) | `wat/tmp/marketing-output.md` |
| 2 | QA agent (adversarial) | `wat/tmp/qa-report.md` |
| 3 | Final-decision agent | `deliverables/00-*` … `deliverables/wat-charter.md` |
| 4 | Commit | `git commit` on `tutorial/05-carriervet` |

## Sub-agent attribution

- **Coding agent** produced the feature inventory, 22-minute draft script, and chapter list — all grounded in `Logistics-Suite/site/carrier-analyzer.html`. Source verification was done by grepping the HTML for `TIERS`, `getExcludedFactoring`, `evaluateCarrier`, the external link URL patterns, and the localStorage key prefix.
- **Design agent** produced the 1280×720 SVG thumbnail with a candy-pink shield + green checkmark + red BLOCKED stamp; the title-card system with 9 chapter cards and color-coded underlines (pink default, red for the factoring chapter, gold for the gotchas chapter, mono variant for the developer-note chapter); and the visual spec covering palette, typography, motion, B-roll, and end-card behavior.
- **Marketing agent** produced 5 title A/B options anchored on the "stop getting double-brokered" angle, a 3-paragraph description leaning on the "free, no signup" framing for paragraph 1, 15 ranked tags (broad → niche), a 14-second word-for-word hook with a specific dollar-figure anchor ($3K–$25K per double-broker loss), and a trend analysis tying CarrierVet to the 2026 freight-fraud / free-broker-tool / built-by-an-actual-broker triple play.
- **QA agent** ran an adversarial pass finding **5 P0s** (factual claims about safety scores, fabricated stats, authority requirements, posting rules, mismatched cold-open language), **5 P1s** (cold-open length, buried strong chapter, pacing dead zone, Highway-green dominance, "free" buried in description), and **5 P2s** (thumbnail competition, mono title card, end-card guideline violation, redundant tagline, post-trim timestamp drift).
- **Final-decision agent** applied **all 15 fixes** into the `deliverables/` deliverables — every P0, every P1, every P2. Trimmed the final script length from 22:15 to 20:30 to fix the P1 pacing issues. Recalculated chapter timestamps and embedded them in `04-marketing.md` and `06-go-live.md`. Recorded the resolution per item in `05-qa-report.md`.

## Self-healing fixes applied

None. The pipeline ran clean on the first pass — no workflow or tool file needed to be patched in flight. Stage 0 was scaffolded from `tutorials/01-mass-post/wat/workflows/` and retargeted to CarrierVet's actual feature set before Stage 1 began, which avoided the most common self-heal trigger (workflow mismatched to app).

## Deliverable checklist

- [x] `deliverables/00-app-overview.md`
- [x] `deliverables/01-tutorial-script.md` (20:30 final, 10 chapters)
- [x] `deliverables/02-storyboard.md` (49 shots)
- [x] `deliverables/03-thumbnail.svg` (1280×720, brand-aligned, QA-P2-1 stamp position applied)
- [x] `deliverables/04-marketing.md` (title + 4 alts + description + 15 tags + hook + trend angle)
- [x] `deliverables/05-qa-report.md` (15 findings, 15 resolutions, 100% pass rate)
- [x] `deliverables/06-go-live.md` (publish checklist + YouTube settings, VERDICT: GO)
- [x] `deliverables/wat-charter.md` (this file)

## Branch / commit plan

- Branch: `tutorial/05-carriervet` (already checked out at pipeline start)
- Commit message: `tutorial(05-carriervet): GO — long-form package ready`
- No push (per workflow rules — author publishes manually).
