# Title-card spec — CarrierVet tutorial

One full-frame title card per chapter. All cards:
- 1920x1080 (16:9), cream background `#faf7f2`
- Mono chapter number top-left: JetBrains Mono Medium 28pt, `#9b7bb8`, letter-spacing 6
- Title: DM Sans Bold 96pt, color `#2a1820` (near-black ink for highest contrast on cream)
- Pink underline: 280x10 rounded `#d4738c`, directly under title
- Sub-line: DM Sans Medium 36pt, `#5a3445`
- Brand chip cluster bottom-right: 4 candy dots (pink/mint/peach/gold) with mono "05/07" tag
- Motion: card slides up 12 px from `translateY(12)` to 0, opacity 0→1, 200 ms ease-out, hold 1.6 s, exit fade 200 ms

---

## Chapter 0 — Cold open (no card; cold cut)

No title card. Open straight on red factoring banner footage for maximum tension.

---

## Chapter 1 — `01 / WHAT IT IS, WHAT IT ISN'T`

- Title: `THE SCREEN BEFORE THE CALL`
- Sub-line: `CarrierVet doesn't replace Highway. It replaces 30 minutes of tabs.`
- Pink underline only.

## Chapter 2 — `02 / FIRST-RUN SETUP`

- Title: `PASTE THE REPORT URL`
- Sub-line: `Salesforce + your session cookie = automatic carrier history.`

## Chapter 3 — `03 / READING THE DASHBOARD`

- Title: `THREE TIERS, THREE CARDS`
- Sub-line: `Green pass. Amber refs. Red no.`
- Extra: add three small color chips under the sub-line — `#6BBF8E` `#C9A84C` `#C26A6A`

## Chapter 4 — `04 / THE FACTORING BANNER`

- Title: `THE ONE FLAG THAT MATTERS`
- Sub-line: `Build your own blocklist. The default list won't save you alone.`
- Card variant: replace pink underline with RED `#c26a6a` underline for visual gravity.

## Chapter 5 — `05 / CUSTOMERS TAB`

- Title: `MAKE THE TIERS YOURS`
- Sub-line: `Your shop's customer list ≠ our customer list. Edit it.`

## Chapter 6 — `06 / SETTINGS DEEP DIVE`

- Title: `THE clis_ PREFIX`
- Sub-line: `Inherited from CLIS. Look here in DevTools.`
- Title font: JetBrains Mono Bold (the only mono title card) — leans into the developer note.

## Chapter 7 — `07 / END-TO-END VET`

- Title: `CONSTELLATION TIER 2`
- Sub-line: `Phone's ringing. Cover or pass?`

## Chapter 8 — `08 / GOTCHAS`

- Title: `WHAT BREAKS IT`
- Sub-line: `Five things that make CarrierVet useless if you ignore them.`
- Card variant: amber `#c9a84c` underline.

## Chapter 9 — Wrap (no full card)

Use lower-third pill instead — `Built by brokers · for brokers` in mono on a candy-pink pill, 96 px tall, bottom-third, holds 2 s.

---

## Lower-third pills (per script callouts)

Used over footage, not full-frame:

| Trigger | Pill text | Color |
|---|---|---|
| First "Mass Post / Highway / Carrier411 / FMCSA" mention | `CarrierVet ≠ Highway. CarrierVet → Highway.` | Pink `#d4738c` |
| Tier 1 explainer | `TIER 1 · 1 of 1 qual` | Mint `#7bc8b5` |
| Tier 2 explainer | `TIER 2 · 2 of 3 quals` | Gold `#c8a062` |
| Tier 3 explainer | `TIER 3 · 2 of 3 · posting NOT allowed` | Red `#c26a6a` |
| Factoring banner reveal | `Self-remit is IGNORED.` | Cream pill, red border |
| Tutorial replay note | `clis_tutorial_done localStorage flag` | Mono purple `#9b7bb8` |

---

## Keyboard-shortcut chips (visual style only — CarrierVet has none, this is for the cross-suite reference)

If a cross-suite shortcut comes up (e.g. opening Settings via gear icon), use a mint pill `#7bc8b5` with mono dark text, 48 px tall, 12 px rounded corners.
