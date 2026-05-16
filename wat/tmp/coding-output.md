# Mass Post — Research output (coding sub-agent)

Source: `C:/Users/aleca/Desktop/Logistics Suite/Logistics-Suite/site/mass-post.html` (~8,363 lines, single file). All claims traceable to that file unless noted.

> Note on visual identity: the running app uses a dark cyan/purple theme (Outfit + JetBrains Mono, `--bolt #06B6D4`, `--electric #A78BFA`). The Logistics Suite candy brand (pink/cream) is used on the hub and on this tutorial's thumbnail/title-cards — not on Mass Post itself. Script narrates what the broker actually sees.

---

## 1. Feature inventory (by surface)

### Header (line 3270)
- `MASS POST` wordmark with cyan-to-purple gradient and animated lightning logo (canvas).
- `⚡ Pull Report` — `startSFDownload()` — pulls TMS report `AA_Modified1` from Salesforce/Revenova via hidden iframe (must be logged into SF in same browser; uses session cookie).
- `📁 Load File` — `openFilePicker()` — manual upload of the same XLSX.
- `🚀 Express Export` — `startExpressUpload(event)` — one-click: file-picker → process → jump straight into Bulk Export modal. Shift+click replays the 7-second tutorial.
- `📤 Bulk Export` — `openBulkExport()` — opens the main modal (only enabled once a report is loaded).
- `🔔` notification bell — unread counter for booked-while-posted alerts.
- `⚙` settings drawer.

### Tabs (line 3298)
- **Available** (default), **Shipping Today**, **Today Booked** — counts shown in pill, switching driven by `switchTab()`.

### Loads toolbar (line 3313)
- H2 "Loads", `Tomorrow` filter pill, `⚡ New` toggle, calendar date-range picker (`cal-nav`/`cal-clear`), search input (`filterCards()`).

### Load row / expanded row (assembled in `card-grid`)
- F/BT button (`row-fbt`) — toggles Fuel/Breakthrough surcharge for an entire customer.
- Rate-reset arrow (`row-rate-reset`) — revert one-off rate override.
- Notes icon (`row-notes-icon`) — opens expanded view; shows "unseen" dot when new coverage note appears.
- Expanded actions: `⚡ Post Alone` (copies single-load payload, triggers Fill DAT bookmarklet flow), `💬 Quick Reply` (carrier reply templates), `↺ Mark Not Posted`, `✓ Taken Down From DAT`.

### Settings drawer (line 3357)
1. **Your Profile** — name, email, "Post to Team" toggle (when on, single-load posts use the team phone line on DAT instead of broker email).
2. **Express Export tutorial** — 7-second walkthrough.
3. **Full Tutorial** — 23-step in-app walkthrough.
4. **⚡ Fill DAT bookmarklet** — drag to bookmarks bar; on DAT posting form click → Ctrl+V → OK to fill a single load.
5. **🔄 Mass Post Helper bookmarklet** — drag to bookmarks bar; context-aware: scrapes DAT Tools Quick Rate Lookup OR fills Revenova list view.
6. **🔐 Grab DAT Token bookmarklet** — pushes DAT auth token to local `dat-pp-cli serve` daemon at `127.0.0.1:53682`.
7. **dat-pp-cli (rate fetcher)** — 67 MB Windows .exe + two .bat helpers; pulls rates ~20× faster than scraping; `📊 Get DAT Rates` auto-detects the daemon and falls back to bookmarklet if missing.
8. **Rate Lookup Formula** — Base (Spot Avg / Spot Low / Spot High / Contract Avg) · Adjust (Flat $ or Percent %, default −$150) · Round (Down/Nearest/Up to $25/$50/$100, default Down $50) · optional Floor.
9. **Salesforce Report URL** — paste Lightning URL; saved to `mp_sf_url`.
10. **Column Mapping** — match XLSX columns to DAT fields.
11. **Customer → Commodity** — auto-learns from quick replies; persists in `mp_cust_comm`.
12. **Fuel Surcharge** — `$/mi` slider used to compute projected margin when F/BT is on (requires a Total Miles column).
13. **Watt AI** — optional DeepSeek API key (`sk-…`). Without a key, Watt still surfaces local rule-based alerts.

