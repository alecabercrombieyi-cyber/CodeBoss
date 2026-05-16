# Workflow 01 — Research

## Goal
Build a complete feature inventory and user-flow map for Freight Matcher so that downstream agents can write a confident, broker-to-broker tutorial.

## Inputs
- `Logistics-Suite/site/freight-matcher.html` — the source app
- `Logistics-Suite/site/app.html` — hub copy + before/after framing for FM
- This tutorial's `CLAUDE.md`

## What "done" looks like
- Every tab (Trucks, Loads, Map, Matches) documented with: purpose, key UI, what the user pastes/clicks, edge cases
- Every smart feature called out: TRM instant parser, AI fallback, region lanes, equipment compatibility logic, Nominatim background geocoding, deduping merge, canvas-image email, bulk-by-carrier email
- The "60x faster, ~59 min saved" framing from app.html captured verbatim
- A 18–24 minute narrated script with timestamps and on-screen actions
- Chapter markers (YouTube) at natural transitions

## Constraints
- Voice: broker-to-broker, warm, never "enterprise"
- Tagline allowed: "The sweet side of freight" — but the app's own dark-mode flame brand is its own voice; lean into it ("light it up", "fires on the map")
- Do not invent features. If something isn't in the source HTML, don't claim it.

## Self-heal
If the script falls outside the 18–24 minute window, prune chapters or stretch demo time — don't pad with filler.
