# Mass Post — Go-live verdict + publish checklist

## VERDICT: GO

- All 4 × P0 QA findings resolved.
- All 6 × P1 QA findings resolved.
- 3 of 6 × P2 deferred (no blockers; documented in `05-qa-report.md`).
- Voice, brand, factual grounding, on-screen cue coverage, and thumbnail readability all pass.

This package is ready to record, edit, and upload.

---

## Recording-day checklist

1. **Environment prep**
   - Open Mass Post in a fresh Chrome profile (no extension noise).
   - Log in to Salesforce/Revenova in a second tab in the same profile.
   - Paste the Salesforce report URL in Settings; save.
   - Drag all three bookmarklets (⚡ Fill DAT, 🔄 Mass Post Helper, 🔐 Grab DAT Token) into the bookmarks bar.
   - Start `dat-pp-cli serve` and `dat-pp-cli auth login` in two terminals.
   - Clear any production load data that shouldn't be on camera; use a sanitized report if needed.
   - Set OBS to 60 fps, 1920×1080, hardware encoder, recording bitrate ~30 Mbps.
   - 240 fps insert camera for the slo-mo open click.
2. **Audio**
   - Lav or USB cardioid, 1 m from speaker, gain so peaks hit -12 dBFS.
   - Record a 30 s room tone for the editor.
3. **Script**
   - Print `01-tutorial-script.md` two pages per side, large font.
   - Teleprompter for the cold open + chapter intros only; everything else off-prompter for naturalness.
4. **Takes**
   - 2 full takes minimum. Trust the second.
   - Capture every screen interaction twice — once at normal speed, once slow-deliberate — gives the editor speed-ramp options.

---

## Edit-day checklist

1. Drop the candy-pink palette into the project as a swatch set (see `visual-spec.md`).
2. Title cards per `wat/tmp/title-cards.md` and `deliverables/02-storyboard.md`.
3. Speed-up clip at 06:50 — chip "3×" top-right.
4. Skip-ahead overlay at 09:30.
5. Gold "one broker's morning · YMMV" chip at 20:50.
6. Final color-pass: keep the candy-pink overlay layer warm; do NOT push the app capture's cyan into pink in post.
7. Music ducks to -20 dB under narration; restore in transitions.
8. End screen 20 s.
9. Bake-in captions DM Sans Medium 36 pt on a 70%-opacity ink pill.
10. Export H.264 12 Mbps target / 24 Mbps peak, AAC stereo 192 kbps.

---

## YouTube upload settings

| Field | Value |
|---|---|
| Title | `50 loads, 5 minutes: posting to DAT without retyping rates` |
| Description | from `04-marketing.md` (replace `[LINK PLACEHOLDER]` + `[PHONE PLACEHOLDER]` before upload) |
| Tags | 15 tags from `04-marketing.md` |
| Category | Science & Technology |
| Visibility | Public |
| Made for kids | No |
| Language | English |
| Captions | Upload `.srt` from caption bake (or auto-generated as fallback) |
| Comments | On, hold potentially inappropriate for review |
| License | Standard YouTube License |
| Thumbnail | `deliverables/03-thumbnail.svg` (export as 1280×720 JPG, ≤ 2 MB) |
| End screen | 20 s — left: subscribe · right: "Next: Bolt Post (Episode 02)" |
| Cards | 1 card at 05:45 → Logistics Suite hub |
| Playlist | "Logistics Suite — the seven-app tour" |
| Default audience | Industry-specific (Trucking / Logistics) |
| Premiere | Optional. If used, schedule for Tue/Wed 8 AM CT (freight-broker viewing peak). |

---

## Cross-post checklist

- LinkedIn: 60-second teaser (cold open + Chapter 4 highlight) the same day. Tag `#freightbroker #DAT #Revenova`.
- Bay & Bay internal Slack: drop the long-form link in #brokers and #ops.
- Logistics Suite hub: link the YouTube video from the Mass Post tile (and the in-app Settings → Watch Tutorial section once it's live).

---

## Post-launch monitoring (Week 1)

| Metric | Threshold | Action if below |
|---|---|---|
| CTR | ≥ 5% | At 48 h swap title to alternate #2 |
| Avg view duration | ≥ 8:00 | At 96 h re-cut Chapter 1 tighter |
| Retention drop-off | < 30% before 02:00 | Re-cut cold open + Chapter 1 |
| Subscribe conversion | ≥ 1% | Move end-screen subscribe to left card if currently right |

---

## VERDICT: GO

Package ready. Commit and stand by for record day.
