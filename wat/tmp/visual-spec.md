# Visual Spec — Data Wash Tutorial

## Recording setup
- Resolution: 1920x1080 @ 60fps (final export 1080p H.264)
- Browser zoom: 110% — Data Wash's max-width container (880px, line 52) becomes more readable at this zoom
- Browser: Chromium-based with bookmarks bar hidden, dev tools closed
- Cursor: enable cursor highlighting (yellow circle, 30px) — most screen recorders ship this
- Click animation: ON — green flash on click, helps tutorial pacing

## App theme acknowledgment
**Important brand-mismatch caveat.** Data Wash's UI is an emerald/green dark theme (`--accent: #10b981` at line 18, `--bg: #0a0f1a` at line 14). The Logistics Suite house brand is candy-pink/cream. To bridge:

1. **All overlay graphics (title cards, lower-thirds, callouts) stay candy-branded.** Cream backgrounds, pink and mint accents, JetBrains Mono.
2. **Add a persistent candy-pink ribbon** along the bottom 6% of frame during in-app footage — keeps the suite identity visible while the emerald UI dominates the center.
3. **Open/close shots use a candy-cream backdrop** with the app embedded — keeps thumbnail/intro consistency.
4. **In the intro and outro**, briefly cut to the hub page (`app.html`) which IS candy-branded — reinforces "this is one of seven apps in the same family."

## B-roll capture list

| Moment | Capture | Purpose |
|---|---|---|
| 0:00 | Stock-style shot of an Excel spreadsheet with phone/SSN columns; manual blur applied to specific cells | Cold open visual hook |
| 0:30 | Quick cuts of generic "vendor email" and "TMS quote PDF" | Establishes the scenario |
| 0:45 | Logistics Suite hub (`app.html`) — slow pan over the 7 app tiles, highlight Data Wash | Suite context |
| 1:00 | Full data-wash.html page load — top of page, hover over step indicator dots | App tour |
| 3:00 | Slow zoom over the field pills as user changes one from synth → preserve → redact (color shifts on screen) | Modes demo |
| 8:00 | Tight crop on the spinner during washing animation | Pacing beat |
| 9:00 | Side-by-side split: original CSV (left) vs washed CSV (right), columns lined up | Proof shot |
| 13:30 | Real Excel app opening the downloaded .xlsx, switching between the two sheets | Provenance shot |
| 17:00 | Hex editor or text diff of two washes with different seeds — visible bit-level difference | Reproducibility shot (optional, technical viewers) |
| 18:30 | Hub page again, zoom into Pillar tile to tease next video | Series continuity |

## Lighting / mood
- Cold open: dim, blue-leaning, slightly anxious
- App reveal: bright, warm cream wash
- Demo: neutral, focused
- Provenance/reproducibility sections: golden, "professional"
- Outro: bright candy-pink, optimistic

## Audio
- Soft mid-tempo bed throughout (no lyrics)
- Slight key change at each chapter card
- Mute bed during the "wash" animation — let the spinner breathe in silence ~1.5 sec
- Voiceover: broker-to-broker, conversational, slight smile in tone

## Editing cadence
- Average cut: 4–6 seconds during demo, 8–10 seconds during explanation
- No cut should exceed 12 seconds without a zoom, highlight, or callout
- Use jump cuts (no fancy transitions) — matches the broker-pragmatic voice
- Insert a 200ms candy-pink wipe between chapters (matches title-card brand)

## Captions
- Burned-in captions ON for the first 30 seconds (hook viewers without audio)
- Standard YouTube captions for the rest

## Accessibility / mobile legibility
- Smallest readable text on screen: ≥24pt at 1080p
- Color callouts always have a text label, never color-only
- Cursor highlight passes WCAG AA contrast vs both cream backdrop and emerald UI

## Export checklist
- 1920x1080, 60fps, H.264, 12-16 Mbps
- Loudness: -14 LUFS integrated (YouTube target)
- Thumbnail: 1280x720 PNG export from `thumbnail.svg`, <2 MB
- File naming: `06-data-wash-v1.mp4`, `06-data-wash-thumb.png`
</content>
</invoke>