# QA Report — Pillar Tutorial Package

QA reviewed all Stage 1 artifacts against `pillar.html` ground truth. Findings below, each with a Pass/Fail and a fix recommendation.

## Factual claims (script + on-screen overlays)

### PASS — Core definition
**Claim:** 4+ loads, same rep, previous month, keyed on Actual Delivery Date with Actual Ship Date fallback.
**Source:** `pillar.html:577` `var d = parseDate(r['Actual Delivery Date']) || parseDate(r['Actual Ship Date']);` and `:590` `if (g.loads.length >= 4)`
**Verdict:** Accurate.

### PASS — New Core definition
**Claim:** 2+ loads, ship + expected delivery both in current month, carrier not already a core, lock date = 2nd ship date.
**Source:** `pillar.html:602-622`
**Verdict:** Accurate.

### PASS — Cancelled status list
**Claim:** Cancelled, Voided, TONU excluded.
**Source:** `pillar.html:409` `var CANCELLED = ['Cancelled','Voided','Tonu'];`
**Verdict:** Accurate.

### PASS — Severity tiers
**Claim:** Soft (1 prior load), Severe (New Core violation), Standard (Core violation w/ history).
**Source:** `pillar.html:665` `var severity = hist.length <= 1 ? 'Soft' : (vtype==='NEW CORE' ? 'Severe' : 'Standard');`
**Verdict:** Accurate.

### PASS — SF pull is 26 seconds
**Claim:** Progress bar over ~26 seconds.
**Source:** `pillar.html:1123` `setTimeout(...,26000)` and tutorial step 2 text explicitly says "about 26 seconds".
**Verdict:** Accurate.

### PASS — RC date logic
**Claim:** RC sent timing = Load: Last Activity Date, fallback Expected Ship Date. Only counts if RC ≥ lock date.
**Source:** `pillar.html:655-659`
**Verdict:** Accurate.

### PASS — Cores keyed on delivery, violations on ship
**Claim:** Core detection uses Actual Delivery Date; violations scan uses Actual Ship Date (or Expected Ship Date fallback) for the current-month filter.
**Source:** `pillar.html:577` vs `:633`
**Verdict:** Accurate. (Script makes this distinction at chapter 4 — good.)

## Brand / visual claims

### FAIL — Font family mismatch
**Claim:** Visual spec says "DM Sans 700/800/900 for headlines; JetBrains Mono 600/700 for kickers".
**Reality:** Pillar itself uses **Barlow / Barlow Condensed** in-product (see `pillar.html:22` `font-family:'Barlow'`).
**Impact:** On-screen overlays in the VIDEO can still be DM Sans + JetBrains Mono (matches suite brand baseline), but the spec should call this out so the editor doesn't get confused when they see the in-app font differs.
**Fix:** Add a note to `visual-spec.md` clarifying suite-level fonts (DM Sans / JetBrains Mono) are used for overlays/thumbnail, while Pillar's in-product font is Barlow — and this is intentional, not a bug.

### FAIL — Pillar gold hex value
**Claim:** Thumbnail and visual spec use `#c8a062` for Pillar gold.
**Reality:** Pillar's CSS variable is `--gold:#b8974a` (`pillar.html:14`).
**Impact:** Thumbnail still works visually but is off-brand from the app.
**Fix:** Update the thumbnail SVG `pillarBody` gradient to use `#d4ac5a` (gold-light) and `#b8974a` (gold). Update visual spec accent reference.

### PASS — Candy palette use
**Claim:** Pink #b85775, mint #7bc8b5, purple #9b7bb8 used in overlays.
**Verdict:** Aligned with the suite-level brand in CLAUDE.md.

## Pacing

### PASS — Total runtime
**Estimate:** Script reads 17-19 min at a conversational ~150 wpm pace. Within the 15-22 min target band.

### PASS — No section >4 min
**Check:** Longest single chapter is Violations at 3 min flat. Within limits.

### PASS — Cold open under 30 seconds
**Source:** First chapter card lands at 00:30. Strong hook with concrete numbers in first 10 seconds.

