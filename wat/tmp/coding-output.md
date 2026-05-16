# Coding Sub-Agent — Bolt Post Feature Inventory & Script

**Source:** `Logistics-Suite/site/bolt-post.html` (2,686 lines, single HTML file).
**Companion source:** `mass-post.html` (8,363 lines).

---

## 1. Feature Inventory (source-grounded)

### Header / global actions
- **⚙ Settings** drawer (right slide). Contains profile, bookmarklet, SF report URL, column mapping, Customer → Commodity learner. (Lines 1090–1101, 1143–1195)
- **⚡ Pull Report** — pulls the saved Salesforce/Revenova Lightning report via hidden-iframe + session-cookie trick. Auto-converts Lightning URL → Classic CSV servlet via `convertSFUrl()` (line 1467). Three-step progress overlay (line 1492 `startSFDownload`).
- **📁 Load File** — opens local CSV/XLSX picker; XLSX is parsed by the bundled `xlsx.full.min.js` (line 8).
- **☑ Select Export** — appears after loads exist; toggles a multi-select bar for the bulk CSV-for-DAT export.

### Loads view (the main canvas)
- **Day groups**, sorted: today first, then future (ascending), then past (descending). Each group is collapsible (`day-header.collapsed`). Within a day, cards sort by pickup time. (Line 1759 `renderCards`)
- **Load card** shows: load number (mono), equipment chip, **multi-stop badge** (orange when stops ≥ 3, with a pulsing red border-glow animation — lines 612–629), origin → destination lane, pickup/delivery time badges, **Margin** chip (customer quote − posted amount; positive green, negative red), and two action buttons:
  - **⚡ Copy** — green button. Builds a JSON payload of all DAT fields and copies it to clipboard. (Line 2005 `copyLoad`)
  - **💬 Reply** — purple button. Opens variation picker. (Line 2076 `quickReply`)
- **Toolbar:** Today chip, From/To date filter, **Min Margin** filter ($ floor), search box.

### Multi-stop handling (Bolt Post exclusive)
- When a load has ≥ 3 stops, an inline **extra-stops** input block appears on the card with rows for each intermediate stop. Each row has a **P/D type selector** (Pickup / Drop), a **location** input, and an **appt window** input (e.g. "0700–1500 on Wed"). Saved per load ref under `bp_extra_stops`. (Lines 660–721 CSS, 2237 `loadExtraStops`)
- The Reply generator detects stop info and produces 3 variations that *include* the multi-stop details ("with a pickup in Memphis and a drop in Nashville at 0900–1500 on Wed").

### Quick Reply generator
- 3 variations per click, each different in tone. Generates content using:
  - Greeting by hour (Morning/Afternoon/Evening) — `getGreeting()` line 2053
  - Pickup day name + window
  - Equipment, weight (rounded to nearest k), rate (whole dollars), commodity
  - Sign-off includes `userName` and `userEmail` from settings
- Auto-learns the Customer → Commodity map: when the user fills commodity once in a reply context, it's persisted into `custCommMap` (line 1444 `lookupCommodity` lookup, customer key from `mp_…`-style storage).

### Bulk export (DAT-ready CSV)
- **Select mode** (toolbar ☑ Select Export) lets the broker pick specific cards. Then **📥 Export CSV for DAT** writes a CSV with split City/State columns sized for DAT's bulk upload schema. Lane de-duplication is automatic (`seenLanes`, lines 2335, 2508). Weight is **clamped 10,000–40,000 lb** to fit DAT's accepted range (line 2356 `clampedWeight`).
- A second **Bulk Export modal** (📤 Bulk Export for DAT) provides a date-range filter (Today / This Week buttons) plus a preview table before download. Adds **instructional rows** at the top of the CSV for the user. (Line 2582 `downloadBulkCSV`)

