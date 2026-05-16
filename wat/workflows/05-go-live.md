# Workflow 05 — Final-Decision Agent

## Goal
Apply QA fixes, stamp GO, write the publish checklist, commit.

## Inputs
- All `wat/tmp/*` artifacts
- `wat/tmp/qa-report.md`

## Constraints
- Apply every Fail/Fix from QA before writing GO.
- Promote tmp artifacts to `deliverables/` with the numbered names from CLAUDE.md.
- `06-go-live.md` must include: GO verdict, publish-day checklist, upload metadata, post-launch metrics to watch.
- `wat-charter.md` is the transparency log: which sub-agents ran, what they produced, what QA caught, what got fixed.
- Final commit: `tutorial(07-pillar): GO — long-form package ready`. No push.

## Deliverables (all under `deliverables/`)
- 00-app-overview.md
- 01-tutorial-script.md
- 02-storyboard.md
- 03-thumbnail.svg
- 04-marketing.md
- 05-qa-report.md
- 06-go-live.md
- wat-charter.md

## Self-heal
If a tmp artifact is missing, re-run the responsible workflow rather than ship incomplete.
