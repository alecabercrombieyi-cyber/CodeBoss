# Pillar Tutorial — Full Narrated Script

**Target runtime:** 18 minutes (band: 17-19)
**Voice:** Conversational, broker-to-broker, paced. Think experienced dispatcher explaining to a new hire.
**Music bed:** Minimal, mid-tempo lo-fi at -22 LUFS

---

## [00:00 - 00:30] COLD OPEN

**ON SCREEN:** Pillar dashboard. Top stat row glowing — count-up animation: "0 → 12 Violations · 0 → 4 Severe"

**VO:**
> "Last month, four of your reps booked a carrier that belonged to somebody else on your floor. Twelve times total. Nobody told you. Nobody got in trouble. The carrier got a rate con from two different desks in the same week — and now you've got a phone call coming. This is Pillar. It's the seventh and final app in the Logistics Suite, and it's the one your office manager has been begging me for since day one."

**LOWER THIRD:** `Pillar — Core Carrier Intelligence | App 07 of 7`

---

## [00:30 - 01:30] WHAT IS PILLAR? — CHAPTER CARD

**ON SCREEN:** Hub strip from `app.html` panning left-to-right across all 7 app cards, decelerating to land on Pillar with a soft glow

**VO:**
> "Quick recap if you're new here — the Logistics Suite is a set of apps I built for freight brokers. Mass Post, Bolt Post, Load Manager, Freight Matcher, Carrier Vet, Data Wash. Pillar is the seventh. The newest. The last pillar — pun fully intended.
>
> The other six handle posting, matching, vetting, cleaning. Pillar does the one thing none of those tools do: it tells you who owns which carrier, who's stepping on toes, and which relationships are about to harden into cores before two of your reps end up fighting over the same MC number.
>
> You drop in a Salesforce report. Pillar does the math. That's the whole pitch."

---

## [01:30 - 03:00] LOADING YOUR TMS REPORT — CHAPTER CARD

**VO:**
> "Two ways to get data into Pillar. First way — and the easy way — click 'Pull from Salesforce.' Pillar already has the report URL baked in. You just need to be logged into Salesforce in the same browser tab."

**ON SCREEN:** Click "Pull from Salesforce" button. Progress bar fills over 26 seconds. File picker opens.

**VO:**
> "Takes about twenty-six seconds. When the progress bar finishes, your browser will pop a file picker pointed at your Downloads folder. Look for the most recently modified file — it'll be named something like report-then-a-bunch-of-numbers-dot-xlsx. Click it.
>
> If Salesforce is being Salesforce, the second way is just to drag the xlsx onto the upload box. Pillar takes xlsx, xls, or csv. It'll figure out the header row on its own — it scans for either 'Booking Carrier Rep' or 'Load: Load Number' as the anchor.
>
> One thing — Pillar reads column names exactly. If your TMS report has slightly different headers than Bay and Bay's template, hit me up about column mapping. And — first time you open Pillar, an in-app tutorial walks you through this same flow. Same content as this video, just inside the app, in case you want a refresher."

**ON SCREEN:** Sidebar now shows green checkmark, filename, "8,743 rows"

**VO:**
> "If you see an orange warning saying 'Missing Booking Carrier Rep column,' that means your report doesn't have the booking rep field on it. Pillar can't do violation detection without it. Adjust your report in Salesforce and pull again."

---

## [03:00 - 04:00] REFERENCE PERIOD — CHAPTER CARD

**ON SCREEN:** Highlight the two date pickers in the sidebar

**VO:**
> "Before we keep going, look at the two date pickers under the upload box. Current month and previous month. By default, Pillar uses today's calendar — so the current month is whatever month you're in, and the previous month is the one before.
>
> Why two months? Because cores and new cores are different beasts. Cores are based on what happened last month — who ran four or more loads together. New cores are based on what's happening right now, this month — relationships forming in real time. And violations are anything this month where somebody booked a locked carrier they don't own.
>
> You can change either picker if you want to look back. Useful for end-of-quarter reviews."

