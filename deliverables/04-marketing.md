# Marketing Package — Data Wash

**QA fixes applied:** title #5 dropped, pinned comment rephrased, "forever" claim dropped.

---

## Primary title (A)

**"Stop emailing customer PII to vendors. Use this free tool. (2 min)"**

## A/B variant (B)

**"I built a free PII scrubber so freight brokers stop nuking their own data"**

## Other approved titles (rotate if A/B fatigue)

- "How to share broker data with a vendor without leaking a single SSN"
- "Clean a freight CSV in 30 seconds — no signup, nothing uploaded"

**Rejected:** the "lawsuit waiting to happen" framing — algorithmic risk on YouTube's sensitive-content filter.

---

## YouTube description (paste in)

> Every freight broker eventually gets the email: "Just send us a sample of your data so we can build you a demo." Then you open the export and realize half of it is customer names, driver phone numbers, MC#s, contract rates — stuff you absolutely cannot leak.
>
> Data Wash fixes that in 2 minutes. Drop in a CSV, JSON, or Excel file. Pick which columns to synthesize (fake), preserve (keep), or redact (nuke). Hit "Wash Data." You get back a file with the exact same shape — same row count, same columns, same field types — but every sensitive value has been replaced with realistic fakes.
>
> 100% browser-based. Nothing uploads. Nothing leaves your laptop. Free. No signup.
>
> In this video I walk through the entire flow:
> - Loading sample data so you can play
> - The three modes per column (synthesize / preserve / redact) and when to use each
> - Auto-detection — Data Wash recognizes 15+ field types (names, emails, phones, SSNs, addresses, dates, IPs, IDs, etc.)
> - Row multiplier (1x to 50x) — turn a 5-row sample into a 250-row dataset
> - Random seed for reproducibility — same seed = same fakes every time
> - The two-sheet Excel export with built-in provenance notice
> - The CSV comment header that doubles as an audit trail
> - What to do when Data Wash doesn't auto-recognize a weird column name
> - Real-world example: a fake CRM export with phone, SSN, address, hire date, salary
>
> ⏱ CHAPTERS
> 00:00 The vendor CSV problem
> 00:45 Meet Data Wash
> 02:00 Load the sample
> 03:30 Three modes — synth, preserve, redact
> 06:30 Multiplier, seed, formatting toggles
> 08:00 Wash & review
> 10:00 CSV provenance
> 12:00 JSON envelope
> 13:00 Excel — two sheets
> 14:00 Upload your own (weird columns)
> 16:30 Seeds & reproducibility
> 18:00 Recap & next app
>
> 🧰 GET DATA WASH (free, no signup)
> Logistics Suite hub → https://logisticssuitev1.pages.dev/app
> Direct app → https://logisticssuitev1.pages.dev/data-wash.html
>
> 🚚 The Logistics Suite — 7 free apps built by brokers, for brokers
> 1. Mass Post — bulk DAT load posting
> 2. Bolt Post — quick rate fills
> 3. Load Manager — single-file freight workflow
> 4. Freight Matcher — load/carrier matching
> 5. CarrierVet — carrier vetting
> 6. Data Wash — privacy-safe data sharing ← this video
> 7. Pillar — coming next
>
> 💬 Built by Alec at Bay & Bay Transportation. Questions, requests, or weird CSVs you want me to test against? Drop a comment.
>
> ⚠️ Privacy disclaimer
> Data Wash anonymizes data for sharing. It is NOT a certified HIPAA, GDPR, or PCI compliance tool. For regulated data, consult your compliance team.
>
> #FreightBroker #LogisticsSuite #DataPrivacy #FreightTech

## Tags (~400 char)

freight broker, freight broker tools, logistics suite, data wash, data privacy, csv tools, pii redaction, synthetic data, freight tech, freight software, broker tools, free freight tools, bay and bay, alec abercrombie, broker software, tms tools, csv scrubber, anonymize data, vendor data sharing, freight csv, broker spreadsheet, fake data generator, xlsx tools, json data tools

## Visible hashtags (3 above title)

`#FreightBroker #LogisticsSuite #DataPrivacy`

---

## 30-second hook (verbatim, matches script)

> Quick scenario. You're a freight broker. A TMS vendor emails you: "send us a sample of your customer data so we can build you a demo." You open the export and… yeah. Real names. Real phones. Driver SSNs. Contract rates you absolutely cannot leak.
>
> So what do you do? Spend your afternoon in Find-and-Replace? Upload it to some sketchy online tool? Sign up for a SaaS that wants your credit card on file?
>
> Or — you use Data Wash. Free. Browser-only. Nothing uploads. Two minutes. Done.

---

## Pinned comment (QA-revised)

> Built by Alec at Bay & Bay — freight broker, builder of the Logistics Suite. If you want the full 7-app series, the hub is at logisticssuitev1.pages.dev/app. All free. Data Wash and Load Manager run entirely in your browser; the others connect to your DAT or Salesforce. Drop a comment with the weirdest column name in your CRM and I'll tell you how Data Wash handles it.

---

## Trend angles to ride

1. **"Show me the actual software, not slides"** — viewers tired of vendor demos. Data Wash is real screen-record of a free tool.
2. **"Anti-SaaS / single HTML file"** — indie-dev YouTube loves this; cross-pollinate the broker audience with tech.
3. **Privacy concern (TMS data breaches in last 18 months)** — brokers are nervous about handing raw data over.

## Target audience

- **Primary:** Marcus, 34, mid-size brokerage ops manager who's been on the wrong end of "send us a sample."
- **Secondary:** Sarah, 41, TMS admin / analyst at a 100+ broker shop.
- **Tertiary:** Independent broker, 1–5 person shop, suspicious of anything that asks for an upload.

## Cross-promotion checklist

- [ ] Add Data Wash to descriptions of videos #1–5 (already live)
- [ ] Update endcard on video #7 (Pillar) once published to link back to Data Wash
- [ ] Twitter/LinkedIn carousel: 5 slides on the synth/preserve/redact decision tree
- [ ] Slack share in #freight-tools community channels
</content>
</invoke>