# Mass Post — App overview

**One line:** a single-file HTML app freight brokers use to bulk-post loads to DAT, scrape Quick Rate Lookup for fifty lanes at once, and write rates back to Revenova/Salesforce — without retyping.

## What it is

- A single ~8,300-line HTML file (`mass-post.html`). No build system, no npm, no server.
- Opens in Chrome. Data lives in the browser (`localStorage` with `mp_` prefix).
- The only external system it talks to is the user's own Salesforce/Revenova session (via hidden iframe + the user's session cookie). Optionally talks to a local `dat-pp-cli` daemon at `127.0.0.1:53683` for faster rate pulls.
- App #01 of 7 in the Logistics Suite.

## Who it's for

Freight brokers, dispatchers, and carrier sales reps who:
- Run a Revenova/Salesforce TMS,
- Post bulk loads to DAT One,
- Currently retype rates between the two systems every morning.

## Headline workflow (the 10-step roundtrip)

1. `⚡ Pull Report` from Revenova
2. `📤 Bulk Export` → choose dates
3. `Load Lanes` to build the preview table
4. `📊 Get DAT Rates` (copies a lane payload to clipboard)
5. Switch to DAT Tools → click `🔄 Mass Post Helper` bookmarklet (or run dat-pp-cli daemon for 20× speed)
6. Click purple `📋 Copy Rates` (fresh clipboard gesture)
7. Back to Mass Post → `📋 Paste Rates`
8. Adjust rates with steppers / formula
9. `💰 Posted Amount` (and `📊 Benchmark Rate`) → Revenova list view → click `🔄 Mass Post Helper` → click Revenova Save
10. `📥 Download CSV for DAT` → upload to DAT bulk-post page

## Key features

- **Bulk Export modal** with preview table (Date / Load # / Equip / Lane / DAT-Benchmark / Current Rate / New Rate)
- **Two context-aware bookmarklets**: ⚡ Fill DAT (single load) and 🔄 Mass Post Helper (DAT Tools scrape or Revenova writeback)
- **Optional dat-pp-cli daemon** for 20× faster rate fetches via DAT's API (token stays local)
- **Rate Formula** (default: Spot Average − $150, round down to $50) — Base / Adjust / Round / Floor controls
- **Snap-to-$50 stepper** on every row + bulk `−$50 / +$50 all` controls
- **Equipment normalization** (V/R → VR, Step Deck → F, SB skipped)
- **Watt local helper** that flags booked-while-posted conflicts in real time
- **Express Export** (one-click file → Bulk Export jump)
- **Post Alone** + ⚡ Fill DAT bookmarklet for single-load urgents
- **Quick Reply** carrier email templates with auto-filled load info
- **Customer → Commodity map** that auto-learns from quick replies
- **Fuel/BT toggle** per customer with adjustable per-mile surcharge
- **Notification bell + booked-while-posted detection**
- In-app **23-step Full Tutorial** + **7-step Express Tutorial**

## Built by

Alec at Bay & Bay Transportation. Phone in the YouTube description.
Tagline: **Built by brokers · for brokers.**

## Distribution

Logistics Suite hub (`app.html`). No signup, no SaaS, no paywall.
