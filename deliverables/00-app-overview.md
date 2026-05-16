# Freight Matcher — App Overview

**App #04 of 7 in the Logistics Suite.** File: `Logistics-Suite/site/freight-matcher.html`.

## In one sentence
Paste a pile of carrier-availability emails on one side, paste your open loads on the other side, and watch a live map light up with every truck-to-load match — sorted by lane, equipment, and radius.

## Who it's for
Freight brokers and dispatchers who do daily inbox sweeps of carrier availability and need to cross-reference them against open loads. The work that used to take 45–60 minutes a morning takes about 60 seconds.

## What it actually does
1. **AI parses messy email text** — Outlook threads, group blasts, mixed formats — into structured trucks with location, equipment, dates, carrier, and *preferred lanes* (including regional like "Midwest").
2. **Local TRM parser** — TMS export pasted with the "Select Item N" pattern is recognized and parsed **with zero API calls** (no cost, instant).
3. **Smart matching engine** — runs every truck against every load using:
   - Haversine distance + radius slider (10–500 mi)
   - Equipment compatibility (Reefer can haul dry, Van/Reefer matches both, Trailer matches any van-type)
   - Lane awareness (city-to-city *along the lane*, or regional state-set match)
   - Weight cap + min-weight floor
4. **Live Leaflet map** — trucks with equipment-color glow, loads dimmed unless matching, 🔥 fire icons at every match hotspot, dashed radius circle, dashed cyan lane arrows, solid green match arrows.
5. **One-click email back to dispatcher** — builds an HTML email with the matched loads rendered as an inline PNG table, copies the rich email to clipboard, and opens `mailto:` with the subject pre-filled. Multiple trucks from the same carrier auto-group into one bulk email.
6. **Quality-of-life** — localStorage session persistence, background Nominatim geocoding, dedup on import, CSV export, Workflow-Benefits tab with live ROI math, session export/import, "New" reset.

## Tech (one paragraph)
Single HTML file. React 18 + Babel runtime (CDN). Leaflet 1.9 for the map (dark CartoDB tiles). DeepSeek `deepseek-chat` for AI parsing (user supplies their own free key, stored only in localStorage). Nominatim for fallback geocoding (rate-limited). No build step, no server, no signup. All data lives in the browser.

## Brand
The app's own UI is dark with a flame-red/orange gradient ("🔥 Light it up"), match-green accents, lane-cyan dashed arrows. Inside the Logistics Suite hub, the FM tile carries the cream/candy chrome — the tutorial bridges both palettes.

## Before vs after (verbatim from `app.html`)
- **Before**: ~60 min inbox sweep · 6+ steps · cognitive overload · missed matches · no spatial view · lost in formatting
- **After**: ~60 sec sweep · 5 steps · 60× faster · zero matches missed · visual instead of memory · AI handles chaos
- **Headline number**: *"A morning that used to be wall-to-wall inbox triage becomes a sub-minute load match."*

## Critical user paths the tutorial demonstrates
1. **The inbox sweep** (headline) — paste 47 carrier emails → 60-second match
2. **Lane awareness** — Dallas truck wanting Midwest → only IL/IN/OH/MI/WI/MO destinations light up
3. **Same-carrier bulk** — one email to Felix covering 4 of his trucks
4. **Backhaul fishing** — idle truck, no lane, radius 250 → 12 matches in any direction

## What it isn't
- Not a TMS replacement. It's a triage layer that sits on top of whatever TMS the broker uses.
- Not a load board. It doesn't fetch loads — the broker pastes them in.
- Not a "carrier vetting" tool — that's app #05 (CarrierVet) coming next.
