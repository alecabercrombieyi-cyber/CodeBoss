# Coding agent output — Freight Matcher

## Source
`Logistics-Suite/site/freight-matcher.html` (~2400 lines, single React+Babel HTML file, DeepSeek-powered, Leaflet map, localStorage state).

## What the app actually is
Truck-to-load matching tool. Broker pastes carrier-availability emails on one side, pastes loads from TRM/Revenova/DAT/email on the other side, and the app draws a live map of trucks-to-loads with a radius slider, lane-awareness, and one-click email back to the dispatcher (with a load-table screenshot baked in).

It is **dark-themed** (flame red `#ff4d4d → #ff6b35`, match green `#00d4aa`, lane cyan `#00bcd4`) — visually distinct from the rest of the Logistics Suite cream/candy chrome, but the wrapper inside the Suite hub respects the candy palette.

## Feature inventory

### A. AI parsing (DeepSeek)
- **Truck parser** — extracts location, equipment, available date, carrier email, driver, **preferred lanes** (incl. regional terms like "MIDWEST"), notes. Handles section headers ("REEFERS:", "WEDNESDAY 3.25.2026"), date headers, equipment abbreviations (R / V / DV / FB / SD).
- **Load parser** — origin, dest, equipment, weight, rate, pickup/delivery date+time-window.
- **Local TRM parser** — pattern-matches "Select Item N" repeating blocks → parses **instantly with zero API cost**. Falls back to AI only when the local parser can't read the format.
- Chunking — anything >10k chars is split on `Select Item` boundaries or line breaks and parsed batch-by-batch.
- DeepSeek key is **free** (5M tokens, no card) — onboarding screen ("🔥 Light it up") tests the key before saving.

### B. Smart matching engine
- Haversine distance from each truck to each load origin
- Radius slider 10–500 mi (default 100, persisted)
- Equipment compatibility — Reefer can haul dry, Van/Reefer load matches Van OR Reefer truck, Trailer matches any van-type
- **Lane awareness** — if a truck declares preferred destinations:
  - City-to-city: load destination must lie *along* the lane (within 50% of lane length perpendicular, not going backward)
  - **Region matches** (Midwest, Southeast, PNW, Gulf, etc.) — destination's state must be in the region's state list
  - 12+ named regions hard-coded
- Sort: lane matches first by score, then by distance
- Weight cap (load.weight ≤ truck.weight) and min-weight floor

### C. Map (Leaflet)
- Dark CartoDB tiles, US-bounded
- 🚛 truck pins with equipment-color glow (orange = flatbed, blue = van, green = reefer, etc.)
- 📦 load pins with equipment color, dimmed for non-matches when a truck is selected
- 🔥 fire icon at each match hotspot
- Pulse ring on selected truck, dashed red radius circle, dashed cyan lane arrows, solid green match arrows
- Legend in bottom-left, popups on hover (truck location, equipment, lanes, match count)
- "Fire splash" animation when switching to Map tab and matches exist
- Radius slider + equipment filters (4 primary + "More Types" reveal: Flatbed, Step Deck, Straight Truck, Tanker)

### D. Email-back-to-dispatcher
- Builds an HTML email with a **canvas-rendered table** of every matched load (origin/dest/PU/DEL/equipment/distance) embedded as a PNG
- Copies HTML+plain text to clipboard (rich paste) and opens mailto: with the subject pre-filled
- **Same carrier → bulk email** combining every match for every truck that carrier sent in
- Subject lines auto-generated ("Load Opportunity: Dallas to Houston (Reefer)" or "5 Load Opportunities for Your Trucks")