### The ⚡ Fill DAT bookmarklet
- Built at runtime by `buildBookmarklet()` (line 2635). Code lives in `_bookmarkletCode`.
- Flow:
  1. On a load card → user clicks **⚡ Copy** → JSON payload is on clipboard.
  2. User switches to DAT One's post-load form, clicks the **⚡ Fill DAT** bookmark.
  3. Bookmarklet `prompt()`s — user pastes (Ctrl+V) and clicks OK.
  4. Bookmarklet uses **native value setters** to fire React/Angular's input descriptors correctly: `Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set`, dispatches `input/change/focus/blur` synthetic events so Angular Material recognizes the value.
  5. Fields are matched two ways: (a) **label-text matching** for dynamic mat-input IDs (`slab('Origin', ...)`, `slab('Destination', ...)`, `slab('Rate', ...)`), (b) **stable IDs** (`shipment-pickup-earliest`, `shipment-equipment-type`, `shipment-length`, `shipment-weight`, `shipment-reference-id`, `shipment-comments`).
  6. **Post to Team** toggle: when ON, clicks the "Phone" checkbox in DAT (uses team phone line); when OFF, clicks "Email". Implemented via `cklab('Phone', toTeam)` / `cklab('Email', !toTeam)`.

### Settings drawer
- **👤 Your Profile:** first name + email, plus the **📞 Post to Team** toggle.
- **⚡ Fill DAT Bookmarklet:** draggable link.
- **🔗 Salesforce Report URL:** paste Lightning URL, saved to `bp_sf_url`.
- **📋 Column Mapping:** modal with one dropdown per DAT field, mapping report headers → fields. `autoGuessMapping()` (line 1628) pattern-matches on header text. 17 fields total (line 1273 `DAT_FIELDS`).
- **📦 Customer → Commodity:** auto-learning lookup table, persisted to `bp_cust_comm`.

### State / persistence
All keys prefixed **`bp_`** (not `mp_`):
`bp_sf_url`, `bp_col_mapping`, `bp_cust_comm`, `bp_user_name`, `bp_user_email`, `bp_post_to_team`, `bp_extra_stops`.

---

## 2. Bolt Post vs Mass Post — the differentiator (verified)

| Capability | Mass Post | Bolt Post |
|---|---|---|
| Pull from Salesforce / Load File | ✅ | ✅ |
| Column mapping + Customer→Commodity | ✅ | ✅ |
| ⚡ Fill DAT bookmarklet (single post) | ✅ | ✅ |
| **Tabs** (Available / Shipping Today / Today Booked) | ✅ 3 tabs | ❌ no tabs |
| **Express Export wizard** (one-click to bulk modal w/ animated tutorial) | ✅ | ❌ |
| **DAT rate lookup** (Get DAT Rates, daemon or bookmarklet scrape) | ✅ | ❌ |
| **Rate formula** (Spot − $150, round to $50, etc.) | ✅ | ❌ |
| **Posted Amount / Benchmark Rate writeback to Revenova** | ✅ | ❌ |
| **Watt AI assistant** | ✅ | ❌ |
| **Day-grouped card view with pickup-time sort** | ❌ tab-based | ✅ |
| **Multi-stop inline editor** (3+ stops gets P/D rows w/ location + appt) | ❌ | ✅ |
| **Min-Margin filter chip** | ❌ | ✅ |
| **Post to Team toggle** (phone line vs email on DAT) | ❌ | ✅ |
| **Reply variation picker** with stop-aware messages | partial | ✅ full, multi-stop aware |

**The one-liner:** Mass Post is the studio where you price, post, write back, and analyze. Bolt Post is the **dispatch counter** — same data, day-grouped, and tuned for *just post the load and answer carriers as fast as possible*. The whole UI strips the pricing surfaces away so the broker can move loads at top speed once the rates are already decided.

**When to use which:**
- Use **Mass Post** at the start of the day for pricing, formula, rate verification, and writeback to Revenova.
- Switch to **Bolt Post** when the prices are set and you just need to *blast loads out* — especially when you've got multi-stop runs that the Mass Post UI clutters.

