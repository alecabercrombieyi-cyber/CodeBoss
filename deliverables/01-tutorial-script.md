# CarrierVet — Long-form Tutorial Script (FINAL)

**Target length:** 20:30 (trimmed from research draft per QA fixes P1-1 and P1-3).
**Voice:** Warm, broker-to-broker. No enterprise jargon.
**Format:** `[mm:ss] NARRATION || ON-SCREEN ACTION`

---

## Chapter 0 — Cold open (0:00 – 0:25)

```
[0:00] "If you've ever booked a carrier and three hours later realized they re-brokered your load to a stranger — yeah. The average double-broker loss runs three to twenty-five thousand a load. This stops that."
   || Hold 2 s on red FACTORING BLOCKED banner. Cut to three tier cards flipping green / amber / red.
[0:15] "I'm Alec. I'm a broker at Bay & Bay. This is CarrierVet — app number five in the Logistics Suite, the one I open more than any other before I move on a load. We'll do an actual end-to-end vet at the 14-minute mark."
   || Cut to app.html hub. Hover, click app #5 card.
```

## Chapter 1 — What it is, what it isn't (0:25 – 1:55)

```
[0:25] "Before we go anywhere — CarrierVet is not Highway. It's not FMCSA SAFER. It's not a fraud-scoring AI. What it IS, is the screen between you and those tools."
   || Lower-third pill: "CarrierVet ≠ Highway. CarrierVet → Highway."
[0:50] "It pulls your own Revenova history, scores the carrier against your shop's tier rules, and surfaces the two flags that actually get loads stolen: factoring companies you've already blocked, and zero shipment history with you."
   || Cut to factoring banner close-up. Then tier-card close-up.
[1:15] "At Bay & Bay we run three tiers. Tier 1 is your Boston Beers — posting allowed, manager approves. Tier 2 is your Gallos and Constellations — manager plus compliance, and when you post on DAT you have to use alternate cities. That posting rule's enforced in Mass Post, not here. Tier 3 is your Jägermeisters and Pernod Ricards — posting not allowed, period. CarrierVet checks all three at once. Authority age you still verify in Highway — CarrierVet doesn't pull that, the tier rules just tell you what bar you need to clear."
   || Three quick slates: TIER 1 mint, TIER 2 gold, TIER 3 red. Each with the customer name shown for 2 s.
```

## Chapter 2 — First-run setup (1:55 – 3:50)

```
[1:55] "First time you open CarrierVet, two buttons — pull from Salesforce, or upload a CSV."
   || Welcome screen.
[2:10] "If Salesforce, click 'Configure Salesforce Auto-Export'. Paste the URL of your carrier history report. Lightning URL or classic servlet URL — both work."
   || Click Configure, paste Lightning URL.
[2:40] "CarrierVet rewrites that into a CSV servlet URL behind the scenes, uses your existing session cookie — no API key, no token. You just have to be logged into Salesforce in this browser. Hit save. Green Pull button appears."
   || Highlight rewritten URL. Click Save. Show green button.
[3:10] "Click it. This is the 26-second wait — Salesforce takes about that long to compile a report this size. Don't refresh."
   || Hold on download screen, let progress bar run a few steps.
[3:35] "File picker opens automatically when it's done. Pick the file."
   || Click file in picker.
```

## Chapter 3 — Reading the carrier dashboard (3:50 – 7:50)

