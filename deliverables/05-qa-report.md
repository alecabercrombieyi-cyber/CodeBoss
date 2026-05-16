# QA Sub-Agent — Adversarial Review

**Method:** Each claim made in `coding-output.md`, `title-cards.md`, `visual-spec.md`, and `marketing-output.md` was checked against `bolt-post.html`. Findings are severity-ranked.

---

## Findings

### BLOCKER — none.

### MAJOR

**M1. Script overclaims reply sign-off personalization.**
- Claim in coding-output Chapter 5 & Customer→Commodity section: *"…and your name and email from settings."*
- Source (lines 2138, 2146, 2155, 2169, 2175, 2182): every reply variation is hardcoded to `'\n\nThanks,\nAlec'` or `'\nAlec'`. The `userName` variable exists and is loaded from `bp_user_name`, but the reply string template uses a literal `'Alec'`. `userEmail` is loaded from settings but never substituted into any reply message.
- **Fix:** Update Chapter 5 narration to: *"…they include the greeting based on time of day, the pickup day-of-week, the pickup window, weight rounded to k, rate as whole dollars, equipment, commodity. The sign-off in the current build is hardcoded to my name — that's a known TODO; if you fork the app, swap the literal 'Alec' on lines 2138, 2146, 2155, 2169, 2175, 2182 for the `userName` variable."*
- Also remove the false "and email" claim. Update the title-cards subline for Chapter 5 from `Greeting · day · window · rate · sign-off` to `Greeting · day · window · rate · stop-aware`.

**M2. Customer→Commodity "auto-learning" claim needs nuance.**
- Claim: *"the first time you reply for a customer and you set a commodity, it's saved to this list."*
- Source: `lookupCommodity` is a one-way lookup (line 1444). The settings panel `addCustComm` (line 1420) requires the user to type into the form manually. There is no code path that *learns* from a reply event; the in-app text "Auto-learns from your quick replies — just fill it in once and it remembers" (line 1187 in the UI) is aspirational copy.
- **Fix:** Soften the script line to: *"Add a customer once in Settings, and from then on its commodity prefills your reply variations automatically. Today it's manual entry; the UI hints at full auto-learning, which is a roadmap item."*

### MINOR

**m1. Reply variation labels mislabeled.**
- Claim: *"three variations pop up — short and punchy, medium with all the details, long with the sign-off."*
- Source (lines 2158–2160 multi-stop, 2184–2188 single): labels are **Standard**, **Casual**, **Quick & Direct** (or "(Multi-Stop)" variants). Lengths are similar across all three.
- **Fix:** Replace narration with: *"Three variations pop up — Standard, Casual, and Quick & Direct. Each one phrases the same load info differently so you can match your customer's tone."*

**m2. Min Margin filter copy is approximate.**
- Claim: *"hides anything where customer quote minus posted amount is less than 200 dollars."*
- Source (line 1849): `margin = custQuote - rate;` — i.e. customer quote minus *posted* (rate is the Posted Amount per `DAT_FIELDS` line 1287). Claim is correct. Mark NIT only because the script could clarify rate ≡ posted.
- **Fix:** No change required, optional clarity: *"customer quote minus your posted rate."*

**m3. Bookmarklet label-vs-ID list is incomplete.**
- Claim: label-match for Origin/Destination/Rate; stable IDs for everything else.
- Source (line 2637): label-match for `Origin`, `Destination`, **`Rate`**. Stable IDs: `shipment-pickup-earliest`, `shipment-pickup-latest`, `shipment-equipment-type`, `shipment-length`, `shipment-weight`, `shipment-reference-id`, `shipment-comments`. Date/equipment fields **don't** use label-match.
- The script is technically correct but vague; no factual error. No fix needed.

**m4. Multi-stop badge symbol.**
- Claim: orange "3 STOPS" badge.
- Source (line 1862): badge text is `⚠️ 3 stops` (warning emoji + count + lowercase "stops"), color #FB923C (orange), background `rgba(251,146,60,0.12)`. Visual call ("orange") is right; text wording in the script ("3 STOPS" all-caps) is wrong.
- **Fix:** Title-cards Chapter 7 subline should say `⚠️ N stops badge · pulsing border` to be precise.

### NITS

**n1. "Hidden iframe + session cookie" pull mechanism.**
- Source confirms (lines 1481–1490 `triggerSFDownload`). Claim is accurate.

**n2. Weight clamp range.**
- Claim: 10,000–40,000 lb. Source lines 2356 / 2526: `Math.max(10000, Math.min(40000, rawWeight))`. Accurate.

**n3. xlsx.full.min.js bundled.**
- Source line 8 confirms. Accurate.

**n4. `bp_` prefix for storage keys.**
- Source confirms throughout. Accurate.

**n5. "Lightning → Classic" URL conversion.**
- Source `convertSFUrl` line 1467 confirms. Accurate.

**n6. 17 DAT fields.**
- Source `DAT_FIELDS` lines 1273–1291 has 17 entries. Accurate.

**n7. Script length math.**
- Script word count: ~3,000 words. At 145 wpm = 20.7 min. Inside the 18–24 min window. Accurate.

**n8. Thumbnail readability at 320px.**
- Visual review of `thumbnail.svg`: at 320×180, "BOLT POST" wordmark in 160pt remains legible. "Post a load in 5 seconds" subline drops to ~9px which is borderline. Acceptable for tile but borderline for mobile preview tiles.
- **Optional polish:** bump "5 seconds." to 64pt (from 56pt) to widen the readable line at small sizes.

**n9. Mass Post deep-link in description.**
- Description references `[link to EP 01]` placeholder. Acceptable for now; resolve at publish time.

### Cross-stage pacing check
- Coding chapter timestamps sum cleanly. Verified `00:00 → 20:45` outro ends at 20:45 with no chapter overlap.
- Title cards spec covers every chapter the script names (1–11 plus cold open + outro).
- Visual spec aligns with title-card style.
- Marketing description chapter list matches the script chapter list 1:1.

---

## Verdict

**VERDICT: GO — with 2 MAJOR fixes and 2 MINOR copy edits applied inline in the deliverable script.**

The Major findings (M1, M2) and Minor findings (m1, m4) must be applied to `deliverables/01-tutorial-script.md` before it ships. The thumbnail is publishable as-is (n8 is optional polish, not a blocker).
