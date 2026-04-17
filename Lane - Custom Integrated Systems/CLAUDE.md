# Mass Post — Project Context for Claude Code

## What this is
Mass Post is a single-file HTML app (mass-post.html) used by freight brokers at Bay & Bay Transportation to post loads to DAT load boards and manage rates. Built by Alec, phone (612) 836-4075.

## Files
- `mass-post.html` — the main app (~7800 lines, single HTML file with embedded CSS + JS)
- `bolt-post.html` — companion app (Bolt Post) with similar architecture
- `CLAUDE.md` — this file

## Architecture
Single HTML file. No build system, no npm, no framework. Vanilla JS, CSS variables for theming (cyan/purple dark theme), all state in localStorage with `mp_` prefix. Opens as a local file in the browser.

## Key localStorage keys
mp_sf_url, mp_col_mapping, mp_cust_comm, mp_user_name, mp_user_email, mp_last_posted, mp_prev_load_ids, mp_prev_statuses, mp_prev_pu_dates, mp_prev_notes, mp_seen_booked, mp_seen_notes, mp_fuel_bt, mp_fuel_rate, mp_deepseek_key, mp_current_tab, mp_tutorial_seen, mp_express_tut_seen, mp_rate_overrides, mp_notifications, mp_post_to_team, mp_rate_formula

## Salesforce/Revenova Integration
- Pulls TMS report (AA_Modified1) via hidden iframe + session cookie trick
- Report URL stored in localStorage, converted from Lightning to Classic servlet URL
- User must be logged into Salesforce/Revenova in the same browser

## Two Bookmarklets (in Settings)
1. **⚡ Fill DAT** — fills a single load on DAT's posting form. Uses prompt() for clipboard input.
2. **🔄 Mass Post Helper** — context-aware, runs on:
   - **DAT Tools** (one.dat.com/tools): scrapes Quick Rate Lookup for bulk lane rates (~4s/lane)
   - **Revenova/Salesforce list view**: inline-edits Posted Amount (and soon Benchmark Rate) per load

### DAT Tools DOM (confirmed from user's console):
- Search button: `<div class="action-button">SEARCH</div>` (NOT a button element)
- New Search button: `<div class="action-button">NEW SEARCH</div>`
- Rate values: `<div class="rate-data">$1,142</div>` — first = Spot, second = Contract
- Equipment dropdown: standard Angular Material `mat-select` with `mat-option` elements (Van/Reefer/Flatbed only)
- City autocomplete: Google Places API, suggestions are `.pac-item` elements (respond to mousedown, NOT click)

### Revenova/Salesforce list view DOM (NEEDS INVESTIGATION):
- Load numbers are hyperlinks (need to extract text from `<a>` tags)
- Edit requires pressing an edit button (not double-click)
- Column headers need to be mapped — run this in console to check:
  ```js
  var hdrs = document.querySelectorAll('th, [role=columnheader]');
  hdrs.forEach(function(h, i) { console.log(i + ': ' + h.textContent.trim().substring(0, 40)); });
  ```
- Need HTML of: edit button, input field in edit mode, save button, load # cell, column headers

## Equipment Mapping
| Salesforce | DAT Lookup | Display |
|---|---|---|
| VR, V/R, Van/Reefer | Van | VR |
| V, Van | Van | V |
| R, Reefer | Reefer | R |
| F, FH, FD, Flatbed | Flatbed | F |
| SD (Step Deck) | Flatbed | F |
| SB (Straight Box Truck) | null (no lookup) | SB |

## Bulk Export Flow
1. Express Export → file picker → report loads
2. Bulk Export modal opens with Today pre-selected
3. Click 📊 Get DAT Rates → copies lane payload to clipboard
4. Switch to one.dat.com/tools → click 🔄 bookmarklet → ~4s/lane
5. Click purple 📋 Copy Rates button (fresh user gesture for clipboard API)
6. Switch back → click 📋 Paste Rates → New Rate column fills with raw DAT Spot
7. Review, adjust with ±$50 steppers (snap to nearest $50) or ⚡ Apply Formula
8. Click 💰 Copy to Revenova → switch to Revenova list view → click 🔄 bookmarklet
9. Click Revenova Save
10. Back to Mass Post → click 📥 Download CSV for DAT → upload to DAT bulk

## Rate Formula (Settings)
- Base: Spot/SpotLow/SpotHigh/Contract
- Adjust: Flat $ or Percent %
- Round: Down/Nearest/Up to $25/$50/$100
- Floor: optional minimum
- Defaults: Spot, -$150 flat, down, $50, no floor

## Preview Table Columns
Date | Load # | Equip | Lane | DAT / Benchmark | Current Rate | New Rate

### DAT / Benchmark column features:
- Shows raw DAT Spot rate
- Arrow (↑/↓) comparing DAT Spot vs Current Rate with +/- dollar amount and percentage
- ⚠️ caution sign if change ≥ 5%

### Stepper snap-to-$50 behavior:
- $1,099 + click → $1,100 (not $1,149)
- $1,099 - click → $1,050
- Logic: delta>0 ? Math.floor(cur/50)*50+50 : Math.ceil(cur/50)*50-50

## Pending Work
- [ ] Rename all "Salesforce" UI text to "Revenova"
- [ ] Fix Revenova bookmarklet: load # is a hyperlink, edit requires button click (need DOM inspection)
- [ ] Add Benchmark Rate field writeback to Revenova (column name: "Benchmark Rate", leave alone if no DAT data)
- [ ] Pre-flight check before Revenova fill (show which loads matched vs missing)
- [ ] Customer Quote + Projected Margin columns (deferred)
- [ ] RateView trend arrows 3/7/14 day (deferred — needs RateView screenshots)
- [ ] Sub-4-second DAT scraping (fast version had stale-rate bug — all rates came back identical)

## Known Gotchas
- `var` hoisting: state variables declared late in the file but referenced in init IIFE. Use lazy-init pattern: `if (!_varName) { _varName = defaults; }`
- Bookmarklet clipboard: `execCommand('copy')` fails after async loops (user gesture expires). Must show a button for user to click → fresh gesture → clipboard API works.
- DAT fast scraping bug: removing blind sleeps caused stale `.rate-data` elements to be read before new search completed. All lanes got first lane's rate. Reverted to 4s/lane with blind sleeps. Fix would require removing `.rate-data` DOM nodes before each SEARCH click.
- User must re-drag bookmarklets from Settings after any code change (bookmarks are frozen URLs)
