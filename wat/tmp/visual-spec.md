# Visual spec — CarrierVet tutorial

A style guide an editor can follow without watching the rough cut.

## 1. Palette

| Use | Hex | Where |
|---|---|---|
| Primary | `#d4738c` (candy pink) | Title underlines, lower-third pills, accent rings |
| Primary-deep | `#b85775` | Hover states, secondary type |
| Background | `#faf7f2` (cream) | All title cards, end card |
| Ink | `#2a1820` (near-black) | Title text only — never pure black |
| Body | `#5a3445` (wine) | Body copy on cream |
| Mint | `#7bc8b5` | Tier 1 / "PASS" / shortcut chips |
| Gold | `#c8a062` | Tier 2 / lock badges / amber alerts |
| Peach | `#e8a87c` | Subtle backgrounds, sticker accents |
| Purple | `#9b7bb8` | Mono labels, chapter numbers |
| Red | `#c26a6a` | Tier 3 / factoring banner / BLOCKED stamp |

Avoid: Lightning-blue, DAT-orange, Highway-green-as-dominant (Highway green is OK as an accent when literally showing the Highway button).

## 2. Typography

- Display: **DM Sans Bold** for titles 60pt+; **DM Sans Medium** for sub-lines and lower-thirds; **DM Sans Regular** for body
- Mono: **JetBrains Mono** for chapter numbers, keyboard chips, the `clis_` localStorage labels, code on screen
- Letter-spacing: -3 on display ≥80pt, -1 on display 60-80pt, 0 on body, +2 to +6 on mono labels (more = larger letter-spacing)
- Never use system sans-serif as a fallback in screen recordings — always render in DM Sans / JetBrains Mono.

## 3. Motion

- Title card in: translateY 12px → 0, opacity 0 → 1, 200 ms ease-out
- Lower-third pill: scale 0.94 → 1, opacity 0 → 1, 160 ms ease-out, exit fade 160 ms
- Tier card highlight: existing app animation (`waveIn`) — do not overlay editor motion on top
- Cursor: standard system cursor at 1.5x size for screen-recording legibility; add a faint 8px ring on click events for pop

## 4. Frame layout

- 1920x1080 master, exported 1080p
- Safe-zone: 60 px on every edge
- App recording: zoom 1.0x for general, 1.3x for tier-card close-ups, 1.5x for the factoring banner (the hero moment)
- Always show the topbar data badge — it grounds the viewer in "this is YOUR data"

## 5. Overlays / lower-thirds

Position: bottom-left, anchored to the 60 px safe zone.

```
┌───────────────────────────────────┐
│                                   │
│         [app recording]           │
│                                   │
│   ╭───────────────────╮           │
│   │ Lower-third pill  │           │
│   ╰───────────────────╯           │
│   60 px                           │
└───────────────────────────────────┘
```

Pill dimensions: 64 px tall, 24 px horizontal padding, 32 px rounded.

## 6. B-roll inserts

Three approved B-roll moments — keep them short (≤2 s each):

1. **Six tabs collapsing** (Chapter 1): six Chrome tabs visible, fast-forward close to one. Editor: don't capture the user's actual tabs — use a clean Chrome with stock favicons.
2. **Phone ringing** (Chapter 7): cold cut to a desk-phone photo with the ring icon overlay. Audio: stock desk-phone ring, 0.6 s.
3. **DevTools localStorage panel** (Chapter 6): brief 1.5 s cut to Application tab → Local Storage, with `clis_*` keys visible. Blur any actual MC numbers in the value column.

## 7. Brand chip cluster (footer / corner)

A 4-dot row used in the bottom-right of title cards and the end card:

```
●  ●  ●  ●
pink mint peach gold-with-"5"-in-purple-ring
```

The gold dot wears a purple ring and contains the digit `5` (CarrierVet's slot number, 5 of 7).

## 8. End card (last 4 seconds)

- Cream background
- DM Sans Bold 72pt: "Logistics Suite"
- DM Sans Medium 32pt: "The sweet side of freight"
- 7-dot suite map: 7 candy dots in a row, dot #5 with gold ring and number
- Mono URL: `logisticssuitev1.pages.dev` (low-contrast wine, bottom-aligned)
- Subscribe button mockup: pink rounded rect, "Subscribe →", bottom-center
