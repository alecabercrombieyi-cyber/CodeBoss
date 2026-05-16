# Bolt Post — App Overview

**App #02 of 7 in the Logistics Suite.**
**Source:** `Logistics-Suite/site/bolt-post.html` (single-file HTML, ~2,686 lines, no backend, no build system).
**One-liner:** The speed companion to Mass Post — same data, stripped to one job: post the load and reply to carriers faster than anyone.

---

## What it does
Bolt Post pulls a Salesforce/Revenova report (or a local CSV/XLSX), renders every open load as a card grouped by pickup day, and gives the broker two actions per card: **⚡ Copy** (load → JSON to clipboard) and **💬 Reply** (variation picker for carrier replies). A companion bookmarklet drops the clipboard JSON into DAT One's post-load form. Bulk CSV export drops the whole day's worth into DAT's bulk-post page.

## Why it exists (vs. Mass Post)
Mass Post is the studio: three tabs, DAT rate lookup, formula tools, Watt AI, Posted Amount + Benchmark Rate writeback to Revenova. Great in the morning when you're *pricing*. Once the prices are locked, all those surfaces just slow you down. Bolt Post strips them away. Same Salesforce data, same column mapping concept, but the UI is tuned for the post-out sprint.

## Unique-to-Bolt features (vs. Mass Post)
1. **Day-grouped card view.** Today auto-expanded; tomorrow+ collapsed; past days at the bottom.
2. **Multi-stop inline editor.** Loads with ≥3 stops get an orange `⚠️ N stops` badge, a pulsing red border, and per-stop P/D + location + appointment-window rows. Replies become stop-aware.
3. **Min Margin filter** (`customer quote − posted rate`) — focus on profitable loads.
4. **Post to Team toggle** — the bookmarklet ticks DAT's Phone checkbox (team line) instead of Email (personal inbox).
5. **Reply variation picker** with 3 styles (Standard / Casual / Quick & Direct), each generated fresh from the load's data + the time of day.

## How the bookmarklet works (the speed move)
1. Click ⚡ Copy on a card → JSON payload to clipboard.
2. Switch to DAT One's post-load tab.
3. Click the ⚡ Fill DAT bookmark → prompt() → Ctrl+V → OK.
4. Bookmarklet uses **native React/Angular value setters** (`Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set`) and dispatches synthetic `input/change/focus/blur` events. Mat-input fields are matched by label text (Origin, Destination, Rate); shipment fields by stable IDs (`shipment-pickup-earliest`, `shipment-equipment-type`, etc.). Phone/Email checkbox is toggled by label match.

## State / persistence
All localStorage keys prefixed **`bp_`**: `bp_sf_url`, `bp_col_mapping`, `bp_cust_comm`, `bp_user_name`, `bp_user_email`, `bp_post_to_team`, `bp_extra_stops`. **No backend, no cloud, no login.** Data never leaves the browser.

## Native palette
Deep navy `#0A0E1A` with electric blue `#4D8DFF` and electric purple `#A78BFA` accents. Distinct from the candy-pink Suite chrome on purpose — Bolt Post's identity is *speed* and *energy*, and the dark theme is part of the contract with the user.

## Built by
Alec Abercrombie, freight broker at Bay & Bay Transportation, Minnesota. Phone (612) 836-4075. Part of the Logistics Suite — built by brokers, for brokers.