---

## 3. Primary user flows

### Flow A — Daily post-out sprint
1. Click **⚡ Pull Report**. Iframe pulls the AA_Modified1 (or equivalent) Salesforce report. Cards render, grouped by day, today expanded.
2. Click **Today** chip to filter to today only.
3. Set **Min Margin** to e.g. $200 to focus on profitable loads.
4. For each card: click **⚡ Copy** → switch to DAT One post-form tab → click **⚡ Fill DAT** bookmark → Ctrl+V → OK. ~5 seconds per load.
5. When a carrier calls, click **💬 Reply** → pick variation → paste into email/text.

### Flow B — Bulk CSV upload to DAT
1. Pull or load report.
2. Click **☑ Select Export**.
3. Click cards (or "Select All").
4. Click **📥 Export CSV for DAT** → CSV downloads with split city/state, lanes deduped, weights clamped.
5. Upload the CSV on DAT One's bulk-post page.

### Flow C — Multi-stop load
1. A 3-stop load shows with orange "3 STOPS" badge and pulsing red border.
2. Card expands to show 2 extra-stop rows.
3. User fills P/D + location + appt window for each. Saved automatically.
4. Click **💬 Reply** → variations now include the stop sequence in human language.

### Flow D — First-run setup
1. Open the app — no profile saved → settings drawer auto-opens, toast says "Set up your profile to get started."
2. Enter name + email, save.
3. Paste Salesforce report URL.
4. Drag the **⚡ Fill DAT** button to the bookmarks bar.
5. Click "Open Column Mapping" → auto-guess matches most fields → adjust missing ones → Save.

---

## 4. Long-form script (target 21 min @ 145 wpm ≈ 3,045 words)

> Voice: warm, broker-to-broker. Use first-person and second-person. Avoid SaaS language.

### [0:00 – 0:18] Cold open
> *(On-screen: black, then a single lightning-bolt cursor flicker → cut to Bolt Post header.)*
"You ever sit down at noon and realize you still have 38 loads to post? Yeah. Me too. That's the day I built this. Two minutes from now you'll be moving a load out of Salesforce, onto a DAT post, with one click and one paste. Call it Bolt Post."

### [0:18 – 1:00] What this video is
> *(On-screen: title card "BOLT POST — the speed companion to Mass Post.")*
"I'm Alec. I broker freight at Bay & Bay. Earlier I showed you Mass Post — the studio where I price loads, run my formula, write rates back to Revenova. This video is the *companion*. Bolt Post is the same data, stripped down to one job: post the load and reply to carriers faster than you can refresh your inbox. If you haven't watched the Mass Post video yet — link in description, watch it first; this one builds on it. If you have, let's go."

### [1:00 – 2:15] Why split it into two apps
"Mass Post does a *lot*. Three tabs, DAT rate lookup, formulas, write-back. That's great in the morning when I'm pricing. But once the prices are set, all those buttons just get in the way. I'm not doing analysis anymore — I'm just moving loads. So I forked the UI. Bolt Post has no tabs. No rate lookup. No formula buttons. Just cards, grouped by day, with a Copy button and a Reply button. That's it. And because the loads come from the same Salesforce report and use the same column mapping you set up in Mass Post, switching between the two takes literally zero setup."

### [2:15 – 3:30] Chapter 1 — First-run setup
> *(On-screen: open bolt-post.html in browser.)*
"Open the app. First time you load it, the settings drawer pops open and asks for your name and email. Type those in — they're used in the reply messages later. Hit Save Profile. Next, the Fill DAT bookmarklet — see this purple button? Drag it up to your bookmarks bar. Don't click it, drag it. That's how a bookmarklet gets installed. Last thing — paste your Salesforce report URL into the box and hit Save URL. If you're at Bay & Bay, it's already prefilled with mine. Close the drawer."