### Bulk Export modal (line 3512)
- Title bar: "📤 Bulk Export — DAT + Salesforce".
- Date filter row: From/To inputs, `Today`/`Tomorrow` quick-toggles, `Load Lanes` button.
- Lookup bar (after Load Lanes): `📊 Get DAT Rates`, `📋 Paste Rates`, `⬇ VR dual rate` toggle (adds a second scrape for VR loads, +4s/load), live status line, yellow tip box with the 3-step bookmarklet recipe.
- Preview table columns: **Date · Load # · Equip · Lane · DAT / Benchmark · Current Rate · New Rate** (DAT/Benchmark cell shows raw DAT Spot + ↑/↓ delta vs current + ⚠ if ≥5%).
- Bulk adjustment bar: `−$50 all` / `+$50 all` (snap-to-$50 via `Math.floor(cur/50)*50+50` going up, `Math.ceil(cur/50)*50-50` going down), `⚡ Apply formula`, `↺ Reset to raw DAT`, totals readout.
- Per-row steppers (`bulk-rate-step`): −/+ buttons that hit the same snap-to-$50 logic.
- Final actions: `💰 Posted Amount` (green), `📊 Benchmark Rate` (purple) — both copy a payload for the Revenova-mode Mass Post Helper to write back. `📥 Download CSV for DAT` generates the bulk-upload file.

### Watt assistant (line 3619)
- Floating cyan launcher (`watt-btn`) bottom-right with a pulse animation when alerts are pending.
- Chat box opens on click; alerts about new loads, new notes, booked-while-posted conflicts.

### Embedded tutorials
- Express Express tutorial (7 steps, `openExpressTutorial()` line 4303) — auto-plays through Pull → Export → Get Rates → Paste → Download.
- Full Tutorial (23 steps, `openTutorial()` around line 8073) — covers Bulk Export, Watt, takedowns, quick replies.

### Persistence (all keys prefixed `mp_`)
`mp_sf_url, mp_col_mapping, mp_cust_comm, mp_user_name, mp_user_email, mp_last_posted, mp_prev_load_ids, mp_prev_statuses, mp_prev_pu_dates, mp_prev_notes, mp_seen_booked, mp_seen_notes, mp_fuel_bt, mp_fuel_rate, mp_deepseek_key, mp_current_tab, mp_tutorial_seen, mp_express_tut_seen, mp_rate_overrides, mp_notifications, mp_post_to_team, mp_rate_formula`.

### Bookmarklet internals (lines 7294, 7407, 7525)
- DAT-Tools mode: pulls each lane from the clipboard, drives the Angular Material city autocomplete (mousedown on `.pac-item`), opens the equipment `mat-select`, clicks `<div class="action-button">SEARCH</div>`, reads two `.rate-data` cells (Spot, Contract), waits ~4s per lane, then asks the user to click `📋 Copy Rates` (a fresh user gesture so `clipboard.writeText` succeeds).
- Revenova mode: scans the list view, matches the payload to load rows by load #, inline-edits Posted Amount or Benchmark Rate.

### Known gotchas (documented in project CLAUDE.md, all relevant on camera)
- User must be logged into Salesforce/Revenova in the same browser tab/cookie jar.
- Bookmarklets must be re-dragged from Settings any time Mass Post is updated (frozen URLs).
- The "fast" scrape variant has a stale-rate bug — `4s/lane` blind sleeps are intentional.
- Chrome will flag `dat-pp-cli.exe` as "may be dangerous" — it's unsigned, click Keep.

---

## 2. Primary user flow (the 10-step roundtrip — headline of the video)

