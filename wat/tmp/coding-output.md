# Coding agent — CarrierVet research output

Source of truth: `C:/Users/aleca/Desktop/Logistics Suite/Logistics-Suite/site/carrier-analyzer.html` (display name "CarrierVet — Targeted Load Compliance"). The app's original codename inside the HTML is **CLIS** (Custom Lane / Integrated Systems), which is why every localStorage key is `clis_*`. Branding to viewers is CarrierVet only.

---

## 1. Feature inventory

### 1.1 Welcome / setup phase (`#welcome`)
- "Pull from Salesforce" green primary button (only visible once a Salesforce report URL is configured)
- "Upload CSV / Excel" secondary button (Salesforce AA_Modified1-style report, or any Revenova export)
- "Configure Salesforce Auto-Export" link → reveals an inline `setupPanel` with a single input (`sfUrlInput`) and Save/Cancel
- The input accepts either a Lightning report URL (`https://x.lightning.force.com/lightning/r/Report/00O.../view`) or a pre-built classic servlet URL. `buildSFExportUrl()` rewrites it to `https://x.my.salesforce.com/servlet/PrintableViewDownloadServlet?reportId=00O...&xf=csv&enc=UTF-8&csvDelimiter=comma`
- Salesforce URL is persisted to `localStorage.clis_sf_url`

### 1.2 Salesforce auto-pull (`#downloadScreen`)
- 26-second simulated timeline with three step icons (Requesting → Generating → Select downloaded file)
- Progress bar steps: 5% (0s) → 15% (2s) → 25% (4s) → 38% (7s) → 50% (10s) → 62% (13s) → 74% (16s) → 85% (19s) → 92% (21s) → 100% (23s) → file picker auto-opens at 24s
- Elapsed-seconds counter under the status text
- The download itself is real — a hidden iframe (`#sf-dl-frame`) is pointed at the servlet URL with the user's session cookie; the timeline is purely UX padding while Salesforce churns

### 1.3 Loading phase (`#loading`)
- Green spinner + "Processing report data..." while the CSV is parsed and rows are normalized

### 1.4 Main app (`#main`)
- Top bar: paw-logo + CLIS wordmark + dynamic data badge ("X loads · Y carriers")
- Top-bar buttons: Re-pull, Upload, Settings (gear)
- Search input (`#mcInput`) — type carrier name; live-filter; first match auto-selects and renders the dashboard
- Carrier header card (`#carrierHead`): name, MC#, DOT#, link strip
- Tier cards container (`#tierCards`): three vertically-stacked cards, one per tier
- Recent history (`#history-section`): recently viewed carriers with their three tier dots

### 1.5 Tier evaluation engine
`var TIERS = { 1, 2, 3 }` literal object hard-codes:

| Tier | Customers (sample) | Posting | Approvals | Quals to meet |
|---|---|---|---|---|
| 1 | Boston Beer, Samuel Adams, Jetro (Shrimp), Element, Mark Anthony, Breakthru Beverage | Allowed | Manager (or PreApproval) | 1 of 1: 1+ load with B&B in last 6 mo OR Highway Heatmap "Moderate+" |
| 2 | BP/Chevron, Constellation, DSG, Gallo, Federal Premium, Flagstone, Infinium, Scheels, Sprinter Spirits, United Brands, Valvoline/VGP, JF Hilldebrand | Allowed (alternate cities required) | Manager + Compliance | 2 of 3: 6+ loads in 12 mo, alt = 2+ loads same/similar lane, recency = 1+ load in last 4 mo |
| 3 | L'Oreal, Last Bottle, Mancini, Jägermeister, Pernod Ricard, Southern Wine/Glazer's, Stoli, Trane/Rheem (Pine Hill) | NOT allowed | Manager + Compliance | 2 of 3: 10+ loads in 12 mo, alt = 3+ loads same/similar lane, recency = 1+ load in last 3 mo |

Authority requirements (mentioned in source):
- Tier 1: 15 months authority (or 12 months with B&B)
- Tiers 2 & 3: 24 months authority (or 12 months with B&B)

`evaluateCarrier(loads, tierNumber)` computes the qualifications: counts loads in window, top lanes, recency, returns `{pass, checks[], qualsMet, qualsTotal}`. Three rendered states per card:
- **pass** = green, qualsMet >= required
- **manual** / **refs** = amber, missing 1 qual (refs path = "needs references can cover")
- **fail** = red

Lock badges on customer rows: **gold** = proven experience with a Tier customer; **silver** = experience but with a non-targeted customer.

