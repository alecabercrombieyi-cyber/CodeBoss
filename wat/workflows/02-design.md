# 02 — Design workflow

## Goal
Produce a YouTube thumbnail and on-screen title-card system that look unmistakably like the Logistics Suite candy brand, while hooking a freight broker scrolling YouTube on a Monday morning.

## Brand anchors (non-negotiable)
- Palette: candy pink `#d4738c` (primary) / `#b85775` (deep) — cream `#faf7f2` — purple `#9b7bb8` — mint `#7bc8b5` — peach `#e8a87c` — gold `#c8a062`
- Fonts: DM Sans (display + body), JetBrains Mono (small mono accents like the tagline)
- Suite tagline: "The sweet side of freight" / "Built by brokers · for brokers"
- Mass Post app identity within the suite: bulk DAT posting + rate management

## Thumbnail constraints
- 1280x720 SVG
- Must remain legible at 320 px wide (YouTube grid)
- Title must be SHORT (3-5 words max), high-contrast, broker-pain hook visible
- Use candy pink as dominant; cream as background. Avoid Lightning-blue or DAT-orange dominance.
- No stock people. Iconography only (clipboard, dollar sign, lane arrows are fair game).

## Title-card / overlay system
- Chapter title cards: cream background, candy-pink underline, DM Sans Bold 72pt, mono chapter number top-left
- Lower-thirds: pink pill with cream text for the speaker callouts
- Keyboard-shortcut chips: mono font, dark text on mint pill
- Motion notes: title cards slide up 12 px with a 200ms ease-out; pills fade in

## Deliverables (to wat/tmp/)
- `thumbnail.svg` — single SVG file
- `title-cards.md` — chapter title-card spec (one card per chapter, with the exact text + color usage)
- `visual-spec.md` — on-screen overlay style guide that an editor could follow
