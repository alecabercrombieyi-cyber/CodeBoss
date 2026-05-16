# Coding Agent Output — Data Wash

## Elevator pitch (broker-to-broker)
You ever get an email from a TMS vendor or a software trial that says "just send us a sample of your data so we can demo it"? And you stare at the CSV and realize half of it is your customers' phone numbers, your driver SSNs, your contract rates? Data Wash is for that. Drop in the file. Pick which columns to fake out, which to keep, which to nuke. Hit Wash Data. Two minutes later you have a file with the same shape, the same row count, the same column types — but every sensitive cell is fake. Nothing ever leaves your browser. Zero upload. Just clean data you can email without sweating.

## Feature inventory (file:line evidence)

All references → `Logistics-Suite/site/data-wash.html`

### Entry / Header
- Title "Data Wash — Synthetic Data Generator" — line 6
- Subtitle "Transform sensitive data into privacy-safe synthetic records. Preserve structure and statistical properties without exposing PII." — lines 290–291
- Logo: shield SVG, emerald gradient — lines 285–287

### Step indicator (4 dots)
- `input → configure → washing → output` — line 451 (`const STEPS`)
- Renders dots + labels with active/done states — lines 651–660

### STEP 1 — INPUT
- Format toggles: **JSON / CSV / XLSX** — lines 303–305
- **load sample** button — line 308 (loads `SAMPLE_JSON` or `SAMPLE_CSV` — lines 465–478)
- **upload file** button → accepts `.json,.csv,.xlsx,.xls` — line 310
- File upload handler:
  - `.xlsx`/`.xls` parsed via SheetJS, first sheet only — lines 706–725
  - `.csv` / `.json` read as text, format auto-set from extension — lines 726–737
- `textarea#inputArea` — manual paste — line 313
- **Parse & Configure →** primary button — line 317
- Error box for parse failures — line 315

### STEP 2 — CONFIGURE
- Stats bar: Records / Fields / Synthesized / Preserved / Redacted (live counters) — lines 776–785
- Field pills: every column from row 0 gets a colored pill with a dropdown — lines 794–810
- Three modes per field:
  - **Synthesize** (green) — replace with realistic fake
  - **Preserve** (blue) — keep as-is
  - **Redact** (red) — replace with `[REDACTED]`
- Auto-detection on parse: fields named `id`, `department`, `category`, `type`, `status`, `role`, `gender`, `country` default to **preserve**; everything else defaults to **synthesize** — lines 758–763
- **Options grid**:
  - Row multiplier: 1x / 2x / 5x / 10x / 25x / 50x — lines 343–349
  - Random seed input (default 42) — line 352
  - Preserve formatting patterns (checkbox, default on) — line 354
  - Preserve numeric distributions (checkbox, default on) — line 355
- **Output format**: JSON / CSV / XLSX (separate large toggle) — lines 364–366
- **Wash Data →** primary — line 373

### STEP 3 — WASHING
- 80ms × 20 ticks = ~1.6 second progress animation — lines 824–853
- Spinner ring + pulsing glow + percentage + progress bar — lines 380–390

### Synthesis engine — `generateSyntheticValue()` lines 495–565
Field name + value pattern detection:
- `first name` → `FIRST_NAMES` pool (40 names) — line 500
- `last name` → `LAST_NAMES` pool (30 names) — line 501
- `name` / `full_name` → first + last combination — line 502
- email or `@...` regex match → `firstname.lastname42@datamail.net` style with 8 fake domains — lines 504–508
- phone or `(...)`/`-` pattern → format-preserving 555-style — lines 510–515
- ssn → `XXX-XX-XXXX` — lines 517–519
- address / street → `1234 Maple Ave` from STREETS + STREET_TYPES pools — lines 521–523
- city → CITIES pool (15) — line 525
- state / province → STATES pool (20 US states) — line 526
- zip / postal → 5-digit — line 527
- company / org / employer → COMPANIES pool (15) — line 528
- date / dob / `YYYY-MM-DD` regex → random date 1950–2010 — lines 530–533
- IP address → 4 random octets — line 535–537
- numeric `id` field → 6-digit — line 539
- generic numbers — preserve distribution: ±20% of original or random in 0–2x range — lines 541–549
- booleans → random `true`/`false` — line 551
- generic strings → character-class-preserving scramble (uppercase stays uppercase, digits stay digits) — lines 553–563

### Synthetic data metadata envelope
- `_synthetic_record: true` flag injected into every output row — line 840
- `getSyntheticMeta()` produces a full provenance object: notice, classification, timestamp, generator, seed, original/output record counts, field treatment lists — lines 588–606
- JSON output: wraps records inside `{ _synthetic_data_notice: {...}, records: [...] }` — lines 637–643
- CSV output: prepends 13-line comment block with full notice — lines 608–635
- XLSX output: separate `_SYNTHETIC_NOTICE` sheet + `Synthetic Data` sheet — lines 911–944

