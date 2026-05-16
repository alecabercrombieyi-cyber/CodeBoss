# Title Cards — Bolt Post Tutorial

Each card is a full-frame overlay (1920×1080 in the edit, displayed for 1.2–2.0 s). Background = the Bolt Post deep navy `#0A0E1A` with a faint diffuse lightning glow. Type = DM Sans (display) and JetBrains Mono (kicker/tagline). Accent colors come from the Suite brand + Bolt's electric blue.

---

## Card 0 — Cold-open hook (0:00–0:18)
- **Top kicker (mono, 18pt, letter-spaced):** `LOGISTICS SUITE · EP 02`
- **Center wordmark, two lines:**
  - Line 1: `BOLT` — DM Sans 220pt, weight 900, color `#E8EDFB`
  - Line 2: `POST` — same size, color = gradient `#6EA8FF → #A78BFA`
- **Gold underline bar** below the title (`#c8a062`, 6px, 380px wide)
- **Animation:** lightning flash → wordmark snaps in with a subtle x-axis screen-shake → underline draws left-to-right in 200ms.

## Card 1 — Chapter intro template
- **Mono kicker, top-left:** `CHAPTER 03 · COLUMN MAPPING`
  (Mono 16pt, color `#A78BFA`, letter-spaced 4)
- **Big title, center-left:** `Map your report once.`
  (DM Sans 92pt, weight 800, color `#E8EDFB`)
- **Subline (40pt regular, color `#7B8DB8`):** plain-language summary, e.g. *"17 DAT fields, auto-guess does most of it."*
- **Right side:** the lightning bolt SVG (large, low-opacity 30%, color `#4D8DFF`)
- **Bottom-left, mono:** time-of-cut timecode

Repeat with the chapter list:
| Chapter | Title | Subline |
|---|---|---|
| 02 — PULL THE REPORT | Salesforce → cards in 3 seconds | Lightning URL → Classic CSV servlet, hidden iframe |
| 03 — COLUMN MAPPING | Map your report once | 17 DAT fields, auto-guess does most of it |
| 04 — COPY → FILL DAT | The 5-second loop | Click Copy, switch tab, click bookmark, paste |
| 05 — REPLY VARIATIONS | Three reply styles, one click | Greeting · day · window · rate · sign-off |
| 06 — CUSTOMER → COMMODITY | The app learns your customers | Fill a commodity once. It remembers. |
| 07 — MULTI-STOP LOADS | The killer feature | Inline P/D rows, appt windows, stop-aware replies |
| 08 — BULK CSV EXPORT | 200 posts in one upload | Split city/state, lanes deduped, weight clamped |
| 09 — FILTERS | Focus on what matters today | Today chip · date range · min margin · search |
| 10 — BOLT vs MASS | Two tools, one workflow | Mass to price. Bolt to post. |

## Card 2 — Inline callout (on-screen during demo)
- **Floating chip, top-right of the screen:** rounded `#4D8DFF` with white text, e.g.
  - `⚡ COPY → JSON ON CLIPBOARD`
  - `📋 PASTE INTO ⚡ FILL DAT PROMPT`
  - `✅ 16 FIELDS FILLED`
- DM Sans 22pt, padding 8×16, 18ms fade-in.

## Card 3 — "Pause and read" instruction overlay
Used when showing the report-URL paste step.
- **Dark scrim 60% over the screencap**, centered card 800×360 rounded 16
- **Header (DM Sans 36pt, 800):** `1. Paste your Salesforce report URL`
- **Mono one-liner (16pt):** `https://...lightning.force.com/lightning/r/Report/...`
- **Bottom-right CTA (pink Suite chip):** `[ Save URL ]`

## Card 4 — "TRY IT" mid-roll CTA (around 10:30)
- **Full screen, deep navy.**
- **Big mono:** `OPEN BOLT-POST.HTML AND TRY IT NOW.`
  (JetBrains Mono 64pt, weight 600, color `#E8EDFB`)
- **Subline:** *"Free. Single file. No login. Your data never leaves your browser."* (DM Sans 28pt, color `#7B8DB8`)
- **URL chip (cream):** `logisticssuitev1.pages.dev/bolt-post.html`
- **Hold 4 seconds.**

## Card 5 — Outro / next-video card
- **Left half:** Bolt Post bolt + the words `THAT'S BOLT POST.`
- **Right half (vertical split):** thumbnail tile of the *next* tutorial (placeholder), labeled `NEXT: RATE FORMULA DEEP-DIVE`
- **Bottom pink ribbon (matches thumbnail):** `Logistics Suite · Built by brokers · for brokers`
- **Subscribe nudge:** small Suite logo + `[ SUBSCRIBE ]` paper-button on bottom right.

---

## Type / palette tokens (reference, copy into editor)
```
--bg:        #0A0E1A
--surface:   rgba(15,20,40,0.85)
--bolt:      #4D8DFF
--bolt-br:   #6EA8FF
--electric:  #A78BFA
--text:      #E8EDFB
--text-dim:  #7B8DB8

--cream:     #faf7f2
--pink:      #d4738c
--pink-deep: #b85775
--gold:      #c8a062

font display: DM Sans / Outfit, weight 800–900
font mono:    JetBrains Mono, weight 500–600
```