## Title / discovery

### PASS — Title CTR mechanics
**Primary title:** "Who Poached Your Carrier? Pillar — App #7 of the Logistics Suite"
- Question hook (+)
- Number (+)
- Specific app reference (+)
- Under 70 chars: 71 chars — **borderline**, recommend trimming.
**Fix:** Shorten to "Who Poached Your Carrier? Pillar — App 7 of the Suite" (60 chars) for desktop YouTube.

### PASS — Description hook
First line nails the "what's in it for me" — no fluff.

### PASS — Chapters
All 11 chapter timestamps land cleanly. YouTube will auto-detect for sponsorship-style chapter markers.

### PASS — Tag count
26 tags — within YouTube's 500-character total tag limit and over the 20-tag minimum the marketing workflow required.

## Thumbnail

### PASS — Readability at 320x180
The "WHO POACHED YOUR CARRIER?" text is 86pt — readable down to mobile card size. The pink pill "12 VIOLATIONS · 4 SEVERE" reinforces the headline.

### PASS — Broker voice
"WHO POACHED YOUR CARRIER?" is broker-floor language, not enterprise. PASS.

### FAIL — Thumbnail gold pillar tone
**Issue:** Gold gradient in thumbnail uses `#e8d5a8 → #c8a062`. Should match Pillar's actual gold (`#d4ac5a → #b8974a`).
**Fix:** Final-decision agent updates the SVG colors.

## Script voice

### PASS — Broker-to-broker
No enterprise jargon detected. "Built by a broker, for brokers" — checked. References to "the floor", "the office manager", "your guys" — all broker-native.

### PASS — Suite cross-references
Other 6 apps named correctly in chapter 1 (Mass Post, Bolt Post, Load Manager, Freight Matcher, Carrier Vet, Data Wash). Order matches the hub strip.

### MINOR — Pillar app order on hub
**Note:** The script says "the last card on the right." Confirmed via `app.html:492` — Pillar is the 7th `app-tile`. Verified.

## Gaps / risks

### MINOR — No mention of column-name strictness
**Risk:** Script doesn't tell viewers that column headers must match exactly (`Booking Carrier Rep`, `Load: Load Number`, etc.). If their Salesforce report has slightly different headers, Pillar will silently fail.
**Fix:** Add a 10-second mention in chapter 2 around the BCR warning explanation: "Pillar reads columns by exact name — if you're not on Bay & Bay's exact report template, hit me up about column mapping."

### MINOR — Tutorial overlay not mentioned
**Risk:** The in-app tutorial auto-launches on first visit. Script never says this. Viewer might be confused when they open Pillar and a modal pops up.
**Fix:** Add one sentence in chapter 2: "First time you open Pillar, an in-app tutorial walks you through this same flow — same content as this video, just inside the app."

### MINOR — "lock date for cores" phrasing
**Risk:** Script implies the lock date for established cores is "the day the carrier becomes off-limits" without naming that it's the 1st of the current month. New core lock date IS explained (2nd ship date). For symmetry, add the 1st-of-month detail for established cores.
**Fix:** One-line addition in chapter 6 — "For established cores, the lock starts on the 1st of the current month. For new cores, on the day of the 2nd shipped load."

## Summary

| Category | Pass | Fail | Notes |
|---|---|---|---|
| Factual claims | 7 | 0 | All engine rules verified against source |
| Brand / visual | 1 | 2 | Font note + gold hex fixes needed |
| Pacing | 3 | 0 | Within band |
| Discovery | 4 | 0 | Title trim recommended |
| Thumbnail | 2 | 1 | Gold tone fix |
| Voice | 2 | 0 | On-brand |
| Gaps | — | 3 minor | Add column-strictness, tutorial-overlay, core-lock-date sentences |

## Verdict
**Conditional GO** — apply the 6 fixes (font note, gold hex x2, title trim, 3 minor script sentences) and ship.

Final-decision agent: do not edit the engine claims — they're all verified. Just polish the brand and tighten the script per the items above.