### 1.6 Factoring blocklist (red banner + Settings tab)
- `DEFAULT_FACTORING` is a seed array hard-coded in the file (~150+ known fraud/problem factors)
- Persisted to `localStorage.clis_allFactoring` and `localStorage.clis_excludedFactoring` (the active blocklist)
- `getMostRecentRemitTo(carrierLoads)` finds the latest `remitTo` value across the carrier's loads
- `isSelfRemit(carrierName, remitTo)` — string match, blocks the false positive where a carrier remits to itself
- If `remitTo` matches the blocklist AND is not self-remit → render the red `factor-banner` at the top of the dashboard with the company name, plus a `factoringList` (per carrier) of all factoring companies seen
- Settings → Factoring tab lets the user add/remove from the blocklist; auto-syncs to other Suite apps via localStorage (designed to share with CLIS/Mass Post)

### 1.7 External link strip (per carrier)
- **Highway** (`highway.com/broker/carriers/search-results?q={name+MC}`) — the big green button. Branded as "Open in Highway"
- **FMCSA SAFER** (`safer.fmcsa.dot.gov/.../queryCarrierSnapshot?...&query_string={mcDigits}`) — authority, insurance, safety
- **Carrier411** (`carrier411.com/manager/companydetail.cfm?docket=MC{mcDigits}`) — fraud history, identity flags

These are deep-links by MC number; CarrierVet does not pull data from these services, it just opens a tab in your existing session.

### 1.8 Settings panel (`#settingsPanel`, slide-in from right)
Four tabs:
1. **General** — Salesforce URL, tutorial replay, reset everything
2. **Customers** — edit the per-tier customer list (drives the gold lock); changes persisted to `clis_customers`
3. **Factoring** — blocklist editor, add/remove, reset to defaults, count display
4. **Workflow** — static visualizer: "Before" (35 min, 7 steps) vs "After" (10 sec, 3 steps) comparison cards, savings metric, pull-quote

### 1.9 Tutorial overlay (`#tutorial`)
Auto-opens once per browser (gated by `clis_tutorial_done`). Three-step explainer:
1. Pull a Salesforce report
2. Read the tier cards (green/orange/red, qualsMet)
3. Verify in Highway

Replayable from Settings → General.

### 1.10 CSV / Excel ingest
- `KNOWN_COLUMNS` + `COLUMN_MAP` recognize Revenova/Salesforce report shapes (Booking Carrier Rep, Carrier, Load Number, Origin, Destination, Equipment Type, Customer, Expected/Actual Ship Date, Load Status, MC variants, DOT, Remit To)
- `processData()` scans the first 25 rows for a header match (Salesforce reports start with metadata)
- Filters out "Confidential", "Copyright", "Grand Totals", "salesforce" footer rows
- XLSX support via the cdnjs XLSX library — picks the largest sheet by row count

### 1.11 Persistence (`clis_` localStorage prefix)
- `clis_sf_url` — Salesforce report URL
- `clis_tutorial_done` — has the user seen the tutorial
- `clis_customers` — per-tier customer overrides
- `clis_allFactoring` — full known factoring company list
- `clis_excludedFactoring` — active blocklist
- (No carrier-data cache — db is re-loaded each session)

---

## 2. Primary user flow (the 10-second pitch)

**Before CarrierVet (35 min per vet):**
1. Identify customer tier from SOP doc (5 min)
2. Pull Revenova report (5 min)
3. Filter for the carrier manually (5 min)
4. Open Highway, search authority (5 min)
5. Read heatmap manually (5 min)
6. Cross-reference Carrier411 & FMCSA (5 min)
7. Eyeball tier qualification yourself (5 min)

**After CarrierVet (10 sec):**
1. Click "Pull from Salesforce" (handled in background)
2. Type the carrier's name — instant tier cards, lanes, qualifications evaluated automatically (10 sec)
3. Click "Open in Highway" for the manual authority + heatmap verification (5 min — but only for the cards that actually came back green or amber)

Secondary flows:
- Upload a CSV/XLSX manually (if not Salesforce-connected)
- Add a factoring company to the blocklist when you see one burn another broker
- Edit the per-tier customer list to match your shop's SOP
- Replay the tutorial after onboarding a new dispatcher

---

## 3. Long-form script (target 22 min, range 20–26)

Format: `[mm:ss] NARRATION || ON-SCREEN ACTION`

### Chapter 0 — Cold open (0:00 – 0:25)

