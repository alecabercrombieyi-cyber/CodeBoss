# Workflow 01 — Research / Coding Agent

## Goal
Produce a complete, factually-grounded feature inventory for **Pillar — Core Carrier Intelligence** so the script writer can talk about it like they built it.

## Inputs
- Source HTML: `C:/Users/aleca/Desktop/Logistics Suite/Logistics-Suite/site/pillar.html`
- Hub context: `C:/Users/aleca/Desktop/Logistics Suite/Logistics-Suite/site/app.html` (Pillar is app #07, last on the strip)

## Constraints
- Pillar has NO prior memory entry. Everything must be derived from the source HTML — no guessing about features.
- Discovery-heavy: dump the tutorial step array (`TS = [...]`), the nav items, the engine logic, and the dashboard sections before writing prose.
- Broker voice: when describing logic, translate "lock date" / "BCR field" into broker-speak ("the day the carrier becomes off-limits", "who booked it").

## Deliverable
`wat/tmp/coding-output.md` containing:
1. One-paragraph elevator pitch (Core Carrier Intelligence in plain English)
2. Feature inventory (sidebar, 5 nav screens, dashboard sections, tutorial overlay)
3. Engine rules: Core, New Core, Violation, Severity, Lock Date
4. Data ingestion flow (Salesforce pull vs file upload, BCR column requirement)
5. 15-22 minute video script with timestamps, on-screen actions, and chapter markers
6. Chapter list (YouTube description format)

## Self-heal
If the script overruns 22 min or undershoots 15, adjust the per-section pacing notes and retry — don't ship a script that violates the band.
