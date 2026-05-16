# QA report — adversarial review

Reviewing: coding-output.md, marketing-output.md, thumbnail.svg, title-cards.md, visual-spec.md.

## 1. Factual accuracy (cross-checked against `freight-matcher.html`)

| # | Claim                                                    | Verdict | Note / fix                                                                                                                              |
|---|----------------------------------------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------|
| 1 | "DeepSeek 5M free tokens, no card"                       | OK      | KeyScreen says exactly this — `"5M tokens free, no card needed"`                                                                          |
| 2 | "TRM parser runs locally, zero API"                      | OK      | `tryLocalParse()` returns before any `fetch` if "Select Item N" markers ≥2                                                                |
| 3 | "Bulk email by carrier, one PNG table"                   | OK      | `buildBulkEmail()` builds one canvas across all matches, groups in Matches tab                                                            |
| 4 | "Regional lanes: Midwest, Southeast, PNW, Gulf, etc."    | OK      | `REGIONS` map has 12+ regions incl. PNW, Gulf, Great Lakes, New England, Mid-Atlantic                                                     |
| 5 | "Reefer can haul dry"                                    | OK      | Matching: `truck.equipment==="Reefer"&&(load.equipment==="Van/Dry Van"||load.equipment==="Trailer")` returns true                       |
| 6 | "Map fire splash on tab switch"                          | OK      | `useEffect` watches `tab` and sets `mapSplash=true` for 1.2s when `tab==="map"` and matches>0                                             |
| 7 | "Background geocoder, 1/sec Nominatim"                   | OK      | `geoNominatim` enforces 1.1s gap via `nominatimBusy` flag                                                                                 |
| 8 | Script says "Cmd-A Cmd-C from Outlook search results"    | FIX     | Most freight brokers are on Windows / Ctrl, not Cmd. **Fix: change script lines to "Ctrl-A / Ctrl-C" and add "(or ⌘ on Mac)"**            |
| 9 | "Workflow Benefits: 8 min/match × $35/hr"                | OK      | Confirmed in source: `manualMinPerMatch=8`, `autoMinPerMatch=0.5`, `hourlyRate=35`                                                        |
| 10 | "Equipment filter has 4 primary + 4 more"               | OK      | `EQ_PRIMARY=["Van/Dry Van","Reefer","Van/Reefer","Trailer"]`, `EQ_MORE=["Flatbed","Step Deck","Straight Truck","Tanker"]`                |
| 11 | "ROI shown live as user works"                          | OK      | But the script claims "$140 reclaimed this morning" — that's only true at 32 matches. **Fix: phrase as "this morning's number" not a fixed dollar.** |
| 12 | "FM is the 4th app of 7"                                | OK      | Confirmed via the tutorial dir list and app.html ordering                                                                                 |
| 13 | Script Chapter 5 says "drag radius 100→250"             | OK      | Slider min=10, max=500, default=100 — all match                                                                                          |
| 14 | "Cyan dashed arrows for lanes, red dashed for radius"   | OK      | Confirmed in `addArrow` calls and `L.circle` radius styling                                                                              |
| 15 | "Same-carrier auto-groups into bulk email"              | OK     | `byCarrier` grouping in Matches tab "Send All" button                                                                                     |
| 16 | Description: "Source on GitHub: …"                       | FIX | Source repo URL is a placeholder. **Fix: either insert real URL or remove the line. Recommend removing line for v1, add when public.**     |
| 17 | "logisticssuite.dev" domain                              | RISK | Project memory says Cloudflare Pages project `logisticssuitev1`. **Fix: confirm the public URL before publish. Marketing.md currently assumes `logisticssuite.dev`.** Flag for final.|
| 18 | Script claim "instant" for TRM parse                    | OK | But "instant" depends on paste size. For 200+ loads, parse is still ~50-100ms. **Acceptable; no fix.** |
| 19 | Region list in Chapter 6 lists "New England"            | OK | Source has it; script wording is fine |
| 20 | Workflow Benefits tab — script says "Settings"          | FIX | Settings panel has two tabs: "⚙️ General" and "📊 Workflow Benefits". **Script should explicitly say: "open Settings → second tab → Workflow Benefits".** |

