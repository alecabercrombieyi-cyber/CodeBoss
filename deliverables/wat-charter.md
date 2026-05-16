# WAT Charter — Bolt Post Tutorial (EP 02)

> **WAT = Workflows / Agents / Tools.** This document is the transparency log for the 5-stage pipeline that produced the long-form video tutorial package for Bolt Post.

---

## Workflows (natural-language goals — `wat/workflows/`)
| File | Purpose |
|---|---|
| `01-research.md` | Source-grounded feature inventory + Mass-vs-Bolt differentiator + script |
| `02-design.md` | Thumbnail, title cards, visual spec — Bolt's native blue × Suite candy brand |
| `03-marketing.md` | Title A/Bs, description, tags, hook, trend angle, target viewer |
| `04-qa.md` | Adversarial review with severity ladder + source citations |
| `05-go-live.md` | Synthesize, apply fixes, ship 8 deliverables, commit |

## Tools
None required for this run. The pipeline is text-only; no deterministic tools were authored under `wat/tools/`. If a future iteration needs (e.g.) a thumbnail-rasterizer or a word-count linter, those would live there.

## Agents (5 specialist sub-agents)

### Stage 1 — Three parallel research sub-agents

**Coding sub-agent**
- **Input:** `bolt-post.html` (2,686 lines), `mass-post.html` (8,363 lines), `app.html`
- **Output:** `wat/tmp/coding-output.md`
- **Method:** Read source in three passes — CSS for visual cues, HTML for control inventory, JS for behavior. Cross-referenced against Mass Post to identify the actual differentiators (not just rewording).
- **Key insights captured:**
  - Bolt Post has *no tabs* (Mass Post has 3); the day-grouped card view replaces them.
  - Multi-stop inline editor (P/D + location + appt window) is unique to Bolt; activates at ≥3 stops with orange `⚠️` badge and pulsing red border.
  - Bookmarklet uses native React/Angular value-setter trick to fire framework-recognized synthetic events.
  - `bp_` storage prefix isolates Bolt's state from Mass Post (`mp_`).
- **Deviations from workflow:** None.

**Design sub-agent**
- **Input:** Bolt Post native palette (#0A0E1A / #4D8DFF / #A78BFA), Suite brand palette (#d4738c / #faf7f2 / #c8a062).
- **Output:** `wat/tmp/thumbnail.svg`, `wat/tmp/title-cards.md`, `wat/tmp/visual-spec.md`
- **Method:** Anchored the package in Bolt's native dark theme; threaded Suite brand cues (pink ribbon stamp, gold underline) at the edges to maintain family resemblance with the Mass Post tutorial.
- **Key decisions:**
  - Thumbnail centers on a single dominant lightning bolt + the wordmark, not on a busy UI screenshot. Reads at 320px.
  - Title cards use DM Sans + JetBrains Mono — the same fonts as both `bolt-post.html` (via Outfit, a DM Sans cousin) and `app.html`.
  - Visual climax (Chapter 7 multi-stop) is intentionally longest hold; kinetic climax (Chapter 4 Copy→Fill) is fastest cut.
- **Deviations:** None.

**Marketing sub-agent**
- **Input:** Coding output's differentiator section + freight-YouTube market knowledge.
- **Output:** `wat/tmp/marketing-output.md`
- **Method:** Five title angles tested; speed/efficiency picked as primary. Description front-loads value, includes full chapter list. 15 tags balance high-volume terms with niche freight-tool terms.
- **Key decision:** Trend angle anchored to "broker-built indie tool" — that's the distinctive lane, not enterprise TMS competition.
- **Deviations:** None.

### Stage 2 — QA sub-agent

- **Input:** All three Stage 1 outputs + the source HTML for verification.
- **Output:** `wat/tmp/qa-report.md` (now also `deliverables/05-qa-report.md`)
- **Method:** Each "the app does X" claim was checked against a specific line in `bolt-post.html`.
- **Findings:**
  - **MAJOR:** 2 (reply sign-off personalization claim was wrong; Customer→Commodity auto-learning was aspirational, not implemented).
  - **MINOR:** 2 (variation labels were wrong; multi-stop badge text was wrong).
  - **NITS:** 9 (all confirmed accurate against source).
- **Verdict:** GO with inline script fixes.

### Stage 3 — Final-decision sub-agent (this run)

- **Input:** All Stage 1 outputs + Stage 2 QA report.
- **Output:** 8 deliverables in `deliverables/`.
- **Method:** Carried forward the bulk of Stage 1 work; applied the four QA fixes inline to `01-tutorial-script.md`; cleaned up marketing language to match the corrected variation labels; copied SVG and QA report verbatim.
- **Fixes applied:**
  - Reply sign-off claim corrected (M1).
  - Customer→Commodity claim softened (M2).
  - Reply variation labels corrected to Standard / Casual / Quick & Direct (m1).
  - Multi-stop badge described as `⚠️` + stops count, not "3 STOPS" (m4).
- **Deviations from workflow:** None. Each deliverable maps 1:1 to a `wat/workflows/` outcome.

### Stage 4 — Commit
Local commit on branch `tutorial/02-bolt-post`. No push.

## Self-healing log
No failures occurred. No workflow files were edited mid-run.

## Pipeline transparency
- All intermediate outputs preserved under `wat/tmp/` for audit.
- All workflow goals preserved under `wat/workflows/`.
- Deliverables are the only files the publisher needs; everything else is the trail.

## Voice and brand discipline
- Voice held: warm, broker-to-broker, first-/second-person, no SaaS jargon.
- Brand discipline: Bolt's native blue dominates inside-the-app shots; Suite candy brand stamps the package perimeter. Family resemblance with the Mass Post tutorial preserved.
