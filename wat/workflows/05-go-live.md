# Workflow 05 — Go-Live decision

## Goal
Synthesize Stage 1 + Stage 2 into the eight final deliverables, apply every QA fix, stamp GO or NO-GO, commit.

## Outputs (all in `deliverables/`)
1. `00-app-overview.md` — plain-English what is Freight Matcher
2. `01-tutorial-script.md` — final timestamped script with on-screen actions, chapter markers
3. `02-storyboard.md` — scene-by-scene shot list (screen, B-roll, lower thirds, music cue)
4. `03-thumbnail.svg` — final thumbnail
5. `04-marketing.md` — title + description + tags + hook + trend angle
6. `05-qa-report.md` — adversarial review + what was fixed vs what's accepted as-is
7. `06-go-live.md` — verdict, publish checklist, recording-day prep
8. `wat-charter.md` — what the pipeline did, what self-healed, what failed

## Rules
- Apply every QA fix unless it's flagged "won't fix" with a one-line reason
- Verdict is GO only if all 7 prior deliverables exist and pass a smell-check
- Commit message: `tutorial(04-freight-matcher): GO — long-form package ready`
- No push

## Self-heal
If a QA fix conflicts with another, side with the broker-voice rule and explain the call in `wat-charter.md`.
