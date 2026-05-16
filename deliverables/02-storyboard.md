# Storyboard — Data Wash Tutorial

Scene-by-scene shot list with on-screen actions, B-roll cues, callouts, and editor notes.

---

## SCENE 01 — Cold open (00:00–00:45)

| Beat | Visual | Audio | Editor note |
|---|---|---|---|
| 0:00 | Excel-style spreadsheet, full screen. Real-looking PII visible. | Mid-tempo, slightly anxious music bed; VO begins. | Pre-edit blur masks on SSN, phone, salary columns. Reveal them at 0:05. |
| 0:08 | Camera slow-zooms on a single SSN cell. Cell glows pink. | VO: "Driver SSNs..." | Pink glow = brand pink #b85775 |
| 0:15 | Quick montage: vendor email mockup → TMS quote PDF → another vendor email. 3 cuts. | VO continues. | Each shot ~1.5 sec. Light blur on email body so viewers don't read it. |
| 0:30 | Three-way split: Excel screen (left), online tool screenshot (center), SaaS pricing page (right). All grayscale. | VO: "Spend your afternoon in Find-and-Replace..." | Each panel softly fades out as VO eliminates it. |
| 0:42 | Hard cut to data-wash.html top of page. Full color returns. | VO: "Or — you use Data Wash." | Cut to color = bright moment. Music swells. |

---

## SCENE 02 — Meet Data Wash (00:45–02:00)

| Beat | Visual | Audio | Editor note |
|---|---|---|---|
| 0:45 | Title card 2 ("Meet Data Wash"). | Music settles. | 1.5 sec card, candy-pink full-bleed. |
| 0:48 | data-wash.html full page. Cursor slow-pans across step indicator. | VO: "App number six in the Logistics Suite..." | Highlight ring on each dot as cursor passes. |
| 1:10 | Cut to hub (app.html) showing 7 app tiles. Data Wash tile pulses. | VO: "Six in the Logistics Suite." | 4-sec hub shot, then back to app. |
| 1:30 | Zoom into top of app — format toggles JSON/CSV/XLSX. | VO: "Three input formats..." | Click each toggle for visual feedback (no parsing). |
| 1:50 | Pull back to full-page wide shot. | VO: "Mix and match." | Reset to default before next scene. |

---

## SCENE 03 — Load the sample (02:00–03:30)

| Beat | Visual | Audio | Editor note |
|---|---|---|---|
| 2:00 | Title card 3 ("Load the sample"). | — | Cream + mint ribbon. 1.5 sec. |
| 2:03 | Cursor moves to `load sample` button. | VO: "I'll click load sample." | Yellow cursor highlight on. |
| 2:06 | Sample JSON populates textarea. Slight fade-in animation already in app. | VO continues. | Allow the JSON to fully render before zoom. |
| 2:15 | Zoom on textarea, scroll through 5 records. | VO: "Five people, with name, email, phone, SSN..." | Subtle pink underline animation under each PII field name. |
| 2:55 | Pink callout: "real-looking PII (this is sample data — relax)" | VO: "This is the kind of thing a broker exports..." | Callout anchored to bottom-right of textarea, 3 sec. |
| 3:20 | Cursor to **Parse & Configure** button. Click. | VO: "Hit Parse & Configure." | Step indicator visibly advances. |

---

## SCENE 04 — Three modes (03:30–06:30)

| Beat | Visual | Audio | Editor note |
|---|---|---|---|
| 3:30 | Title card 4 ("Three modes per column"). | Music drops slightly. | 3-column split (green/blue/red) background. 1.5 sec. |
| 3:33 | Stats bar in focus. | VO: "5 records, 9 fields, 8 synthesized, 1 preserved..." | Counter animation if possible — count up from 0. |
| 3:50 | Field pills view. Mint highlight ring around the Department pill. | VO: "Department is preserved..." | Mint = preserve. Hold 2 sec. |
| 4:15 | Callout: "auto-detected by field name" | VO: "Anything called id, department, category..." | Mint underline under each auto-detect keyword as VO names it. |
| 4:50 | Cursor opens SSN dropdown. Selects "redact." Pill turns red. | VO: "Switch SSN from synthesize to redact..." | Capture the color transition crisply. |
| 5:15 | Three-pill split-screen — example pills in green, blue, red. | VO: "You've got three modes..." | Composited graphic, not screen capture. |
| 5:30 | Peach arrow callout pointing at a phone field: "format-preserving" | VO: "If your phones use dashes, the fakes use dashes." | Quick 2-sec callout. |