```
[0:00] "If you've ever booked a carrier and three hours later your shipper calls you saying the wrong driver is at the dock — yeah. This stops that."
   || Hold on red FACTORING BLOCKED banner for 2 seconds. Cut to tier cards turning green/amber/red in rapid succession.
[0:15] "I'm Alec. I'm a broker at Bay & Bay. This is CarrierVet — app number five in the Logistics Suite, and the one I open more than any other before I move on a load."
   || Cut to app.html hub, mouse hovers app #5 (CarrierVet card), click.
```

### Chapter 1 — What it is, what it isn't (0:25 – 2:30)

```
[0:25] "Before we go anywhere — CarrierVet is not a replacement for Highway. It's not a replacement for FMCSA SAFER. It's not a fraud-scoring AI."
   || Lower-third pill: "What it is NOT"
[0:40] "What it IS, is the screen between you and those tools. It pulls your own Revenova history, scores the carrier against your shop's tier rules, and surfaces the two flags that actually get loads stolen: factoring companies you've already blocked, and zero shipment history."
   || Cut to factoring banner close-up. Then tier card.
[1:10] "If you do everything in tabs today — DAT in one, Revenova in another, Highway, Carrier411, FMCSA — this collapses the first 30 minutes of that vet into one screen. The last five minutes — the actual authority and insurance check — you still do in Highway. We're not pretending otherwise."
   || B-roll: 6 browser tabs flash, then close down to one.
[1:50] "Quick context on tiers, because the whole app is built around them. We run three tiers at Bay & Bay. Tier 1 is your Boston Beers and your Samuel Adams — posting allowed, manager approval. Tier 2 is your Gallos and your Constellations — manager plus compliance, alternate cities required. Tier 3 is your Jägermeisters, your Pernod Ricards, your L'Oreals — posting is not allowed, period. Each tier has a different bar for what counts as a vetted carrier. CarrierVet checks all three at once."
   || Cut to a hand-drawn-style overlay: TIER 1 — green — 1 of 1 qual; TIER 2 — amber — 2 of 3; TIER 3 — red — 2 of 3.
```

### Chapter 2 — First-run setup (2:30 – 4:30)

```
[2:30] "First time you open CarrierVet, you get a welcome screen. Two buttons: pull from Salesforce, or upload a CSV."
   || Welcome screen, mouse hovers each button.
[2:45] "If you're going Salesforce, click 'Configure Salesforce Auto-Export'. Paste the URL of your AA_Modified1 report — or whatever you call the carrier history report at your shop. It works with either the Lightning URL or a classic servlet URL."
   || Click "Configure", paste a Lightning URL into sfUrlInput.
[3:15] "CarrierVet rewrites that into a CSV servlet URL behind the scenes. It uses your Salesforce session cookie — same one your browser already has — so you have to be logged in. There's no API key, no token to copy."
   || Highlight the URL in the input. Click Save.
[3:40] "Hit save. Now the green 'Pull from Salesforce' button shows up. Click it."
   || Click "Pull from Salesforce".
[3:50] "This is the 26-second wait. Salesforce takes about that long to compile and download a report this size. We show you the progress bar so you don't think it's frozen."
   || Hold on download screen. Let progress bar run.
[4:15] "When the file is ready, the file picker opens automatically. Pick the file that just landed in your Downloads folder."
   || Click downloaded CSV in picker.
```

### Chapter 3 — Reading the carrier dashboard (4:30 – 8:30)

```
[4:30] "Now you're at the main screen. Top right, you can see the data badge — in this example, eight thousand four hundred loads, twelve hundred carriers. That's the universe CarrierVet is matching against."
   || Highlight the data badge in the topbar.
[4:50] "Type a carrier name. Doesn't have to be exact — I'll type 'NEXT TRUCK'."
   || Type "NEXT TRUCK" slowly into mcInput.
[5:05] "Three things appear. Carrier header, three tier cards, and — if it matches — the red factoring banner."
   || Pan down the rendered dashboard.
[5:20] "Top header: carrier name, MC number, DOT number. Then the link strip — Open in Highway, FMCSA, Carrier411. These are deep-links. CarrierVet doesn't pull from those services — it just opens a tab in your existing session."
   || Hover each external link.
[5:55] "The big green button is Open in Highway. That's where you go AFTER CarrierVet has narrowed your decision. We'll click it in a minute."
   || Hover "Open in Highway".
[6:10] "Now the tier cards. Green = pass. Amber = needs references, can cover one missing qualification. Amber-with-refs-icon = same idea, different visual treatment. Red = not eligible."
   || Show three example carriers — one green, one amber, one red — cycling.
[6:40] "Click a tier card to expand it. Each card shows the qualifications evaluated. Tier 1 — single qualification. One load with us in the last 6 months, OR a Highway Heatmap showing Moderate or higher around origin and destination. If you don't have the load history, click the Highway link inside the card to check the heatmap manually."
   || Click Tier 1 card. Walk through the qual.
[7:30] "Tier 2 — two of three. Six loads in the last 12 months. Two loads on the same or similar lane. One load in the last 4 months for recency. If you only meet two of those, the card is still amber — needs references can cover the third."
   || Click Tier 2 card. Walk through each qual line.
[8:00] "Tier 3 is the strict one. Ten loads in twelve months. Three loads same lane. Recency in three months instead of four. Posting is not allowed at Tier 3, so this is your sit-down conversation."
   || Click Tier 3 card.
```

