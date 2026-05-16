# QA Report — Data Wash (Adversarial)

## 1. Factual cross-check against source (data-wash.html)

| Script claim | Source evidence | Verdict |
|---|---|---|
| "Single HTML file, runs entirely in your browser" | Whole file is self-contained except SheetJS CDN (line 9). | ⚠️ **Partial.** SheetJS loads from cdnjs. If the user is offline OR cdnjs is blocked, XLSX features die. Voiceover should soften to "runs in your browser, no backend." Do NOT claim "fully offline." |
| "Four steps: Input → Configure → Washing → Output" | `const STEPS = ['input','configure','washing','output']` line 451. | ✅ Verified. |
| "Three input formats — JSON, CSV, Excel" | Lines 303–305, 310. | ✅ Verified. |
| "Three output formats" | Lines 364–366. | ✅ Verified. |
| "Auto-detection for id, department, category, type, status, role, gender, country defaults to preserve" | Line 761. | ✅ Verbatim. |
| "Row multiplier 1x to 50x" | Lines 344–348. Values are 1, 2, 5, 10, 25, 50. | ✅ Verified. |
| "Random seed default 42" | Line 352 `value="42"`. | ✅ Verified. |
| "Same seed + same input = identical output" | `mulberry32(seed)` deterministic — lines 483–490. | ✅ Mathematically true. |
| "About 1.5 seconds wash time" | `80ms × 20 ticks = 1600ms` (line 824–826). | ✅ Verified. |
| "Salaries get ±20% variance with preserve-distribution on" | `variance = Math.abs(num)*0.2` line 544. | ✅ Verbatim. |
| "Phones respect dashes vs parens formatting" | Lines 511–514: branches on `sv.includes('(')` and `sv.includes('-')`. | ✅ Verified. |
| "CSV gets a 13-line comment block" | Lines 611–625 — count: 13 lines including the empty trailing line. | ✅ Verified. |
| "Excel gets two sheets — `_SYNTHETIC_NOTICE` and `Synthetic Data`" | Lines 934, 943. | ✅ Verbatim. |
| "Character-class scramble preserves uppercase/digits/spaces" | Lines 554–563. | ✅ Verified. |
| "8 fake email domains" | `DOMAINS` array line 458 — count: 8. | ✅ Verified. |
| "40 first names, 30 last names" | Line 456: count `FIRST_NAMES` = 40. Line 457: `LAST_NAMES` = 30. | ✅ Verified. |
| "20 US states" | Line 462 STATES — count: 20. | ✅ Verified. |
| "Random dates 1950–2010" | Line 531: `y = 1950 + Math.floor(rng()*60)` → range 1950–2009. | ⚠️ **Close enough.** Voiceover says 1950–2010; actual is 1950–2009. Trivial. Leave unless flagged. Fix: say "early '50s through 2009" or just "random historical dates." Recommended **soft fix**. |
| "Bob Chen → Phoenix Tanaka with seed 42" | Cannot verify without running — mulberry32 with seed 42 on Bob Chen's row would need test. | ⚠️ **Risk: voiceover hard-codes a fake name.** If the actual seed-42 output differs, viewers will notice. **REQUIRED FIX:** Either run a quick test and update the script with actual seed-42 output OR rewrite to "say something like Phoenix Tanaka." Recommend the latter — safer and still illustrative. |
| "Wren Singh with seed 100" | Same risk as above. | ⚠️ Same fix as above. Replace with generic phrasing. |

### Script claims that need softening
1. Replace **"Bob Chen became Phoenix Tanaka"** with **"Bob Chen became something like 'Phoenix Tanaka' — a totally fabricated name from the pool"**.
2. Replace **"seed 42 gives Phoenix Tanaka, seed 100 gives Wren Singh"** with **"change the seed, you get a different set of fakes. Same seed, same output every time."**
3. Replace **"1950–2010"** with **"random historical dates."**
4. **"Free forever"** — drop the "forever" modifier. Honest framing is "free today, browser-only, no signup."

## 2. Hook strength

**Score: 9/10.** Strong scenario, strong pause, strong "or — you use Data Wash" pivot.

Weak spots:
- The "$200/month for a privacy SaaS" line is unverified. There ARE privacy SaaS tools in that range, but a viewer might call it out. **Fix:** change to "pay a SaaS that wants your credit card on file." Sidesteps the price claim.
- "Manually scrub it in Excel for 45 minutes" — fine, but could be punchier as "spend your afternoon in Find-and-Replace."

**Recommended hook rewrite (small):**
> "Quick scenario. You're a freight broker. A TMS vendor emails you: 'send us a sample of your customer data so we can build you a demo.' You open the export and… yeah. Real names. Real phones. Driver SSNs. Contract rates you absolutely cannot leak.
>
> So what do you do? Spend your afternoon in Find-and-Replace? Upload it to some sketchy online tool? Sign up for a SaaS that wants your credit card on file?
>
> Or — you use Data Wash. Free. Browser-only. Nothing uploads. Two minutes. Done."

