# Coding Agent Output — Pillar

## Elevator pitch
Pillar is the seventh and newest app in the Logistics Suite. Drop in your TMS report and Pillar automatically figures out which carriers belong to which brokers, flags every time a rep books a load with another rep's carrier, and surfaces the relationships that are emerging mid-month — before two reps end up fighting over the same truck.

It's called "Core Carrier Intelligence" because the math runs on **cores** (4+ loads with the same rep last calendar month), **new cores** (2+ shipped loads + delivery this month, before they qualify as full cores), and **violations** (anyone else booking a locked carrier). No filtering, no exceptions, no "let me check with the manager." The receipts are on the screen.

## Feature inventory

### Header
- Pillar logo + "Core Carrier Intelligence" sub-text
- Today's date (top right)

### Sidebar — Data Source
- **Upload Report** — accepts `.xlsx`, `.xls`, `.csv`. Auto-detects header row by scanning for `Booking Carrier Rep` or `Load: Load Number` columns.
- **Pull from Salesforce** button — opens a hidden iframe to the pre-configured Lightning report URL (`bayandbaytms.lightning.force.com/lightning/r/Report/00OPe00000g4QoXMAU`). User must be logged in. ~26 second progress bar, then browser file picker opens automatically pointed at Downloads. User selects the most recently downloaded `report*.xlsx`.
- **Reference Period pickers** — two month/year selectors:
  - Current Month (drives New Cores + Violations)
  - Previous Month (drives Cores)
- **BCR Warning** — orange warning banner appears if `Booking Carrier Rep` column is missing from the report. Violation detection is impossible without it.

### Sidebar — Nav (5 sections)
1. **Dashboard** (📊)
2. **Violations** (⚠️) — red badge with count
3. **Core Carriers** (🏛) — gold badge with count
4. **New Cores** (🌱) — green badge with count
5. **Rep View** (👤)

