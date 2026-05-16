# Pillar Tutorial — GO Verdict & Publish Checklist

## Verdict: GO

All Stage 1 artifacts produced. QA found 6 issues (3 brand/visual, 3 script gaps, 1 title trim, plus 1 title-length fix). All 6 resolved before promotion. Factual claims (10 of 10) verified against source HTML.

Tutorial package: 18-min long-form video, broker-to-broker voice, candy brand, cracked-pillar thumbnail, full discovery package, 11 chapters.

## Pre-record checklist
- [ ] Generate or anonymize a sample TMS dataset (8,000-10,000 row range) that produces realistic results:
  - 12 violations (4 severe, 6 standard, 2 soft)
  - 18 core carriers across 8-10 reps
  - 7 new cores
- [ ] Spin up Pillar locally with the sample dataset loaded
- [ ] Verify the BCR warning banner reproduces by temporarily removing the column header
- [ ] Confirm Salesforce pull works for the demo (log in to Bay & Bay Salesforce)
- [ ] Prep a clean Downloads folder for the file-picker shot
- [ ] Confirm in-app tutorial auto-launches first visit (clear `localStorage` first)

## Recording checklist
- [ ] OBS or Camtasia, 1920x1080 @ 60fps
- [ ] Cursor highlight on (mid-size yellow halo)
- [ ] Microphone: dynamic, pop filter, -20 dBFS target peaks
- [ ] Record dry — no music bed during VO take, add in post
- [ ] Re-record any take where pacing slips above ~165 wpm
- [ ] Include 1-2 sec of silence between chapters for editing margin

## Post-production checklist
- [ ] Cut video to script — target 18:00
- [ ] Add 9 title cards from `02-storyboard.md` (chapter cards + end card)
- [ ] Add lower thirds where script directs
- [ ] Mix music bed at -22 LUFS, VO at -16 LUFS, sting SFX at -12 LUFS
- [ ] Color-grade screen recordings to match cream brand background
- [ ] Render H.264, 1080p, 12-15 Mbps bitrate, AAC stereo audio
- [ ] Export thumbnail PNG from `03-thumbnail.svg` at 1280x720
- [ ] Generate captions, then manually correct: TONU, BCR, rate con, MC number, carrier-specific terms

## Upload day checklist
- [ ] Use primary title: "Who Poached Your Carrier? Pillar — App 7 of the Suite"
- [ ] Paste description from `04-marketing.md`
- [ ] Set tags from `04-marketing.md`
- [ ] Upload custom thumbnail
- [ ] Set chapters via timestamps in description (YouTube auto-detects)
- [ ] Add to playlist: "Logistics Suite — Full Tutorials"
- [ ] End screen: subscribe + suggested video (Data Wash, #06)
- [ ] Card at 8:30 → Mass Post tutorial
- [ ] Schedule publish for Tuesday 9 AM CT (peak freight-broker discovery)
- [ ] Pin top comment with suite URL + tagline

## Post-launch (first 48 hours)
- [ ] Reply to first 10 comments within 4 hours
- [ ] Reply to top comments on Mass Post + Data Wash videos with "App 7 just dropped → [link]"
- [ ] Update Logistics Suite landing page to add NEW badge to Pillar card
- [ ] LinkedIn post mentioning the new video
- [ ] Monitor CTR. If under 4% at 48-hour mark, swap title to alternate D ("Your Reps Are Stealing Each Other's Carriers...")

## Metrics to watch (first 30 days)
- **CTR:** target 5%+ (freight-tech ceiling is ~7%)
- **AVD:** target 35%+ (long-form ceiling is 40-45%)
- **Watch time per view:** target 6:30+ on an 18-min video
- **Comments:** look for "we need this for our brokerage" — direct demand signal
- **Suite traffic:** track Cloudflare Analytics on `logistics-suite-v1.pages.dev` for spike correlated to publish

## Risks / contingencies
- **If a viewer reports incorrect cores in their data** — they likely have non-standard Salesforce column names. Direct them to the column list in `00-app-overview.md`.
- **If Salesforce pull fails for a viewer** — they're not logged in or their report URL is different. Tell them to use the upload path instead.
- **If anyone disputes a specific violation** — Pillar shows the lock date and RC date right in the table. The receipts are on screen.

## Deliverable map
| File | Purpose |
|---|---|
| `00-app-overview.md` | What Pillar is (for new viewers / future-self) |
| `01-tutorial-script.md` | Full narrated script with timestamps |
| `02-storyboard.md` | Scene-by-scene shot list |
| `03-thumbnail.svg` | YouTube thumbnail (export to PNG) |
| `04-marketing.md` | Title, description, tags, hook |
| `05-qa-report.md` | Adversarial review + fixes applied |
| `06-go-live.md` | This file |
| `wat-charter.md` | Pipeline transparency log |
