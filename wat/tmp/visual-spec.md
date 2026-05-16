# Visual Spec — Bolt Post Tutorial

## Capture setup
- **Recording resolution:** 1920×1080, 30 fps minimum (60 fps preferred for cursor smoothness).
- **Browser:** Chrome, dedicated profile, window snapped at 1500×900 (Bolt Post's `.main` is `max-width:1500px`). Hide bookmarks bar in clean shots; re-enable when demoing the ⚡ Fill DAT bookmarklet.
- **Cursor:** Use a cursor-highlighter (yellow ring, 14% opacity) so viewers can track the click target on a dark UI.
- **Zoom-in callouts:** When pointing at the orange multi-stop badge, the Min Margin input, or the Reply variation buttons — push-in to 140% with a 250ms ease, hold 1.5 s, ease back. This is the dark-theme equivalent of yellow-highlighter circling.

## Brand harmony — Bolt Post's blue meets Suite's pink
Bolt Post is dark navy + electric blue. The Suite brand is candy pink + cream. The package threads them like this:
- **Title cards & outro:** Bolt's native dark UI dominates. Suite pink shows up only in the bottom ribbon stamp and the final outro card.
- **Thumbnail:** dark navy + the bolt as the focal point; pink/cream/gold appear in a thin bottom ribbon ("Logistics Suite · Built by brokers · for brokers") so the family resemblance is obvious to anyone who's seen the Mass Post thumbnail.
- **B-roll:** When cutting to the Suite hub (`app.html`) — show its candy-pink UI in full. The contrast between the two themes *is* the visual story.

## On-screen elements during demos
- **Persistent watermark** (bottom-right, 12% opacity): Suite logo mark + "Bolt Post · EP 02". DM Sans 14pt.
- **Keystroke overlay** (bottom-center, 60% bg): show `⌃V` when narrator says "paste". 1.0s hold, fade out.
- **Click pings:** small concentric blue rings on every demonstrated click. Helps the viewer parse a fast workflow.

## Pacing rules
- No demo segment runs more than 90 seconds without a cut or zoom.
- Between chapters, hold the title card 1.2 s — long enough to read the chapter number and subline, short enough not to drag.
- The Multi-Stop chapter (Chapter 7) is the visual climax: orange badge, pulsing red border, the inline editor expanding. Hold the close-up 2.5 s, the longest hold in the video.
- The Copy → Fill DAT demo (Chapter 4) is the *kinetic* climax: keep cursor speed normal but compress switching to the DAT tab — quick whip-pan transition, not a long fade.

## Audio
- **Music bed:** electric / synth-led, low-mid energy. Avoid lo-fi (too sleepy) and EDM (too clubby). A subtle building electronic track works. Duck under VO −12 dB.
- **SFX accents:**
  - Lightning crack on title card transition (subtle, −18 dB).
  - Soft "click" on every demonstrated button press.
  - Subtle whoosh on tab switches.
- **No silence at section breaks** — keep the music bed continuous, only the VO has gaps.

## Color grade
- VO segments (talking head if used): warm slight push toward pink in shadows to harmonize with the Suite brand.
- Screencap segments: leave Bolt Post's UI untouched. Do *not* color-grade the app — its own palette is the design system. Just bump contrast +5 and gamma down -3 to deepen the navy.

## Reproducibility checklist (for the editor)
- [ ] Suite logo mark SVG at hand (Pico-pink dot from `app.html` favicon).
- [ ] DM Sans + JetBrains Mono installed in the editor.
- [ ] All 11 chapter title cards rendered from `title-cards.md` template before edit starts.
- [ ] Thumbnail SVG (`thumbnail.svg`) rasterized to PNG at 1280×720 and 320×180 for preview-tile checks.
- [ ] Cursor-highlighter plugin enabled in OBS or screen recorder.
