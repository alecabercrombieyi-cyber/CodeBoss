# Visual spec — Freight Matcher tutorial

## Palette (final)
| Token              | Hex      | Use                                                |
|--------------------|----------|----------------------------------------------------|
| Cream              | #faf7f2  | Card backgrounds, Suite chrome                     |
| Cream-warm         | #f3ebe0  | Background gradient bottom                         |
| Candy pink         | #d4738c  | Brand accent bar, eyebrow                          |
| Candy deep         | #b85775  | Hover, secondary text accent                       |
| Suite purple       | #9b7bb8  | Tiny mono tagline color                            |
| Suite mint         | #7bc8b5  | "Free / done" green when staying in Suite chrome   |
| Suite peach        | #e8a87c  | Equipment-color flatbed callout (echoes app)       |
| Suite gold         | #c8a062  | Lower-third accent line                            |
| FM flame red       | #ff4d4d  | "Fire" emphasis, match hotspot                     |
| FM flame orange    | #ff6b35  | Flame gradient mid                                 |
| FM gold-ember      | #ffb347  | Flame gradient end                                 |
| FM match green     | #00d4aa  | "Matched" chips, count badges                      |
| FM lane cyan       | #00bcd4  | Lane lines, dashed arrows                          |
| Dark base          | #0d0d0d  | Map mock background, screen recordings             |
| Dark-2             | #1a1a1a  | Card chrome inside dark UI                         |

## Fonts
- **Outfit** — display, weights 700/800/900; titles, bumpers, chip labels
- **DM Sans** — body/sub copy, lower-third secondary
- **JetBrains Mono** — eyebrow / handle / "App 04 of 7" tags

## Motion
- All cards in: 0.6s ease-out, 8px upward translate
- All cards out: 0.3s ease-in, fade-only
- Section bumpers: number on the left zoom-pops 0.4s in, hold, number scales 0.95 out
- Map demos: real-time, no speed-up; use a 1.5x clip for the geocoding wait
- Cursor: highlight ring (8px outer flame glow) when clicking important controls

## Music
- Bed: low instrumental lo-fi (no vocals), -20 LUFS under VO, -14 LUFS over B-roll
- Lift cues:
  - 0:00 cold open — drum drop at 0:08 when title card hits
  - 9:00 map reveal — second lift, brighter bed
  - 18:20 outro — fade up bed last 8s, fade out at end card

## Lower-third
- 1080×180 rounded card
- Candy 2px left stroke
- Cream fill 92% opacity
- Drop shadow: 0 4px 16px rgba(0,0,0,0.18)
- Three appearances only (don't over-use)

## Screen-recording rules
- Browser window 1920×1080, FM at 1.0 zoom
- Hide bookmarks bar (not visually relevant)
- DevTools never visible
- Background tabs: only Outlook (clean), TRM (clean), Logistics Suite hub
- Cursor: large + yellow highlight on click

## Thumbnail final
- See `wat/tmp/thumbnail.svg`
- Reads on phone preview at 320px wide: still shows truck pin + load pin + fire + "PASTE EMAILS. SEE FIRE." + "47 EMAILS → 1 MIN" chip
- Carries Logistics Suite cream chrome but lets the FM dark UI take left half — this is the brand tension that says "Suite, but with bite"
