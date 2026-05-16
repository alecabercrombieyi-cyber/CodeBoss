# QA report — adversarial audit (QA sub-agent)

Inputs reviewed:
- `wat/tmp/coding-output.md`
- `wat/tmp/marketing-output.md`
- `wat/tmp/thumbnail.svg`
- `wat/tmp/title-cards.md`
- `wat/tmp/visual-spec.md`
- Source HTML: `C:/Users/aleca/Desktop/Logistics Suite/Logistics-Suite/site/mass-post.html`

Severity: **P0** must-fix before commit; **P1** should-fix; **P2** nice-to-have.

---

## P0 — must-fix

### P0-1. Bulk Export modal title in script says "Salesforce", project says rename to "Revenova"
- Source HTML line 3516: `<h2>📤 Bulk Export — DAT + Salesforce</h2>` is still literal.
- Project CLAUDE.md pending work item: "Rename all 'Salesforce' UI text to 'Revenova'."
- The script doesn't explicitly call out the modal title, but the storyboard zoom on this header would betray the inconsistency.
- **Fix:** Add a single line in the script (Chapter 3, ~04:30) acknowledging the modal still reads "Salesforce" but everywhere we say "Revenova", they're the same system; or simply use the modal title verbatim ("Bulk Export — DAT + Salesforce") and don't pretend otherwise. Recommend the latter — honesty beats glossing.

