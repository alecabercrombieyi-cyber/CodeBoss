# Tutorial Script — Data Wash

**Target runtime:** ~19 minutes (utility-app sweet spot 15–22)
**Voice:** broker-to-broker, conversational, no enterprise jargon
**QA fixes applied:** 9/9 from `wat/tmp/qa-report.md`

---

## 00:00 — Cold open (45 sec)

**[On screen]** Excel-style spreadsheet visible. Sensitive cells (SSN, phone, salary) blur on cue.

**Voiceover:**

> Quick scenario. You're a freight broker. A TMS vendor emails you: "send us a sample of your customer data so we can build you a demo." You open the export and… yeah. Real names. Real phones. Driver SSNs. Contract rates you absolutely cannot leak.
>
> So what do you do? Spend your afternoon in Find-and-Replace? Upload it to some sketchy online tool? Sign up for a SaaS that wants your credit card on file?
>
> Or — you use Data Wash. Free. Browser-only. Nothing uploads. Two minutes. Done.

**[Cut]** Hard cut to data-wash.html loading.

---

## 00:45 — Meet Data Wash (75 sec)

**[Title card]** "Meet Data Wash — browser-only · zero upload · free"

**[On screen]** Full data-wash.html page. Hover over the step indicator dots.

**Voiceover:**

> This is Data Wash. App number six in the Logistics Suite. Single HTML file, runs in your browser, no backend, no signup. Open it once, bookmark it, you're done.
>
> The flow is four steps — Input, Configure, Washing, Output. You'll see those dots up top track your progress.
>
> Three input formats — JSON, CSV, Excel. Three output formats — same three. Mix and match. CSV in, Excel out — fine.

---

## 02:00 — Load the sample (90 sec)

**[Title card]** "Load the sample — 5 rows · 9 columns · enough to feel it"

**[Action]** Click **load sample**. Sample JSON appears.

**Voiceover:**

> Let me show you what real data looks like in here. I'll click **load sample**. This is fake data, but it's structured exactly like what you'd export from a CRM — five people, with name, email, phone, SSN, salary, department, city, state, hire date.
>
> This is the kind of thing a broker exports when they're switching TMS providers and the new vendor says "just send us a CSV of your active loads and contacts."
>
> Hit **Parse & Configure**.

**[On-screen callout]** Pink arrow over the sample: "real-looking PII (this is sample data — relax)"

---

## 03:30 — Three modes (3 min)

**[Title card]** "Three modes per column — SYNTHESIZE · PRESERVE · REDACT"

**[On screen]** Stats bar — 5 records, 9 fields, 8 synth, 1 preserve, 0 redact.

**Voiceover:**

> Look at this. Data Wash already made a call. Department is preserved — kept as-is — because "Engineering" isn't sensitive. Everything else is set to synthesize, meaning it'll get replaced with realistic fake data.
>
> The auto-detection looks at field names — anything called id, department, category, type, status, role, gender, country defaults to preserve. Everything else gets synthesized.

**[Action]** Click into a field pill. Switch SSN from synthesize to redact. Watch the pill turn red.

**Voiceover (continues):**

> You've got three modes per column.
>
> **Synthesize** — green. Replace with realistic fake. For names, it uses a pool of real-looking first and last names. For phones, it respects your formatting — if your phones use dashes, the fakes use dashes. If they use parens, fakes use parens.
>
> **Preserve** — blue. Keep the value exactly. Use this for department, region, equipment type. Stuff that's not sensitive but you want the demo to still group correctly.
>
> **Redact** — red. Replace with the literal string `[REDACTED]`. Use this for fields you don't want fake versions of either — like SSN. There's no business reason a vendor needs to see SSNs, real OR fake.

---

## 06:30 — Options (90 sec)

**[Title card]** "Multiplier · seed · format toggles"

**[Action]** Scroll to options grid.

**Voiceover:**

> Two more knobs.
>
> **Row multiplier** — if you want a beefier sample, bump this. 5x turns 5 rows into 25. 50x is 250 rows. Useful if the vendor wants something bigger than your real sample.
>
> **Random seed** — 42 by default. Same seed plus same input equals identical output. We'll come back to why that matters.
>
> **Preserve formatting** — if your phones are formatted with parens, fakes get parens. Off equals digits only.
>
> **Preserve numeric distributions** — instead of random numbers, salaries get fake values within ±20% of the original. The shape of the data survives.
>
> Output format — JSON, CSV, or Excel. Let's go CSV.

---

## 08:00 — Wash and review (2 min)

**[Title card]** "Wash. Done. — ~1.6 seconds"

**[Action]** Click **Wash Data**. Spinner runs. Land on output.

**Voiceover (let spinner breathe ~1.5 sec):**

> Wash Data. About a second and a half. Done.

**[On screen]** Success banner with counts.

**Voiceover:**

> Preview table — color-coded the same way as the config. Green columns are synthetic, blue is preserved, red is redacted. You can scan it and verify nothing real survived.