### Chapter 4 — The factoring banner (8:30 – 11:00)

```
[8:30] "Now the part that pays for itself in one save."
   || Cut to a carrier whose dashboard has the red factoring banner.
[8:38] "If a carrier's remit-to — the factoring company they bill through — matches a company you've previously blocked, you see this red banner at the top before you read anything else."
   || Hold on the red banner.
[9:00] "This is your own list. CarrierVet ships with a default list of factoring companies that have shown up in fraud chains, but the real value is when you add the one that just burned your brokerage last week. Open Settings — gear icon, top right."
   || Click gear. Click Factoring tab.
[9:30] "Every factoring company you've added is here. To add one, type the name, hit enter. To remove, hover and click the X. Reset to defaults if you want to start over."
   || Add a fake "Acme Capital", remove it, demo reset.
[9:55] "Two important caveats. One — CarrierVet only flags off the MOST RECENT remit-to it sees in the data. If a carrier switched factors three months ago, you'll see the new one. Two — if the remit-to matches the carrier's own name, that's self-remit and we ignore it. That's not a factoring company, that's just a carrier billing direct."
   || Show the relevant code comment / docs as a slate.
[10:30] "This list is shared across the Logistics Suite via localStorage. If you add a factor here, Mass Post sees it. If your Mass Post has one CarrierVet doesn't, you'll get sync'd next time you open this."
   || Brief cut to Mass Post settings showing the same factoring list.
```

### Chapter 5 — Customers tab (11:00 – 13:00)

```
[11:00] "Customers tab — Settings, second tab over."
   || Open Settings → Customers.
[11:08] "This is where you edit which customers belong to which tier. Out of the box it's loaded with Bay & Bay's customer list — Boston Beer at Tier 1, Gallo at Tier 2, Pernod Ricard at Tier 3, et cetera. Your shop's tiers are not our tiers. Edit them."
   || Scroll through the three tier sections.
[11:45] "Add a customer — type, hit enter. Remove — hover, click the X. Changes save to this browser only."
   || Add "Acme Brewing" to Tier 1. Remove "Element".
[12:15] "Why does this matter for vetting? Two reasons. One, the lock badges. When you expand a tier card, customers the carrier has actually moved freight for show up with a gold lock. That's proven experience at that tier. Silver lock means experience but at a non-targeted customer. Two, it's how CarrierVet knows what 'tier qualification' actually means at YOUR shop."
   || Cut back to an expanded tier card showing gold + silver locks.
```

### Chapter 6 — Tutorial replay + General settings (13:00 – 14:30)

```
[13:00] "Quick tour of the General tab. Salesforce URL — edit it here if your report changes. Re-watch tutorial — that's the three-step explainer that runs the first time you open the app. Reset CarrierVet — nuclear option, clears all localStorage."
   || Open Settings → General. Hover each row.
[13:40] "Worth knowing — every localStorage key in this app is prefixed clis underscore. CLIS was the working name before we renamed it CarrierVet for the suite. If you go looking in DevTools, that's why."
   || Open DevTools briefly, show Application → LocalStorage → keys with clis_ prefix.
[14:00] "One last thing in General — there's a workflow tab. It's a static visual that shows the before-and-after of using CarrierVet. Thirty-five minutes per vet down to ten seconds. We put it there because brokers selling this internally need ammo."
   || Open Workflow tab. Hold on the savings card.
```

### Chapter 7 — Real-world flow, end-to-end (14:30 – 19:00)