### E. Quality-of-life
- localStorage session persistence (`fm_trucks`, `fm_loads`, `fm_radius`, `fm_sender`, `fm_key`)
- **Background Nominatim geocoder** — anything not in the 250-city local cache is geocoded async, rate-limited 1/sec, with a progress bar
- Dedup on import — same location+carrier merges preferred-lanes & dates; same origin+dest+PU date+time = duplicate load discarded
- Toasts (success/info/error)
- Tutorial overlay (8 steps, animated cursor, highlighting) + Help menu
- Settings: sender name, default radius, API key reset, **Export/Import session JSON**, reset stats
- Workflow Benefits tab: live ROI math (manual 8 min/match × matches × $35/hr — vs 0.5 min/match)
- CSV export of all matches
- "New session" wipe with confirm

### F. State machine
- 4 tabs: 🚛 Trucks → 📦 Loads → 🗺️ Map → 🔥 Matches
- Each tab has a count badge (live)
- Header shows totals (TRUCKS/LOADS/MATCHES) in flame palette

## User flows

### Flow 1 — "Inbox sweep" (the headline use case)
1. Dispatcher emails come in overnight — 47 of them
2. Broker opens FM, hits Trucks tab, Cmd-A / Cmd-C from Outlook search results
3. Paste → "🔥 Parse" → ~3 seconds → preview shows 47 trucks with equipment + lanes inferred
4. Add All → Trucks tab shows fleet, geocoder spins up in the background
5. Switch to Loads tab → paste TRM export → instant local parse (zero API) → Add All
6. Switch to Map → fire splash → see all matches lit up
7. Drag radius slider to refine
8. Click any 🔥 truck → green lines to matched loads, popup with details
9. Matches tab → "📧 Send All Matches" → bulk email with attached table image
10. Done in ~60 seconds

### Flow 2 — Lane-aware match (lighter, but show it)
1. Truck is Dallas, TX → preferred lane "Midwest"
2. Loads include Dallas → Chicago, Dallas → LA, Dallas → Atlanta
3. App matches Dallas→Chicago (IL in Midwest region), skips the other two
4. Demo on map: dashed cyan arrow to Chicago, fire pin lights up

### Flow 3 — Backhaul fishing
1. Truck idle in Memphis, no declared lane
2. Radius 250 → 12 matches in any direction
3. Sort by distance, send 3-load shortlist to carrier

### Flow 4 — Same-carrier bulk
1. Carrier "Felix@hegelmann.us" sent 4 trucks
2. App auto-groups → one email to Felix with all 4 trucks + each truck's match list, single PNG table

## Script — 18 min 40 sec (target window 18–24)

### Chapter 0 · Cold open · 0:00 – 0:30
- On screen: broker laptop, Outlook with 47 carrier emails, sticky note "Inbox sweep"
- VO: "47 carrier emails. Three open loads I can't seem to cover. I've done this every morning for years — it's the hour that owns my mornings. Here's the tool that gave me my mornings back."
- Cut to FM hub tile on app.html → click → app loads

### Chapter 1 · What Freight Matcher actually does · 0:30 – 2:00
- Talk to camera (or VO over UI):
  - "Two boxes. Paste your trucks on the left, paste your loads on the right. The map shows where they meet. The fire is the match."
- Walk over the four tabs, no demo yet
- Mention DeepSeek key is free, 5M tokens, no card

### Chapter 2 · First-time setup, 60 seconds · 2:00 – 3:30
- Open FM cold → KeyScreen
- platform.deepseek.com → screen-cap signup → copy key
- Paste, click 🔥 Light it up → confirm
- Mention key stored in localStorage, never leaves browser

### Chapter 3 · Pasting trucks (the AI parser) · 3:30 – 6:30
- Outlook → 47 selected emails → Cmd-A → Cmd-C
- FM Trucks tab → paste → 47 lines visible → "🔥 Parse" → spinner → preview
- Call out:
  - Carrier email auto-grouped
  - Equipment inferred from "REEFERS:" header AND from `(R)` shorthand
  - "Dallas to MIDWEST" parsed as preferred lane, not a destination city
  - Date headers ("WEDNESDAY 3.25.2026") applied to the whole block
