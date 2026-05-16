# 05 — Go-live workflow

## Goal
Take all Stage-1/2 outputs, apply every P0 and P1 QA fix, and produce the final shippable deliverables in `deliverables/`, then commit.

## Inputs
- All `wat/tmp/*` files

## Output (deliverables/)
1. `00-app-overview.md` — what Mass Post is, who it's for, key features (1 page)
2. `01-tutorial-script.md` — polished long-form script, timestamps + on-screen actions column, ready to teleprompt
3. `02-storyboard.md` — scene-by-scene shot list with chapter mapping
4. `03-thumbnail.svg` — final 1280x720 thumbnail
5. `04-marketing.md` — chosen title + alternates + description + tags + hook
6. `05-qa-report.md` — original findings + resolution per item
7. `06-go-live.md` — GO/NO-GO verdict, publish checklist, YouTube upload settings (category, visibility, end screen, comments, license)
8. `wat-charter.md` — which sub-agent produced what, plus any self-healing fixes applied

## Verdict rules
- Stamp GO only if every P0 is resolved and >=80% of P1s are resolved.
- If GO, end the file with a clear "VERDICT: GO" line.
- If NO-GO, list remaining blockers.

## Commit
`git add -A && git commit -m "tutorial(01-mass-post): GO — long-form package ready"` — no push.