1. Open Mass Post in Chrome (locally or via Logistics Suite hub). Sign into Salesforce/Revenova in another tab.
2. Header → `⚡ Pull Report` (or `📁 Load File` for a manual XLSX). Cards populate by day.
3. `📤 Bulk Export` → modal opens. Click `Today` (or set a custom From/To).
4. `Load Lanes` builds the preview table — every load for those dates, equip already mapped per the table on row 36 of the project CLAUDE.md.
5. `📊 Get DAT Rates` → copies a lane payload to clipboard, shows the yellow 3-step tip. (If the dat-pp-cli daemon is running on `127.0.0.1:53683`, the rates fill automatically and steps 6–7 collapse.)
6. Switch to the DAT Tools tab (`one.dat.com/tools`) → click the 🔄 Mass Post Helper bookmarklet. Watch the progress overlay (~4s per lane). When done, click the purple `📋 Copy Rates` button (this is the fresh-gesture step — required for clipboard).
7. Switch back to Mass Post → click `📋 Paste Rates`. New Rate column fills with raw DAT Spot.
8. Adjust rates: `−$50/+$50 all`, per-row steppers, or `⚡ Apply formula` (default: Spot − $150, round down to $50). Watch the totals readout update.
9. `💰 Posted Amount` (and optionally `📊 Benchmark Rate`) → switch to Revenova list view → click 🔄 Mass Post Helper → it inline-edits each row → click Revenova's own Save. (Sub-flow is documented and currently being polished — mention as "near-final".)
10. Back to Mass Post → `📥 Download CSV for DAT` → upload that CSV to DAT's bulk-post page.

### Secondary flows worth showing
- **Express Export** (~25s on screen): single click, picks a file, jumps straight to Bulk Export with Today pre-selected. Great for the impatient demo.
- **Single-load Post Alone**: expand a row → `⚡ Post Alone` → switch to DAT posting form → click `⚡ Fill DAT` → Ctrl+V → OK. Used for one-off urgent loads.
- **Rate Formula tweak**: open Settings → change Base to "Spot Low" or Adjust to "Percent %" → click `⚡ Apply formula` in the Bulk Export modal to see the New Rate column shift.
- **Takedown loop**: when Watt flags a "booked while posted" conflict, expand the row → `✓ Taken Down From DAT` clears the alert.

---

## 3. Long-form script (target 24:00, includes timestamps + on-screen actions)

> Tone: warm, broker-to-broker. Speaker is Alec (the builder, Bay & Bay broker). All times approximate; the editor should retime to actual recording.