---

## [04:00 - 06:30] CORE CARRIERS — CHAPTER CARD

**ON SCREEN:** Click Core Carriers in left nav. Screen populates with rep groupings.

**VO:**
> "Click Core Carriers in the left nav. This is the foundation. A core carrier is any carrier that ran four or more loads with the same booking rep in the previous calendar month. Pillar groups them by rep.
>
> Couple things to know about how Pillar counts. First — it's keyed on actual delivery date, not ship date. If a load shipped on the 30th of last month but delivered on the 2nd of this month, that load doesn't count toward the previous month's core. We use delivery because that's when the load is real revenue, not just a booking.
>
> Second — cancelled, voided, and TONU loads don't count. Pillar excludes those statuses automatically.
>
> Third — if a single carrier ran four loads with one rep and four loads with another, the rep with the higher count wins. Ties go to whoever has the most loads. Pillar picks one owner per carrier. No co-ownership, no committees."

**ON SCREEN:** Hover over a core card showing the ⚠ violated badge

**VO:**
> "See that little warning flag? That means somebody on your floor has already poached this core this month. We'll get to that in a minute. For now — this is the list of carriers you've earned. The reps who actually built these relationships are listed right above their names."

---

## [06:30 - 08:30] NEW CORES — CHAPTER CARD

**ON SCREEN:** New Cores screen with carrier cards and lock dates visible

**VO:**
> "Click New Cores. This is the one that nobody else in freight software does. Or at least nobody I've seen.
>
> A new core is a relationship that's hardening in real time. Two or more loads this month, same carrier, same rep, where both the ship date and the expected delivery date land this month. And the carrier isn't already an established core.
>
> Why does this matter? Because in our world, if Mike runs two loads with a new carrier on the 5th and the 12th, the relationship is real by then. The carrier knows Mike. Mike has them in his phone. If Sarah books that same carrier on the 18th without checking, she's not 'finding a new truck' — she's stepping on Mike's relationship before it could even mature into a full core.
>
> Pillar locks new cores on what we call the lock date. That's the actual ship date of the second load — the moment the relationship crosses two. From that day forward, any other rep booking that carrier shows up as a violation. A severe one."

---

## [08:30 - 11:30] VIOLATIONS — CHAPTER CARD

**ON SCREEN:** Click Violations. Full table populates.

**VO:**
> "Click Violations. This is the page that makes managers reach for a drink.
>
> Every load this month where somebody booked a locked carrier they don't own. No exceptions. No filtering for 'oh, they probably checked first.' Pillar doesn't care about intent. It cares about who sent the rate con."

**ON SCREEN:** Highlight the RC Sent and Lock Date columns

**VO:**
> "Speaking of — the timing check is on Last Activity Date. That's our proxy for when the rate con went out. If the rate con was sent on or after the lock date, it counts. If somehow the rate con was sent before the carrier got locked — say, on the same day the second new-core load shipped — Pillar gives the benefit of the doubt and skips it.
>
> Quick on lock dates — for established cores, the lock starts on the 1st of the current month. For new cores, the lock starts on the day of the 2nd shipped load. That's why new cores can lock partway through the month."

**ON SCREEN:** Click between filter tags: All, Core, New Core, Severe, Soft

**VO:**
> "Three severity levels. Soft means the violator has booked this carrier exactly once — could be a genuine accident, fine, talk to them. Standard means they've booked the carrier before but on a core relationship. They knew or should have known. Severe is the worst — that's a violation against a new core. Brand new relationship, not even cooled yet, and somebody stepped right on it.
>
> Filter by Severe first. That's your one-on-one list for tomorrow morning."

---

## [11:30 - 13:30] DASHBOARD — CHAPTER CARD

**ON SCREEN:** Back to Dashboard. Top stat row highlighted, then Top Brokers table, then Most Active Carriers.

