# Load Manager — Storyboard

> Scene-by-scene shot list keyed to the script timestamps. Each scene: SHOT TYPE · ON-SCREEN ELEMENT · CALLOUT / TITLE CARD · B-ROLL CUE.

---

### SCENE 01 — Cold Open (0:00–0:30)
- **SHOT** Macro pan on Needs Driver stat tab; ticker climbs 4 → 6
- **ELEMENT** `.tab[data-tab="nd"] .v` — the big number
- **CALLOUT** Pink underline on the number
- **B-ROLL** Hands opening laptop · mailto window with load number typed in · cut to dashboard reveal
- **LOWER-THIRD** `7:42 AM. [N] loads. No drivers.` (JetBrains Mono, 32px)

### SCENE 02 — Wordmark title card (0:30–0:33)
- **SHOT** Full frame: "Load Manager" hero card (matches thumbnail)
- **ELEMENT** None (title card)
- **CALLOUT** None
- **B-ROLL** None — title card holds 2.5s

### SCENE 03 — What is Load Manager (0:33–1:15)
- **SHOT** Wide pan across dashboard
- **ELEMENT** Full dashboard, stat tabs visible
- **CALLOUT** Soft cream pill: "1 HTML file · no login · no SaaS"
- **B-ROLL** Cut to `app.html` hub showing the 7 tiles · highlight tile #3 (Load Manager)

### SCENE 04 — Settings & report URL (1:15–1:50)
- **SHOT** Click Settings cog → modal opens · paste URL · save
- **ELEMENT** `#sm-sf-url`, the Save URL button
- **CALLOUT** "Salesforce report URL → saved once → forever"
- **B-ROLL** None

### SCENE 05 — Get Today's Loads (1:50–2:45)
- **SHOT** Click main button. Truck-progress overlay opens. Truck moves left-to-right.
- **ELEMENT** `.prog-truck`, `.prog-fill`, the step list
- **CALLOUT** "Hidden iframe pulls your XLSX. Nothing leaves your machine."
- **B-ROLL** Macro on the progress steps lighting up

### SCENE 06 — Name autocomplete (2:45–3:00)
- **SHOT** Type "Alec" — typeahead appears — click suggestion
- **ELEMENT** `#name-input`, `.sugs`, `.si`
- **CALLOUT** None
- **B-ROLL** Click Continue → dashboard fade in

### SCENE 07 — Stat tab tour (3:00–4:00)
- **SHOT** Slow hover across all 12 stat tabs left-to-right
- **ELEMENT** `.tabs > .tab` (all 12)
- **CALLOUT** Each tab's label pulse in pink as it's named
- **B-ROLL** Hold 1s on each, faster on the less-critical ones (Confirmed, All)

### SCENE 08 — Needs Driver filter (4:00–4:30)
- **SHOT** Click Needs Driver → list filters → red bars left of cards
- **ELEMENT** `.tab.on`, `.lc.nd` cards
- **CALLOUT** Arrow → "red bar = needs driver"
- **B-ROLL** Slow-mo on the cards re-rendering

### SCENE 09 — Open a load card (4:30–5:15)
- **SHOT** Click card → expands → buttons row appears
- **ELEMENT** `.lc.open .lc-detail`, `.lc-acts`
- **CALLOUT** Three pink arrows labeling Driver Details / In Depth / G2G
- **B-ROLL** Macro on each button as it's named

### SCENE 10 — Card toggles (5:15–6:30)
- **SHOT** Click 🌙 toggle → glows purple. Click 🛣️ → glows blue.
- **ELEMENT** `.moon.on`, `.tt-btn.on`
- **CALLOUT** "CS On Call" / "Track & Trace"
- **B-ROLL** None

### SCENE 11 — Smart Shuffle (6:30–7:30)
- **SHOT** Click ✨ Smart Shuffle → spinner → list re-orders in slow-mo
- **ELEMENT** `#smart-shuffle-btn`, full `.ll` list
- **CALLOUT** "DeepSeek · re-prioritized in 4s"
- **B-ROLL** Re-order at 0.5x speed; speed back to normal once settled

### SCENE 12 — Batch G2G (7:30–9:00)
- **SHOT** Click G2G on top card → mailto draft → Open in Email → next batch slides in
- **ELEMENT** `.btn.btn-gr`, the batch modal `#batch-modal`, `.m-meta`, `.m-body`
- **CALLOUT** "5 loads · 2 min" timer counter in corner
- **B-ROLL** Counter ticks loads remaining: 5 → 4 → 3 → 2 → 1 → done

### SCENE 13 — Template editor open (9:00–9:30)
- **SHOT** Open template editor from kebab → show 4 tabs
- **ELEMENT** `#te-tab-samples`, `#te-tab-g2g`, `#te-tab-driver`, `#te-tab-indepth`
- **CALLOUT** "My Style · G2G · Driver · In Depth"
- **B-ROLL** Click through each tab

### SCENE 14 — Token chips (9:30–10:15)
- **SHOT** Scroll to chip row → click each chip → tokens append to body
- **ELEMENT** `.cb` buttons
- **CALLOUT** Mono pill: `{load}` → "fills with load #"
- **B-ROLL** Hold on the template body as tokens appear

### SCENE 15 — AI rewrite (10:15–11:30)
- **SHOT** Type "make it more urgent, ask about ETA" → Generate → DeepSeek rewrites
- **ELEMENT** `#te-ai-prompt`, `#te-ai-btn`
- **CALLOUT** "Trained on YOUR sent emails"
- **B-ROLL** Save → close → return to dashboard