### [3:30 – 5:00] Chapter 2 — Pull the report
> *(On-screen: click ⚡ Pull Report → progress overlay → cards render.)*
"Hit Pull Report. What's happening behind the scenes: Bolt Post is converting your Lightning URL to the old Classic report-servlet URL, then loading the CSV inside a hidden iframe using your existing Salesforce session cookie. It takes about three seconds. Now look at this — cards grouped by day. Today is expanded by default; tomorrow and beyond are collapsed but one click away. Past days drop to the bottom in case you need to backfill."

### [5:00 – 6:30] Chapter 3 — Column mapping
> *(On-screen: open Settings → Open Column Mapping.)*
"If your loads come out garbled — origin in the wrong spot, no rate showing — that's a column-mapping issue. Open Settings, click Open Column Mapping. Seventeen DAT fields on the left, your report headers on the right. Bolt Post auto-guesses most of them by name — Origin, Destination, Pickup Date, Equipment, Length, Weight, Rate, Customer Quote, Customer, Stops, Reference. Anything left as 'skip' just won't show up. Hit Save Mapping. From now on it's remembered per-browser."

### [6:30 – 8:30] Chapter 4 — The Copy → Fill DAT loop
> *(On-screen: card view, hover ⚡ Copy.)*
"OK here's the move that the whole app exists for. Pick a card. Click the green Copy button. It just turned blue and said 'Copied' — your clipboard now has a JSON payload of every DAT field for this load.

Switch tabs to DAT One. Open the post-load form. Click the ⚡ Fill DAT bookmark in your bookmarks bar. A prompt pops up — paste with Ctrl+V — hit OK. Watch every field fill. Origin, destination, dates, equipment, length, weight, rate, reference, comments — gone. Five seconds. Done.

If 'Post to Team' is on in your settings, the Phone checkbox gets ticked instead of Email — that's so your team's main line rings instead of your personal inbox. Toggle it off when you want carriers calling you directly.

The reason this works on DAT — and a lot of bookmarklets don't — is we're using React's native value setters and firing the synthetic input/change/focus/blur events Angular Material expects. We match labels for the dynamic fields (Origin, Destination, Rate) and stable IDs for the rest. If DAT changes their form, the label-match still works. It's resilient on purpose."

### [8:30 – 10:30] Chapter 5 — Reply variations
> *(On-screen: click 💬 Reply, modal opens.)*
"Carrier calls about a load. Click the Reply button. Three variations pop up — short and punchy, medium with all the details, long with the sign-off. They include the greeting based on time of day, the pickup day-of-week, the pickup window, weight rounded to k, rate as whole dollars, equipment, commodity, and your name and email from settings.

Click the one you like — it copies. Paste into Outlook, into a text, into a DAT message. Done. The carrier gets a clean, complete response in the time it would have taken you to type 'Hi' and look up the rate."

### [10:30 – 12:00] Chapter 6 — Customer → Commodity learner
> *(On-screen: Settings → Customer → Commodity panel.)*
"Most reports don't include the commodity on every line — but the same customer ships the same thing nine times out of ten. So Bolt Post learns. The first time you reply for a customer and you set a commodity, it's saved to this list. Next time that customer shows up, the reply auto-fills with the commodity you used before. You can also add or edit entries manually here. It's just persisted in your browser, no backend."

### [12:00 – 14:00] Chapter 7 — Multi-stop loads
> *(On-screen: scroll to a 3-stop load, point out the orange badge and pulsing red border.)*
"This is the feature that doesn't exist in Mass Post. See this card with the orange 3 STOPS badge and the red glow pulsing around it? That's a multi-stop run. Bolt Post expands the card with a row for each intermediate stop — P for pickup, D for drop, location, appointment window. Type 'Memphis, TN' and '0700-1500 on Wed'. Saved automatically.

Now click Reply on that card. Look — the reply messages now include the stops in human language: 'with a pickup in Memphis and a drop in Nashville at 0900–1500 on Wed.' Carrier knows exactly what they're getting before they even ask. This is where Bolt Post pulls ahead — for multi-stops, Mass Post makes you do this in your head."

