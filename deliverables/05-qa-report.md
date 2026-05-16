# Pillar Tutorial — QA Report (Final)

QA reviewed all artifacts against `pillar.html` ground truth. All Fail items have been addressed by the Final-Decision agent before promotion to `deliverables/`. This file is the audit trail.

## Factual claims (script + on-screen overlays)

| # | Claim | Source line(s) | Verdict |
|---|---|---|---|
| F1 | Core = 4+ loads, same rep, prev month, keyed on Actual Delivery Date | pillar.html:577, :590 | PASS |
| F2 | New Core = 2+ loads, ship + expected delivery this month, not already a Core | pillar.html:602-622 | PASS |
| F3 | Cancelled / Voided / Tonu excluded | pillar.html:409 | PASS |
| F4 | Severity: Soft (hist≤1) / Severe (NEW CORE) / Standard | pillar.html:665 | PASS |
| F5 | SF pull = ~26 sec progress bar | pillar.html:1123 | PASS |
| F6 | RC timing = Load: Last Activity Date, must be ≥ lock date | pillar.html:655-659 | PASS |
| F7 | Cores keyed on delivery, violations scan on ship date | pillar.html:577 vs :633 | PASS |
| F8 | Established core lock date = 1st of current month | pillar.html:645 | PASS |
| F9 | New core lock date = 2nd ship date sorted chronologically | pillar.html:621-623 | PASS |
| F10 | Tied carriers — rep with higher load count wins | pillar.html:591 | PASS |

**All factual claims verified against source. No fictionalization detected.**

## Brand / visual

| # | Item | Original | Fix applied |
|---|---|---|---|
| B1 | Pillar gold hex in thumbnail | `#c8a062` / `#e8d5a8` | Updated to `#b8974a` / `#e8d9b8` (matches app `--gold` variable in pillar.html:14) |
| B2 | In-app vs overlay font note | Not addressed | Added clarification: Pillar's in-product font is Barlow (suite-level baseline is DM Sans + JetBrains Mono — the video overlays/thumbnail use the suite baseline, app screen recordings naturally show Barlow). This is intentional. |
| B3 | Candy palette use (pink, mint, purple) | Aligned | PASS — no change |

## Pacing

| # | Check | Verdict |
|---|---|---|
| P1 | Total runtime 15-22 min | PASS — script reads to 18 min at ~150 wpm |
| P2 | No chapter >4 min | PASS — longest is Violations at 3 min |
| P3 | Cold open under 30 sec | PASS — chapter 1 card at 00:30 |
| P4 | Strong hook in first 10 sec | PASS — concrete numbers + curiosity |

## Discovery (title / description / tags)

| # | Check | Fix applied |
|---|---|---|
| D1 | Title under 70 chars for desktop YouTube | Trimmed primary title from 71 → 60 chars: "Who Poached Your Carrier? Pillar — App 7 of the Suite" |
| D2 | Description hook line earns the click | PASS |
| D3 | Chapter timestamps all monotonic and complete | PASS |
| D4 | 20+ tags | PASS — 26 tags |

## Thumbnail

| # | Check | Verdict |
|---|---|---|
| T1 | Headline readable at 320x180 mobile card | PASS — 86pt headline |
| T2 | Broker voice on overlay copy | PASS — "Who Poached Your Carrier?" is floor language |
| T3 | Gold tone matches app's `--gold` | FIXED — see B1 |
| T4 | NEWEST ribbon clearly visible | PASS — mint pill, top-right, 8° tilt |
| T5 | Composition reads at a glance | PASS — pillars on left, text-block right |

## Voice

| # | Check | Verdict |
|---|---|---|
| V1 | Broker-to-broker, no enterprise jargon | PASS |
| V2 | Suite cross-references correct | PASS — 6 other apps named correctly |
| V3 | Pillar hub position | PASS — confirmed last card via app.html:492 |

## Gaps closed by Final-Decision agent

| # | Gap | Fix applied to script |
|---|---|---|
| G1 | Column-name strictness not mentioned | Added in chapter 2: "Pillar reads column names exactly. If your TMS report has slightly different headers than Bay and Bay's template, hit me up about column mapping." |
| G2 | In-app tutorial overlay not mentioned | Added in chapter 2: "First time you open Pillar, an in-app tutorial walks you through this same flow — same content as this video, just inside the app." |
| G3 | Lock date for established cores not specified in script | Added in chapter 6: "For established cores, the lock starts on the 1st of the current month. For new cores, on the day of the 2nd shipped load." |

## Summary

| Category | Pass | Fail (now fixed) | Notes |
|---|---|---|---|
| Factual claims | 10 | 0 | All engine rules verified |
| Brand / visual | 1 | 2 | Both fixed in deliverable thumbnail |
| Pacing | 4 | 0 | Within band |
| Discovery | 3 | 1 | Title trimmed to 60 chars |
| Thumbnail | 4 | 1 | Gold tone corrected |
| Voice | 3 | 0 | On-brand |
| Gaps | — | 3 | All 3 sentences added to script |

## Final Verdict
**GO** — all conditional fail items resolved. Package ready to ship.