### Deterministic RNG
- `mulberry32(seed)` — lines 483–490
- Same seed + same input + same field config = identical output (reproducibility)

### STEP 4 — OUTPUT
- Success banner with record count + synth/redact counts — lines 395–402
- **Preview table** — first 10 rows, color-coded by mode (green/blue/red) — lines 869–894
- **Raw output** preview — first 20 rows, formatted in chosen format — lines 897–901
- **copy all** button → full payload to clipboard — line 410, lines 961–965
- **download .json/.csv/.xlsx** button — line 410, lines 907–959
- **← Reconfigure** (back) / **New Data** (reset all) — lines 426–427

### Footer
- "All processing happens locally in your browser. No data is sent to any server." — lines 432–434

## User flows

### Primary flow
1. User lands at INPUT step. Clicks `load sample` to test, OR pastes their own data, OR uploads a file.
2. Clicks **Parse & Configure**. App auto-detects fields and pre-assigns modes.
3. User reviews each column pill. Switches modes as needed.
4. User adjusts row multiplier (e.g., 5x for a beefier sample) and seed if reproducibility matters.
5. Clicks **Wash Data**. Watches the ~1.6 sec animation.
6. Lands at OUTPUT. Reviews preview table. Downloads.

### Secondary flow — Reconfigure
- From OUTPUT, click **← Reconfigure** to tweak field modes/options and re-wash without re-uploading.

### Tertiary flow — New Data
- Click **New Data** to wipe state and start over.

## Walkthrough script (~19 min target)

### 00:00 — Cold open (45 sec)
*(On screen: a real-looking broker spreadsheet — names, phone numbers, SSNs visible. Blur effect over the sensitive cells.)*

"Quick scenario. You're a freight broker. A TMS vendor emails you and says 'send us a sample of your customer data so we can build you a demo.' You open up the export and… [pause] yeah. There it is. Real names. Real phones. Driver SSNs. Contract rates you absolutely cannot leak."

"So what do you do? Manually scrub it in Excel for 45 minutes? Use some sketchy online tool that wants you to upload the file? Pay $200/month for a privacy SaaS?"

"Or — you use Data Wash. Free. Open in your browser. Nothing uploads. Two minutes. Done."

*(Cut to Data Wash interface.)*

### 00:45 — App overview (75 sec)
*(Show data-wash.html load. Highlight: step indicator at top, format toggles, the four-step wizard pattern.)*

"This is Data Wash. It's app number six in the Logistics Suite. It's a single HTML file, runs entirely in your browser, free forever, no signup. Open it once, bookmark it, you're done."

"The flow is four steps — Input, Configure, Washing, Output. You'll see those dots up top track your progress."

"Three input formats — JSON, CSV, Excel. Three output formats — same three. Mix and match. CSV in, Excel out — fine."

### 02:00 — Real demo: load sample (90 sec)
*(Click `load sample`. Show the sample JSON with Alice Johnson, Bob Chen, etc. — names, emails, phones, SSNs, salaries.)*

"Let me show you what real data looks like in here. I'll click load sample. This is fake data, but it's structured exactly like what you'd export from a CRM — five people, with name, email, phone, SSN, salary, department, city, state, hire date."

"This is the kind of thing a broker exports when they're switching TMS providers and the new vendor says 'just send us a CSV of your active loads and contacts.'"

"Hit **Parse & Configure**."

### 03:30 — Configure deep dive (4 min 30 sec)
*(Show the stats bar — 5 records, 9 fields, 8 synthesized, 1 preserved, 0 redacted.)*

"Look at this. Data Wash already made a call. Department is preserved — kept as-is — because 'Engineering' isn't sensitive. Everything else is set to synthesize, meaning it'll get replaced with realistic fake data."

"The auto-detection looks at field names — anything called id, department, category, type, status, role, gender, country defaults to preserve. Everything else, synth."

*(Click into a field pill, switch SSN from synthesize to redact.)*

"You've got three modes per column."

"**Synthesize** — green. Replace with realistic fake. For names, it'll use a pool of real-looking first and last names. For phones, it'll respect your formatting — if your phones use dashes, the fakes use dashes."

"**Preserve** — blue. Keep the value exactly. Use this for things like department, region, equipment type. Stuff that's not sensitive and you want the demo data to still group correctly."

"**Redact** — red. Replace with the literal string `[REDACTED]`. Use this for fields you don't even want fake versions of — like SSN. There's no business reason a vendor needs to see SSNs, real or fake."

*(Scroll to options.)*

"Two more knobs. **Row multiplier** — if you want a beefier sample, bump this. 5x turns 5 rows into 25. 50x is 250 rows. Useful if the vendor wants a bigger dataset."

"**Random seed** — 42 by default. Same seed plus same input equals identical output. So if you wash a file today and re-wash it next week, you get the same fakes. Reproducibility."

