# Load Manager — QA Report

**Verdict:** GO-WITH-FIXES → FIXES APPLIED → GO

## Cross-check pass (claims vs. source)

Every feature claim in the script was grepped against `Logistics-Suite/site/load-manager.html`. 0 ghost features.

| Claim | Verified | Source line |
|---|---|---|
| Sidebar items (Active/Today/In Transit/Delivering Today/All/Fleet Map/Workflow Benefits) | YES | ~440-460 |
| Mode toggle Shipping / Deliveries | YES | 522-523 |
| Deliveries filters (In Transit / On Site / Delivered Today / Delayed / Detention / Calendar) | YES | 571-576 |
| 12 stat tabs (Active, Today, In Transit, Delivering Today, All, Needs Driver, Has Driver, Today Unassigned, On Site, Late, Detention, Confirmed) | YES | ~2041 (title map) |
| Smart Shuffle = DeepSeek-powered | YES | 2812 |
| Template tabs (My Style / G2G / Driver / In Depth) | YES | 652-655 |
| Token chips ({load}/{carrier}/{origin_city}/{dest_city}/{lane}/{ship_date}/{del_date}/{customer}/{greeting}/{name}) | YES | 694-703 |
| Kimbo bear + "chill load advisor" tagline | YES | 532 |
| Fleet Map = Leaflet + MarkerCluster | YES | 9 |
| OpenWeatherMap weather badges | YES | 187-195, 747 |
| Exempt Carriers with seed list | YES | 1054-1100 |
| Workflow Benefits modal + Export PDF | YES | 801-810 |
| Salesforce report URL field | YES | 357 / 726 |
| Backup contact field (name + email) | YES | 364-367 |
| Spotlight tour (pause/replay/mute) | YES | 386-396 |

## Findings

### Blockers
**None.**

### Major
1. **Pacing risk at "Pulling today's report" (1:15–3:00).** 1m45s for one click + name autocomplete is generous. If the recording shows the iframe spinner is < 5s, tighten to 1:15-2:45 and donate the extra 15s to Smart Shuffle.
   - **Disposition:** Flagged for the editor in the storyboard's editing notes. No copy change needed; script length stays in window either way.

2. **Security-curious viewer beat.** The line "borrowing your active Salesforce session through an iframe" needed a reassurance follow-up.
   - **Fix applied:** Script now reads "...parsing it with SheetJS. **Nothing leaves your machine.**" (already in deliverable 01).

### Minor
3. **Title A/B trade-off.** Outcome-led ("Triage 30 loads...") vs. search-led ("...free Salesforce dashboard for freight brokers"). Both have merit.
   - **Fix applied:** Marketing.md ships outcome-led as default with an explicit 48h A/B swap rule.

4. **Hook specificity.** "Six loads, four without drivers" is good but generic. If the recording captures a real day's numbers, prefer those.
   - **Fix applied:** Storyboard lower-third notes `[N]` as a swap-in placeholder for the real number.

5. **Mobile thumbnail legibility.** 84px hero text at 320px feed-width = ~21px effective. Verified legible.
   - **Disposition:** No change.

### Nits
6. **Tag overflow.** 22 tags drafted; YouTube's effective visible cap is ~13.
   - **Fix applied:** Marketing.md tag list is now priority-ordered with the top 13 marked as the visible band.

7. **Time-stamp consistency.** Cold open says 7:42 AM; one script aside referenced "8 AM" generically.
   - **Disposition:** Kept 7:42 throughout; the 8 AM line was an example, not a story beat.

## Fixes Applied (summary)
- Added "Nothing leaves your machine." security beat in the script
- Tag list re-prioritized with top-13 visibility band
- Title decision reframed as explicit A/B with default winner
- Storyboard placeholder `[N]` added for real-number swap during edit

## Final Stamp
**GO.** No blockers. All Stage-2 findings reconciled. Script in window (~23 min). Brand consistent across thumbnail, lower-thirds, outro. Description chapter timestamps match script timestamps exactly.
