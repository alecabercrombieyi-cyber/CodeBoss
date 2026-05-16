# Title-card spec — Mass Post tutorial

## Card system

- Canvas: 1920×1080, exported at 1080p for video.
- Base: cream `#faf7f2` background with a 24px-radius pink `#d4738c` stripe filling the bottom 60 px (the "candy ribbon").
- Chapter number top-left: JetBrains Mono Medium 28pt, color `#9b7bb8`, letter-spacing 4, format `01 · MASS POST · CH 04`.
- Chapter title: DM Sans Bold 96pt, color `#2a1a22`, centered horizontally, vertical center at 48% of frame.
- Subtitle (one short line, optional): DM Sans Medium 32pt, color `#8a6577`, 24 px below title.
- Motion: title slides up 16 px with 240 ms ease-out; subtitle fades in 80 ms after. Hold 1.4 s. Exit: ribbon wipes left-to-right over 200 ms.

## Card-by-chapter copy

| # | Title (DM Sans Bold) | Subtitle (DM Sans Medium) | Accent |
|---|---|---|---|
| 01 | The 60-second tour | what the buttons do | pink ribbon |
| 02 | Pulling the report | from Revenova, no API key | purple ribbon |
| 03 | Bulk Export | the headline feature | pink ribbon |
| 04 | Quick Rate Lookup | fifty lanes, one click | mint ribbon |
| 05 | The 20× faster path | dat-pp-cli daemon | gold ribbon |
| 06 | Adjusting rates | snap-to-fifty, no spreadsheet brain | pink ribbon |
| 07 | Writing back to Revenova | 💰 Posted Amount | mint ribbon |
| 08 | Download CSV → DAT | the last mile | pink ribbon |
| 09 | Express Export | for when you're late | gold ribbon |
| 10 | Post Alone | the urgent one | peach ribbon |
| 11 | Watt watches | the booked-while-posted trap | purple ribbon |
| 12 | The little settings | that pay rent | mint ribbon |
| 13 | Gotchas | the stuff I wish I'd told my past self | pink ribbon |
| 14 | Quick Reply | carrier emails, faster | mint ribbon |
| 15 | A morning with Mass Post | five minutes, fifty loads | pink ribbon |

## Special cards

- **Cold-open card** (00:25): "MASS POST · the 24-minute tour" — DM Sans Bold 120pt centered, no chapter number, dual pink+purple gradient on the word MASS POST.
- **Outro card** (~22:00): full-bleed candy pink `#d4738c`, cream text. Top: "Logistics Suite · Episode 01 of 7". Middle: "Mass Post · Built by brokers · for brokers". Bottom: small mono URL placeholder (`logistics-suite-link-here`). Mass Post hub-tile icon center-right.

## Lower-thirds

- Speaker chip (Alec): pink pill `#d4738c`, cream text, DM Sans Bold 28pt — "Alec · freight broker · Bay & Bay". Slides in from left at 8 s, holds 5 s, slides out.
- Keyboard chip (when showing shortcuts): mint pill `#7bc8b5`, dark text `#1f3b34`, JetBrains Mono 22pt — example "Ctrl + V".
- Time-saved chip (used twice, intro + outro): gold pill `#c8a062`, dark text — example "55 min saved · today".

## Bumpers

- 1.5-second bumper between chapters: cream wipe, pink Logistics Suite candy logo settles in middle for 0.6 s, swipes off.
- Optional 0.8-second sting: pink chord matches the candy color shift — sync with editor's music bed.
