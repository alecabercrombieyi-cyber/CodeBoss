# Data Wash — App Overview

**App #06 of 7 in the Logistics Suite.**

## One-line description
A browser-only synthetic data generator for freight brokers who need to share CSV / JSON / Excel files with vendors, consultants, or software trials without leaking customer PII.

## What it does
Drop in a file. Pick how each column should be handled — **synthesize** (replace with realistic fake), **preserve** (keep as-is), or **redact** (strip to `[REDACTED]`). Hit Wash Data. Get back a file with the exact same shape — same row count, same columns, same field types — but every sensitive value replaced.

## Why brokers need it
The "send us a sample of your data" email is universal. TMS evaluations, software trials, integration partners, analysts, consultants — they all ask. Manual redaction in Excel is slow and error-prone. Online tools want you to upload the file. SaaS privacy products want a contract. Data Wash sits in the middle: free, browser-only, two minutes.

## How it works (technical summary)
- Single HTML file (~1000 lines), no backend, no signup
- Inputs: JSON, CSV, XLSX (SheetJS for Excel parsing — loads from cdnjs)
- Outputs: JSON, CSV, XLSX (XLSX gets a separate `_SYNTHETIC_NOTICE` sheet)
- Deterministic pseudo-random via `mulberry32(seed)` — same seed + same input = same output
- 15+ auto-detected field types: names, emails, phones, SSN, addresses, cities, states, ZIPs, companies, dates, IPs, IDs, numerics, booleans, generic strings
- Three modes per column, color-coded green / blue / red throughout the UI
- Row multiplier 1x / 2x / 5x / 10x / 25x / 50x
- Provenance built in: CSV gets a 13-line comment header, JSON gets a `_synthetic_data_notice` envelope, XLSX gets a dedicated notice sheet — receivers can never claim they didn't know it was fake

## Position in the Suite
| # | App | Category | Privacy posture |
|---|---|---|---|
| 01 | Mass Post | Posting | Talks to Salesforce/DAT |
| 02 | Bolt Post | Posting | Talks to DAT |
| 03 | Load Manager | Workflow | 100% local |
| 04 | Freight Matcher | Matching | Local + paste-in |
| 05 | CarrierVet | Vetting | Local |
| **06** | **Data Wash** | **Privacy** | **100% local (incl. file parse — XLSX needs cdnjs for SheetJS)** |
| 07 | Pillar | TBD | TBD |

## Brand & voice
- Logistics Suite house brand: candy palette (#d4738c pink, #faf7f2 cream, #7bc8b5 mint, #9b7bb8 purple, #e8a87c peach, #c8a062 gold)
- The Data Wash UI itself uses an emerald/green dark theme — tutorials reconcile this with persistent candy-pink overlays
- Voice: broker-to-broker, no enterprise jargon
- Tagline (suite-wide): "Built by brokers · for brokers"

## What this app is NOT
- Not a HIPAA, GDPR, PCI, or any other certified compliance tool
- Not a backup / archival tool
- Not a re-identification or de-anonymization tool — output is intentionally irreversible
- Not appropriate for regulated medical / financial data without compliance review
</content>
</invoke>