### SCENE 16 — Exempt Carriers modal (11:30–12:30)
- **SHOT** Settings → Manage Exempt Carriers → modal opens
- **ELEMENT** `#exempt-modal`, `#exempt-current-list`, `#exempt-carrier-grid`
- **CALLOUT** "Werner · Knight · Schneider Ded. seeded by default"
- **B-ROLL** Click to add one from the grid

### SCENE 17 — Exempt load on the board (12:30–13:00)
- **SHOT** Return to dashboard → find an exempt card → "Driver name exempt" in purple
- **ELEMENT** `.lc-info .val` with purple color
- **CALLOUT** "Driver Details button → gone"
- **B-ROLL** Compare side-by-side: exempt card vs. needs-driver card

### SCENE 18 — Mode toggle to Deliveries (13:00–13:15)
- **SHOT** Click 🚚 Deliveries → board reshapes in slow-mo
- **ELEMENT** `#mode-del`, the `.mode-tog`
- **CALLOUT** None (let the slide breathe)
- **B-ROLL** None

### SCENE 19 — Delivery filter chips (13:15–14:15)
- **SHOT** Hover each chip; click On Site
- **ELEMENT** `#df-onsite`, `.dc.onsite`
- **CALLOUT** Gold border highlight
- **B-ROLL** Show the on-site time counter on a card

### SCENE 20 — Detention card (14:15–14:45)
- **SHOT** Cut to a Detention card → red border → "Check on driver" button
- **ELEMENT** `.dc.detention`, `.detention-badge`
- **CALLOUT** "On site 2h → auto-flagged"
- **B-ROLL** Click Check on driver → mailto preview

### SCENE 21 — Delayed (14:45–15:15)
- **SHOT** Click Delayed → pulsing badge cards
- **ELEMENT** `.dc.late`, late-badge animation
- **CALLOUT** None
- **B-ROLL** None

### SCENE 22 — Calendar (15:15–16:00)
- **SHOT** Click Calendar → month grid → dots
- **ELEMENT** `.cal-d`, `.cal-dot`
- **CALLOUT** Color legend pill: cyan/gold/green/red
- **B-ROLL** Click a busy day → loads render

### SCENE 23 — Fleet Map open (16:00–16:30)
- **SHOT** Sidebar → Fleet Map → Leaflet zoom-in from continental US
- **ELEMENT** `.leaflet-container`, `.marker-cluster`
- **CALLOUT** "Live Leaflet · MarkerCluster"
- **B-ROLL** Cluster expand animation in slow-mo

### SCENE 24 — Marker click → load card (16:30–17:30)
- **SHOT** Click a marker → load card slides in left → click Open Load
- **ELEMENT** Fleet card overlay, "Open Load" button
- **CALLOUT** "Customer asks where their freight is → answer in 4s"
- **B-ROLL** Cut back to the load on the list

### SCENE 25 — Fleet Map exit (17:30–18:00)
- **SHOT** Click back → return to Shipping board
- **ELEMENT** `.btn-g` back button
- **CALLOUT** None
- **B-ROLL** None

### SCENE 26 — Weather badges (18:00–18:45)
- **SHOT** Macro on a load card's weather row
- **ELEMENT** `.wx-row`, `.wx-badge`
- **CALLOUT** "OpenWeather · per unique city"
- **B-ROLL** Cut to a severe-weather card (orange or red border)

### SCENE 27 — Notification bell (18:45–19:30)
- **SHOT** Click 🔔 → panel opens → list of notifications
- **ELEMENT** `.notif-panel`, `.notif-item`
- **CALLOUT** "Booked · status flip · weather · missing driver"
- **B-ROLL** Scroll through notifications

### SCENE 28 — Kimbo open (19:30–20:00)
- **SHOT** Click 🐻 → kimbo-box slides up from bottom-left
- **ELEMENT** `.kimbo-box.open`
- **CALLOUT** Bear bounce animation
- **B-ROLL** None — cute moment, let it land

### SCENE 29 — Kimbo answer (20:00–21:00)
- **SHOT** Type the question → send → reply appears
- **ELEMENT** `#kimbo-input`, `.kimbo-msg.user`, `.kimbo-msg.ai`
- **CALLOUT** "DeepSeek · fed your live load state"
- **B-ROLL** Show the reply body

### SCENE 30 — Workflow Benefits (21:00–22:00)
- **SHOT** Options → Workflow Benefits → modal opens with side-by-side viz
- **ELEMENT** `#workflow-modal`, `.wf-step`, `.wf-stat`
- **CALLOUT** "12 clicks → 3 clicks"
- **B-ROLL** Macro on the time-savings stat box

### SCENE 31 — Export PDF (22:00–22:30)
- **SHOT** Click Export PDF → file save dialog
- **ELEMENT** Export button
- **CALLOUT** "For when your director asks"
- **B-ROLL** None

### SCENE 32 — Outro (22:30–23:00)
- **SHOT** Cut to Suite landing page hero (pink, cream)
- **ELEMENT** Suite wordmark
- **CALLOUT** "logisticssuitev1.pages.dev"
- **B-ROLL** Pan across the 7-tile app strip · hold on Suite mark · fade

---

## Editing notes
- Cuts every 6-10s in body chapters; tighter (3-4s) in cold open
- Slow-mo on: Smart Shuffle reorder, mode toggle, Fleet Map zoom
- Hold longer on: Kimbo bear opening, the Workflow Benefits side-by-side
- Music: low-bed lo-fi; drop bed in cold open; swell on outro
- Mouse cursor: highlight ring on every click (Camtasia or BetterMouse)
