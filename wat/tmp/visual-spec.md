# Visual spec — on-screen overlay style guide

## Palette (use only these)

| Token | Hex | Usage |
|---|---|---|
| candy-pink | #d4738c | Primary CTAs, chapter ribbons, headline accents |
| pink-deep | #b85775 | Hover/active state, gradient end-stop |
| cream | #faf7f2 | Background, body text on dark |
| cream-shadow | #f1ead9 | Vertical-gradient bottom of cream backgrounds |
| ink | #2a1a22 | Body text on cream, headline default |
| purple | #9b7bb8 | Eyebrow text, secondary callouts, episode chip |
| mint | #7bc8b5 | Success / "saved" / Revenova-action accents |
| mint-deep | #5fb19c | Mint gradient end-stop |
| peach | #e8a87c | Warmth / "urgent" / Post Alone chip |
| gold | #c8a062 | "Time saved" chip, premium-feature accent (daemon) |
| ink-soft | #8a6577 | Disabled/secondary body text on cream |

Do not introduce any other color. In particular, do not let the on-screen capture's cyan (#06B6D4) bleed into title cards or lower-thirds — keep candy palette in the overlay layer.

## Typography

- Display + body: **DM Sans** (700 / 800 weights for display, 500 for body)
- Mono accents: **JetBrains Mono Medium** (500), used for eyebrow text, chapter numbers, keyboard chips, URLs
- Letter-spacing for mono accents: 2–4 units (the higher, the bigger the text)
- Never mix Outfit (the app's font) into overlays — keep them visually distinct

## Layout rules

- 1920×1080 working canvas; 80 px safe margins on every edge.
- 12-column grid for chapter title cards, 60 px gutter.
- Lower-thirds anchored bottom-left, 80 px from edge, 120 px from frame bottom.
- Keyboard chips spawn near the cursor, never higher than 40% of frame.
- Code/url snippets use a thin cream pill with mono font, max width 720 px.

## Motion

- All ease-out, never ease-in. 200–240 ms duration on most elements; 80 ms stagger between siblings.
- Title cards exit with a candy-ribbon wipe (pink rectangle slides L→R at 0.6 frame-widths/s).
- No spinning, no bounce. The energy comes from typography and color, not physics.

## Cursor & capture treatment

- Boost cursor scale 1.4× and add a subtle 8 px cream halo so it tracks against the dark cyan app theme.
- Highlight target buttons with a 4 px candy-pink dashed ring fading in 120 ms before the click.
- After a click that triggers a toast, briefly zoom 1.08× on the toast for 0.6 s, then ease back.

## Annotations on the app capture

- Arrows: candy-pink, 6 px stroke, slight curve (no straight lines), JetBrains Mono caption attached at the tail.
- Crop and zoom on the preview table at 5:45 ("Quick Rate Lookup intro") — zoom on the equipment column at 1.6× to highlight the V/R → VR mapping.
- Speed-up clips: never faster than 3× without a visible "3×" mono chip top-right; speed-ramps must ease in/out 200 ms.

## Audio-visual cues

- Music bed: candy-soft lo-fi instrumental, ducks to -20 dB during narration, restores during transitions.
- Sting on every chapter card: candy chord, 0.6 s, mixed at -8 dB.
- No stock whooshes between cuts — use the candy wipe instead.

## Thumbnail readability test

- File: `thumbnail.svg`.
- At 320 px wide ("50 LOADS." remains legible because the cap height is 116 px → 29 px at 320 px wide, which clears YouTube's 24 px minimum).
- "5 MINUTES." in pink stays readable at 320 px against cream — color contrast ratio ~4.8:1.
- "No retyping." at 62 px → 16 px at 320 wide; intentionally smaller, supports the hook without competing.
- Pink CTA pill at bottom of card with "💰 Posted Amount" remains identifiable because of color block + emoji silhouette, even if the text becomes unreadable.

## Accessibility

- Body text on cream ≥ 7:1 contrast with `#2a1a22`. All overlay-on-overlay text passes WCAG AA at the displayed size.
- Captions baked-in: cream text on a 70%-opacity ink pill, DM Sans Medium 36pt.
