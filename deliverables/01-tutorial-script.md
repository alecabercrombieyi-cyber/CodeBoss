# Mass Post — Tutorial script (long-form, ready to teleprompt)

Target length: **23–24 minutes**. Voice: warm, broker-to-broker. Speaker: Alec, freight broker at Bay & Bay. Timestamps approximate; retime to actual recording.

QA fixes applied (from `05-qa-report.md`):
- P0-1: Modal title kept verbatim as "Bulk Export — DAT + Salesforce" in narration (honest).
- P0-2: 20:50 aside admitting the 55-minute number is one broker's measured morning, not a guarantee.
- P0-3: Chapter 5 daemon-privacy line added.
- P0-4: Ctrl+V keyboard chip beat at 15:50.
- P1-1: Cold open qualifies the "5 minutes" claim with "daemon running" caveat.
- P1-3: Benchmark Rate softened to honest rollout language.
- P1-4: Chapter 5 split with skip-ahead overlay at 09:30.
- P2-1: Cold open trimmed by 2 words for pacing.

---

| Time | Narration | On-screen action |
|---|---|---|
| 00:00 | "If you've ever had two tabs open — Revenova on one, DAT on the other — typing the same rate into both, this is for you. I'm Alec, I broker freight at Bay and Bay, and I built this to stop doing that. Fifty loads, five minutes — with the local helper running. No retyping. Let me show you." | Slo-mo cursor click on `🚀 Express Export`. Lower-third: "Alec · freight broker · Bay & Bay". |
| 00:25 | "In the next twenty-something minutes I'll show you the whole loop — pulling a report from Revenova, looking up DAT rates for fifty lanes at once, pushing the new rates back to Salesforce, and dropping a bulk-upload CSV onto DAT. Same workflow I run every morning before coffee gets cold." | Cold-open title card: "MASS POST · the 24-minute tour". Chapter dots bottom strip. |
| 00:55 | "Quick disclaimer up front — this isn't a SaaS product. It's a single HTML file. You open it in Chrome, your data lives in your browser, and the only thing it talks to is your own Salesforce session. Built by brokers, for brokers — and if you want it, the file's on the Logistics Suite hub, free." | Show file path in address bar, then pan to suite hub at `app.html`. |
| 01:25 | **Chapter 1 — The 60-second tour** | Title card: `01 · The 60-second tour` |
| 01:30 | "Header here at the top: Pull Report, Load File, Express Export, Bulk Export. Bell for notifications, gear for settings. Three tabs underneath — Available, Shipping Today, Today Booked. That's the whole app's chrome." | Cursor hovers each header button; tooltips appear. |
| 02:00 | "Every row is a load — pickup date, equipment, customer, lane, rate. F-slash-BT toggles fuel surcharge on a whole customer. Notes icon opens coverage notes. Got an unread note? It glows." | Click an `F/BT` pill, click a notes icon, show the glow. |
| 02:30 | "And down in the corner — that's Watt. Local helper. Tracks new loads, flags when something gets booked but is still up on DAT. We'll come back to him." | Tap the cyan Watt button, close it. |
| 02:50 | "By the way — there's a 23-step tutorial baked into the app. Settings → Open Full Tutorial. If you ever forget where a button lives, that's the rescue rope." | Show Settings → Full Tutorial button, click then close. |
| 03:00 | **Chapter 2 — Pulling the report** | Title card: `02 · Pulling the report` |
| 03:05 | "First time you use Mass Post, open Settings — gear icon — paste your Lightning report URL. We use a TMS report called AA_Modified1. Save URL." | Open Settings, scroll to "Salesforce Report URL", paste a redacted URL, click Save. |
| 03:30 | "Only requirement: you have to be logged into Salesforce in this same browser. Mass Post grabs the report through a hidden iframe using your session cookie. No password storage, no API key." | Show another tab with Salesforce open. |
| 03:55 | "Now hit Pull Report. Progress overlay, about ten seconds, done. Cards populate by day." | Click `⚡ Pull Report`, show progress overlay, then populated grid. |
| 04:20 | **Chapter 3 — The Bulk Export modal** | Title card: `03 · Bulk Export — the headline feature` |
| 04:25 | "This is the part that saves the most time. Click 📤 Bulk Export. Heads up — the modal header still says 'DAT plus Salesforce'. Same system as Revenova, we're still finishing the rename." | Click `📤 Bulk Export`. Pink dashed ring on the modal title for 1 s. |
| 04:50 | "From and To dates, with quick toggles for Today and Tomorrow. Most mornings I click Today. Then Load Lanes." | Click `Today`, click `Load Lanes`. |
| 05:10 | "Now we've got a preview table. Date, Load number, Equipment — that's already normalized from your Salesforce code, so V-slash-R becomes VR, Step Deck becomes F, Straight Box stays SB and gets skipped on the rate lookup. Lane, DAT slash Benchmark, Current Rate, New Rate." | Zoom on the preview table; highlight the equipment column at 1.6×. |
| 05:45 | **Chapter 4 — Quick Rate Lookup, 50 lanes deep** | Title card: `04 · Quick Rate Lookup, 50 lanes deep` |
| 05:50 | "OK here's the magic. Click 📊 Get DAT Rates. Yellow tip box pops up — three steps. The button copied a payload to your clipboard." | Click `📊 Get DAT Rates`, show toast + yellow tip. |
| 06:15 | "Step one — switch to DAT Tools. That's one-dot-dat-dot-com slash tools. You need to have the 🔄 Mass Post Helper bookmarklet on your bookmarks bar. Drag it from Settings if you haven't. Step two — click that bookmark." | Cmd-tab to DAT Tools, click the purple bookmark, show progress overlay appearing on the DAT page. |
| 06:50 | "Watch this. It pastes the first lane, picks the city in the autocomplete, sets the equipment, hits Search. Reads the Spot and Contract rates. Clears, next lane, repeat. About four seconds per lane. Why four? There's a stale-rate bug in the faster version — I left the timing in so the rates are right, not fast." | Speed-up clip of the bookmarklet running across ~10 lanes, "3×" mono chip top-right. |
| 07:30 | "When it's done you'll see a purple Copy Rates button. Click it. That's a fresh user gesture, which Chrome's clipboard API insists on. Don't skip it." | Click the purple `📋 Copy Rates` button on the DAT page. |
| 08:00 | "Back to Mass Post. Click 📋 Paste Rates. New Rate column fills in with the raw DAT Spot for every lane." | Switch back, click `📋 Paste Rates`, show columns filling. |
| 08:30 | **Chapter 5 — The 20× faster path** | Title card: `05 · The 20× faster path (dat-pp-cli)` |
| 08:35 | "Optional but worth it. There's a local helper called dat-pp-cli. Download the .exe, run start-dat-daemons.bat, and Mass Post will skip the bookmarklet entirely — Get DAT Rates pulls straight from DAT's own API. Drops a fifty-lane batch from three minutes to ten seconds." | Show Settings → dat-pp-cli section, the three download buttons. Show two daemon windows. |
| 09:10 | "Quick privacy note: the daemon stores your DAT token locally only. It never leaves your machine. Same privacy posture as the bookmarklet, just faster." | Hold on the daemon terminal windows for the beat. |
| 09:30 | "Token rotates every thirty minutes, so when Mass Post asks, click the green 🔐 Grab DAT Token bookmarklet on one-dot-dat-dot-com. That's the only friction." | Click the green bookmarklet on DAT, toast confirms. (Overlay bottom-right: "(Skip the daemon? → 10:00")) |
| 09:50 | "If the daemon's not running, no big deal — falls back to the bookmarklet flow we just covered." | Show the fallback toast. |
| 10:00 | **Chapter 6 — Adjusting rates** | Title card: `06 · Adjusting rates without breaking your spreadsheet brain` |
| 10:05 | "Now the rates are in. DAT slash Benchmark column shows the raw Spot, an arrow comparing it to your current rate with the dollar and percent delta, and a warning sign if the change is five percent or more. That's your gut-check column." | Zoom on a row with a ⚠️ marker. |
| 10:45 | "Per-row steppers: minus fifty, plus fifty. They snap. If you're at $1,099 and click plus, you land on $1,100, not $1,149. Snap-to-fifty." | Click steppers on two rows; show snap. |
| 11:15 | "Top bar: minus fifty all, plus fifty all, Apply Formula, Reset to raw DAT. Totals on the right." | Click `−$50 all`, click `↺ Reset to raw DAT`. |
| 11:45 | "The formula lives in Settings. Default is Spot minus $150, round down to $50. You can change the base to Spot Low, Spot High, or Contract — flat or percent adjust, round direction, round-to step, optional floor. Click Apply Formula and the New Rate column re-computes." | Open Settings, walk through each Rate Formula control. Close, click `⚡ Apply formula`. |
| 12:30 | **Chapter 7 — Writing back to Revenova** | Title card: `07 · Writing back to Revenova` |
| 12:35 | "Once your New Rate column looks right, click 💰 Posted Amount. That's the polished path — it copies a payload for the Mass Post Helper to write back as Posted Amount." | Click `💰 Posted Amount`, show toast. |
| 13:00 | "There's also a 📊 Benchmark Rate button. Posted Amount is the polished path; Benchmark Rate works on the export side and is rolling out for the Revenova writeback — give it a try and tell me what breaks." | Hover Benchmark Rate button, don't click. |
| 13:20 | "Switch to Revenova list view. Click 🔄 Mass Post Helper — same bookmarklet, it auto-detects which page you're on. It walks the list, matches each row by load number, opens the inline edit, types your rate, moves on." | Speed-up clip on Revenova list view. |
| 13:50 | "When it's done — and this is important — click Revenova's own Save button. The bookmarklet only stages the edits. Save commits them." | Click Revenova's Save. |
| 14:00 | **Chapter 8 — Download CSV → upload to DAT** | Title card: `08 · Download CSV → upload to DAT` |
| 14:05 | "Back in Mass Post, click 📥 Download CSV for DAT. You get a file in your Downloads folder formatted exactly for DAT's bulk-post page." | Click button; show file appearing in Downloads. |
| 14:25 | "Open DAT, head to Post a Load → Bulk Post → Upload File. Pick that CSV. DAT validates, you click confirm, your loads are live." | DAT bulk-post page; upload the file. |
| 15:00 | **Chapter 9 — Express Export** | Title card: `09 · Express Export — for when you're late` |
| 15:05 | "Hit 🚀 Express Export. File picker. Pick the report. It processes, jumps straight into the Bulk Export modal with Today already selected. Three clicks instead of seven." | Live demo. |
| 15:35 | **Chapter 10 — Post Alone** | Title card: `10 · Post Alone — the urgent one` |
| 15:40 | "Expand any row. ⚡ Post Alone copies that one load. Switch to DAT's normal post-a-load form, click the ⚡ Fill DAT bookmarklet, paste with Ctrl+V into the prompt, hit OK. Form fills, you click Post." | Live demo on a single load. **Mint keyboard chip at 15:50:** `Ctrl + V`. |
| 16:15 | "Settings → Post to Team toggle: when on, single posts use your team phone line instead of your email. Carriers call the team. When off, calls come to you." | Toggle the switch. |
| 16:35 | **Chapter 11 — Watt watches** | Title card: `11 · Watt watches the dangerous part` |
| 16:40 | "The worst thing in this job is a load gets covered, but DAT still has it posted, and carriers keep calling. Watt watches for that. When a load you posted shows up as Booked, Watt flags it." | Open Watt, show an alert badge. |
| 17:15 | "Click the alert. Expand the row. ✓ Taken Down From DAT — that closes the loop. Watt stops bugging you." | Walk through the takedown action. |
| 17:45 | **Chapter 12 — The little settings** | Title card: `12 · The little settings that pay rent` |
| 17:50 | "Customer-to-commodity map. Auto-learns from your quick replies, but you can pre-fill it. When you copy a Post Alone payload, the commodity comes from this map. Saves typing on every single post." | Show Settings → Customer → Commodity, add one entry. |
| 18:25 | "Fuel slider — sets the per-mile fuel surcharge that gets added to projected margin when F-slash-BT is on for a customer. Requires a Total Miles column in your report." | Slide the slider, show the readout. |
| 18:55 | **Chapter 13 — Gotchas** | Title card: `13 · Gotchas — the stuff I wish I'd told my past self` |
| 19:00 | "One — you must be logged into Salesforce in the same browser. No login, no report. Two — every time Mass Post updates, you have to re-drag both bookmarklets from Settings. The bookmark URL is frozen the moment you drag it." | Highlight Settings → bookmarklets. |
| 19:30 | "Three — Chrome will tell you dat-pp-cli-dot-exe may be dangerous. It's not, it's just unsigned. Click Keep. Four — the rate scrape takes about four seconds per lane on purpose. The fast version had a stale-rate bug where every lane came back with lane one's rate. Slow is correct." | Show the Chrome download warning. |
| 20:00 | **Chapter 14 — Quick Reply** | Title card: `14 · Quick Reply for carrier emails` |
| 20:05 | "Expand a row, click 💬 Quick Reply. Picks a template, fills the carrier name, the load number, your contact info from Profile. Copies to clipboard. Paste in Outlook." | Demo the quick reply flow. |
| 20:35 | **Chapter 15 — A morning with Mass Post** | Title card: `15 · A morning with Mass Post` |
| 20:40 | "Here's what a real morning looks like. Pull Report, Bulk Export Today, Get DAT Rates, Apply Formula, eyeball the warnings, Posted Amount to Revenova, Save in Revenova, Download CSV, upload to DAT. Five minutes for fifty loads on a daemon morning. About fifteen minutes if I'm scraping. Used to be an hour either way." | Time-lapse of the full roundtrip in 15 seconds. |
| 20:50 | "And to be honest — that five-minute number is one broker's measured morning, on my hardware, with the daemon running. Your mileage will vary. The point isn't the exact number; it's that the retyping is gone." | Gold chip lower-third: "one broker's morning · YMMV". |
| 21:30 | "Where to get it: Logistics Suite hub, link in the description, no signup. Single HTML file. Your data stays in your browser." | Show the suite hub `app.html` with the Mass Post tile. |
| 22:00 | "If you build something on top of this — or want a feature — I built this in public, my number's in the description. We can talk freight." | Outro card with name + Logistics Suite tagline. |
| 22:30 | End slate (~10 s) — Subscribe + next video tease (Bolt Post). | Cards. |
| 22:40 | Music tail. | — |

**Total spoken runtime:** ~22:40
**With outro buffer:** 23:00–24:00 upload-ready.