| Time | Narration | On-screen action |
|---|---|---|
| 00:00 | "If you've ever had two tabs open — Revenova on one, DAT on the other — typing the same rate into both, this is for you. I'm Alec, I broker freight at Bay & Bay, and this app is what I built so I'd stop doing that. It's called Mass Post." | Hard cut from desk shot to a slo-mo of the cursor clicking `🚀 Express Export`. Logistics Suite candy-pink lower-third with name + role. |
| 00:25 | "In the next twenty-something minutes I'll show you the whole loop — pulling a report from Revenova, looking up DAT rates for fifty lanes at once, pushing the new rates back to Salesforce, and dropping a bulk-upload CSV onto DAT. It's the same workflow I run every morning before coffee gets cold." | Title card: "MASS POST · the 24-minute tour". Bottom strip: chapter dots. |
| 00:55 | "Quick disclaimer up front — this isn't a SaaS product. It's a single HTML file. You open it in Chrome, your data lives in your browser, and the only thing it talks to is your own Salesforce session. Built by brokers, for brokers — and if you want it, the file's on the Logistics Suite hub, free." | Show the file path in the address bar, then pan to the suite hub at `app.html`. |
| 01:25 | **Chapter 1 — The 60-second tour** | Title card fades up: `01 · The 60-second tour` |
| 01:30 | "Header here at the top: Pull Report, Load File, Express Export, Bulk Export. Bell for notifications, gear for settings. Three tabs underneath — Available, Shipping Today, Today Booked. That's the whole app's chrome." | Cursor hovers each header button in turn; tooltips appear. |
| 02:00 | "Every row is a load — pickup date, equipment, customer, lane, rate. F-slash-BT toggles fuel surcharge on a whole customer. Notes icon opens coverage notes. Got an unread note? It glows." | Click an `F/BT` pill, click a notes icon, show the glow. |
| 02:30 | "And down here in the corner — that's Watt. Local helper. Tracks new loads, flags when something gets booked but is still up on DAT. We'll come back to him." | Tap the cyan Watt button, close it. |
| 03:00 | **Chapter 2 — Pulling the report** | Title card: `02 · Pulling the report` |
| 03:05 | "First time you use Mass Post, open Settings — gear icon — paste your Lightning report URL. We use a TMS report called AA_Modified1. Save URL." | Open Settings, scroll to "Salesforce Report URL" section, paste a (redacted) URL, click Save. |
| 03:30 | "The only requirement: you have to be logged into Salesforce in this same browser. Mass Post grabs the report through a hidden iframe using your session cookie. No password storage, no API key." | Show another tab with Salesforce open. |
| 03:55 | "Now hit Pull Report. Progress overlay, ten seconds, done. Cards populate by day." | Click `⚡ Pull Report`, show progress, show populated grid. |
| 04:20 | **Chapter 3 — The Bulk Export modal** | Title card: `03 · Bulk Export — the headline feature` |
| 04:25 | "This is the part that saves the most time. Click 📤 Bulk Export." | Click `📤 Bulk Export`. |
| 04:40 | "From and To dates, with quick toggles for Today and Tomorrow. Most mornings I click Today. Then Load Lanes." | Click `Today`, click `Load Lanes`. |
| 05:05 | "Now we've got a preview table. Date, Load number, Equipment — that's already normalized from your Salesforce code, so V/R becomes VR, Step Deck becomes F, Straight Box stays SB and gets skipped on the rate lookup. Lane, DAT slash Benchmark, Current Rate, New Rate." | Zoom on the preview table; highlight the equipment column. |
| 05:45 | **Chapter 4 — Getting DAT rates for fifty lanes at once** | Title card: `04 · Quick Rate Lookup, fifty lanes deep` |
| 05:50 | "OK here's the magic. Click 📊 Get DAT Rates. Yellow tip box pops up — three steps. The button copied a payload to your clipboard." | Click `📊 Get DAT Rates`, show toast + yellow tip. |
| 06:15 | "Step one — switch to DAT Tools. That's one.dat.com/tools. You need to have the 🔄 Mass Post Helper bookmarklet on your bookmarks bar. Drag it from Settings if you haven't. Step two — click that bookmark." | Cmd-tab to DAT Tools, click the purple bookmark, show the progress overlay appearing on the DAT page. |
| 06:50 | "Watch this. It pastes the first lane, picks the city in the autocomplete, sets the equipment, hits Search. Reads the Spot and Contract rates. Clears, next lane, repeat. About four seconds per lane. Why four? There's a stale-rate bug in the faster version — I left the timing in so the rates are right, not fast." | Speed-up clip of the bookmarklet running across ~10 lanes. |
| 07:30 | "When it's done you'll see a purple Copy Rates button. Click it. That's a fresh user gesture, which Chrome's clipboard API insists on. Don't skip it." | Click the purple `📋 Copy Rates` button on the DAT page. |
| 08:00 | "Back to Mass Post. Click 📋 Paste Rates. New Rate column fills in with the raw DAT Spot for every lane." | Switch back, click `📋 Paste Rates`, show columns filling. |
| 08:30 | **Chapter 5 — Faster path: the dat-pp-cli daemon** | Title card: `05 · The 20× faster path` |
| 08:35 | "Optional but worth it. There's a local helper called dat-pp-cli. Download the .exe, run start-dat-daemons.bat, and Mass Post will skip the bookmarklet entirely — Get DAT Rates pulls straight from DAT's own API. Drops a fifty-lane batch from three minutes to ten seconds." | Show Settings → dat-pp-cli section, the three download buttons. Show two daemon windows. |
| 09:10 | "Token rotates every thirty minutes, so when Mass Post asks, click the green 🔐 Grab DAT Token bookmarklet on one.dat.com. That's the only friction." | Click the green bookmarklet on DAT, toast confirms. |
| 09:35 | "If the daemon's not running, no big deal — falls back to the bookmarklet flow we just covered." | Show the fallback toast. |
| 10:00 | **Chapter 6 — Adjusting rates** | Title card: `06 · Adjusting rates without breaking your spreadsheet brain` |
| 10:05 | "Now the rates are in. DAT slash Benchmark column shows the raw Spot, an arrow comparing it to your current rate with the dollar and percent delta, and a warning sign if the change is five percent or more. That's your gut-check column." | Zoom on a row with a ⚠️ marker. |
| 10:45 | "Per-row steppers: minus fifty, plus fifty. They snap. If you're at $1,099 and click plus, you land on $1,100, not $1,149. Snap-to-fifty." | Click steppers on two rows; show snap. |
| 11:15 | "Top bar: minus fifty all, plus fifty all, Apply Formula, Reset to raw DAT. Totals on the right." | Click `−$50 all`, click `↺ Reset to raw DAT`. |
| 11:45 | "The formula lives in Settings. Default is Spot minus $150, round down to $50. You can change the base to Spot Low, Spot High, or Contract — flat or percent adjust, round direction, round-to step, optional floor. Click Apply Formula and the New Rate column re-computes." | Open Settings, walk through each Rate Formula control. Close, click `⚡ Apply formula`. |
| 12:30 | **Chapter 7 — Pushing rates back to Revenova** | Title card: `07 · Writing back to Revenova` |
| 12:35 | "Once your New Rate column looks right, click 💰 Posted Amount. Or 📊 Benchmark Rate. Or both — they're independent." | Click `💰 Posted Amount`, show toast. |
| 13:00 | "Switch to Revenova list view. Click 🔄 Mass Post Helper — same bookmarklet, it auto-detects which page you're on. It walks the list, matches each row by load number, opens the inline edit, types your rate, moves on." | Speed-up clip on Revenova list view. |
| 13:35 | "When it's done — and this is important — click Revenova's own Save button. The bookmarklet only stages the edits. Save commits them." | Click Revenova's Save. |
| 14:00 | **Chapter 8 — The CSV for DAT** | Title card: `08 · Download CSV → upload to DAT` |
| 14:05 | "Back in Mass Post, click 📥 Download CSV for DAT. You get a file in your Downloads folder formatted exactly for DAT's bulk-post page." | Click button; show file appearing in Downloads. |
| 14:25 | "Open DAT, head to Post a Load → Bulk Post → Upload File. Pick that CSV. DAT validates, you click confirm, your loads are live." | DAT bulk-post page; upload the file. |
| 15:00 | **Chapter 9 — Express Export: the one-click version** | Title card: `09 · Express Export — for when you're late` |
| 15:05 | "Hit 🚀 Express Export. File picker. Pick the report. It processes, jumps straight into the Bulk Export modal with Today already selected. Three clicks instead of seven." | Live demo. |
| 15:35 | **Chapter 10 — Single-load Post Alone** | Title card: `10 · Post Alone — the urgent one` |
| 15:40 | "Expand any row. ⚡ Post Alone copies that one load. Switch to DAT's normal post-a-load form, click the ⚡ Fill DAT bookmarklet, Ctrl+V into the prompt, OK. Form fills, you click Post." | Live demo on a single load. |
| 16:15 | "Settings → Post to Team toggle: when on, single posts use your team phone line instead of your email. Carriers call the team. When off, calls come to you." | Toggle the switch. |
| 16:35 | **Chapter 11 — Watt and the booked-while-posted problem** | Title card: `11 · Watt watches the dangerous part` |
| 16:40 | "The worst thing in this job is a load gets covered, but DAT still has it posted, and carriers keep calling. Watt watches for that. When a load you posted shows up as Booked, Watt flags it." | Open Watt, show an alert badge. |
| 17:15 | "Click the alert. Expand the row. ✓ Taken Down From DAT — that closes the loop. Watt stops bugging you." | Walk through the takedown action. |
| 17:45 | **Chapter 12 — Customer → Commodity & Fuel/BT** | Title card: `12 · The little settings that pay rent` |
| 17:50 | "Customer-to-commodity map. Auto-learns from your quick replies, but you can pre-fill it. When you copy a Post Alone payload, the commodity comes from this map. Saves typing on every single post." | Show Settings → Customer → Commodity, add one entry. |
| 18:25 | "Fuel slider — sets the per-mile fuel surcharge that gets added to projected margin when F/BT is on for a customer. Requires a Total Miles column in your report." | Slide the slider, show the readout. |
| 18:55 | **Chapter 13 — Gotchas I want you to know** | Title card: `13 · Gotchas — the stuff I wish I'd told my past self` |
| 19:00 | "One — you must be logged into Salesforce in the same browser. No login, no report. Two — every time Mass Post updates, you have to re-drag both bookmarklets from Settings. The bookmark URL is frozen the moment you drag it." | Highlight Settings → bookmarklets. |
| 19:30 | "Three — Chrome will tell you dat-pp-cli-dot-exe may be dangerous. It's not, it's just unsigned. Click Keep. Four — the rate scrape takes about four seconds per lane on purpose. The fast version had a stale-rate bug where every lane came back with lane one's rate. Slow is correct." | Show the Chrome download warning. |
| 20:00 | **Chapter 14 — Quick Reply & coverage notes** | Title card: `14 · Quick Reply for carrier emails` |
| 20:05 | "Expand a row, click 💬 Quick Reply. Picks a template, fills the carrier name, the load number, your contact info from Profile. Copies to clipboard. Paste in Outlook." | Demo the quick reply flow. |
| 20:35 | **Chapter 15 — Wrapping up** | Title card: `15 · A morning with Mass Post` |
| 20:40 | "Here's what a real morning looks like. Pull Report, Bulk Export Today, Get DAT Rates, Apply Formula, eyeball the warnings, Posted Amount to Revenova, Save in Revenova, Download CSV, upload to DAT. Five minutes for fifty loads. Used to be an hour." | Time-lapse of the full roundtrip in 15 seconds. |
| 21:30 | "Where to get it: Logistics Suite hub, link in the description, no signup. Single HTML file. Your data stays in your browser." | Show the suite hub `app.html` with the Mass Post tile. |
| 22:00 | "If you build something on top of this — or want a feature — I built this in public, my number's in the description. We can talk freight." | Outro card with name + Logistics Suite tagline. |
| 22:30 | End slate (10s) — Subscribe + next video tease (Bolt Post). | Cards. |
| ~23:00 | Music tail. | — |

Total: ~22:45–23:00 of voiced content + outro buffer = 23–24 min uploaded.

---

## 4. Chapter list (for YouTube description)

```
00:00  Cold open — why I built it
00:25  The 24-minute tour
01:25  Chapter 1 · The 60-second tour
03:00  Chapter 2 · Pulling the report from Revenova
04:20  Chapter 3 · The Bulk Export modal
05:45  Chapter 4 · Quick Rate Lookup, 50 lanes at once
08:30  Chapter 5 · The 20× faster path (dat-pp-cli daemon)
10:00  Chapter 6 · Adjusting rates without breaking your spreadsheet brain
12:30  Chapter 7 · Writing back to Revenova
14:00  Chapter 8 · Download CSV → upload to DAT
15:00  Chapter 9 · Express Export — for when you're late
15:35  Chapter 10 · Post Alone — the urgent one
16:35  Chapter 11 · Watt watches the dangerous part
17:45  Chapter 12 · The little settings that pay rent
18:55  Chapter 13 · Gotchas — the stuff I wish I'd told my past self
20:00  Chapter 14 · Quick Reply for carrier emails
20:35  Chapter 15 · A morning with Mass Post
22:00  Outro
```