---

## SCENE 05 — Options (06:30–08:00)

| Beat | Visual | Audio | Editor note |
|---|---|---|---|
| 6:30 | Title card 5 ("Multiplier · seed · format toggles"). | — | Same brand template. |
| 6:33 | Cursor to row multiplier dropdown. Opens it. Hovers each option. | VO: "5x turns 5 rows into 25..." | The app already shows row count in the option label. Highlight that. |
| 7:00 | Cursor to seed input. Tab focus. | VO: "Same seed plus same input equals identical output." | Animate seed value change 42 → 100 → 42. |
| 7:25 | Cursor toggles "Preserve formatting" off and on. | VO: "Phones formatted with parens..." | Show in CSS what visually doesn't change here — just emphasize via VO. |
| 7:45 | Cursor toggles "Preserve numeric distributions" off and on. | VO: "Within ±20% of the original." | No visual change in this view — voice carries it. |
| 7:55 | Output format toggle row. Cursor selects CSV. | VO: "Let's go CSV." | CSV button highlights mint. |

---

## SCENE 06 — Wash and review (08:00–10:00)

| Beat | Visual | Audio | Editor note |
|---|---|---|---|
| 8:00 | Title card 6 ("Wash. Done."). | Music drops to bare. | Soap-bubble graphic from thumbnail used here. |
| 8:03 | Cursor on **Wash Data**. Click. | Silence — let spinner breathe. | Music fade-out at 8:00, back at 8:08. |
| 8:05 | Spinner animation — tight crop on the percentage counter. | Subtle whoosh SFX. | This is the "money shot" of the app. Hold it. |
| 8:08 | Output step lands. Success banner. | Music returns. VO: "About a second and a half." | Use the app's built-in slide-up animation. |
| 8:20 | Preview table in full. Color-coded headers. | VO: "Green columns are synthetic..." | Pulse animation on each color in turn. |
| 9:00 | Side-by-side split: original CSV (left half) vs washed CSV (right half). | VO: "Bob Chen became something like Phoenix Tanaka..." | Build this as a composited graphic. Columns must align perfectly. |
| 9:40 | Zoom on the salary column comparing original vs synthesized. | VO: "Within 20% of the original because we kept the distribution." | Annotate with red/green arrows showing the delta. |

---

## SCENE 07 — CSV provenance (10:00–12:00)

| Beat | Visual | Audio | Editor note |
|---|---|---|---|
| 10:00 | Cursor scrolls to raw output. | VO: "Down here is the raw output." | Smooth scroll, not instant. |
| 10:10 | Gold bracket callout around the comment block: "this comment block = your vendor's audit trail" | VO: "Thirteen-line comment block at the top..." | Gold = #c8a062. Hold callout 4 sec. |
| 10:40 | Zoom on each comment line in turn. | VO: "Generated at... seed... synthesized fields..." | Highlight each line as VO names it. |
| 11:30 | Pull back to full output view. | VO: "If you ever get questioned..." | Reset zoom. |

---

## SCENE 08 — JSON envelope (12:00–13:00)

| Beat | Visual | Audio | Editor note |
|---|---|---|---|
| 12:00 | Cursor switches output to JSON. App re-renders the raw view. | VO: "JSON mode wraps everything..." | No re-wash needed — preview updates. |
| 12:15 | Zoom on the `_synthetic_data_notice` envelope and `records` array. | VO: "Records live under a records key..." | Bracket-match highlight on the JSON. |
| 12:45 | Pull back. | VO: "Explicit handshake." | Quick beat. |

---

## SCENE 09 — Excel two-sheet (13:00–14:00)

| Beat | Visual | Audio | Editor note |
|---|---|---|---|
| 13:00 | Cursor switches output to XLSX. Re-wash if needed. Click download. | VO: "Excel download is the slickest..." | Capture the actual file download notification. |
| 13:15 | Cut to real Excel app opening the file. | VO: "TWO sheets..." | Use actual MS Excel, not Google Sheets. |
| 13:30 | Purple bubble callout: "TWO sheets — notice + data" | VO: "First sheet is _SYNTHETIC_NOTICE..." | Hold while VO walks through both sheets. |
| 13:50 | Click between the two sheet tabs at the bottom of Excel. | VO: "The first thing they see is 'hey, this is fake.'" | 2 sec on each tab. |