```
[3:50] "Main screen. Top right, the data badge — that's your universe. Whatever your report has, that's what CarrierVet sees."
   || Highlight data badge. (EDITOR: confirm the actual numbers from this recording.)
[4:05] "Type a carrier name."
   || Type carrier name into mcInput.
[4:15] "Three things render. Carrier header up top, three tier cards in the middle, and — if applicable — that red factoring banner."
   || Pan down the dashboard.
[4:30] "Header: name, MC, DOT, and the link strip. Open in Highway is the big green button. FMCSA SAFER and Carrier411 are next to it. These are deep-links. CarrierVet doesn't pull from those services, it opens a tab in your existing session."
   || Hover each external link. Frame Highway button at 50% so cream/pink chrome stays visible (per visual spec).
[5:10] "Now the tier cards. Green = pass. Amber = needs references, can cover one missing qualification. Red = not eligible. Click any card to expand."
   || Cycle through three example carriers — green / amber / red.
[5:40] "Tier 1 is the simplest. One qualification: one load with us in the last six months, OR a Highway Heatmap showing Moderate or higher around origin and destination. If you don't have the load history, the card gives you a Highway link to check the heatmap."
   || Click Tier 1 card. Walk through the qual line.
[6:20] "Tier 2 — two of three. Six loads in the last 12 months. Two loads on the same or similar lane. One load in the last 4 months for recency. If you only meet two, you're still amber — refs can cover the third."
   || Click Tier 2 card. Walk each qual.
[7:00] "Tier 3 is strict. Ten loads in 12 months. Three loads same lane. Recency in 3 months. Posting is not allowed at Tier 3 — this is a sit-down conversation with compliance."
   || Click Tier 3 card.
```

## Chapter 4 — The factoring banner (7:50 – 10:20)

```
[7:50] "Now the part that pays for itself in one save."
   || Cut to a dashboard with the red factoring banner. Frame at 1.5x zoom (visual spec hero moment).
[8:00] "If the carrier's most recent remit-to matches a company you've blocked, you see this red banner before you read anything else."
   || Hold on banner.
[8:25] "This is your list. CarrierVet ships with a default list pre-loaded — these are the ones we chose to block at Bay & Bay. Yours might be different. The real value is when you add the one that burned YOUR brokerage last week. Settings, gear icon, top right."
   || Click gear → Factoring tab.
[9:00] "Every factoring company you've blocked is here. Add one — type, hit enter. Remove — hover, click X. Reset to defaults if you want to start over."
   || Add a placeholder "Acme Capital", remove it, demo reset.
[9:25] "Two important caveats. One — CarrierVet only flags off the MOST RECENT remit-to in the data. If a carrier switched factors three months ago, you'll see the new one. Two — if the remit-to matches the carrier's own name, that's self-remit and we ignore it. That's not a factoring company, that's a carrier billing direct."
   || Lower-third pill: "Self-remit is IGNORED."
[10:00] "This list is shared across the Logistics Suite via localStorage. Add a factor here, Mass Post sees it. The blocklist follows you across the suite."
   || Brief 1.5 s cut to Mass Post's factoring tab showing the same list.
```

## Chapter 5 — Customers tab (10:20 – 11:35)

```
[10:20] "Customers tab — Settings, second tab over."
   || Settings → Customers.
[10:30] "This is where you edit which customers belong to which tier. Loaded with Bay & Bay's list out of the box. Your shop's tiers are not our tiers — edit them."
   || Scroll through the three sections.
[10:55] "Add — type, enter. Remove — hover, X. Saves to this browser only."
   || Add and remove a customer.
[11:15] "Why this matters: the lock badges. When you expand a tier card, customers the carrier has actually moved freight for show up with a gold lock. That's proven experience at that tier."
   || Cut to expanded tier card showing a gold lock on a customer row.
```

## Chapter 6 — Settings deep dive (11:35 – 12:45)

```
[11:35] "Quick tour of General. Salesforce URL — edit here if your report changes. Re-watch tutorial — that's the three-step onboarding. Reset CarrierVet — nuclear option, clears all localStorage."
   || Settings → General. Hover each row.
[12:00] "One developer note worth knowing — every localStorage key is prefixed clis underscore. CLIS was the working name before we renamed it CarrierVet. Don't worry about this if you're not a developer — it's just a name."
   || Brief 1.5 s cut to DevTools → Application → Local Storage, show clis_ keys.
[12:25] "There's also a Workflow tab — static visual showing the before-and-after. Thirty-five minutes per vet down to ten seconds. Use it when you're selling this internally."
   || Open Workflow tab. Hold 2 s on savings card.
```

