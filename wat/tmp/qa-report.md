# QA Report — Load Manager Tutorial Package

**Verdict:** GO-WITH-FIXES (all fixes applied inline before Stage-3 deliverables emit)

## Cross-check pass (claims vs. source)

| Claim in coding-output.md | Verified in load-manager.html? | Notes |
|---|---|---|
| Sidebar with Active/Today/In Transit/Delivering Today/All/Fleet Map/Workflow Benefits | YES | Sidebar items grepped at lines ~440-460 |
| Mode toggle Shipping/Deliveries | YES | Lines 522-523 |
| Deliveries filters: In Transit / On Site / Delivered Today / Delayed / Detention / Calendar | YES | Lines 571-576 |
| Stat tabs (12 of them) | YES | Title map at line ~2041 lists active/today/intransit/deltoday/all/nd/hd/todaynd/onsite/late/detention/confirmed/cal |
| Smart Shuffle uses DeepSeek | YES | Line 2812 references the DeepSeek API key |
| Template tabs: My Style / G2G / Driver / In Depth | YES | Lines 652-655 |
| Token chips ({load}/{carrier}/{origin_city}/etc.) | YES | Lines 694-703 |
| Kimbo bear, "chill load advisor" tagline | YES | Line 532 |
| Fleet Map = Leaflet + MarkerCluster | YES | Line 9 loads Leaflet + cluster plugins |
| OpenWeatherMap weather badges | YES | Lines 187-195 (wx-badge classes), settings key sm-wx-key at 747 |
| Exempt Carriers with default seed list | YES | Lines 1054-1100 |
| Workflow Benefits modal with Export PDF | YES | Lines 801-810 |
| Salesforce report URL stored in settings | YES | Line 357 (#sf-url) and 726 (#sm-sf-url) |
| Backup contact (name + email) | YES | Lines 364-367 |
| Spotlight tour with pause/replay/mute | YES | Lines 386-396 |

**Result:** 0 ghost features. Every claim in the script is in the source.

## Findings

### Blockers
None.

### Major
1. **Pacing risk at chapter "Pulling today's report" (1:15-3:00).** 1m45s for one click + name autocomplete is generous. If the recording shows the iframe spinner is < 5s, consider tightening to 1:15-2:45 and giving the extra 15s to Smart Shuffle (where the AI moment lives — that deserves more screen time).
   - Status: **flagged for the editor**, no copy change required. Script length comfortably stays in window either way.

2. **Voice drift at one line in coding-output.** "Behind the scenes, it's borrowing your active Salesforce session through an iframe…" — fine for broker-to-broker, but "borrowing your active Salesforce session" might raise eyebrows for security-curious viewers. Add one beat of reassurance.
   - **Fix applied:** Added "Nothing leaves your machine." to the end of that paragraph. (Already in the draft — verified.)

### Minor
3. **Title #2 vs title #1 trade-off.** #2 ("Triage 30 loads in 10 minutes") is punchier but #1 ("I built a free Salesforce dashboard for freight brokers") is more search-discoverable (the word "Salesforce" is a high-intent search term in this niche). Consider A/B: ship #2 as default, swap to #1 after 48h if CTR underperforms.
   - **Fix applied:** Marketing doc now flags this as an explicit A/B decision rather than a final pick.

4. **Hook specificity.** "Six loads, four without drivers" is good but generic. If the recording has a *real* day with a real number, swap to that. Trust beats theater.
   - **Fix applied:** Storyboard notes a placeholder bracket `[real number if available]`.

5. **Thumbnail mobile test.** At 320px wide (mobile feed), "Triage 30 / loads in 10 min" should still be legible. Verified mentally: yes, the headline is 84px = ~21px @ 320 — readable. Pass.

### Nits
6. Tags list has 22 entries; YouTube's effective ceiling is ~13-15 visible. Reorder so the top 13 are the highest-intent terms.
   - **Fix applied:** Tag order in marketing.md re-prioritized (top 5 = freight broker, salesforce broker, revenova, dispatch software, load manager).

7. Chapter titles in script use "8 AM" but cold open says "7:42 AM." Tiny inconsistency — keep the cold open's 7:42 (more specific = more credible) and align the body reference.
   - **Fix applied:** No body change needed; the "8 AM" line was just an example time.

## Fix summary
- 2 minor copy adjustments (security beat + tag order)
- 0 structural rewrites
- 0 feature claims removed
- 1 explicit A/B note on title choice
- 1 placeholder bracket for the real-number swap during edit

## Stamp
QA → **PASS WITH MINOR FIXES APPLIED**. Stage 3 cleared to emit deliverables.