```
[14:30] "OK. Let's do an actual vet. End to end. Phone's ringing — a carrier wants to cover a Constellation load. Constellation is Tier 2 at our shop."
   || Phone-ring SFX. Cut to carrier-name lookup intent.
[14:50] "I type their name into CarrierVet. Three cards render. Tier 2 is amber — needs references — two of three qualifications met."
   || Type carrier name. Hold on amber Tier 2 card.
[15:15] "Click the card. I can see: they've moved seven loads with us in twelve months — that's the volume check. They've moved one load on this exact lane before — that misses the alt-lane requirement, which wants two on similar lanes. Recency — last load was 60 days ago, that meets the four-month window."
   || Expand card, hover each qualification row.
[15:55] "So I'm two of three. I need references for the third. That's a conversation with my manager and compliance, but it's NOT a no."
   || Cut to a "Two of three → Refs can cover this" overlay.
[16:15] "Before I make that call, I want to verify the basics. I click 'Open in Highway' — big green button at the top."
   || Click Open in Highway. Cut to Highway in a new tab.
[16:40] "Authority's clean. Insurance current. Heatmap shows Moderate around origin and destination. I cross-check Carrier411 — no identity flags. I'm done. Total time including the Highway side-trip: under five minutes."
   || Quick cut: Highway tab → Carrier411 tab → back to CarrierVet.
[17:30] "Compare that to where we were two years ago — thirty-five minutes per vet, four tabs, a paper SOP, and a coin flip on whether you remembered to check Carrier411. The math on this is twenty-something carriers a day across our floor, times twenty minutes saved each. That's the whole reason we built it."
   || Cut back to Workflow tab "savings" panel for emphasis.
[18:30] "If at any point that banner had been red — wrong factoring company, history of fraud — none of this would have mattered. I would have hung up the phone. That's the unfair-advantage moment, and you can't get it without your OWN factoring list."
   || Reshow red factoring banner.
```

### Chapter 8 — Gotchas (19:00 – 21:30)

```
[19:00] "Things to know."
   || Slate: "GOTCHAS"
[19:05] "One. You have to be logged into Salesforce in the same browser. The auto-pull uses your session cookie. If you're logged out, you'll get a Salesforce login page in the iframe and nothing will download."
   || Show a Salesforce login screen as the fail state.
[19:30] "Two. The 26-second wait is real. Salesforce isn't fast. Don't refresh."
   || Hold on download screen with the elapsed counter.
[19:45] "Three. CarrierVet only sees what's in your Revenova history. A brand-new carrier with zero loads will fail every tier check. That doesn't mean don't book them — it means the app can't help you decide. Go to Highway. Look at the heatmap. Make the call."
   || Show a "zero history" red tier card. Then cut to Highway heatmap.
[20:20] "Four. The factoring blocklist is per-browser. If you onboard a new dispatcher, they start with the defaults. Either export your list — that's coming — or have them re-add the important ones day one."
   || Show factoring list in two browsers side-by-side.
[20:50] "Five. Don't use this in isolation. CarrierVet is the SCREEN before you call. Highway is the VERIFICATION. Your gut and your manager are the FINAL CHECK. We are not selling you a robot that books loads for you."
   || Three-stack overlay: SCREEN → VERIFY → DECIDE.
```

### Chapter 9 — Wrap (21:30 – 22:15)

```
[21:30] "That's CarrierVet. App five of seven in the Logistics Suite. If you got value, the other six apps are at the hub — link in the description. Mass Post is the rate one. Load Manager is the dispatch one. Bolt Post is the express one."
   || Cut to app.html with all 7 apps visible. Highlight #5.
[21:50] "If you only take one thing away — build your own factoring blocklist. The default list is fine, but the one that burns YOUR brokerage is not on it yet. Add it the day you see it."
   || Close-up on factoring tab with a new entry being added.
[22:05] "Thanks for watching. Built by brokers, for brokers."
   || Logistics Suite outro card with the tagline "The sweet side of freight".
```

Target final length: **22:15**.

---

## 4. YouTube chapter list (for description)

```
00:00  Cold open — what gets loads stolen
00:25  What CarrierVet is and isn't
02:30  First-run setup (Salesforce URL)
04:30  Reading the carrier dashboard
08:30  The factoring banner — the unfair advantage
11:00  Customer tab — make the tiers yours
13:00  Tutorial replay + General settings
14:30  Real-world end-to-end vet
19:00  Gotchas (Salesforce session, brand-new carriers, blocklist scope)
21:30  Wrap + suite cross-promo
```