**[Action]** Side-by-side cut: original CSV vs washed CSV.

**Voiceover:**

> Notice — Bob Chen became something like Phoenix Tanaka. A totally fabricated name from the pool. The email format survived — first name dot last name at a fake domain. The phone got a fake but kept the dashes. SSN says `[REDACTED]`. Department still says Engineering — preserved. The salary 72,000 became something close — within 20% of the original because we kept the distribution.

---

## 10:00 — CSV provenance (2 min)

**[Title card]** "Provenance built in — CSV · JSON · XLSX all carry the receipt"

**[Action]** Scroll to raw output. Highlight the comment block.

**Voiceover:**

> Down here is the raw output. CSV gets a thirteen-line comment block at the top — provenance. It says: this is synthetic data, here's when it was generated, here's the seed, here are the fields that were synthesized, preserved, or redacted.
>
> Anyone receiving this file knows exactly what they're looking at. If a vendor's data pipeline ingests this and you ever get questioned about why their dashboards look weird — the file itself is the audit trail.

---

## 12:00 — JSON envelope (60 sec)

**[Action]** Switch output to JSON. Re-wash. Show envelope structure.

**Voiceover:**

> JSON mode wraps everything in a `_synthetic_data_notice` envelope. Records live under a `records` key. Vendor's data pipeline can parse this and either accept synthetic data or reject it — explicit handshake.

---

## 13:00 — Excel two-sheet trick (60 sec)

**[Action]** Switch to XLSX. Wash. Download. Open in Excel. Switch between the two sheets.

**Voiceover:**

> Excel download is the slickest — you get TWO sheets. First sheet is `_SYNTHETIC_NOTICE` with the full provenance. Second sheet is the actual data. So when you email this to a vendor, the first thing they see is "hey, this is fake." No miscommunication.

---

## 14:00 — Upload your own (2 min 30 sec)

**[Title card]** "What about weird columns? — the character-scramble safety net"

**[Action]** Click **New Data**, then **upload file**. Drop in a CSV with `Customer_MC`, `Pickup_Address`, `Driver_DOB`.

**Voiceover:**

> Now let's do the realistic version. Upload your own. I'm dropping in a fake CRM export with some weirder column names — `Customer_MC`, `Pickup_Address`, `Driver_DOB`.

**[On screen]** Configure step renders.

**Voiceover:**

> Data Wash didn't recognize `Customer_MC` as a known pattern, so it defaulted to synthesize. The character-class scramble kicks in — uppercase stays uppercase, digits stay digits, the shape survives even when there's no built-in generator.
>
> `Pickup_Address` — recognized the word "address," generates `1234 Maple Ave` style values.
>
> `Driver_DOB` — recognized "dob" or matched the YYYY-MM-DD pattern, generated random historical dates.
>
> What's the move when you see a field that didn't auto-detect? Look at the original value in your spreadsheet. If it's sensitive, redact it. If it's not, preserve it. If you're not sure — synthesize. The character-scramble fallback is safe.

---

## 16:30 — Seeds and reproducibility (90 sec)

**[Title card]** "Seeds = reproducible fakes — seed 42 today = seed 42 next month"

**[Action]** Re-wash same data with seed 42, then seed 100. Side by side.

**Voiceover:**

> One more power-user thing. The seed. Wash with seed 42 — you get one set of fakes. Wash the same data with seed 100 — you get a different set. Change the seed, change the output. Keep the seed, repeat the result exactly.
>
> Why care? Two reasons.
>
> One — if you're sharing iteratively with the same vendor and they ask for an updated file next week, same seed means the fake identities are stable. The vendor's demo dashboard doesn't break.
>
> Two — auditability. You can tell your security team "I washed it with seed 42 on May 16th" and they can re-run it and verify the output matches.

---

## 18:00 — Recap & CTA (90 sec)

**[Title card]** "Subscribe — Pillar's next — logisticssuitev1.pages.dev"

**Voiceover:**

> That's Data Wash. Free, browser-only, two minutes from CSV to scrubbed CSV. Three modes per column — synth, preserve, redact. Three formats in, three formats out. Built-in provenance. Deterministic with seeds.
>
> It lives in the Logistics Suite alongside Mass Post, Load Manager, Freight Matcher, CarrierVet, and Pillar — link in the description. All free. No signup.
>
> Subscribe for the rest of the seven-app walkthrough. Pillar's next.
>
> Built by brokers, for brokers. See you in the next one.

---

## YouTube chapter timestamps (copy into description)

```
00:00 The vendor CSV problem
00:45 Meet Data Wash
02:00 Load the sample
03:30 Three modes — synth, preserve, redact
06:30 Multiplier, seed, formatting toggles
08:00 Wash & review
10:00 CSV provenance
12:00 JSON envelope
13:00 Excel — two sheets
14:00 Upload your own (weird columns)
16:30 Seeds & reproducibility
18:00 Recap & next app
```
</content>
</invoke>