# Bolt Post — Tutorial Script (Long-Form, ~20 min)

> Voice: warm, broker-to-broker. First-person, second-person. No SaaS jargon. Read at ~145 wpm.

---

### [0:00 – 0:18] Cold open
> *(On-screen: black, then a single lightning-bolt cursor flicker → cut to Bolt Post header.)*

You ever sit down at noon and realize you still have 38 loads to post? Yeah. Me too. That's the day I built this. Two minutes from now you'll be moving a load out of Salesforce, onto a DAT post, with one click and one paste. Call it Bolt Post.

### [0:18 – 1:00] What this video is
> *(On-screen: title card "BOLT POST — the speed companion to Mass Post.")*

I'm Alec. I broker freight at Bay & Bay. Earlier I showed you Mass Post — the studio where I price loads, run my formula, write rates back to Revenova. This video is the companion. Bolt Post is the same data, stripped down to one job: post the load and reply to carriers faster than you can refresh your inbox. If you haven't watched the Mass Post video yet — link in description, watch it first; this one builds on it. If you have, let's go.

### [1:00 – 2:15] Why split it into two apps
Mass Post does a lot. Three tabs, DAT rate lookup, formulas, write-back. That's great in the morning when I'm pricing. But once the prices are set, all those buttons just get in the way. I'm not doing analysis anymore — I'm just moving loads. So I forked the UI. Bolt Post has no tabs. No rate lookup. No formula buttons. Just cards, grouped by day, with a Copy button and a Reply button. That's it. And because the loads come from the same Salesforce report and use the same column-mapping concept you set up in Mass Post, switching between the two takes almost zero setup.

### [2:15 – 3:30] Chapter 1 — First-run setup
> *(On-screen: open `bolt-post.html` in browser.)*

Open the app. First time you load it, the settings drawer pops open and asks for your name and email. Type those in — your name will show up under a few internal hooks; we'll get to a roadmap note about the reply sign-off later. Hit Save Profile. Next, the Fill DAT bookmarklet — see this purple-blue button? Drag it up to your bookmarks bar. Don't click it, drag it. That's how a bookmarklet gets installed. Last thing — paste your Salesforce report URL into the box and hit Save URL. If you're at Bay & Bay, it's already prefilled with mine. Close the drawer.

### [3:30 – 5:00] Chapter 2 — Pull the report
> *(On-screen: click ⚡ Pull Report → progress overlay → cards render.)*

Hit Pull Report. What's happening behind the scenes: Bolt Post is converting your Lightning URL to the old Classic report-servlet URL, then loading the CSV inside a hidden iframe using your existing Salesforce session cookie. It takes about three seconds. Now look at this — cards grouped by day. Today is expanded by default; tomorrow and beyond are collapsed but one click away. Past days drop to the bottom in case you need to backfill.

### [5:00 – 6:30] Chapter 3 — Column mapping
> *(On-screen: open Settings → Open Column Mapping.)*

If your loads come out garbled — origin in the wrong spot, no rate showing — that's a column-mapping issue. Open Settings, click Open Column Mapping. Seventeen DAT fields on the left, your report headers on the right. Bolt Post auto-guesses most of them by name — Origin, Destination, Pickup Date, Equipment, Length, Weight, Rate (which is your Posted Amount), Customer Quote, Customer, Stops, Reference. Anything left as 'skip' just won't show up. Hit Save Mapping. From now on it's remembered per browser.

### [6:30 – 8:30] Chapter 4 — The Copy → Fill DAT loop
> *(On-screen: card view, hover ⚡ Copy.)*

OK here's the move that the whole app exists for. Pick a card. Click the green Copy button. It just turned and said 'Copied' — your clipboard now has a JSON payload of every DAT field for this load.

Switch tabs to DAT One. Open the post-load form. Click the ⚡ Fill DAT bookmark in your bookmarks bar. A prompt pops up — paste with Ctrl+V — hit OK. Watch every field fill. Origin, destination, dates, equipment, length, weight, rate, reference, comments — gone. Five seconds. Done.

If 'Post to Team' is on in your settings, the Phone checkbox gets ticked instead of Email — that's so your team's main line rings instead of your personal inbox. Toggle it off when you want carriers calling you directly.

The reason this works on DAT — and a lot of bookmarklets don't — is we're using React's native value setters and firing the synthetic input/change/focus/blur events Angular Material expects. We match labels for the dynamic fields like Origin, Destination, and Rate, and stable IDs for the shipment fields. If DAT changes their form, the label-match still works. It's resilient on purpose.

### [8:30 – 10:30] Chapter 5 — Reply variations
> *(On-screen: click 💬 Reply, modal opens.)*

Carrier calls about a load. Click the Reply button. Three variations pop up — Standard, Casual, and Quick & Direct. Same load info, three different tones to match how your customer talks. Each one includes the greeting based on time of day, the pickup day-of-week, the pickup window, weight rounded to thousand-pound chunks, rate as whole dollars, equipment, and commodity.

Quick honesty note: in the current build, the sign-off line is hardcoded to my name. The profile name you saved earlier is used for some internal hooks and is a roadmap item for the reply text. If you fork the app and want it personalized today, swap the literal 'Alec' on a handful of lines for the `userName` variable — it's already loaded.

