# WAT charter — Mass Post tutorial pipeline transparency

## Pipeline

| Stage | Role | Outputs | Inputs consumed |
|---|---|---|---|
| 0 | Workflow scribe | `wat/workflows/01-research.md` · `02-design.md` · `03-marketing.md` · `04-qa.md` · `05-go-live.md` | Worktree CLAUDE.md, project CLAUDE.md |
| 1a | Coding sub-agent | `wat/tmp/coding-output.md` | `mass-post.html` (8,363 lines) + project CLAUDE.md + workflow 01 |
| 1b | Design sub-agent | `wat/tmp/thumbnail.svg`, `title-cards.md`, `visual-spec.md` | Worktree CLAUDE.md brand spec + workflow 02 |
| 1c | Marketing sub-agent | `wat/tmp/marketing-output.md` | Coding-output draft chapters + workflow 03 |
| 2 | QA sub-agent | `wat/tmp/qa-report.md` (4 × P0, 6 × P1, 6 × P2) | All Stage-1 outputs + source HTML + workflow 04 |
| 3 | Final-decision sub-agent | All eight `deliverables/*` files | Stage-1 + Stage-2 outputs + workflow 05 |
| 4 | Orchestrator | Single git commit | Final deliverables tree |

## Self-healing events

- None required. All sub-agents produced outputs on first attempt. No workflow edits during the run.

## Editor notes (for the videographer reading this in two weeks)

- **Chapter title-card timestamps don't start at 00:00.** Chapter 01's card lands at 01:25 — the cold open runs 00:00–01:25 with the special "MASS POST · the 24-minute tour" cold-open card at 00:25. Don't number chapters from 00:00.
- **Modal title honesty (P0-1).** Bulk Export modal still reads "DAT + Salesforce" in the app source. The script acknowledges this at 04:25 instead of glossing it. Leave the cursor on the modal title for a full second so the viewer can read it.
- **Benchmark Rate honesty (P1-3).** Script intentionally avoids claiming Benchmark Rate writeback is shipped on the Revenova side — it's "rolling out". Don't add a green "✓ shipped" overlay on that line.
- **Daemon skip-ahead overlay (P1-4).** A bottom-right overlay at 09:30 lets non-installers jump to 10:00. This is intentional UX for the long-form pacing. Keep it.
- **Ctrl+V keyboard chip (P0-4).** Lower-third at 15:50 is mandatory.
- **Time-saved honesty chip (P0-2).** Gold "one broker's morning · YMMV" lower-third at 20:50 is mandatory after the time-lapse.

## Deliverable inventory

| File | Status |
|---|---|
| `deliverables/00-app-overview.md` | ✓ |
| `deliverables/01-tutorial-script.md` | ✓ |
| `deliverables/02-storyboard.md` | ✓ |
| `deliverables/03-thumbnail.svg` | ✓ |
| `deliverables/04-marketing.md` | ✓ |
| `deliverables/05-qa-report.md` | ✓ |
| `deliverables/06-go-live.md` | ✓ (VERDICT: GO) |
| `deliverables/wat-charter.md` | ✓ (this file) |

## Workflow inventory

| File | Status |
|---|---|
| `wat/workflows/01-research.md` | ✓ |
| `wat/workflows/02-design.md` | ✓ |
| `wat/workflows/03-marketing.md` | ✓ |
| `wat/workflows/04-qa.md` | ✓ |
| `wat/workflows/05-go-live.md` | ✓ |

## tmp inventory (intermediate, not shipped)

| File | Status |
|---|---|
| `wat/tmp/coding-output.md` | ✓ |
| `wat/tmp/thumbnail.svg` | ✓ (refined version shipped to `deliverables/03-thumbnail.svg`) |
| `wat/tmp/title-cards.md` | ✓ |
| `wat/tmp/visual-spec.md` | ✓ |
| `wat/tmp/marketing-output.md` | ✓ |
| `wat/tmp/qa-report.md` | ✓ |