## 2. Pacing

| Chapter | Length | Verdict |
|---|---|---|
| 0 Cold open | 30s | ✅ tight |
| 1 What it does | 1m30s | ✅ |
| 2 Setup | 1m30s | ✅ |
| 3 Trucks | 3m | ✅ headline chapter, justified |
| 4 Loads | 2m30s | ✅ |
| 5 Map | 3m | ✅ visual chapter, justified |
| 6 Lane awareness | 1m30s | ⚠️ this is a strong differentiator — **recommend stretching to 2m** by showing one explicit "wrong way" rejection on screen |
| 7 Email back | 2m30s | ✅ |
| 8 QoL | 1m30s | ✅ |
| 9 Where it fits | 50s | ✅ |
| 10 Outro | 20s | ✅ |

**After Chapter 6 stretch: 19m10s. Still inside the 18–24 window.**

No chapter exceeds 4 min. No chapter shorter than 20s. Pacing approved.

## 3. Hook strength
The 30-sec hook is strong because it leads with specifics (47 / 3 / morning hour). **Risk**: "I built this" implies a personal brand — if the channel is Logistics Suite-branded rather than Alec-branded, swap to "Then we built this" or "Here's the tool." **Fix: leave both versions in the script as alt takes.**

## 4. Thumbnail clarity (phone-test)
- At 320px wide the eye lands on: 🔥 fire pin → "PASTE EMAILS. SEE FIRE." → "47 EMAILS → 1 MIN" chip
- The "LOGISTICS SUITE · APP 04" eyebrow disappears at small sizes but that's fine; people who care will see it on the watch page
- ✅ Passes the phone test

**Subtle issue**: the dark-map left half vs cream-text right half is a strong split. Could read as "two unrelated images" on first glance. **Fix: add a single thin candy-pink curve (1.5px) that crosses the boundary at y≈360 from map-edge to "SEE FIRE." text** to tie the halves together. Easy SVG edit.

## 5. Title / thumbnail / cold open coherence
- Title: `Paste Carrier Emails → Watch the Map Catch Fire`
- Thumbnail headline: `PASTE EMAILS. SEE FIRE.`
- Hook line 4: `The map catches fire wherever a truck and a load line up.`
- ✅ All three promise the same thing. Triangulated.

## 6. Audience / voice mismatch
Quick scan of the script:
- "AI agent" — never used ✅
- "Enterprise" — never used ✅
- "Workflow" — used twice, fine
- "ROI" — used in Chapter 8 — acceptable as the tab is literally labelled "Workflow Benefits" with dollar math
- ⚠️ Word "robust" appears nowhere — good (it's a SaaS-pitch tell)
- ⚠️ "Solution" appears nowhere — good

**One minor**: Chapter 1 line "The map shows where they meet" is fine, but the broker voice could go further. **Fix: add the alternate read "Paste your trucks. Paste your loads. The map figures out who fits who."**

## 7. Demo risk
- DeepSeek API rate limit at recording time — **mitigation: use a fresh key the morning of, or pre-cache the parse output** ✅ already in prep checklist
- Nominatim slow on uncommon cities — **the demo data should stay inside the 250 hard-coded cities**: Dallas, Houston, Chicago, Memphis, Indianapolis, Atlanta — all present in `CC` map. **Fix: explicitly note demo cities in prep checklist.**
- Browser clipboard permission — when the bulk-email "Copy with image" runs the first time, browser may prompt. **Fix: in prep, trigger the email-copy once before recording so the prompt is resolved.**
- localStorage stale state — **fix: open recording session in a fresh Incognito window with the DeepSeek key pre-set**

## 8. CTA
Single CTA: `freight-matcher.html` on the Suite domain.
- Risk: domain not confirmed (see #17 above)
- ✅ Description, end card, and lower-third all carry the same URL
- ✅ No competing CTAs

## Summary
- 4 must-fix items (#8, #11, #16, #20)
- 2 should-fix items (#17 confirm, thumbnail tie-line)
- 1 stretch recommendation (Chapter 6 from 1m30s to 2m)
- 1 alt-take recommendation (cold open "I" vs "we")

All fixable in Stage 3. No blockers. Recommend **GO with fixes applied**.