- Add All → toast says "Added 47 trucks (3 duplicates merged)"
- Show one card → carrier · location · equipment chip · lane chip

### Chapter 4 · Pasting loads (TRM = instant) · 6:30 – 9:00
- Open TRM in another tab → export view → copy
- FM Loads → paste → click Parse → instant green "⚡ 23 loads parsed instantly — no API cost"
- Explain: pattern is `origin / dest / pu-date / pu-time / del-date / del-time / equipment / Select Item N` — local parser recognizes it, skips AI entirely
- Show one card → load row → origin → dest → equipment chip → rate badge
- Mention paste-from-DAT and paste-from-Revenova both work (AI fallback)

### Chapter 5 · The map · 9:00 – 12:00
- Click Map tab → fire splash animation
- Trucks (🚛) glowing in equipment color, loads (📦) along their routes
- Hover one truck → popup → match count
- Click → pulse ring + dashed red radius circle + green dashed lines to matched loads
- Drag radius slider 100 → 250 → watch new fires light up
- Drag back to 50 → fires extinguish
- Toggle equipment filters → reefers-only view
- Show legend bottom-left

### Chapter 6 · Lane awareness · 12:00 – 13:30
- Select a truck with preferred lane "Midwest"
- Cyan dashed arrows shoot to Chicago, Detroit, Indianapolis (lane proxy)
- Loads ending in IL/IN/OH/MI light up, loads to TX/CA don't
- Explain region keys (Midwest, Southeast, PNW, Gulf, Pac NW, New England, Mid-Atlantic, Mountain, Plains, Great Lakes)
- Try a city-to-city lane: "Dallas to Houston" — show that Dallas→San Antonio matches (along the lane), Dallas→Memphis doesn't

### Chapter 7 · Matches tab + send back · 13:30 – 16:00
- Switch to Matches tab → grouped by truck
- One match group → click 📧 → toast: "Email copied with load image"
- Switch to Gmail/Outlook → paste body → table PNG renders inline → send
- Then: hit "📧 Send All Matches (32)" → bulk-by-carrier → one email to Felix covering 4 trucks and 11 loads
- Export CSV demo, 2 seconds

### Chapter 8 · Quality-of-life · 16:00 – 17:30
- Settings ⚙ → sender name, default radius, export/import session JSON
- Workflow Benefits tab → live ROI: 32 matches × 7.5 min saved × $35/hr = $140 reclaimed this morning
- "New session" button → confirm → cleared

### Chapter 9 · Where it fits · 17:30 – 18:20
- Back to Logistics Suite hub → FM is one of 7 apps
- Mass Post, Bolt Post, Load Manager → "this is the fourth"
- Free, local, no signup beyond the DeepSeek key (which is also free)

### Chapter 10 · Outro · 18:20 – 18:40
- "Link in the description. The whole suite is one HTML page each. Steal the source if you want. Built by brokers, for brokers."
- End card → next video preview (CarrierVet teaser)

**Total: 18:40 (inside window)**

## YouTube chapters
```
0:00 The hour that owns my mornings
0:30 What Freight Matcher actually does
2:00 60-second setup (free DeepSeek key)
3:30 Paste 47 emails — AI does the rest
6:30 Loads: TRM is free, everything else is AI
9:00 The map (and the fire)
12:00 Lane awareness & regional matching
13:30 One-click email back with a table image
16:00 ROI math, settings, session export
17:30 Where it fits in the Logistics Suite
18:20 Outro
```

## Demo-day prep checklist
- Pre-load 47 sanitized carrier emails in a `.txt` (in case Outlook is moody on camera)
- Pre-load a TRM export `.txt` with ~30 loads spanning 6 regions
- Have a Dallas → Midwest lane example AND a Memphis no-lane example ready
- Pre-create the DeepSeek account so signup screen is a 10-second cut
- Open OBS browser scene with `freight-matcher.html` already at the KeyScreen
- Background music: low instrumental, fade under VO; lift on map-tab transition
