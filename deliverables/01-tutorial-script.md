# Freight Matcher — Tutorial Script (Final, post-QA)

**Target runtime**: 19 minutes 10 seconds
**Window**: 18–24 minutes ✅
**Voice**: broker-to-broker · warm · no enterprise jargon
**Recording**: 1920×1080 OBS, freight-matcher.html in Chrome, fresh Incognito profile, DeepSeek key pre-set

## On-screen action key
- `[CAM]` — talking head / B-roll of broker setup
- `[SCRN]` — full-screen browser capture
- `[SCRN+]` — screen capture with picture-in-picture talking head bottom-right
- `[TITLE]` — full-bleed title card
- `[BUMPER]` — chapter bumper
- `[L3]` — lower-third callout
- `[CHIP]` — small on-screen callout chip

---

## 0:00 – 0:30 · Cold open

`[CAM]` Broker laptop, Outlook open with the "Carrier Availability" folder visible, sticky note saying "Inbox sweep" on the bezel.

**VO (Take A — personal):**
> "47 carrier emails. Three open loads I can't seem to cover. I've done this every morning for a long time — it's the hour that owns my mornings. Then I built this."

**VO (Take B — Suite-branded):**
> "47 carrier emails. Three open loads we can't seem to cover. Brokers do this every morning — it's the hour that owns the morning. Here's the tool."

`[TITLE]` 0:08 — `FREIGHT MATCHER` (Outfit 110pt, cream, candy underline)
Sub: `Truck-to-load matching, in about a minute.`

`[SCRN]` 0:20 — Cut to `app.html` hub, scroll to FM tile, click it. App loads.

---

## 0:30 – 2:00 · What Freight Matcher actually does

`[BUMPER]` `01 · WHAT IT DOES`

**VO**:
> "Paste your trucks. Paste your loads. The map figures out who fits who. That's the whole thing.
>
> Four tabs across the top: Trucks, Loads, Map, Matches. Two-step input, one-step result, one-click send-back.
>
> No login. No signup. The whole app is one HTML file. Your data stays in your browser. The only thing you need is a free DeepSeek API key — five million tokens free, no credit card. And for one common load format we don't even need that — it's parsed locally for zero cost.
>
> Let me show you the headline use case: an inbox sweep of 47 carrier emails."

`[SCRN]` Hover each tab in order, don't click; pause on Map tab.

---

## 2:00 – 3:30 · 60-second setup

`[BUMPER]` `02 · 60-SECOND SETUP`

