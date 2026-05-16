# CarrierVet — Go-Live Checklist & Verdict

## Verdict

**VERDICT: GO**

All P0 QA findings resolved (5 of 5). All P1 QA findings resolved (5 of 5). All P2 polish items resolved (5 of 5). Long-form package is shippable.

## Publish checklist

### Pre-record
- [ ] Confirm Bay & Bay Salesforce session is live in Chrome before recording starts
- [ ] Re-pull the AA_Modified1 report so the 26-second download screen demos with fresh data
- [ ] Confirm at least one carrier in the report triggers the red factoring banner (test with a known-blocked remit-to)
- [ ] Confirm at least one carrier renders all three tier-state colors across the three cards (green/amber/red)
- [ ] Set OBS to 1920×1080 @ 60fps, system audio off, mic input only
- [ ] Apply 1.3x cursor size + 8 px click ring browser plugin

### Record
- [ ] Cold open re-takes until 14-second hook is clean
- [ ] All 49 storyboard shots captured with the specified zoom levels
- [ ] Factoring banner hero shot (Chapter 4) framed at 1.5x zoom with the red banner filling 60%+ of the frame
- [ ] Highway click-through filmed in a separate browser profile so no client MCs leak
- [ ] DevTools localStorage cut filmed with values blurred

### Post
- [ ] Editor inserts title cards per `deliverables/02-storyboard.md` + the spec in `wat/tmp/title-cards.md`
- [ ] Lower-third pills colored per the script (mint Tier 1, gold Tier 2, red Tier 3)
- [ ] End card uses YouTube's standard end-screen template at 0:18:00–0:18:04 of final cut (NOT a mocked subscribe button)
- [ ] Audio normalized to -14 LUFS YouTube target
- [ ] Re-verify final cut length lands at 20:00–21:00

### Pre-publish
- [ ] **Recalculate chapter timestamps against the actual final cut** (per QA P2-5) — paste corrected timestamps into description before publish
- [ ] Confirm thumbnail SVG exported as PNG at 1280×720, sRGB, ≤2 MB
- [ ] Manually test thumbnail at 320 px width (YouTube grid preview) — both headline lines must be legible

### YouTube upload settings

| Field | Value |
|---|---|
| Title | Stop Getting Double-Brokered: Vet Any Carrier in 10 Seconds |
| Description | (paste full from `04-marketing.md`) |
| Tags | (15 tags per `04-marketing.md`, comma-separated, broad first) |
| Thumbnail | Exported PNG from `03-thumbnail.svg` |
| Visibility | Public |
| Category | Science & Technology |
| Audience | Not made for kids |
| Comments | On, moderation: hold potentially inappropriate for review |
| License | Standard YouTube License |
| Allow embedding | Yes |
| Notify subscribers | Yes |
| End screen | Subscribe button + most-recent Logistics Suite tutorial + Mass Post tutorial |
| Playlist | "Logistics Suite — App Tutorials" |
| Language | English (US) |
| Auto-translate captions | English → Spanish |

### Post-publish (within 24 hrs)
- [ ] Pin a comment with the hub link: `https://logisticssuitev1.pages.dev`
- [ ] Cross-link from the Logistics Suite Mass Post and Bolt Post tutorial descriptions
- [ ] Share to LinkedIn (broker/dispatch network) and one freight-broker Discord
- [ ] Monitor first-hour CTR; if <4%, swap to alternate title #2

### Out-of-scope (won't ship this video)
- Mobile-recording version (CarrierVet is desktop-only by design)
- Customer testimonial cut-aways (no signed releases available)
- A deeper dive on the Highway integration — that's its own future tutorial

---

**VERDICT: GO**