**VO:**
> "Back to the Dashboard tab. This is what you open with your coffee.
>
> Five numbers up top — total violations this month, how many were severe, how many cores you've identified, how many new cores are forming, and the total number of brokers on the floor showing up in your data.
>
> Below that, the eight most recent violations. Below that, top brokers by core carriers — sorted by how many cores each rep owns, with columns for new cores, loads poached from them, and loads they poached. That last column — that's the rep accountability column.
>
> And at the bottom, the most active carriers this month — who's running the most loads, what their status is, and which rep they're mostly running with. Useful for spotting carriers that are about to become new cores you didn't see coming."

---

## [13:30 - 15:30] REP VIEW — CHAPTER CARD

**ON SCREEN:** Select a rep from the Rep View dropdown. Reveal the 4 sections.

**VO:**
> "Last screen — Rep View. Pick a broker from the dropdown.
>
> This is the page you open during a one-on-one. Four sections.
>
> First — their core carriers. The list of trucks they've actually earned. If you have a senior rep with two cores and a junior rep with eight, that tells you something about who's building book of business and who's churning.
>
> Second — new cores they're building right now. The pipeline. Watch this one trend up over time.
>
> Third — loads poached from them. If this section has anything in it, somebody on the floor is stepping on this rep's book. Show them this page. Show them who. Don't litigate it in the meeting — just let the screen do the work.
>
> Fourth — loads they poached. Symmetric. If this rep is the violator, this is where it shows. Bring it up the same way you'd bring up any other accountability issue. The data is the data."

---

## [15:30 - 17:00] HOW TO ACTUALLY USE IT — CHAPTER CARD

**VO:**
> "Practical workflow — once a week, pull a fresh Salesforce report. Open Pillar. Check the Severe filter on Violations. That's your priority list. Then the Dashboard's Top Brokers table — the Poached By column tells you which reps need a conversation, the Poached From column tells you which reps are getting stepped on and might need backup.
>
> End of month, rerun Pillar with last month as the current period and the month before as previous. That's your retrospective. Print the Rep View page for each rep and bring it to their review.
>
> A few quick answers to questions I've already gotten —
>
> Does Pillar know about specific carrier exceptions? No. By design. If you start adding exception lists, the whole point goes away. The receipts are the receipts.
>
> What if two reps share a carrier intentionally? Pillar picks one owner — whoever has the most loads. The other rep shows up as a violator. If that's wrong for your business, talk to me. We can adjust the rules.
>
> What about loads booked by a third party — a TONU or a cancellation? Those statuses are excluded automatically. They don't count toward cores and they don't trigger violations."

---

## [17:00 - 18:00] WRAP — CHAPTER CARD

**ON SCREEN:** Pillar logo, then zoom out to show all 7 app cards in the hub

**VO:**
> "That's Pillar. App seven of seven. The last pillar in the suite — and the one that ties the whole thing together, because all the other apps in the suite are about doing more loads faster. This one is about making sure your reps aren't quietly eating each other's lunch while they do it.
>
> Built by a broker, for brokers. If you want to try it, the suite is at logistics-suite-v1-dot-pages-dot-dev. Pillar is the last card on the right. Click it, drop in a TMS report, and you'll see your floor the way Pillar sees it in about ninety seconds.
>
> If you've got column-name mismatches, or your TMS isn't Revenova, hit me up — first name dot last name at gmail. The suite is yours to use. Catch you on the next one."

**END CARD:** Pillar logo + tagline `Logistics Suite — Built by brokers · for brokers`

---

## YouTube chapter markers (copy into description)
```
00:00 Cold open — twelve violations, four severe
00:30 What is Pillar?
01:30 Loading your TMS report
03:00 Reference period
04:00 Core Carriers — the math
06:30 New Cores — emerging relationships
08:30 Violations — no filtering, no exceptions
11:30 Dashboard — your morning view
13:30 Rep View — the 1:1 page
15:30 How to actually use it
17:00 Wrap
```