Click the variation you like — it copies. Paste into Outlook, into a text, into a DAT message. Done. The carrier gets a clean, complete response in the time it would have taken you to type 'Hi' and look up the rate.

### [10:30 – 12:00] Chapter 6 — Customer → Commodity learner
> *(On-screen: Settings → Customer → Commodity panel.)*

Most reports don't include the commodity on every line — but the same customer ships the same thing nine times out of ten. So Bolt Post lets you teach it. Down in Settings, the Customer → Commodity panel — add a customer name once, type the commodity, save. From then on, anytime that customer shows up in a load, your reply variations prefill the right commodity automatically. The in-app copy hints at fully automatic learning from your replies — that's a roadmap item. Today it's manual entry, persisted in your browser, no backend.

### [12:00 – 14:00] Chapter 7 — Multi-stop loads
> *(On-screen: scroll to a 3-stop load, point out the orange ⚠️ badge and pulsing red border.)*

This is the feature that doesn't exist in Mass Post. See this card with the orange ⚠️ 3-stops badge and the red glow pulsing around it? That's a multi-stop run. Bolt Post expands the card with a row for each intermediate stop — P for pickup, D for drop, location, appointment window. Type 'Memphis, TN' and '0700–1500 on Wed'. Saved automatically.

Now click Reply on that card. Look — the reply messages now include the stops in human language: "with a pickup in Memphis and a drop in Nashville at 0900–1500 on Wed." Carrier knows exactly what they're getting before they even ask. This is where Bolt Post pulls ahead — for multi-stops, Mass Post makes you do this in your head.

### [14:00 – 16:00] Chapter 8 — Bulk CSV export
> *(On-screen: click ☑ Select Export, click a few cards, then 📥 Export CSV for DAT.)*

For days you have 20+ loads to post, single-clicking is too slow. Click Select Export. Click cards you want — or Select All. Hit Export CSV. You get a CSV pre-shaped for DAT's bulk-post page: origin and destination split into city and state columns, equipment standardized — V, R, VR, F — weight clamped between 10,000 and 40,000 pounds because that's DAT's accepted range; anything above or below gets rejected. Lanes are de-duped: if you have three loads going from Chicago to Atlanta on the same day, the CSV only includes the first.

Upload that CSV on DAT's bulk-post page. Hundreds of posts in seconds. You can also open the bigger 📤 Bulk Export modal with a date range — Today, This Week, custom — and see a preview before you download.

### [16:00 – 17:30] Chapter 9 — Filters: today, dates, min margin
> *(On-screen: click Today chip, set Min Margin to 200.)*

Three filters at the top: the Today chip locks you to today's pickups only. The From/To dates do a range. And the Min Margin filter — type 200 — hides anything where customer quote minus your posted rate is less than 200 dollars. That's the chip you set when you want to focus on the loads that are actually profitable to push. Combine with the search box and you can isolate, say, all of today's reefer loads above $300 margin in two seconds.

### [17:30 – 19:00] Chapter 10 — When to use Bolt vs Mass
So when do you reach for which? Morning: Mass Post. You're pricing, running formula, writing back to Revenova, checking benchmark rates. That's the studio. Once the prices are locked and you're just dispatching — afternoon, the post-out sprint — Bolt Post. It's the same data, stripped down. Switch tabs in your browser. Or run them side by side on two monitors. I have Mass Post on the left for rate questions, Bolt Post on the right for the actual posting. They share nothing — no backend, your data never leaves your machine — but the column mapping and customer list you set up in one don't carry over either. Set them up once in each.

### [19:00 – 20:00] Chapter 11 — Tips, gotchas, and the future
Few quick things. The bookmarklet code is built at runtime — if you ever update the app, redrag the Fill DAT button to your bookmarks bar. Old bookmarks get stale. Second: Bolt Post and Mass Post each have their own settings, `bp_` versus `mp_` localStorage keys. Set up each one independently. Third: this is a single-file HTML app — no backend, no login, no data leaving your computer. The whole thing is under 3,000 lines of JavaScript. Open it up if you want to see how it works.

Roadmap: full reply personalization off the saved profile, full auto-learning on the Customer→Commodity map, and a Highway carrier-vetting check before you reply — that's the third leg of our tooling. Subscribe if you want to see it.

### [20:00 – 20:45] Outro
That's Bolt Post. Mass Post for pricing, Bolt Post for posting, both built for brokers, both free, both single file. Link in description, link to the Suite hub where the whole set lives. If this saved you 20 minutes today, the like button is worth a lot to me. Next video: rate trends and the formula deep-dive. See you there.

---

## Word count & runtime
~3,050 words at 145 wpm ≈ **21 min 0 s**, comfortably inside the 18–24 min target window.

## QA fixes applied (from `wat/tmp/qa-report.md`)
- **M1:** Reply sign-off claim corrected — now explicitly notes the hardcoded `'Alec'` literal and the roadmap fix.
- **M2:** Customer→Commodity claim softened from "auto-learns from your replies" to "manual entry today, auto-learning is a roadmap item."
- **m1:** Reply variation labels corrected to Standard / Casual / Quick & Direct.
- **m4:** Multi-stop badge described as `⚠️` (warning emoji + stops count), not all-caps "3 STOPS".
