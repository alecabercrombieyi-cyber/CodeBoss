# Visual Spec — Pillar Tutorial

## Brand baseline
- Cream background plates: `#faf7f2`
- Pillar accent: gold `#c8a062` (matches the app's in-product accent for cores)
- Violation red: `#b85775` (also brand candy pink)
- New core green: `#7bc8b5` (suite mint)
- Owner-rep purple: `#9b7bb8`
- Text deep plum: `#3a1f2a`, secondary `#5a3a48`, muted `#7a5560`
- Fonts: DM Sans 700/800/900 for headlines; JetBrains Mono 600/700 for kickers, numbers, eyebrow text

## Aspect ratios
- Master timeline: 1920x1080 (1080p)
- Thumbnail: 1280x720 (16:9)
- Mobile-safe zone: keep critical text within the center 75%

## On-screen overlays (in chapter order)

### Cold open
- Top-left badge: `PILLAR // CORE CARRIER INTELLIGENCE` (mono, plum, animated fade-in)
- Big stat callout floating over Dashboard: `12 violations · 4 severe` (gold pill, animated count-up from 0)

### Chapter 1 — What is Pillar?
- Hub strip animation: the 7 app cards from `app.html` scroll left-to-right, decelerating to land on Pillar with a soft glow
- Caption: `App #07 of 7 — newest` (mint pill, top-right)

### Chapter 2 — Loading your TMS report
- Pointer ghost on the "Pull from Salesforce" button
- Animated progress bar overlay: `0 → 100% in 26s`
- File picker callout: yellow arrow + `most recently modified` label
- BCR warning still: full-screen freeze + red border, hold for 3s

### Chapter 3 — Reference Period
- Split-screen callout: left = previous month picker (used for Cores), right = current month picker (used for New Cores + Violations)
- Annotation arrows from each picker to the appropriate engine output card

### Chapter 4 — Core Carriers
- Math formula overlay (mono):
  ```
  loads >= 4
  && carrier == carrier
  && rep == rep
  && status NOT IN (Cancelled, Voided, Tonu)
  && delivery_date in PREV_MONTH
  ```
- Highlight ring on the ⚠ violated badge when it appears on a core card
- Caption: `The little flag means somebody's already poached this core`

### Chapter 5 — New Cores
- Animated timeline showing 2 ship dates (load 1, load 2)
- Vertical line on the 2nd date with label: `LOCK DATE`
- Color-shift the timeline area to gold after the lock fires (carrier is now locked)

### Chapter 6 — Violations
- Filter tag bar zoomed: ALL / CORE / NEW CORE / SEVERE / SOFT
- Click sequence: hover → SEVERE highlight in red
- Severity badges enlarged in lower third with definitions:
  - **SOFT** (peach) — first time booking
  - **STANDARD** (gold) — knew or should have known
  - **SEVERE** (red) — violated a new core
- RC Sent / Lock Date column callout with arrow: `if RC ≥ Lock, it counts`

### Chapter 7 — Dashboard
- Stat-row close-up with each card highlighted in sequence (5 beats, 1s each)
- Top Brokers table — slow pan with `Poached From` and `Poached By` columns highlighted in red
- Caption: `This is your accountability column`

### Chapter 8 — Rep View
- Dropdown picker animated with cursor selecting a real rep name (use anonymized "Sample Broker")
- 4-section reveal with section labels appearing in sequence:
  1. Core Carriers (gold)
  2. New Cores Emerging (mint)
  3. Loads Poached FROM Me (red — only show red border if non-empty)
  4. Loads I Poached (red — same conditional)

### Wrap / End card
- Pillar logo zoom-out → 6 other app cards fly in from the left, forming the full Logistics Suite hub
- Final URL pill: `logistics-suite-v1.pages.dev`
- Brand color strip across bottom (full width): pink, cream, purple, mint, peach, gold

## Animations / motion notes
- All overlays fade in over 200ms, hold, fade out over 150ms — no slide-from-side (suite signature is gentle fade, not slick swoop)
- Big number callouts (stat cards, RC dates) animate with a 400ms count-up
- The pillar crack on the thumbnail should NOT be animated in the video itself — keep that as a thumbnail-only flourish

## Audio / VO direction
- Tempo: warm, paced, conversational. Think experienced dispatcher explaining to a new hire, not a SaaS pitchman.
- Music bed: minimal, mid-tempo lo-fi or warm-pad ambient at -22 LUFS so VO sits clear
- Sting on chapter card reveals (soft mallet hit)
- Cold-open music swells under the "twelve violations" line, then ducks hard for the VO

## Thumbnail design checklist
- Three pillars (literal Greek columns) — 2 intact, middle one cracked diagonally
- Right side: "WHO POACHED YOUR CARRIER?" headline in DM Sans 900
- "12 VIOLATIONS · 4 SEVERE" pink pill below
- "NEWEST" mint ribbon in top-right corner at 8deg tilt
- Mono eyebrow: "APP 07 // PILLAR"
- File: `wat/tmp/thumbnail.svg` (then export to PNG for upload)
