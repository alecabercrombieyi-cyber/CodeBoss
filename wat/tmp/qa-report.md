# QA — adversarial audit of CarrierVet long-form package

Severity: **P0** = blocker, must fix before recording. **P1** = should fix, hurts but not fatal. **P2** = polish.

---

## P0 — factual / brand blockers

### P0-1 — "Default factoring list of 150+ companies" is unverified
**Script claim (Ch. 4, 9:00):** "CarrierVet ships with a default list of factoring companies that have shown up in fraud chains."
**Reality:** The HTML contains a `DEFAULT_FACTORING` array, but I never counted the entries or verified the framing as "shown up in fraud chains." Some are likely legitimate factors that the user's shop has chosen to avoid for other reasons (rate disputes, slow-pay).
**Fix:** Soften to "CarrierVet ships with a default list of factoring companies pre-loaded — these are the ones we've chosen to block at Bay & Bay. Yours might be different. The real value is when you add the one that just burned your brokerage last week."

### P0-2 — "8,400 loads · 1,200 carriers" is fabricated
**Script claim (Ch. 3, 4:30):** "Top right, you can see the data badge — in this example, eight thousand four hundred loads, twelve hundred carriers."
**Reality:** That's an invented sample number. The actual badge will read whatever the recording's CSV has.
**Fix:** Replace with "however many loads and carriers your report has — in my recording you'll see X loads, Y carriers." Add a TODO at script for the editor to confirm the actual numbers from the recording.

### P0-3 — "Authority requirements" not surfaced in the UI
**Script claim (Ch. 1, 1:50 sub-context and ambient framing):** Tier 1 = 15 mo authority, Tier 2/3 = 24 mo.
**Reality:** The TIERS object has these fields (`authorityMonths`, `authorityWithBB`) but the UI does NOT render an "authority age" check (that lives in Highway). Mentioning it in the script implies CarrierVet checks it.
**Fix:** Either remove the authority-months mention entirely, OR add a clarifying line: "Authority age you still verify in Highway — CarrierVet doesn't pull that. The tier rules just tell you what bar you need to clear."

### P0-4 — Tier 2 "alternate cities required" claim needs context
**Script claim (Ch. 1, 1:50):** "Tier 2 is your Gallos and your Constellations — manager plus compliance, alternate cities required."
**Reality:** The TIERS field `posting:"Allowed (alternate cities required)"` is about LOAD POSTING (DAT posting practice), not about carrier vetting per se. As stated, it could confuse viewers into thinking CarrierVet enforces it.
**Fix:** Rephrase: "Tier 2 — manager plus compliance, and when you post these on DAT you have to use alternate cities. That posting rule's not enforced here, it's enforced in Mass Post. CarrierVet just reminds you it exists."

### P0-5 — Recommended title overlaps with the Coding agent script's claim
**Marketing title #1:** "Stop Getting Double-Brokered: Vet Any Carrier in 10 Seconds."
**Reality:** The cold open says "if you've ever booked a carrier and three hours later your shipper calls you saying the wrong driver is at the dock" — that's not exactly double-brokering, that's identity-swap / fake carrier. Double-brokering is when a carrier accepts the load and re-brokers it without permission. These are related but distinct fraud patterns.
**Fix:** Tighten title to "Stop Getting Burned by Fake Carriers: 10-Second Vet" OR keep the double-broker framing but rewrite the cold open: "If you've ever booked a carrier and three hours later realized they re-brokered your load to a stranger — yeah."
**Decision applied below:** Keep the original title (double-brokering has higher search volume), rewrite the cold open opening line.

---

## P1 — hook / pacing

### P1-1 — 25-second cold open is at the upper limit
The cold open + Chapter 1 intro together run to 2:30 before the first concrete demo. Freight-YouTube retention curves crater between 0:30 and 1:30 if there's no on-screen action.
**Fix:** Cut Chapter 1 from 2:05 to 1:30 by collapsing the "what it isn't" beat into a single 20-second slate, then jump-cut into a real tier-card render at 1:55 instead of 2:30. Saves 35 seconds before first interaction.

### P1-2 — Chapter 7 (real-world flow) is the strongest section but it's buried at 14:30
The end-to-end flow is the most retention-grabbing chapter (concrete phone-ringing scenario, tension). It belongs earlier or referenced earlier.
**Fix:** Add a 6-second teaser at 0:18 ("we'll do an actual vet at the 14-minute mark") — gives YouTube's algorithm a clear later-section payoff and pulls retention forward.

### P1-3 — Pacing dead zone at 11:00-13:00 (Customers tab)
The customer tab is 2 minutes of admin-screen narration with low visual variety. Risk of drop-off.
**Fix:** Cut to 1:15 max. Demo: open tab, scroll the three lists, add one, remove one, hover a lock badge to show payoff. Skip the philosophical "why does this matter" — the on-screen lock badge tells the story.

### P1-4 — "Highway green" can't be the dominant color in any frame
Brand spec says avoid Highway-green dominance, but the script repeatedly highlights the green "Open in Highway" button. In b-roll close-ups, that button could fill the frame.
**Fix:** When close-up on the Highway button, frame at 50% so the cream/pink suite chrome stays visible. Lower-third pink pill on the same frame anchors the suite brand.

### P1-5 — Marketing recommends "Free broker tool" framing but the description doesn't say "free" until paragraph 3
**Fix:** Move "It's free. It runs in your browser. There's no signup." to paragraph 1, sentence 2. CTR uplift on the description preview.

---

## P2 — polish

### P2-1 — Thumbnail BLOCKED stamp may compete with the headline at 320 px wide
Mentally downscaled, the headline + BLOCKED stamp are both fighting for the same right-side real estate.
**Fix:** Shift BLOCKED stamp 40 px further into the bottom-right corner and increase rotation to -10° to read more clearly as a "stamp" gesture rather than competing copy.

### P2-2 — Chapter 6 mono title card is the only mono card
**Visual call:** Risk of feeling like a typo to viewers who clip-watch.
**Fix:** Keep the mono title card — the developer-note ("clis_ prefix from CLIS") is genuinely a developer beat. Add a sub-line explanation that's friendlier: "Don't worry about this if you're not a developer — it's just a name."

### P2-3 — End card subscribe button mockup
**Risk:** Real YouTube end-screen affordances should not be mocked up visually (against YouTube creator guidelines).
**Fix:** Use the standard YouTube end-screen template (subscribe + 2 video pickers) at 0:18:00–0:18:04 of the FINAL cut. Remove the "Subscribe →" mockup from the static end-card design.

### P2-4 — "Built by brokers · for brokers" appears twice in close succession
At 22:05 narration AND on the end card.
**Fix:** Cut the narration line, let the end-card carry it.

### P2-5 — Chapter list timestamps in description must match the final cut
**Risk:** If the QA-driven trims (P1-1, P1-3) save ~1:50, every timestamp after Chapter 2 shifts.
**Fix:** Recalculate timestamps at the FINAL cut stage, before publish. Mark in the publish checklist.

---

## Resolution summary

- **All P0 fixes applied** in `deliverables/01-tutorial-script.md` and `deliverables/04-marketing.md`.
- **P1-1, P1-2, P1-3, P1-5 applied.** P1-4 documented in storyboard.
- **P2-1, P2-2, P2-3, P2-4 applied.** P2-5 added to publish checklist in `06-go-live.md`.
