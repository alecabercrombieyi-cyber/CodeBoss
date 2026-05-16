# Workflow 04 — Final Decision (Stage 3)

## Goal
Synthesize Stage 1 outputs, apply Stage 2 QA fixes, and ship the eight final files to `deliverables/`.

## Files to produce
1. `deliverables/00-app-overview.md` — one-page "what is Load Manager" doc; the description a viewer reads if they click through to a linked doc.
2. `deliverables/01-tutorial-script.md` — full narrated script with timestamps + on-screen actions in a two-column rhythm.
3. `deliverables/02-storyboard.md` — scene-by-scene shot list keyed to the script's timestamps. Each scene: shot type, on-screen element, callout/title-card, B-roll cue.
4. `deliverables/03-thumbnail.svg` — final brand-locked thumbnail.
5. `deliverables/04-marketing.md` — title (one winner + 4 alternates), description with chapters block, tags, hook, trend angle, target viewer.
6. `deliverables/05-qa-report.md` — the QA report plus a "fixes applied" appendix.
7. `deliverables/06-go-live.md` — the publish checklist with GO verdict.
8. `deliverables/wat-charter.md` — pipeline transparency log (what each stage did, where the human can audit).

## Rule
If the QA report says REWORK, fix in `wat/tmp/` first, then re-emit. Don't push half-fixed copy to `deliverables/`.
