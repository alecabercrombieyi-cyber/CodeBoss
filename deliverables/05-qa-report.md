# CarrierVet — QA Report (with resolutions)

Original findings from `wat/tmp/qa-report.md`, plus the resolution applied per item.

## P0 — factual / brand blockers

### P0-1 — "Default factoring list of 150+ companies" is unverified
**Finding:** Script implied the default list is curated fraud-chain factors.
**Resolution:** Script line at 8:25 in `01-tutorial-script.md` rewritten to: *"CarrierVet ships with a default list pre-loaded — these are the ones we chose to block at Bay & Bay. Yours might be different."* — RESOLVED.

### P0-2 — "8,400 loads · 1,200 carriers" fabricated
**Finding:** Script invented sample stats.
**Resolution:** Script line at 3:50 rewritten to: *"that's your universe. Whatever your report has, that's what CarrierVet sees."* Editor TODO inline note added: "(EDITOR: confirm the actual numbers from this recording.)" — RESOLVED.

### P0-3 — Authority requirements not surfaced in UI
**Finding:** Mentioning `authorityMonths` implied CarrierVet checks authority.
**Resolution:** Script line at 1:15 now includes: *"Authority age you still verify in Highway — CarrierVet doesn't pull that, the tier rules just tell you what bar you need to clear."* — RESOLVED.

### P0-4 — Tier 2 "alternate cities required" claim
**Finding:** Implied CarrierVet enforces a posting rule it does not enforce.
**Resolution:** Script line at 1:15 rewritten: *"...and when you post on DAT you have to use alternate cities. That posting rule's enforced in Mass Post, not here. CarrierVet just reminds you it exists."* — RESOLVED.

### P0-5 — Cold open language ("wrong driver at the dock") doesn't match "double-brokering"
**Finding:** Mismatched fraud-pattern language vs. title.
**Resolution:** Cold open rewritten: *"If you've ever booked a carrier and three hours later realized they re-brokered your load to a stranger — yeah."* — language now matches "double-brokered" in the title precisely. RESOLVED.

## P1 — hook / pacing

### P1-1 — 25-second cold open + Chapter 1 = 2:30 before first demo
**Resolution:** Chapter 1 cut from 2:05 to 1:30. Jump into real tier-card render at 1:55 in final script. Cumulative savings: ~35 seconds. RESOLVED.

### P1-2 — Strongest chapter buried at 14:30
**Resolution:** Added teaser in Chapter 0 at 0:18: *"We'll do an actual end-to-end vet at the 14-minute mark."* RESOLVED.

### P1-3 — Customers tab (originally 11:00–13:00) was a 2-min admin dead zone
**Resolution:** Cut to 1:15 in final script (now 10:20–11:35). Philosophical "why this matters" line replaced by a direct lock-badge close-up. RESOLVED.

### P1-4 — Highway green couldn't dominate a frame
**Resolution:** Storyboard shot #37 explicitly notes "Highway framed at 50%, pink lower-third pill visible". RESOLVED via storyboard, not script.

### P1-5 — "Free" buried in paragraph 3 of description
**Resolution:** "**It's free. It runs in your browser. There's no signup.**" moved to paragraph 1, sentence 2 of the final description in `04-marketing.md`. RESOLVED.

## P2 — polish

### P2-1 — BLOCKED stamp competed with headline at 320 px
**Resolution:** Final `03-thumbnail.svg` shifts stamp from translate(960,500) rotate(-8) to translate(1020,560) rotate(-10) — 60 px further into the bottom-right corner, steeper angle reads more clearly as a "stamp" gesture. RESOLVED.

### P2-2 — Mono title card on Chapter 6 felt typo-like
**Resolution:** Title-cards spec kept the mono treatment but added sub-line: *"Don't worry about this if you're not a developer — it's just a name."* Script narration at 12:00 echoes this. RESOLVED.

### P2-3 — End card subscribe-button mockup against YouTube guidelines
**Resolution:** Visual spec section 8 updated — use standard YouTube end-screen template (subscribe + 2 video pickers) at 0:18:00–0:18:04 of FINAL cut. Static end-card design no longer includes a mocked subscribe button. RESOLVED in visual spec.

### P2-4 — "Built by brokers · for brokers" repeated narration+end-card
**Resolution:** Narration line at 22:05 (research draft) removed in final script. End card carries it. RESOLVED.

### P2-5 — Chapter timestamps will shift after the QA trims
**Resolution:** Final marketing description uses the recalculated 20:30 timestamps. Publish checklist in `06-go-live.md` requires re-verification of timestamps against the actual final cut before publish. RESOLVED via process.

## Score

- P0 resolved: **5 / 5 (100%)**
- P1 resolved: **5 / 5 (100%)**
- P2 resolved: **5 / 5 (100%)**

Verdict gate: **GO threshold met** (P0 = 100%, P1 ≥ 80%).