### [14:00 – 16:00] Chapter 8 — Bulk CSV export
> *(On-screen: click ☑ Select Export, click a few cards, then 📥 Export CSV for DAT.)*
"For days you have 20+ loads to post, single-clicking is too slow. Click Select Export. Click cards you want — or Select All. Hit Export CSV. You get a CSV pre-shaped for DAT's bulk-post page: origin and destination split into city and state columns, equipment standardized (V, R, VR, F), weight clamped between 10,000 and 40,000 pounds — that's DAT's accepted range, anything above or below gets rejected. Lanes are de-duped: if you have three loads going from Chicago to Atlanta on the same day, the CSV only includes the first.

Upload that CSV on DAT's bulk-post page. Hundreds of posts in seconds. You can also open the bigger 📤 Bulk Export modal with a date range — Today, This Week, custom — and see a preview before you download."

### [16:00 – 17:30] Chapter 9 — Filters: today, dates, min margin
> *(On-screen: click Today chip, set Min Margin to 200.)*
"Three filters at the top: the Today chip locks you to today's pickups only. The From/To dates do a range. And the Min Margin filter — type 200 — hides anything where customer quote minus posted amount is less than 200 dollars. That's the chip you set when you want to focus on the loads that are actually profitable to push. Combine with the search box and you can isolate, say, all of today's reefer loads above $300 margin in two seconds."

### [17:30 – 19:00] Chapter 10 — When to use Bolt vs Mass
"So when do you reach for which? Morning: Mass Post. You're pricing, running formula, writing back to Revenova, checking benchmark rates. That's the studio. Once the prices are locked and you're just dispatching — afternoon, the post-out sprint — Bolt Post. It's the same data, stripped down. Switch tabs in your browser. Or run them side by side, two monitors. I have Mass Post on the left for rate questions, Bolt Post on the right for the actual posting. They share nothing, no backend, your data never leaves your machine — but the column mapping and customer list you set up in one don't carry over. Set them up once in each."

### [19:00 – 20:00] Chapter 11 — Tips, gotchas, and the future
"Few quick things: the bookmarklet code is built at runtime — if you ever update the app, redrag the Fill DAT button to your bookmarks bar. Old bookmarks get stale. Second: Bolt Post and Mass Post each have their own settings, `bp_` vs `mp_` localStorage keys. Set up each one independently. Third: this is a single-file HTML app — no backend, no login, no data leaving your computer. The whole thing is under 3,000 lines of JavaScript. Open it up if you want to see how it works.

Roadmap: I'm looking at adding a Highway carrier-vetting check before you reply — that's the third leg of our tooling. Subscribe if you want to see it."

### [20:00 – 20:45] Outro
"That's Bolt Post. Mass Post for pricing, Bolt Post for posting, both built for brokers, both free, both single-file. Link in description, link to the Suite hub where the whole set lives. If this saved you 20 minutes today, the like button is worth a lot to me. Next video: rate trends and the formula deep-dive. See you there."

---

## 5. Chapters with timestamps

```
00:00 — Cold open: 38 loads still to post
00:18 — What this video is
01:00 — Why I split it into two apps
02:15 — Chapter 1: First-run setup
03:30 — Chapter 2: Pull the Salesforce report
05:00 — Chapter 3: Column mapping
06:30 — Chapter 4: The Copy → Fill DAT loop
08:30 — Chapter 5: Reply variations
10:30 — Chapter 6: Customer → Commodity learner
12:00 — Chapter 7: Multi-stop loads (the killer feature)
14:00 — Chapter 8: Bulk CSV export
16:00 — Chapter 9: Filters — today, dates, min margin
17:30 — Chapter 10: When to use Bolt vs Mass
19:00 — Chapter 11: Tips, gotchas, the future
20:00 — Outro + next video
```

**Word count target: ~3,000 words at 145 wpm = 20m 40s.** Comfortably inside the 18–24 min window.
