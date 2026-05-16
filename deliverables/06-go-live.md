# Go-Live — Bolt Post Tutorial (EP 02)

## Verdict
**GO.** QA returned 2 MAJOR findings and 2 MINOR findings. All four were applied inline to `deliverables/01-tutorial-script.md`. No blockers remain.

## Publish checklist

### Pre-record
- [ ] Confirm `bolt-post.html` is the version deployed to `https://logisticssuitev1.pages.dev/bolt-post.html`.
- [ ] Clean Chrome profile, hide all bookmarks except the ⚡ Fill DAT bookmark (which we add during the demo).
- [ ] Salesforce session logged in (use the saved AA_Modified1 report or equivalent).
- [ ] DAT One logged in, post-load form open in a second tab.
- [ ] Open Bolt Post in a third tab.
- [ ] Disable browser notifications, calendar pop-ups, Slack, email.
- [ ] Verify the Bolt Post settings drawer auto-opens on first run (clear `bp_user_name` to force this).
- [ ] Stage a multi-stop load (≥3 stops) in the report so Chapter 7 has a real example.

### Record (per scene in `02-storyboard.md`)
- [ ] Capture all 15 scenes at 1920×1080 / 60 fps.
- [ ] Re-take any scene where cursor exits frame or tab switch shows unrelated chrome.
- [ ] Record a clean "room tone" audio sample for noise-floor matching.

### Edit
- [ ] Apply the 11 chapter title cards from `wat/tmp/title-cards.md`.
- [ ] Add bottom-right Bolt Post watermark (12% opacity) on all timeline segments except cold open and outro.
- [ ] Add cursor click pings on every demonstrated click.
- [ ] Time-stretch the field-fill payoff shot (Scene 7f) to 1.25× so viewers can read each filled field.
- [ ] Honesty-note code overlay in Scene 8 — show line 2138 of `bolt-post.html` with the hardcoded `'\nAlec'` for 2 seconds.
- [ ] Hold Scene 10e (multi-stop reply close-up) for 2.5 s.
- [ ] Color-grade VO segments with warm pink-shadow lift; leave screen captures untouched (+5 contrast / -3 gamma only).
- [ ] Music bed ducked −12 dB under VO, continuous across chapter cuts.

### Export
- [ ] Master 1080p / 60fps / H.264 / 10 Mbps CBR.
- [ ] Backup master to ProRes 422 if storage allows.
- [ ] Render `deliverables/03-thumbnail.svg` to 1280×720 PNG at 96dpi.

### Pre-publish review
- [ ] Watch the full cut at 1× speed, headphones, no other browser tabs.
- [ ] Verify all 11 chapter timestamps in description match the actual video.
- [ ] Verify no PII appears on screen (customer names, real load numbers, MC numbers, internal emails).
- [ ] Verify the Salesforce report URL shown is the demo URL, not a private one.
- [ ] Confirm the ⚡ Fill DAT prompt does not show another carrier's payload inadvertently.

### Publish
- [ ] Upload to YouTube as **unlisted** first. Send link to 1–2 broker friends for gut check.
- [ ] Resolve `[link to EP 01]` placeholder in the description with the actual Mass Post tutorial URL.
- [ ] Apply title #1 from the A/B list. Schedule A/B flip to #2 at +48 hours if CTR < 5%.
- [ ] Set as **public** at a Tuesday or Thursday 9:00 AM CT slot (peak freight-broker browsing).
- [ ] Pin the Mass Post tutorial as the first comment ("Watch the Mass Post video first if you haven't — that's where I cover pricing.").
- [ ] Add to the "Logistics Suite" playlist.
- [ ] Cross-post the 60s Chapter-4 cut and Chapter-7 cut as YouTube Shorts within 24 hours.

### Post-publish
- [ ] Day 1: respond to first 10 comments.
- [ ] Day 3: check retention curve. Look for drop-offs at Chapter transitions; flag any > 8% drop in a single chapter.
- [ ] Day 7: A/B title flip decision.
- [ ] Update `MEMORY.md` (`project_logistics_suite.md`) with the published URL.

## Definition of done
- 8 files in `deliverables/` ✅
- All QA fixes applied to the script ✅
- Local commit on `tutorial/02-bolt-post` branch ✅
- No `git push` (deliberately deferred to the author)