"**Preserve formatting** — if your phones are `(612) 555-1234`, the fakes look the same. Off = digits only."

"**Preserve numeric distributions** — instead of random numbers, salaries get fake values within ±20% of the original. The shape of the data survives."

"Output format — JSON, CSV, or Excel. Let's go CSV."

### 08:00 — Wash and review output (4 min)
*(Click Wash Data. Watch the spinner. Land on output.)*

"Wash Data. About a second and a half. Done."

*(Show the success banner: 'X synthetic records generated · Y fields synthesized · Z fields redacted'.)*

"Preview table — color-coded the same way as the config. Green columns are synthetic, blue is preserved, red is redacted. You can scan it and verify nothing real survived."

*(Compare side by side with the original.)*

"Notice — Bob Chen became Phoenix Tanaka. The email format survived. The phone got a fake but kept the dashes. SSN says [REDACTED]. Department still says Engineering — preserved. Salary 72000 became 67234 — within 20% of the original because we kept the distribution."

*(Scroll to raw output.)*

"Down here is the raw output. CSV here has a 13-line comment block at the top — provenance. It says: this is synthetic data, here's when it was generated, here's the seed, here are the fields that were synthesized, preserved, or redacted. Anyone receiving this file knows exactly what they're looking at."

### 12:00 — JSON and XLSX provenance (2 min)
*(Switch output format to JSON. Re-wash. Show the envelope.)*

"JSON mode wraps everything in a `_synthetic_data_notice` envelope. Records live under a `records` key. Vendor's data pipeline can parse this and either accept synthetic data or reject it — explicit handshake."

*(Switch to XLSX. Wash. Download. Open in Excel.)*

"Excel download is the slickest — you get TWO sheets. First sheet is `_SYNTHETIC_NOTICE` with the full provenance. Second sheet is the actual data. So when you email this to a vendor, the first thing they see is 'hey, this is fake.' No miscommunication."

### 14:00 — Edge cases & uploading your own file (2 min 30 sec)
*(Click 'New Data'. Click 'upload file'. Drag in a real-ish CSV with weird columns — `Customer_MC`, `Pickup_Address`, `Driver_DOB`.)*

"Now let's do the realistic version. Upload your own. I'm dropping in a fake CRM export with some weirder column names — `Customer_MC`, `Pickup_Address`, `Driver_DOB`."

*(Show the configure step.)*

"Data Wash didn't recognize `Customer_MC` as a known pattern, so it defaulted to synthesize. The character-class scramble kicks in — uppercase stays uppercase, digits stay digits, the shape survives even if Data Wash doesn't have a built-in generator."

"`Pickup_Address` — recognized the word 'address', generated `1234 Maple Ave` style values."

"`Driver_DOB` — recognized 'dob' or matched the YYYY-MM-DD pattern, generated random dates."

"What's the move when you see a field that didn't auto-detect? Look at the original value in your spreadsheet. If it's sensitive, redact it. If it's not, preserve it. If you're not sure — synthesize. The character-scramble fallback is safe."

### 16:30 — Seeds and reproducibility (90 sec)
*(Re-wash same data with seed 42, then seed 100, side by side.)*

"One more power-user thing. The seed. Wash the same data with seed 42 — you get Phoenix Tanaka. Wash it with seed 100 — you get Wren Singh. Change the seed, change the fakes. Keep the seed, repeat the result."

"Why care? Two reasons. One — if you're sharing iteratively with the same vendor and they ask for an updated file next week, same seed means the fake identities are stable. Bob Chen stays Phoenix Tanaka. The vendor's demo doesn't break."

"Two — auditability. You can tell your security team 'I washed it with seed 42 on May 16th' and they can re-run it and verify the output matches."

### 18:00 — Recap & CTA (90 sec)
"That's Data Wash. Free, browser-only, two minutes from CSV to scrubbed CSV. Three modes per column — synth, preserve, redact. Three formats in, three formats out. Built-in provenance. Deterministic with seeds."

"It lives in the Logistics Suite alongside Mass Post, Load Manager, Freight Matcher, CarrierVet, and Pillar — link in the description. Free, no signup, runs entirely in your browser."

"Subscribe for the rest of the seven-app walkthrough. Pillar's next."

"Built by brokers, for brokers. See you in the next one."

## YouTube chapters

```
00:00 Why you need this (the vendor CSV problem)
00:45 What Data Wash is
02:00 Load the sample data
03:30 The three modes — synth, preserve, redact
06:30 Row multiplier, seed, formatting toggles
08:00 Wash Data — review the output
10:00 CSV provenance comment block
12:00 JSON envelope mode
13:00 Excel — the two-sheet trick
14:00 Upload your own file (weird columns)
16:30 Seeds and reproducibility
18:00 Recap & next app
```

## Estimated runtime
~19 minutes. Within the 15–22 utility-app window.
</content>
</invoke>