## Chapter 7 — Real-world end-to-end vet (12:45 – 17:30)

```
[12:45] "OK. Real vet. Phone's ringing — a carrier wants to cover a Constellation load. Constellation is Tier 2."
   || Cold cut: desk-phone ring SFX, 0.6 s photo, then back to CarrierVet.
[13:05] "Type the carrier name. Three cards render. Tier 2 is amber — needs references — two of three quals met."
   || Type name. Hold on amber Tier 2 card.
[13:30] "Click the card. Seven loads with us in 12 months — volume check passes. One load on this exact lane — that misses the alt-lane requirement, which wants two on similar lanes. Recency — last load 60 days ago — meets the 4-month window."
   || Expand card. Hover each qual row.
[14:10] "Two of three. References cover the third. That's a manager-plus-compliance call, but it's NOT a no."
   || Overlay slate: "2 of 3 → Refs can cover."
[14:30] "Before that call, verify the basics. Click 'Open in Highway' — big green button at the top."
   || Click Open in Highway. Cut to Highway tab (frame at 50%, pink lower-third pill visible).
[14:55] "Authority's clean. Insurance current. Heatmap Moderate around both ends. Cross-check Carrier411 — no identity flags. Done. Total time including Highway: under five minutes."
   || Quick cut: Highway → Carrier411 → back to CarrierVet.
[15:45] "Compare that to where we were two years ago. Thirty-five minutes per vet, four tabs, an SOP doc, a coin flip on whether you remembered to check Carrier411. Twenty-something carriers a day across our floor times twenty minutes saved — that's the math that built this."
   || Cut back to Workflow savings card.
[16:30] "And if that banner had been red — wrong factoring company, history of fraud — none of this would have mattered. I would have hung up. That's the unfair-advantage moment, and you can't get it without your OWN factoring list."
   || Reshow red factoring banner.
```

## Chapter 8 — Gotchas (17:30 – 19:45)

```
[17:30] "Five things that break this."
   || Title card: "WHAT BREAKS IT" (gold underline variant).
[17:35] "One. You have to be logged into Salesforce in the same browser. The auto-pull uses your session cookie. Logged out, you get a Salesforce login page in the iframe and nothing downloads."
   || Show Salesforce login as fail state.
[18:00] "Two. The 26-second wait is real. Salesforce isn't fast. Don't refresh."
   || Brief hold on elapsed counter.
[18:15] "Three. CarrierVet only sees what's in your Revenova history. A brand-new carrier with zero loads will fail every tier check. Doesn't mean don't book them — means the app can't help you decide. Go to Highway, look at the heatmap, make the call."
   || Show zero-history red tier card → Highway heatmap cut.
[18:45] "Four. The factoring blocklist is per-browser. New dispatcher starts with the defaults. Either export your list — that's coming — or have them add the important ones day one."
   || Two-browser side-by-side comparison of factoring lists.
[19:15] "Five. Don't use this in isolation. CarrierVet is the SCREEN before the call. Highway is the VERIFICATION. Your gut and your manager are the FINAL CHECK. We're not selling you a robot."
   || Three-stack overlay: SCREEN → VERIFY → DECIDE.
```

## Chapter 9 — Wrap (19:45 – 20:30)

```
[19:45] "That's CarrierVet. App 5 of 7 in the Logistics Suite. The other six — Mass Post, Bolt Post, Load Manager, Freight Matcher, Data Wash, Pillar — are at the hub. Link in the description."
   || Cut to app.html hub, all 7 apps visible. Highlight #5.
[20:05] "If you take one thing away — build your own factoring blocklist. The default's fine but the one that burns YOUR brokerage isn't on it yet. Add it the day you see it."
   || Close-up on factoring tab with a new entry being typed.
[20:25] "Thanks for watching."
   || End card: cream background, 7-dot suite map, "Logistics Suite — The sweet side of freight", hub URL. YouTube end-screen template loads 0:18:00–0:18:04 of final cut.
```

**Final target length: 20:30.**
