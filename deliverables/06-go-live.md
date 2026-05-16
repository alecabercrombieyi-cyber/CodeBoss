# Load Manager — Go Live Checklist

## Verdict
**GO.** All eight deliverables produced, QA reconciled, no open blockers.

## Pre-record checklist
- [ ] Open `Logistics-Suite/site/load-manager.html` against a representative morning report (5-20 loads, mix of statuses: Needs Driver, Has Driver, On Site, Delivered, Detention)
- [ ] Confirm Settings → Salesforce report URL is set
- [ ] Confirm Settings → DeepSeek API key is set (Smart Shuffle, AI template, Kimbo all need it)
- [ ] Confirm Settings → OpenWeatherMap key is set (weather badges)
- [ ] Confirm at least one exempt carrier seeded (Werner / Knight / Schneider Dedicated)
- [ ] Confirm at least one load is in "On Site" status (needed for SCENE 19-20)
- [ ] Confirm Kimbo replies in < 6s on a test prompt

## Recording specs
- Screen: 1920x1080, 60fps
- Audio: any cardioid mic, normalized to -16 LUFS
- Frame: full browser window, no tab bar, no bookmarks bar
- Cursor: highlight ring enabled (Camtasia or BetterMouse)

## Post-record checklist
- [ ] Cuts on every chapter break (12 chapters total — see `01-tutorial-script.md`)
- [ ] Lower-thirds inserted at chapter starts per `02-storyboard.md`
- [ ] Cold-open hook cut and trimmed to exactly 30s
- [ ] Smart Shuffle reorder slo-mo'd to 0.5x (SCENE 11)
- [ ] Mode toggle (Shipping → Deliveries) slo-mo'd (SCENE 18)
- [ ] Fleet Map zoom slo-mo'd (SCENE 23)
- [ ] Music bed under cold open silenced, swells on outro
- [ ] End card: Suite wordmark + `logisticssuitev1.pages.dev`

## Upload checklist
- [ ] Title: "Triage 30 loads in 10 minutes — Load Manager walkthrough"
- [ ] Thumbnail: `deliverables/03-thumbnail.svg` rasterized to 1280x720 PNG (use Inkscape or similar)
- [ ] Description: paste from `04-marketing.md` (chapters block must match the cut)
- [ ] Tags: top 13 from `04-marketing.md`
- [ ] Category: Education
- [ ] Visibility: Unlisted first → review final upload → flip to Public
- [ ] End screen: subscribe + next-tutorial card pointing to EP 04 Freight Matcher (or EP 02 Bolt Post if EP 04 not yet shipped)
- [ ] Pinned comment: short broker-to-broker FAQ + the Suite landing link

## Post-publish
- [ ] 48h CTR check. If CTR < 4%, swap to alternate title #1 ("I built a free Salesforce dashboard for freight brokers (Load Manager tour)").
- [ ] First-week retention check. If AVD < 35%, review whether the cold open or chapter 2 is causing drop-off.

## Commit
`tutorial(03-load-manager): GO — long-form package ready`