## 3. Pacing review

| Chapter | Allocated | Verdict |
|---|---|---|
| 00:00–00:45 (cold open) | 45 sec | ✅ Right size |
| 00:45–02:00 (overview) | 75 sec | ✅ |
| 02:00–03:30 (sample load) | 90 sec | ✅ |
| 03:30–08:00 (configure deep dive) | 4 min 30 | ⚠️ **Long.** Utility-app rule of thumb: no single chapter >4 min. Recommend splitting into **two cards on screen** (Modes 03:30–06:30, Options 06:30–08:00) — script already separates them, just add the second on-screen card. |
| 08:00–12:00 (wash + output) | 4 min | ✅ Tight but acceptable |
| 12:00–14:00 (JSON + XLSX) | 2 min | ✅ |
| 14:00–16:30 (weird columns) | 2 min 30 | ✅ |
| 16:30–18:00 (seeds) | 90 sec | ✅ |
| 18:00–19:30 (recap) | 90 sec | ✅ |

**Total: 19.5 minutes — within 15–22 target.** ✅

## 4. Brand alignment

- ✅ Thumbnail uses candy palette correctly
- ✅ Title cards stay on-brand
- ⚠️ **Visible mismatch warning:** in-app footage will show emerald/dark UI. Visual-spec.md addresses this with persistent pink ribbon. Make sure editor doesn't forget.
- ✅ Voice is broker-to-broker throughout
- ⚠️ The phrase "the killer line" appears in marketing-output.md. Not on-screen. Internal doc only. Fine.

## 5. Marketing risk

| Risk | Severity | Fix |
|---|---|---|
| Title #5 ("lawsuit waiting to happen") could trigger YouTube's "sensitive content" filter, depress impressions | Medium | Drop title #5 from primary rotation. Move to "use only if testing." |
| Description's privacy disclaimer is good — already softens HIPAA/GDPR claims | ✅ | Keep as written |
| Pinned comment claims "None of them upload your data" — this is true for Data Wash but may not be 100% true for other Suite apps (e.g., Mass Post talks to Salesforce) | High | Rephrase pinned comment: "All free. Most run entirely in your browser (Data Wash and Load Manager are 100% local)." Don't overclaim across the suite. |
| "I built a free PII scrubber" (title #3) — the creator-personality angle is good but the channel is Logistics Suite branded, not a personal channel. Risk of voice mismatch. | Low | Use as A/B, not primary |
| Mention of "Bay & Bay Transportation" in description — fine, but make sure employer messaging is approved internally. | Low (user is the builder, has been making these for months) | No action |

## 6. Accessibility

- ✅ Chapter timestamps present in description
- ⚠️ Captions plan in visual-spec.md only mentions "burned-in for first 30 sec, standard CC after." Confirm with editor that auto-CC will be reviewed and corrected for "SSN," "PII," "TMS," "MC#" — auto-caption tends to mangle these. **REQUIRED FIX in 06-go-live.md.**
- ✅ Thumbnail tested mentally at 320px mobile size: "DATA WASH" pill, the bubble, and "Hide PII in 2 minutes" all readable. The before/after data blocks become decorative at small size — that's fine, they're not load-bearing.
- ⚠️ Color-only encoding in the field pills (green/blue/red) is reinforced by dropdown text labels (synthesize/preserve/redact). Confirmed in lines 805–807. ✅ Accessible.

## 7. Required fixes (must-do before GO)

1. **Replace hard-coded fake names** ("Phoenix Tanaka", "Wren Singh") with generic phrasing in the tutorial script.
2. **Replace "1950–2010"** with "random historical dates" in the script.
3. **Drop "free forever"** language — say "free, no signup."
4. **Soften the "200/month SaaS" hook line** to "SaaS that wants your credit card on file."
5. **Rephrase pinned comment** to not overclaim "no upload" across the entire suite.
6. **Split configure chapter title card** — add a second one at 06:30 for Options.
7. **Add caption-review note** to go-live checklist (review for SSN/PII/TMS/MC mangling).
8. **Drop title #5** from primary rotation (lawsuit framing — algorithmic risk).
9. **Soften "fully offline" claim** — script must say "browser-only, no backend" not "100% offline" because of SheetJS CDN dependency.

## 8. Nice-to-haves (defer if time-pressed)

- Actually run mulberry32 with seed 42 against sample data and use real fake names in the script — even more credible
- Include a 5-second pre-roll showing the data-wash.html source on GitHub (proves "single HTML file" claim visually)
- Add a "what if cdnjs is blocked?" mini-callout for XLSX features

## 9. GO / NO-GO

**Verdict: CONDITIONAL GO.** Apply the 9 required fixes. The 9 fixes are surgical edits to existing prose, not restructuring. Estimated time-to-apply: 15 minutes. Once applied → full GO.
</content>
</invoke>