# Go-Live — Data Wash Tutorial

**Verdict: GO**

All 9 required QA fixes applied to the deliverables. Tutorial package is ready to record and publish.

---

## Pre-publish checklist

### Recording
- [ ] Browser at 110% zoom, bookmarks bar hidden, dev tools closed
- [ ] Cursor highlighting ON (yellow ring, 30px)
- [ ] data-wash.html loaded fresh — clear any prior state by closing/reopening the tab
- [ ] Sample CSV staged on desktop with a believable filename (e.g., `bay_bay_active_loads.csv`)
- [ ] Fake CRM CSV with weird columns prepared (`Customer_MC`, `Pickup_Address`, `Driver_DOB`)
- [ ] Excel installed and ready for the two-sheet scene
- [ ] Microphone level-checked; pop filter on; room treated

### Editing
- [ ] Persistent candy-pink bottom ribbon overlaid on all in-app footage
- [ ] Lower-third "Data Wash · Logistics Suite App 06" pinned bottom-left
- [ ] All 9 chapter title cards inserted (1.5 sec each)
- [ ] Music ducks to silence for ~1.5 sec at 8:00 spinner moment
- [ ] All on-screen callouts placed per storyboard
- [ ] Side-by-side composites built for: original-vs-washed (9:00), seed-42-vs-seed-100 (16:30)
- [ ] Decision-tree graphic for "weird columns" inserted at 16:20
- [ ] End-card frame with Subscribe + Pillar teaser at 18:55

### Captions
- [ ] Burned-in captions for 0:00–0:30
- [ ] Standard YouTube auto-CC reviewed and corrected for: **SSN, PII, TMS, MC#, CSV, XLSX, JSON, mulberry, cdnjs, SheetJS, [REDACTED]**
- [ ] Manual review of any "broker," "Bay & Bay," "Logistics Suite" spellings

### Thumbnail
- [ ] Export `03-thumbnail.svg` → PNG at 1280x720, <2 MB
- [ ] Test thumbnail at 320px mobile preview — verify "DATA WASH" pill, soap bubble, and bottom value claim are all legible
- [ ] Upload as custom thumbnail

### YouTube upload
- [ ] Primary title: **"Stop emailing customer PII to vendors. Use this free tool. (2 min)"**
- [ ] Description from `04-marketing.md` pasted in full (chapter timestamps included)
- [ ] Tags pasted (visible 3 above title: `#FreightBroker #LogisticsSuite #DataPrivacy`)
- [ ] Category: **Education** (not Howto & Style — Education performs better for tech tutorials)
- [ ] Audience: "No, it's not made for kids"
- [ ] Comments: enabled, default sort by Top
- [ ] Visibility: **Unlisted** for first 5 minutes of soak (catch any obvious flaw); then **Public**
- [ ] Premiere: optional — only if scheduling a midweek 11am CT slot
- [ ] End screen: subscribe button + Pillar placeholder + playlist link to Logistics Suite series
- [ ] Card at 14:00 linking to the Logistics Suite hub

### Cross-channel
- [ ] LinkedIn post scheduled (within 1 hour of going live)
- [ ] Twitter/X thread queued (within 2 hours)
- [ ] Add link to Mass Post and Bolt Post tutorial descriptions (cross-link suite)

---

## Post-publish 24-hour watch items

| Hour | Watch for | Action |
|---|---|---|
| 0–1h | CTR on thumbnail (target ≥6% in first hour from impressions) | If <4%, swap to A/B variant title |
| 0–1h | Average view duration on the 0:00–0:45 hook | If <60% retention at 0:30, cold open is weak — flag for redo |
| 1–6h | Comment sentiment | Pin a clarifying reply if any "but does it really not upload?" comments appear — link to source HTML |
| 6–24h | Engagement (likes/dislikes ratio, comment count vs view count) | If dislike ratio >3%, review captions and disclaimer prominence |
| 0–24h | Algorithmic content flag warnings in Studio | If "limited or no ads" appears, review for the dropped "lawsuit" language (shouldn't trigger but watch anyway) |
| 24h | Search appearances for "freight CSV anonymize" type queries | If not appearing, revisit tags |

## Known risks accepted

1. **SheetJS CDN dependency** — the script softens to "browser-only, no backend." If a viewer notes that cdnjs is technically a CDN call, the response is: "Correct — the XLSX parser library loads from a public CDN. Your data file never leaves your browser." Comment-reply template ready.
2. **App theme color mismatch** with the candy brand — visually addressed via the persistent pink ribbon overlay.
3. **No live demo of seed reproducibility against a specific name** — the script intentionally uses "something like Phoenix Tanaka" phrasing so the visible output during recording can differ without breaking the narrative.

## Sign-off

- Coding agent output: complete (`wat/tmp/coding-output.md`)
- Design agent output: complete (`wat/tmp/thumbnail.svg`, `title-cards.md`, `visual-spec.md`)
- Marketing agent output: complete (`wat/tmp/marketing-output.md`)
- QA report: complete (`wat/tmp/qa-report.md`) — 9 required fixes flagged, all applied to final deliverables
- Final-decision: **GO**

**Recording can begin.**
</content>
</invoke>