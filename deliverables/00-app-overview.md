# Pillar — App Overview

## What it is
Pillar is the **seventh and newest app** in the Logistics Suite. It's the broker tool that finally answers the question every floor manager has been asking: who's stepping on whose carrier?

Pillar reads a Salesforce TMS report and automatically classifies every load by relationship — Core, New Core, or Violation. No filtering, no exception lists, no committees.

## Why it exists
The other six apps in the suite (Mass Post, Bolt Post, Load Manager, Freight Matcher, Carrier Vet, Data Wash) all help reps do more loads faster. Pillar does the one thing none of them do: it tells the manager who's working whose book.

## What it does

### 1. Identifies Core Carriers
Any carrier that ran **4 or more loads** with the same Booking Carrier Rep last calendar month, keyed on Actual Delivery Date. Cancelled / Voided / TONU loads excluded. If a carrier shows up under two reps, the one with the higher load count wins.

### 2. Surfaces New Cores
**Emerging relationships** — 2+ loads this month with the same rep, where both Actual Ship Date and Expected Delivery Date land in the current month, and the carrier isn't already an established Core. Locked on the Actual Ship Date of the 2nd shipped load.

### 3. Flags Violations
Every load this month where the booking rep ≠ the carrier's owning rep, AND the rate con (proxy: Last Activity Date) was sent on or after the lock date. Three severity tiers:
- **Soft** — first time this violator has touched the carrier
- **Standard** — violation against an established Core where violator has booked before
- **Severe** — violation against a New Core (most damaging — kills a brand-new relationship)

### 4. Provides Rep Accountability
The Rep View page shows, per broker:
- Cores they own
- New Cores they're building
- Loads poached **from** them
- Loads **they** poached

Designed for 1:1 conversations.

## How data gets in

### Path A — Salesforce pull (preferred)
Click **Pull from Salesforce** in the sidebar. Pillar opens a hidden iframe to the pre-configured Lightning report URL (`bayandbaytms.lightning.force.com/.../00OPe00000g4QoXMAU`). User must be logged into Salesforce in the same browser. ~26 second progress bar, then browser's native file picker auto-opens. User selects the most recently downloaded `report*.xlsx`.

### Path B — Direct upload
Drop a `.xlsx`, `.xls`, or `.csv` file directly on the upload box. Pillar auto-detects the header row by scanning for `Booking Carrier Rep` or `Load: Load Number` as anchors.

## Required column names (exact match)
- `Load: Load Number`
- `Carrier`
- `Booking Carrier Rep` ← if missing, BCR warning fires and violations don't run
- `Load Status`
- `Actual Ship Date`
- `Expected Ship Date`
- `Actual Delivery Date`
- `Expected Delivery Date`
- `Load: Last Activity Date`
- `Origin`, `Destination`, `Customer`

## Screens
1. **Dashboard** — 5 stat cards + Recent Violations + Top Brokers by Cores + Most Active Carriers
2. **Violations** — full filterable table (Soft / Standard / Severe / Core / New Core tags)
3. **Core Carriers** — grouped by rep, ⚠ flag on cores that got poached this month
4. **New Cores** — emerging relationships with lock dates
5. **Rep View** — per-broker accountability profile

## In-app tutorial
8-step overlay auto-launches on first visit. Floating `?` button reopens it. Remembered via `pillar_tut` localStorage key.

## Tech
Single-page HTML at `Logistics-Suite/site/pillar.html`. Vanilla JS. XLSX parsing via SheetJS. No build step. Uploaded to the suite via the Supabase upload-app API (not baked into the deploy).

## Where it lives
- App: https://logistics-suite-v1.pages.dev → app hub → 7th card (last on the right)
- Source: `C:/Users/aleca/Desktop/Logistics Suite/Logistics-Suite/site/pillar.html`