### Dashboard
- 5 stat cards (top row): Total Violations (red), Severe (red), Core Carriers (gold), New Cores (green), Brokers (blue)
- **Recent Violations** table — top 8 sorted Severe→Standard→Soft, then date desc
- **Top Brokers by Core Carriers** table — columns: Broker, Cores, New Cores, Poached From, Poached By
- **Most Active Carriers (this month)** — Loads count, Status (Core/New Core/Unassigned), Top Broker (with rep's load count)
- Sub-header shows: "Prev month: [Month] [Year] · Current: [Month] [Year] · N loads in dataset"

### Violations Screen
- Search box (Carrier, rep, load #)
- Filter tags: All / Core / New Core / Severe / Soft
- Full violations table — 13 columns: #, Type, Severity, Ship Date, Load #, Carrier, Relationship, Owner, Violator, RC Sent (Last Activity Date), Lock Date, Lane, Customer

### Core Carriers Screen
- Search carrier
- Broker filter dropdown
- Cards/groups per rep showing every carrier they own + ⚠ violated flag on cores that got poached this month

### New Cores Screen
- Same search + broker filter
- Emerging relationships: 2+ shipped loads this month where carrier isn't already an established core

### Rep View Screen
- Broker dropdown
- Per-rep profile with 4 sections:
  - Core Carriers (the ones they own)
  - New Cores Emerging This Month
  - Loads Poached **FROM** them (red warning if any)
  - Loads **They** Poached (red warning if any)
- For 1:1 accountability reviews

### Tutorial Overlay (8 steps)
1. Welcome to Pillar
2. Pull from Salesforce (with progress bar explainer)
3. Find the Downloaded File (most recently modified `report*.xlsx`)
4. Confirm Upload (gated — user must click "File is loaded ✓")
5. Core Carriers
6. New Cores
7. Violations
8. Rep View

Auto-launches first visit (700ms after load), remembered via `pillar_tut` localStorage key. Floating `?` button in bottom-right opens it again.

## Engine rules (ground truth from source)

### Core Carrier
- 4 or more loads
- Same carrier + same Booking Carrier Rep
- Keyed on **Actual Delivery Date** (fallback: Actual Ship Date) falling in the **previous calendar month**
- `Load Status` not in `['Cancelled', 'Voided', 'Tonu']`
- If multiple reps tie, the rep with the higher load count wins

### New Core
- 2 or more loads
- Same carrier + same rep
- Both Actual Ship Date AND Expected Delivery Date in the **current month**
- Carrier must NOT already be an established Core
- **Lock date** = the Actual Ship Date of the 2nd shipped load (sorted chronologically). That's the day the carrier becomes off-limits for other reps.

### Violation
- Any load this month where the booking rep ≠ the carrier's Core or New Core owner
- AND Last Activity Date (rate-con sent date) ≥ the lock date
  - Core lock date = 1st of the current month
  - New Core lock date = 2nd shipped load's Actual Ship Date
- No Last Activity Date → skipped (can't tell timing)

### Severity
- **Soft** — violator has only ever booked this carrier once (history check)
- **Severe** — violation is against a New Core (the relationship is fragile and new)
- **Standard** — violation is against an established Core where violator has booked before

### Sorting / display
- Violations sort: Severe → Standard → Soft, then ship date desc
- Cores grouped by rep on the Core Carriers screen
- Stat row: Total Violations | Severe | Core Carriers | New Cores | Brokers

## Required Salesforce columns
The report must include (Pillar reads by exact column name):
- `Load: Load Number`
- `Carrier`
- `Booking Carrier Rep` (CRITICAL — without it, the BCR warning fires and violations don't run)
- `Load Status`
- `Actual Ship Date`
- `Expected Ship Date`
- `Actual Delivery Date`
- `Expected Delivery Date`
- `Load: Last Activity Date` (used as proxy for rate-con-sent timing)
- `Origin`
- `Destination`
- `Customer`

## Voice cheat-sheet (for the script)
- "Core carrier" = "your truck" / "your guy"
- "Violation" = "somebody else booking your guy"
- "Severe violation" = "they poached a brand-new relationship before it could even harden"
- "Lock date" = "the day this carrier becomes off-limits to other reps"
- "BCR" = "whoever booked the load"
- "Rate con sent" = "we know the rep moved on this carrier because the rate confirmation went out"

---

# Tutorial Script — 18 min target (range 17-19)

## [00:00 - 00:30] COLD OPEN
**ON SCREEN:** Pillar dashboard, top stat row glowing — "12 Violations · 4 Severe"
**VO:** "Last month, four of your reps booked a carrier that belonged to somebody else on your floor. Twelve times total. Nobody told you. Nobody got in trouble. The carrier got a rate con from two different desks in the same week — and now you've got a phone call coming. This is Pillar. It's the seventh and final app in the Logistics Suite, and it's the one your office manager has been begging me for since day one."

**LOWER THIRD:** Pillar — Core Carrier Intelligence | App 07 of 7

## [00:30 - 01:30] WHAT IT IS — CHAPTER: "What is Pillar?"
**VO:** "Quick recap if you're new here — the Logistics Suite is six apps for freight brokers. Mass Post, Bolt Post, Load Manager, Freight Matcher, Carrier Vet, Data Wash. Pillar is the seventh. The newest. The last pillar — pun fully intended.

The other six handle posting, matching, vetting, cleaning. Pillar does the one thing nobody else in your stack does: it tells you who owns which carrier, who's stepping on toes, and which relationships are about to harden into cores before two of your reps end up fighting over the same MC number.

You drop in a Salesforce report. Pillar does the math. That's the whole pitch."

**ON SCREEN:** Hub strip from app.html zooming in on the Pillar card (last on the right)

## [01:30 - 03:00] LOADING DATA — CHAPTER: "Loading your TMS report"
**VO:** "Two ways to get data into Pillar. First way — and the easy way — click 'Pull from Salesforce.' Pillar already has the report URL baked in. You just need to be logged into Salesforce in the same browser tab."

**ON SCREEN:** Click Pull from Salesforce button. Progress bar fills over 26 seconds. File picker opens.

**VO:** "Takes about twenty-six seconds. When the progress bar finishes, your browser will pop a file picker pointed at your Downloads folder. Look for the most recently modified file — it'll be named something like report-then-a-bunch-of-numbers-dot-xlsx. Click it.

If Salesforce is being Salesforce, the second way is just to drag the xlsx onto the upload box. Pillar takes xlsx, xls, or csv. It'll figure out the header row on its own — it scans for either 'Booking Carrier Rep' or 'Load: Load Number' as the anchor."

**ON SCREEN:** Sidebar now shows green checkmark, filename, "8,743 rows"

**VO:** "One thing — if you see an orange warning saying 'Missing Booking Carrier Rep column,' that means your TMS report doesn't have the booking rep field on it. Pillar can't do violation detection without it. Adjust your report in Salesforce and pull again."

## [03:00 - 04:00] REFERENCE PERIOD — CHAPTER: "Reference period"
**VO:** "Before we keep going, look at the two date pickers under the upload box. Current month and previous month. By default, Pillar uses today's calendar — so the current month is whatever month you're in, and the previous month is the one before.

Why two months? Because cores and new cores are different beasts."

**ON SCREEN:** Highlight the two pickers

**VO:** "Cores are based on what happened last month — who ran four or more loads together. New cores are based on what's happening right now, this month — relationships forming in real time. And violations are anything this month where somebody booked a locked carrier they don't own.

You can change either picker if you want to look back. Useful for end-of-quarter reviews."

## [04:00 - 06:30] CORE CARRIERS — CHAPTER: "Core Carriers — the math"
**VO:** "Click Core Carriers in the left nav. This is the foundation. A core carrier is any carrier that ran four or more loads with the same booking rep in the previous calendar month. Pillar groups them by rep."

**ON SCREEN:** Core Carriers screen, scrolling through rep groupings

**VO:** "Couple things to know about how Pillar counts. First — it's keyed on actual delivery date, not ship date. If a load shipped on the 30th of last month but delivered on the 2nd of this month, that load doesn't count toward the previous month's core. We use delivery because that's when the load is real revenue, not just a booking.

Second — cancelled, voided, and TONU loads don't count. Pillar excludes those statuses automatically.

Third — if a single carrier ran four loads with one rep and four loads with another, the rep with the higher count wins. Ties go to whoever has the most loads. Pillar picks one owner per carrier. No co-ownership, no committees."

**ON SCREEN:** Hover over a core card showing the ⚠ violated badge

**VO:** "See that little warning flag? That means somebody on your floor has already poached this core this month. We'll get to that in a minute. For now — this is the list of carriers you've earned. The reps who actually built these relationships are listed right above their names."

## [06:30 - 08:30] NEW CORES — CHAPTER: "New Cores — emerging relationships"
**VO:** "Click New Cores. This is the one that nobody else in freight software does. Or at least nobody I've seen.

A new core is a relationship that's hardening in real time. Two or more loads this month, same carrier, same rep, where both the ship date and the expected delivery date land this month. And the carrier isn't already an established core.

Why does this matter? Because in our world, if Mike runs two loads with a new carrier on the 5th and the 12th, the relationship is real by then. The carrier knows Mike. Mike has them in his phone. If Sarah books that same carrier on the 18th without checking, she's not 'finding a new truck' — she's stepping on Mike's relationship before it could even mature into a full core."

**ON SCREEN:** New Cores screen with carriers + lock dates visible

**VO:** "Pillar locks new cores on what we call the lock date. That's the actual ship date of the second load — the moment the relationship crosses two. From that day forward, any other rep booking that carrier shows up as a violation. A severe one."

## [08:30 - 11:30] VIOLATIONS — CHAPTER: "Violations — no filtering, no exceptions"
**VO:** "Click Violations. This is the page that makes managers reach for a drink."

**ON SCREEN:** Violations screen, full table populated

**VO:** "Every load this month where somebody booked a locked carrier they don't own. No exceptions. No filtering for 'oh, they probably checked first.' Pillar doesn't care about intent. It cares about who sent the rate con."

**ON SCREEN:** Highlight the RC Sent and Lock Date columns

**VO:** "Speaking of — the timing check is on Last Activity Date. That's our proxy for when the rate con went out. If the rate con was sent on or after the lock date, it counts. If somehow the rate con was sent before the carrier got locked — say, on the same day the second new-core load shipped — Pillar gives the benefit of the doubt and skips it."

**ON SCREEN:** Click between filter tags: All, Core, New Core, Severe, Soft

**VO:** "Three severity levels. Soft means the violator has booked this carrier exactly once — could be a genuine accident, fine, talk to them. Standard means they've booked the carrier before but on a core relationship. They knew or should have known. Severe is the worst — that's a violation against a new core. Brand new relationship, not even cooled yet, and somebody stepped right on it.

Filter by Severe first. That's your one-on-one list for tomorrow morning."

## [11:30 - 13:30] DASHBOARD WALK — CHAPTER: "Dashboard — your morning view"
**VO:** "Back to the Dashboard tab. This is what you open with your coffee."

**ON SCREEN:** Dashboard top stat row

**VO:** "Five numbers up top — total violations this month, how many were severe, how many cores you've identified, how many new cores are forming, and the total number of brokers on the floor showing up in your data.

Below that, the eight most recent violations. Below that, top brokers by core carriers — sorted by how many cores each rep owns, with columns for new cores, loads poached from them, and loads they poached. That last column — that's the rep accountability column."

**ON SCREEN:** Most Active Carriers section

**VO:** "And at the bottom, the most active carriers this month — who's running the most loads, what their status is, and which rep they're mostly running with. Useful for spotting carriers that are about to become new cores you didn't see coming."

## [13:30 - 15:30] REP VIEW — CHAPTER: "Rep View — the 1:1 page"
**VO:** "Last screen — Rep View. Pick a broker from the dropdown."

**ON SCREEN:** Select a rep from the dropdown

**VO:** "This is the page you open during a one-on-one. Four sections.

First — their core carriers. The list of trucks they've actually earned. If you have a senior rep with two cores and a junior rep with eight, that tells you something about who's building book of business and who's churning.

Second — new cores they're building right now. The pipeline. Watch this one trend up over time.

Third — loads poached from them. If this section has anything in it, somebody on the floor is stepping on this rep's book. Show them this page. Show them who. Don't litigate it in the meeting — just let the screen do the work.

Fourth — loads they poached. Symmetric. If this rep is the violator, this is where it shows. Bring it up the same way you'd bring up any other accountability issue. The data is the data."

## [15:30 - 17:00] WORKFLOW & ANSWERS — CHAPTER: "How to actually use it"
**VO:** "Practical workflow — once a week, pull a fresh Salesforce report. Open Pillar. Check the Severe filter on Violations. That's your priority list. Then the Dashboard's Top Brokers table — the Poached By column tells you which reps need a conversation, the Poached From column tells you which reps are getting stepped on and might need backup.

End of month, rerun Pillar with last month as the current period and the month before as previous. That's your retrospective. Print the Rep View page for each rep and bring it to their review.

A few quick answers to questions I've already gotten —

Does Pillar know about specific carrier exceptions? No. By design. If you start adding exception lists, the whole point goes away. The receipts are the receipts.

What if two reps share a carrier intentionally? Pillar picks one owner — whoever has the most loads. The other rep shows up as a violator. If that's wrong for your business, talk to me about it. We can adjust the rules.

What about loads booked by a third party — a TONU or a cancellation? Those statuses are excluded automatically. They don't count toward cores and they don't trigger violations."

## [17:00 - 18:00] CLOSE — CHAPTER: "Wrap"
**VO:** "That's Pillar. App seven of seven. The last pillar in the suite — and the one that ties the whole thing together, because all the other apps in the suite are about doing more loads faster. This one is about making sure your reps aren't quietly eating each other's lunch while they do it.

Built by a broker, for brokers. If you want to try it, the suite is at logistics-suite-dot-pages-dot-dev. Pillar is the last card on the right. Click it, drop in a TMS report, and you'll see your floor the way Pillar sees it in about ninety seconds.

If you've got column-name mismatches, or your TMS isn't Revenova, hit me up — first name, dot, last name, at gmail. The suite is yours to use. Catch you on the next one."

**END CARD:** Pillar logo + Logistics Suite — Built by brokers · for brokers

---

## Chapters (YouTube description format)
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

## On-screen action checklist (storyboard feeder)
1. Pillar hub card on app.html — last on the right
2. Pull from Salesforce → progress bar → file picker
3. Sidebar loaded state with green check + row count
4. BCR warning banner (call out but don't dwell)
5. Reference Period pickers
6. Core Carriers screen scrolling
7. ⚠ violated badge on a core card
8. New Cores screen with lock dates
9. Violations table — filter tags toggle
10. Severity badges (Soft / Standard / Severe)
11. Dashboard stat row (5 cards)
12. Top Brokers by Core Carriers table
13. Most Active Carriers table
14. Rep View dropdown → 4 sections
15. End card