---

## SCENE 10 — Upload your own (14:00–16:30)

| Beat | Visual | Audio | Editor note |
|---|---|---|---|
| 14:00 | Title card 7 ("What about weird columns?"). | — | Cream + doodle. |
| 14:03 | Cursor to **New Data** button. Reset. | VO: "Now let's do the realistic version." | Confirm step indicator resets. |
| 14:10 | Cursor to **upload file**. File picker opens with prepared fake CSV. | VO: "I'm dropping in a fake CRM export..." | Pre-stage the CSV file on the desktop, named realistically (e.g., `bay_bay_active_loads.csv`). |
| 14:25 | App parses, advances to configure. Stats bar appears. | VO: "Some weirder column names..." | Verify the upload visibly works. |
| 14:45 | Highlight `Customer_MC` pill. | VO: "Defaulted to synthesize..." | Cyan highlight ring. |
| 15:15 | Highlight `Pickup_Address` pill. | VO: "Recognized the word address..." | Mint highlight. |
| 15:40 | Highlight `Driver_DOB` pill. | VO: "Random historical dates." | Same mint. |
| 16:00 | Pull back, show all pills. | VO: "What's the move when you see a field that didn't auto-detect?" | Whole-page shot. |
| 16:20 | Quick decision-tree graphic overlay: SENSITIVE? → redact / NOT SENSITIVE? → preserve / UNSURE? → synthesize. | VO finishes the rule. | Composited graphic, 6-sec hold. |

---

## SCENE 11 — Seeds & reproducibility (16:30–18:00)

| Beat | Visual | Audio | Editor note |
|---|---|---|---|
| 16:30 | Title card 8 ("Seeds = reproducible fakes"). | — | Navy + mint dots. |
| 16:33 | Side-by-side: same input, seed 42 (left) vs seed 100 (right). | VO: "Wash with seed 42 — one set of fakes..." | Composited dual-screen. Columns must align. |
| 17:00 | Highlight matching rows in both — green for "this row's name changed" between seeds. | VO: "Change the seed, change the output." | Quick row-by-row diff highlight. |
| 17:15 | Single screen: seed 42 re-run. Same output as left side. | VO: "Same seed, repeat exactly." | Verify identical output. |
| 17:30 | Two reasons graphic: 1. Iterative vendor sharing 2. Auditability | VO: "Two reasons..." | Numbered bullets, candy palette. |

---

## SCENE 12 — Recap & CTA (18:00–19:30)

| Beat | Visual | Audio | Editor note |
|---|---|---|---|
| 18:00 | Title card 9 ("Subscribe — Pillar's next"). | Music swells. | Candy-pink full-bleed. |
| 18:05 | Quick montage of the 5 main beats: load sample → configure → wash → preview → download. | VO: "Free, browser-only, two minutes..." | Each cut 1 sec. |
| 18:25 | Cut to hub (app.html). All 7 app tiles. Cursor lands on Data Wash. | VO: "Lives in the Logistics Suite alongside..." | Wide hub shot. |
| 18:40 | Cursor moves to Pillar tile. Pillar pulses. | VO: "Pillar's next." | Set up next video. |
| 18:55 | End-card frame: Subscribe button, link to logisticssuitev1.pages.dev/app, next-video thumbnail (Pillar placeholder). | VO outro. | Standard YouTube end-card layout. Hold 8-12 sec. |
| 19:20 | Channel watermark fade-out. | Music tail. | Final 10 sec is YouTube-friendly endscreen real estate. |

---

## Editor's master checklist

- [ ] Persistent candy-pink ribbon overlay along bottom 6% of frame during in-app footage
- [ ] Lower-third with "Data Wash · Logistics Suite App 06" pinned bottom-left
- [ ] Every title card 1.5 sec max
- [ ] No cut exceeds 12 sec without a zoom, highlight, or callout
- [ ] Music ducks during the wash spinner (silence-then-return at 8:00)
- [ ] Burned-in captions for 0:00–0:30 hook
- [ ] Auto-CC reviewed and corrected for: SSN, PII, TMS, MC#, CSV, XLSX
- [ ] Final loudness: -14 LUFS integrated
- [ ] 1080p H.264, 60fps, 12-16 Mbps
</content>
</invoke>