### P0-2. "55 min saved" on the thumbnail is a marketing number, not a measured one
- Hook + thumbnail use "5 minutes" and "55 min saved". If a viewer comments asking how the 55 was measured, there's no source. Honest, but flimsy.
- **Fix:** Keep the thumbnail (it's a relative comparison vs the "used to be an hour" line) but add a script aside at 20:50 admitting this is one broker's measured morning, not a guarantee. One sentence is enough.

### P0-3. Script claims "no API key" for the Salesforce pull, which is true but the **dat-pp-cli daemon does store a token**
- Script (08:30 chapter): "Drops a fifty-lane batch from three minutes to ten seconds." Plus 09:10: "Token rotates every thirty minutes."
- Risk: A viewer hears "no API key, your data lives in your browser" early on, then sees the token bookmarklet later and concludes the privacy claim was overstated.
- **Fix:** In Chapter 5, add one line: "The daemon stores your DAT token locally only — it never leaves your machine. Same privacy posture, just faster."

### P0-4. "Single-load Post Alone uses Fill DAT" needs explicit Ctrl+V prompt mention
- Source line 3395: "On the DAT posting form: click it → Ctrl+V → OK." The script (Chapter 10) mentions it but burys the Ctrl+V step.
- **Fix:** Make the Ctrl+V beat its own keyboard chip overlay (per the visual spec). One on-screen keyboard chip at 15:50.

---

## P1 — should-fix

### P1-1. Hook is strong but says "fifty loads, five minutes" — script delivers ~5 minutes only at ~50 lanes if the daemon is running
- Without the daemon, 50 lanes × 4 s/lane = 200 s = ~3.3 minutes of scraping alone, plus context-switching and Revenova writeback, easily 6–8 minutes total.
- The hook is defensible because of the daemon path, but the viewer doesn't know about the daemon yet.
- **Fix:** Cold-open should reference "with the daemon running" briefly, or pivot the hook to "from an hour to under ten minutes" to be defensible without the daemon. Recommend the former — keep the punchy number, just qualify it ONCE in the cold open.

### P1-2. Title-card chapter numbering off-by-one vs the spoken script
- Script labels Chapter 1 as "The 60-second tour" starting at 01:25, but the cold-open + tour preview happens 00:00–01:25 with no chapter card. That's intentional but the title-card spec lists 15 cards mapped to chapters 1–15, omitting the cold-open and outro cards (which are listed under "Special cards" — good).
- Risk: editor sees the table and assumes chapter 01 starts at 00:00.
- **Fix:** Add a short note in `title-cards.md` clarifying that chapter cards 01–15 begin at the timestamps in the script's chapter list, NOT at 00:00. (Minor, but worth catching now.)

### P1-3. The script references the Benchmark Rate writeback as if shipped
- Source line 3575 has the `📊 Benchmark Rate` button, so the button exists. Project CLAUDE.md still lists "Add Benchmark Rate field writeback to Revenova" as pending work.
- The bookmarklet may not yet inline-edit Benchmark Rate on the Revenova side (only Posted Amount).
- **Fix:** Soften the Chapter 7 line about Benchmark Rate from "Or 📊 Benchmark Rate. Or both — they're independent" to "Posted Amount is the polished path. Benchmark Rate works on the export side and is rolling out for the Revenova writeback — give it a try and tell me what breaks." Keeps the demo honest without removing the button from the tour.

### P1-4. Pacing dead zone risk: Chapter 5 (08:30–10:00) is 90 s on the daemon path and most viewers won't install it on the first watch
- Pure narration risk: viewer who knows they'll skip the daemon will tune out.
- **Fix:** Split Chapter 5 into a 45 s "what it does + payoff" beat at the start, then a chapter-end overlay with "(Skip the daemon? Jump to Chapter 6 at 10:00 → )" so non-installers can hop ahead without losing the through-line.

### P1-5. The thumbnail's bottom-right card has rate values that don't match a real DAT call sheet
- "$1,950 → $1,800", "$2,425 → $2,250", "$1,440 → $1,300", "$1,795 → $1,650" — these are plausible, but the delta is suspiciously consistent (-$150). Looks staged because it IS staged (we used the default formula).
- **Fix:** Either acknowledge in the thumbnail-only that this is the default formula, OR vary the deltas slightly. Recommend variance: keep one row at exactly -$150 (matches default), make the others vary so it doesn't look like a screenshot of a single formula sweep.

### P1-6. Marketing says "Category: Science & Technology" but freight tools often perform better under "Howto & Style" → "Education" depending on YouTube's regional taxonomy
- Both are defensible; the rec is fine.
- **Fix:** Add a note that if CTR underperforms in week 1, A/B swap to "Education" category as a lever.

---

## P2 — nice-to-have

### P2-1. The 15-second hook word count (49 words at ~3.3 wps) is tight — if Alec speaks at 3.0 wps it overruns to 16.3 s
- **Fix:** Trim one phrase ("and I built this so I'd stop doing that" → "and I built this to stop doing that") to drop 2 words. Buys a 0.6 s buffer.

### P2-2. No chapter card for the cold open / preview between 00:00–01:25
- Intentional and probably correct (cold opens shouldn't be card-led), but flag it so the editor doesn't assume one is missing.

### P2-3. Thumbnail SVG doesn't include the suite "candy-cube" logo
- Could add a 64×64 candy-pink lightning bolt icon top-right to brand-stamp the thumbnail to the Logistics Suite. Optional — the suite chip top-left already does this work.

### P2-4. Tags list doesn't include "freight broker tips" or "rate negotiation"
- Both have decent search volume. Could swap "broker rate negotiation" for "freight broker tips" if we want broader top-of-funnel reach.

### P2-5. The 23-step in-app tutorial isn't referenced in the script
- Could land a 5-second mention at the end of Chapter 1 ("by the way, there's a 23-step tutorial in the app under Settings if you ever want to repeat it") — adds value, doesn't slow pacing.

### P2-6. Footage cues OK
- Every script beat has a paired on-screen action — no orphaned narration found. Good.

---

## Brand audit

- Palette adherence: title-cards.md and visual-spec.md are clean — only candy colors, no Outfit-on-overlay, no cyan in the title-card layer.
- Voice audit: every line in the script reads as broker-to-broker. No "leverage", no "synergy", no "platform". Pass.
- One small note: the cold-open line "It's called Mass Post." reads slightly self-promotional. Consider trimming to "This is Mass Post." — flatter, more honest. **P2** at most.

---

## Thumbnail readability at 320 px

- "50 LOADS." in 116pt → ~29 px wide at 320px scale: legible ✓
- "5 MINUTES." in 116pt pink on cream → legible ✓
- "No retyping." in 62pt → ~16 px: borderline, but supported by surrounding context.
- Right card (rate table) at 320 px is decorative — the eye reads numbers, the rows are not individually parseable. That's fine.
- "💰 Posted Amount → Revenova" mint pill: emoji silhouette and color block carry it.
- Overall: passes the 320 px scroll-test.

---

## Verdict

- 4 × P0
- 6 × P1
- 6 × P2

**Recommended action for Stage 3:** apply all P0 (mandatory) + P1-1 / P1-3 / P1-4 / P1-5 (high-impact) + P2-1 (cheap win). Defer the remaining P2 to a v2 of the package.