`[SCRN]` Open FM cold (Incognito #2) → KeyScreen. Big flame emoji, "Where loads meet trucks."

**VO**:
> "First run. The app needs one thing: a DeepSeek API key. Two-tab side trip."

`[SCRN]` Cut to `platform.deepseek.com` — sign up with Google, dashboard, "API Keys", create key, copy.

**VO**:
> "Free account, no card. Click Create New Key, copy it."

`[SCRN]` Back to FM → paste into the password field → 🔥 Light it up.

**VO**:
> "Click 'Light it up.' That key is now in your browser's localStorage — it never goes to my server because there is no server."

`[CHIP]` `THE WHOLE THING IS FREE` (candy pill, top-right, 2s)

---

## 3:30 – 6:30 · Paste 47 emails — AI does the rest

`[BUMPER]` `03 · TRUCKS (PASTE THE INBOX)`

`[SCRN]` Back in Outlook, "Carrier Availability" folder, search bar → "today" → 47 results visible.

**VO**:
> "Outlook. Search your carrier folder for today. Ctrl-A to select everything, Ctrl-C to copy — or ⌘ if you're on a Mac. We're grabbing the whole pile."

`[SCRN]` FM Trucks tab → paste into the textarea. Lots of text. Show the line counter at the bottom — "247 lines."

**VO**:
> "Click 🔥 Parse."

`[SCRN]` Spinner ~3 seconds. Preview drops down: "🔥 Found 47 trucks."

**VO** (while previewing):
> "Look at what came back. Each truck has a location, an equipment type, sometimes a carrier email, sometimes a date the truck is available, sometimes — and this is the one that matters — a preferred lane.
>
> See that one? Dallas TX, Reefer, Felix at hegelmann dot us, wants Midwest. The AI saw the words 'Dallas to MIDWEST' in an email and figured out 'Midwest' isn't a city — it's a region the dispatcher wants to send the truck to. We'll come back to that.
>
> See that other one? It came from a list that said 'REEFERS:' at the top, and three trucks below. The parser inherited the equipment from the header. It also caught the date header — 'WEDNESDAY 3.25.2026' — and applied it to the whole block.
>
> Hit Add All."

`[SCRN]` Toast: "Added 47 trucks (3 duplicates merged)."

`[CHIP]` `47 TRUCKS PARSED` 1.6s top-right green

**VO**:
> "Three duplicates auto-merged. Same carrier, same location — the app combined their lanes and dates instead of creating two cards.
>
> Scroll the fleet. Cards by carrier. Equipment chip, lane chip, available date chip. If something didn't geocode yet you'll see 'Geocoding' on it — that's the app working on cities outside our cache, one per second, in the background."

---

## 6:30 – 9:00 · Loads — TRM is free, everything else is AI

`[BUMPER]` `04 · LOADS (TRM = FREE, AI = EVERYTHING ELSE)`

`[SCRN]` TRM open in another tab. Open loads list. Select all → copy.

**VO**:
> "Same move on the load side. Here's our TRM open-loads view. Select all, copy."

`[SCRN]` FM Loads tab → paste → 23 lines visible → click 🔥 Parse.

`[SCRN]` Instant green banner: "⚡ Parsed 23 loads instantly — no API cost"

`[CHIP]` `⚡ NO API COST` (flame pill, 2s)

**VO**:
> "Zero seconds. Zero API calls. That's because TRM exports a specific pattern — origin, destination, pickup date and time, delivery date and time, equipment, then 'Select Item N' as a divider — and the app recognizes the pattern and parses it locally. If you don't use TRM, no problem — anything else falls through to the AI parser automatically. Revenova, DAT, plain-text email blasts — all handled."

`[SCRN]` Add All → toast: "Added 23 loads."

`[SCRN]` Scroll the load board. Cards: origin → destination, equipment chip, rate, pickup date.

---

## 9:00 – 12:00 · The map (and the fire)

`[BUMPER]` `05 · THE MAP`

`[SCRN]` Click Map tab. Brief fire-splash animation (5 little fire puffs).

**VO**:
> "Map tab. Watch what just happened — that little fire-burst means the matches are live. Every truck is a 🚛 in its equipment color. Every load is a 📦 along its route. Every match hotspot has a 🔥 on it.
>
> Bottom-left, the legend. Equipment colors: orange flatbed, blue van, green reefer, purple step deck, pink tanker."

`[L3]` Alec · Bay & Bay Transportation · `freight-matcher.html`

`[SCRN]` Hover a truck → popup with location, equipment, carrier, 3 matches.

**VO**:
> "Hover any truck — quick popup with the count."

`[SCRN]` Click the truck. Pulse ring + dashed red radius circle + green dashed lines to matched loads. Fire icons over matched loads.

**VO**:
> "Click and the truck selects. You get a pulse ring on the truck, a dashed red circle showing your radius, and green dashed lines to every matched load. The right panel updates with the same info as a list — first five matches with distance and rate."

`[SCRN]` Drag radius slider from 100 to 250 → new fires appear.

**VO**:
> "Drag the radius. Watch new fires light up at 150… 200… 250. Drag back down to 50 — the fires go out. The radius is in miles, ten to five hundred, your default sticks across sessions."

`[CHIP]` `🔥 32 MATCHES` (bottom-right sticky, match-green chip)

`[SCRN]` Toggle equipment filters → uncheck Van/Dry Van → only reefer+flatbed visible.

**VO**:
> "Equipment filters on the right. Four primary types, 'More Types' for flatbed, step deck, straight truck, tanker. Uncheck Van, you get reefers-only on the map and the matches."

---

## 12:00 – 14:00 · Lane awareness

`[BUMPER]` `06 · LANE AWARENESS`

**VO**:
> "Here's the part that separates this from a radius search. Trucks often tell you where they *want* to go. The parser captures that, the matcher uses it."

`[SCRN]` Select the Dallas-TX truck whose lane is "Midwest." Show cyan dashed arrows shooting out to Chicago, Detroit, Indianapolis (lane-proxy lines). Map filters loads to only those ending in Midwest states.

**VO**:
> "Dallas reefer, lane Midwest. The cyan dashed arrows are the lane direction. Now look at the matches — every load that lights up is going to a Midwest state. Illinois, Indiana, Ohio, Michigan, Wisconsin, Missouri. A Dallas-to-LA load? Not a match. A Dallas-to-Atlanta load? Not a match either — Atlanta is Southeast, not Midwest.
>
> Regions are baked in: Midwest, Southeast, Northeast, Southwest, Gulf, Pacific Northwest, Mountain, Plains, Great Lakes, New England, Mid-Atlantic. The parser knows the words, the matcher knows the states."

`[SCRN]` Select a different truck with a city-to-city lane: "Dallas to Houston." Show that Dallas→San Antonio matches (along the lane), Dallas→Memphis explicitly does NOT match (wrong direction).

**VO**:
> "Or city-to-city lanes. Dallas to Houston — the matcher checks that the load's destination is along that lane, not somewhere off to the side, not going backward. Dallas-to-San Antonio matches; San Antonio is on the way. Dallas-to-Memphis doesn't match; Memphis is the wrong direction."

---

## 14:00 – 16:30 · Email back, with a table image

`[BUMPER]` `07 · EMAIL BACK WITH A TABLE`

`[SCRN]` Switch to Matches tab. Grouped by truck. First group expanded.

**VO**:
> "Matches tab. Trucks on the outside, their matched loads inside. Lane matches are sorted to the top.
>
> Here's where this app earns its existence — the send-back."

`[SCRN]` Click 📧 on one truck. Toast: "Email copied with load image — paste into your email body." mailto: opens in default mail client.

**VO**:
> "Click the email button. The app builds an HTML email with a table — origin, destination, pickup, delivery, equipment, distance — rendered as a PNG image. It copies the whole rich email to your clipboard and opens mailto with the subject pre-filled."

`[SCRN]` Paste into Gmail composer → the PNG table renders inline.

**VO**:
> "Paste into Gmail or Outlook. The table comes along as an image. Carrier sees a clean layout, no formatting headaches."

`[SCRN]` Back to Matches tab. Click "📧 Send All Matches (32)" big blue button.

**VO**:
> "And if multiple trucks came from the same carrier, click 'Send All' — the app auto-groups by carrier email. One message to Felix covering four of his trucks and eleven of our loads. One PNG with every line."

`[SCRN]` Click "📊 Export CSV" — file downloads.

**VO**:
> "Or export the whole match set to CSV if your workflow lives in spreadsheets."

---

## 16:30 – 17:50 · ROI · settings · session export

`[BUMPER]` `08 · ROI · SETTINGS · CSV`

`[SCRN]` Click the gear ⚙ icon top-right → Settings panel.

**VO**:
> "Settings. Your name for the email sign-off. Default radius. API key reset. Session export and import — that's the JSON of every truck and load you've got loaded; useful if you're swapping machines or backing up before a 'New session'.
>
> Second tab — Workflow Benefits."

`[SCRN]` Click "📊 Workflow Benefits" tab inside settings.

**VO**:
> "This is the math. Manual process — eight minutes per match between cross-referencing, the call, the email. With this app, thirty seconds. Multiply by today's matches. Multiply by an average dispatcher rate.
>
> This morning's number lives at the bottom — time saved, dollars saved, percent faster. It's not marketing — it's the actual workings of your session right now."

`[SCRN]` Close settings → click "🗑️ New" in the header → confirm.

**VO**:
> "And when you're done with a sweep, hit New, confirm, and it's clean for tomorrow."

---

## 17:50 – 18:50 · Where it fits

`[BUMPER]` `09 · WHERE IT FITS`

`[SCRN]` Back to Logistics Suite hub `app.html`. All 7 tiles visible.

**VO**:
> "Freight Matcher is app four of seven in the Logistics Suite. Mass Post, Bolt Post, Load Manager came first — those handle the rate side and the bid side. Freight Matcher does the carrier-availability side. Coming up: CarrierVet for vetting, Data Wash for safe sharing, Pillar for the rest.
>
> Every app is a single HTML file. Every app is free. Every app is local. The whole suite is at — link in the description."

---

## 18:50 – 19:10 · Outro

`[CAM]` Talking head.

**VO**:
> "If you're a broker losing your mornings to inbox sweeps, give Freight Matcher a try. It's free. The DeepSeek key is free. The source is on GitHub if you want to fork it.
>
> Built by brokers, for brokers. The sweet side of freight. See you in the next one — CarrierVet."

`[TITLE]` End card:
- Big: `THAT'S APP 4 OF 7.`
- Sub: `Next: CarrierVet — broker-grade carrier vetting.`
- CTA pill: `LOGISTICSSUITE — ALL FREE` (URL confirmed pre-publish)

---

## Recording-day prep (carried from QA, mandatory)
- [ ] Use a fresh Incognito window with `fm_key` localStorage pre-set (avoid the key-prompt step in the live recording if doing a single take)
- [ ] Use a *second* Incognito for the "first-run setup" chapter to capture the KeyScreen
- [ ] Demo cities: stay inside the 250 hard-coded cache — Dallas, Houston, Chicago, Memphis, Indianapolis, Atlanta, Denver, LA, Felix-Hegelmann's actual route cities — to avoid Nominatim hops during the demo
- [ ] Trigger the clipboard-image copy once before the take so the browser permission dialog is already resolved
- [ ] Pre-paste fallback `.txt` files of trucks and loads in case Outlook/TRM is moody
- [ ] Music: lo-fi instrumental, -20 LUFS under VO, lift at 0:08 / 9:00 / 18:20

## Chapters (paste into YouTube)
```
0:00  The hour that owns my mornings
0:30  What Freight Matcher actually does
2:00  60-second setup (free DeepSeek key)
3:30  Paste 47 emails — AI does the rest
6:30  Loads: TRM is free, everything else is AI
9:00  The map (and the fire)
12:00 Lane awareness & regional matching
14:00 One-click email back with a table image
16:30 ROI math, settings, session export
17:50 Where it fits in the Logistics Suite
18:50 Outro
```
