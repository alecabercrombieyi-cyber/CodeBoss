# Coding Agent Output — Load Manager

## Feature inventory (grepped from `load-manager.html`)

### Loader screen (the cold-open surface)
- "Get Today's Loads" button — triggers Salesforce report pull via hidden iframe + session cookie (same trick Mass Post uses)
- Manual upload fallback — file picker that accepts the XLSX export
- Name autocomplete — typeahead off the report's broker column; gates the Continue button
- Settings cog — Salesforce report URL, backup contact (name + email for when you're out), DeepSeek API key for Kimbo, OpenWeatherMap key for delivery weather badges
- "Clear All Saved Data" — nukes localStorage cache

### Dashboard header (sticky top bar)
- Sidebar toggle (☰) — slide-in nav: Active / Today / In Transit / Delivering Today / All Loads / Fleet Map / Workflow Benefits
- Search bar — load #, carrier, city
- 🔔 Notifications bell — surfaces new bookings, status changes, missing driver alerts, weather warnings
- ⋮ Options menu — Refresh from Salesforce, Upload report file, Workflow Benefits, Spotlight tour, Settings
- Refresh + Upload quick actions on the right

### Mode toggle (bottom-left, fixed)
- 📦 Shipping (default)
- 🚚 Deliveries

### Shipping mode
- Stat tabs (grid): Active, Today, In Transit, Delivering Today, All, Needs Driver, Has Driver, Today Unassigned, On Site, Late, Detention, Confirmed
- Two-column load card list (collapses to one column on mobile)
- Each load card shows: load #, carrier, driver (or red "Needs Driver" badge), lane, ship/del dates, equipment, badges (active/late/detention/confirmed), weather badges for origin + dest
- Card actions: Driver Details email, In Depth email, G2G email, Check on driver (when detention), 🌙 CS On Call toggle, 🛣️ Track & Trace toggle
- 🔀 Shuffle and ✨ Smart Shuffle (DeepSeek-powered prioritization of which loads need emails right now)

### Deliveries mode
- Filter chips: In Transit (default) / On Site / Delivered Today / Delayed / Detention / Calendar
- Calendar view — month grid with colored dots per day (booked / shipped / delivered / late)
- Delivery cards with the same weather + Track & Trace toggles
- Late/detention cards expose "Delivered?" and "Check on driver" emails

### Email template system
- Four template tabs in the editor: My Style (samples paste), G2G, Driver, In Depth
- AI prompt box: "Make it more casual, add urgency, ask about ETA…" — DeepSeek generates a draft
- Tokens: `{load}` `{carrier}` `{origin_city}` `{dest_city}` `{lane}` `{ship_date}` `{del_date}` `{customer}` `{greeting}` `{name}`
- Batch sender — walks through every load that needs an email; opens each in mailto and advances

### Kimbo (the AI chatbot)
- 🐻 button bottom-left; opens a 360px chat box
- DeepSeek model, fed the current load context
- Tagline: "Your chill load advisor"

### Fleet Map (Leaflet + MarkerCluster)
- Full-screen Leaflet map of every active load (origin + destination + driver position when available)
- Click a marker to fly into a card view, then "Open Load" to jump back to that load in the list

### Workflow Benefits modal
- A visualization comparing the legacy broker workflow vs. the Load Manager workflow — step icons, time savings stats, "Export PDF" button. This is the "ROI slide" embedded in the app itself.

### Exempt Carriers
- Carriers that manage their own drivers internally (no need to ask for driver details). Default seed list + add-your-own. Exempt loads hide the Driver Details button and tag the driver field purple.

### Spotlight tour
- First-run guided tour with narration (TTS), pause/replay/mute controls, arrow-key nav. Re-launchable from the Options menu.

### Notifications surface
- New bookings, status flips, new internal notes, severe weather, missing-driver red flags. Bell shows a dot when unread.

## Data flow

```
Salesforce/Revenova report (AA_Modified1) 
  → hidden iframe download (or manual XLSX upload)
  → SheetJS parse → normalized loads[] array
  → in-memory state + localStorage cache (bb_exempt_carriers, lm_loads, etc.)
  → render loops (renderLoads / renderDeliveries / renderFleetMap)
  → OpenWeatherMap pings per unique city → wx-badge per card
  → DeepSeek API → Kimbo replies, Smart Shuffle ordering, AI template drafting
```

## 23-minute walkthrough script (~3,450 spoken words, 150 wpm)

> Two-column rhythm: left = on-screen action, right = narration. Reformatted as one stream here; storyboard column expands in Stage 3.

### Cold open (0:00–0:30)
[Tight zoom on the Needs Driver stat tab — a 4 ticks up, then a 5, then a 6. Cut to the broker's hand opening the laptop.]
> "It's 7:42 AM. You've got six loads picking up today and four of them still don't have a driver assigned. The carrier you booked Friday hasn't pushed the truck info. You're about to spend ninety minutes copy-pasting load numbers into emails. Or — you could open this."

[Reveal: Load Manager dashboard, Today tab lit up, six cards rendered.]

### Chapter card: "What is Load Manager" (0:30–1:15)
> "I'm a freight broker. I built Load Manager for my own desk at Bay & Bay because the TMS we run on — Salesforce-Revenova — is great at storing loads but terrible at telling me which six I need to chase *right now*. Load Manager is one HTML file. No login, no SaaS bill, no IT ticket. It reads your morning report straight out of Salesforce and turns it into a triage screen. It's app number three in a stack of seven I'm shipping under the Logistics Suite brand. Today's tour: end-to-end."

### Chapter card: "Pulling today's loads" (1:15–3:00)
[Show the loader screen. Click Get Today's Loads. Show the iframe spinner.]
> "First time you run it, you'll paste your Salesforce report URL into Settings. Mine's the AA_Modified1 report. After that, the app remembers — every morning it's one click. Behind the scenes, it's borrowing your active Salesforce session through an iframe, downloading the XLSX, and parsing it with SheetJS. Nothing leaves your machine."
[Loader finishes. Name typeahead pulls names from the broker column.]
> "Type your name. It matches against the report so the templates know who's signing the emails. Hit Continue."

### Chapter card: "The Shipping board" (3:00–6:30)
[Dashboard reveals. Pan across the stat tabs.]
> "This is your morning. Top of the screen, twelve stat tabs. The four that actually matter at 8 AM: Today, Needs Driver, Today Unassigned, and Late. Click Needs Driver."
[Click Needs Driver. List filters to four loads, each with the red left-border bar.]
> "Four loads, all picking up today, none have a truck. Watch what happens when I open one."
[Click a card. It expands. Show the buttons: Driver Details / In Depth / G2G / Track & Trace.]
> "Three buttons here are doing three different jobs. Driver Details asks the carrier for the driver name, cell, last four of the VIN — the stuff Bay & Bay's safety policy requires before we let the truck roll. In Depth is the full vetting — driver, truck, trailer, ETA, escalation contact — for high-value or high-risk lanes. G2G is the green-light email: 'we're good to go, here's the rate con, see you Monday.'"

### Chapter card: "Smart Shuffle + batch sending" (6:30–9:00)
[Hit ✨ Smart Shuffle.]
> "Smart Shuffle is the only place I let an LLM near my dispatch. DeepSeek reads the current loads and re-orders the list so the ones most likely to fall through the floor are at the top. Behind on a driver detail? Picking up in three hours and no carrier confirmed? Those rise. Confirmed and booked? Those sink."
[Loads reshuffle. Open the batch sender.]
> "Now I batch. Click G2G, it opens a draft pre-filled with the load number, carrier, lane, ship date, my signature. I review, hit Open in Email, the next load slides in. Five loads in maybe two minutes."

### Chapter card: "Templates + AI editor" (9:00–11:30)
[Open the template editor.]
> "Four tabs. My Style — paste your real sent emails here, the AI learns your voice. G2G, Driver, and In Depth are the default templates with token chips at the bottom — load number, carrier, lane, dates, customer name, all auto-fill."
[Click into the AI prompt box.]
> "Type 'make it more urgent, ask about ETA' — Generate — DeepSeek rewrites the template in your voice. Save. Done."

### Chapter card: "Exempt Carriers" (11:30–13:00)
[Open Settings → Manage Exempt Carriers.]
> "Some carriers manage their own drivers — they're not going to give you a driver name, and you don't need it. Mark them exempt. Their loads now show 'Driver name exempt' in purple and the Driver Details button disappears. One less reflex to suppress."

### Chapter card: "Switch to Deliveries" (13:00–16:00)
[Click 🚚 Deliveries.]
> "Same data, different shape. In Transit by default. Filter chips: On Site, Delivered Today, Delayed, Detention, and Calendar."
[Click On Site. Show a gold-bordered card.]
> "On Site means the truck has scanned in at the receiver. The clock starts. If it hits two hours, the card moves to Detention and goes red. There's a 'Check on driver' email pre-loaded with the load number and the receiver address."
[Click Calendar. Show the month grid with colored dots.]
> "Calendar view is the broker's planning eye — booked loads as cyan dots, shipped as gold, delivered as green, late as red. Click any day, drill in."

### Chapter card: "Fleet Map" (16:00–18:00)
[Sidebar → Fleet Map. Leaflet renders.]
> "This is everyone, on a map, right now. Clustered markers when zoomed out — pop into a region, see the trucks. Click any marker, you get a load card on the left with an Open Load button. I use this when a customer calls and asks where their freight is."

### Chapter card: "Weather + notifications" (18:00–19:30)
[Show a load card with weather badges.]
> "OpenWeather hits every unique city on the board. Origin and destination temps live on the card. Severe weather — high winds, ice, blizzards — pops a colored badge. The bell up top buzzes for missing drivers, status flips, and weather warnings."

### Chapter card: "Kimbo, the chill load advisor" (19:30–21:00)
[Click 🐻. Kimbo opens.]
> "Kimbo is the DeepSeek chatbot. I trained it to be a chill freight ops sidekick. Ask it: 'Which loads picking up tomorrow are still missing a driver?' It reads the current state and answers. Don't ask it to book a load — it can't reach into Salesforce. Ask it to *think* with you."

### Chapter card: "Workflow Benefits + going further" (21:00–22:30)
[Open Workflow Benefits modal.]
> "This is the part where I justify it to my boss. Side-by-side: the legacy workflow — open Salesforce, find the load, open Outlook, paste, send, repeat — versus Load Manager. Time savings ticker on the right. There's an Export PDF button if you need to slide this past a director."

### Outro (22:30–23:00)
[Suite landing page in the background. Pink Logistics Suite logo.]
> "Load Manager is free. It's one HTML file. Logistics Suite is the umbrella — seven apps, sweet side of freight. Link in the description. Built by brokers, for brokers. See you in the next one."

## Chapter list (paste-ready into YouTube)
```
0:00 The 7:42 AM problem
0:30 What is Load Manager
1:15 Pulling today's report from Salesforce
3:00 The Shipping board: 12 stat tabs explained
6:30 Smart Shuffle + batch G2G emails
9:00 Templates + AI editor
11:30 Exempt carriers
13:00 Deliveries mode + Calendar
16:00 Fleet Map (live Leaflet view)
18:00 Weather badges + notifications
19:30 Kimbo, the chill load advisor
21:00 Workflow Benefits (the ROI slide)
22:30 Outro + Logistics Suite link
```

## Estimated length
23:00. Comfortable inside the 20-26 window.
