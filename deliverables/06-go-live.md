# Freight Matcher — Go-Live Verdict & Publish Checklist

## Verdict
# 🟢 GO — long-form package ready

All eight deliverables exist. Every Must-Fix QA item is resolved. Runtime 19:10 sits inside the 18–24 minute window. Title / thumbnail / cold-open all triangulate on the same promise. Voice scan clears. Only remaining gate is a non-recording URL confirmation.

## Open gates before publish (NOT recording blockers)
| # | Gate | Owner | Note |
|---|---|---|---|
| G1 | Confirm public Suite URL (`logisticssuite.dev` vs `.com` vs `pages.dev`) | Alec | Update `04-marketing.md` description before YouTube upload |
| G2 | Decide cold-open Take A ("I built this") vs Take B ("we built this") | Alec | Personal-brand vs Suite-brand call |
| G3 | Decide whether to include GitHub source URL | Alec | Currently removed; re-add if repo goes public |

## Pre-recording prep (carry into the studio day)
- [ ] **Fresh Incognito #1** with `fm_key` localStorage pre-set for main demo
- [ ] **Fresh Incognito #2** with localStorage cleared for the KeyScreen setup capture (Chapter 2)
- [ ] **Demo data ready** in `~/Desktop/fm-demo/`:
  - [ ] `trucks-47.txt` — sanitized 47-truck paste-buffer, cities all inside 250-cache (Dallas, Houston, Chicago, Memphis, Indianapolis, Atlanta, Denver, LA, Phoenix, KC, St Louis, Nashville)
  - [ ] `loads-23.txt` — TRM-format paste-buffer to trigger ⚡ instant-parse
  - [ ] `loads-7-revenova.txt` — non-TRM fallback to demo AI parsing if Chapter 4 needs a sub-beat
- [ ] **Clipboard permission resolved** — open FM, trigger one "Send Email" copy, accept the browser dialog, before take 1
- [ ] **Outlook in clean state** — "Carrier Availability" folder, search "today" preloaded, results pane scrolled to top
- [ ] **TRM tab** — open and logged in, open-loads view filtered to today
- [ ] **Music bed** — `lofi-bed-19m.mp3` in editor, lift markers at 0:08 / 9:00 / 18:50
- [ ] **OBS scenes**:
  - `CAM-MS` (broker at laptop)
  - `SCRN-FM` (1920x1080 capture of FM browser window only)
  - `SCRN-Outlook`
  - `SCRN-TRM`
  - `SCRN-Hub` (app.html)
  - `TITLE-CARD` (browser source pointed at title-card.html)

## Recording-day order (chronological vs script order — saves takes)
1. Cold open `[CAM]` (0:00)
2. Outro `[CAM]` (18:50)
3. Hub click in (0:20) and hub return (17:50)
4. KeyScreen setup take (2:00–3:30)
5. Main demo flow in **one unbroken take** (3:30–17:30)
   - If a chapter breaks, restart from the last chapter bumper, not the whole thing
6. B-roll session (45 min) per storyboard B-roll list

## Edit-day checklist
- [ ] Title card at 0:08 hits on the music drop
- [ ] All 9 chapter bumpers placed
- [ ] Lower-third hits at 0:35, 9:10, 18:00
- [ ] `🔥 32 MATCHES` chip sticky from 11:00 to 13:00
- [ ] `⚡ NO API COST` chip at 7:10
- [ ] Map zoom-in 1.5x during 11:00 radius drag for clarity
- [ ] Cursor highlight ring on every meaningful click
- [ ] Color grade: lift cream cards +3 exposure, dark UI captures −2 contrast for screen readability
- [ ] Loudness: -14 LUFS integrated, -1 dB true peak
- [ ] Captions baked (auto-gen + manual pass for "Hegelmann", "Nominatim", "DeepSeek", "TRM", "Revenova")

## YouTube upload checklist
- [ ] Final title from `04-marketing.md` (`Paste Carrier Emails → Watch the Map Catch Fire (Free Freight Matcher)`)
- [ ] Description (post-G1 URL confirmation)
- [ ] Tags from `04-marketing.md`
- [ ] Thumbnail: `03-thumbnail.svg` rendered to 1280×720 PNG (use `inkscape -w 1280 -h 720 03-thumbnail.svg -o thumbnail.png`)
- [ ] Visibility: **Public**
- [ ] Series playlist: "Logistics Suite Tutorials"
- [ ] End screen elements: subscribe + next-video (CarrierVet placeholder OK if app #5 not published yet)
- [ ] Pinned comment: "Yes, the DeepSeek key really is free — 5M tokens, no card. Get one at platform.deepseek.com. I'm not affiliated, just like that they're free."
- [ ] Post LinkedIn 60-sec cut same day, 1pm CT
- [ ] Post X 30-sec cut same day, 4pm CT

## Post-publish (T+24h)
- [ ] First-pass YouTube analytics: CTR > 6%, AVD > 50% of runtime
- [ ] Check comments for confusion points → log for tutorial #5 prep
- [ ] If CTR < 4%, A/B swap to alt title #5 (the "I built this" line)

## Series continuity
- This is **app 4 of 7**. Next: **CarrierVet (#05)** — carrier-vetting tool (Highway-style integration, not built yet per project memory)
- Mention CarrierVet in outro end-card
- If CarrierVet tutorial isn't ready when this publishes, use a generic "Next: app 5" placeholder

---
**Stamped GO** by final-decision agent.
Pipeline complete. Awaiting recording day.
