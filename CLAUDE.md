# CLOVr — Project Context for Claude Code

## What this is

CLOVr is a Bay & Bay internal app inside the **Logistics Suite** family
(sibling to Mass Post, Bolt Post, Pillar, Data Wash, Freight Matcher). It
pulls **DAT One posted-truck** data and surfaces two related workflows:

1. **Load-match opportunities** — cross-reference today's available DAT truck
   postings against Bay & Bay's open freight (eventually pulled from the same
   Revenova/Salesforce report Mass Post uses) and rank "good options" so a
   broker sees at-a-glance which carriers to call.
2. **Email-blast opportunities** — once a set of matches is selected, gather
   the carrier-contact info from DAT and either draft a blast email or send it.

CLOVr is the *demand side* of the freight conversation that Mass Post handles
the *supply side* of: Mass Post puts your loads on DAT; CLOVr finds the
trucks already looking for loads on DAT and matches them.

Author/owner: Alec (Bay & Bay Transportation). Phone (612) 836-4075.

## Architectural inheritance from dat-pp-cli (the parent session)

CLOVr **reuses the entire `dat-pp-cli` daemon stack** the previous session
just stood up for Mass Post. Nothing new to build on the auth side; CLOVr's
data flow is literally "same daemon, new endpoints."

- **Auth daemon** — `dat-pp-cli auth login` listens on `127.0.0.1:53682`.
  Accepts a DAT bearer token via `POST /token` from the existing
  **🔐 Grab DAT Token** Chrome bookmarklet (built in `buildAuthBookmarklet()`
  inside `site/clovr.html` — *same bookmarklet code as Mass Post*). Tokens
  rotate every ~30 min; user clicks the bookmark whenever CLOVr's
  `showAuthNeededModal()` polls and sees a stale token.

- **Serve daemon** — `dat-pp-cli serve` listens on `127.0.0.1:53683`. Today
  it exposes `/auth-status`, `/health`, and `/rates`. CLOVr will add new
  resource-typed POST endpoints under the same daemon (probably `/trucks`,
  `/contacts`, `/blast`). The pattern is established — see
  `handleRates` in `dat-pp-cli/internal/cli/serve.go` for the exact shape to
  copy:

  - Read POSTed JSON
  - Pull `accessToken` from the shared config file (refreshed by the auth daemon)
  - Fire one or more GraphQL calls concurrently against `https://one.dat.com/one-web-bff/graphql`
  - Return `{ resource: { id1: {...}, id2: {...} } }`
  - On HTTP 401 from DAT, mark token stale in the config + return 401 to the caller

- **Token shape** — Auth0 SPA JS token captured from `localStorage`/`sessionStorage`
  under any key matching `/auth0|@@auth0spajs@@/i`, OR sniffed from
  `Authorization: Bearer …` headers via `fetch`/`XMLHttpRequest` wrappers.
  Bookmarklet does both. See `buildAuthBookmarklet()` in `site/clovr.html`.

The **Suite-app side** (`site/clovr.html`) carries over the *exact* helpers
from Mass Post:
- `cliCheckAuth()` — never-throws probe of `/auth-status`
- `cliFetchRates()` — kept verbatim as a template; CLOVr will copy-paste it
  into `cliFetchTrucks()`, `cliFetchContacts()`, etc. with the URL and the
  response-shape validator swapped out
- `showAuthNeededModal()` — polls `/auth-status` until valid, then `onResolved()`
- `buildAuthBookmarklet()` — *bit-for-bit identical* to Mass Post's version,
  because the token-capture mechanic is daemon-agnostic

## Gap-filling work (next concrete step)

Before `clovrFetchTrucks()` (the stub in `site/clovr.html`) can do anything
real, somebody needs to do a **fresh HAR capture from DAT One** while
exercising CLOVr-style workflows. The previous session did exactly this for
rates (the `MarketRates` and `GetLocationSuggestions` GraphQL operations) —
the procedure is now well-documented.

**HAR capture checklist:**

1. Open Chrome DevTools → Network tab → check "Preserve log" → clear.
2. Visit `https://one.dat.com/trucks` (or wherever posted-truck search lives).
3. Run a typical **search** — e.g. trucks heading to Chicago in the next 24h
   for vans. Watch Network for GraphQL POSTs to `/one-web-bff/graphql`.
   Capture the **operation name**, the **variables**, and the **response shape**.
4. From the result list, click a single truck row to open the **contact /
   carrier detail** view. That'll trigger another GraphQL call — probably
   something like `GetContacts` or `GetCarrierContact`. Capture it too.
5. Look for any "email this carrier" / "broadcast" button — that may or may
   not be a separate GraphQL mutation (or may just be a `mailto:` link, in
   which case there's nothing to capture, and CLOVr just composes the email
   client-side and uses `window.open('mailto:…')` or the user's SMTP).
6. **Right-click → Save all as HAR with content** → save next to
   `C:\Users\aleca\Desktop\dat-cli\dat-one.har` (the previous HAR from the
   rate work, which probably already contains *some* posted-truck traffic if
   the user navigated past the truck board during that capture).

**Expected GraphQL ops to discover (educated guesses):**

| Op name (likely)      | Purpose                              | Variables (guess)                                        |
|-----------------------|--------------------------------------|----------------------------------------------------------|
| `SearchTrucks`        | Filter posted trucks by lane/equip   | `origin`, `destinationRadius`, `equipment`, `daysAhead`  |
| `GetContacts`         | Resolve carrier MC# → phone/email    | `mcNumber` or `carrierId`                                |
| `BroadcastEmail` (?)  | Send email blast to N contacts       | `contactIds`, `subject`, `body`, `loadIds`               |
| `GetLocationSuggestions` | (already known — autocomplete)    | `query`                                                  |

Once those are nailed down, **add them to `dat-pp-cli/internal/cli/serve.go`**
as new handlers (e.g. `handleTrucks`, `handleContacts`) and update
`site/clovr.html` to call them in `clovrFetchTrucks()`. The wiring is short —
the whole thing is structurally the same as `handleRates`.

## Key reference files

When working in this worktree, future-Claude should consult these files in
the user's broader filesystem (they're *outside* this worktree):

- `C:\Users\aleca\Desktop\dat-cli\dat-pp-cli\internal\cli\rate.go` —
  **GraphQL call pattern.** Shows how to build a `MarketRates` GraphQL POST
  with `Authorization: Bearer <token>` + `client-name: one-dat-com-rates`
  headers, parse the response, and surface clean errors. Same approach
  applies to truck/contact lookups.

- `C:\Users\aleca\Desktop\dat-cli\dat-pp-cli\internal\cli\serve.go` —
  **Daemon HTTP shape.** `handleRates` is the template:
  - reads `{ lanes: [...] }` JSON
  - calls `normalizeEquipment` (CLOVr will need analogous normalizers for
    radius/equip filters)
  - runs lookups concurrently with a semaphore + `sync.WaitGroup`
  - returns `{ rates: { laneID: {spot, contract, ...} } }`
  Copy this verbatim for `handleTrucks` and `handleContacts`.

- `C:\Users\aleca\Desktop\Logistics Suite\Logistics-Suite\site\mass-post.html` —
  **Suite app conventions.** Specifically the Mass Post version on the user's
  local Desktop (this is uncommitted in the main worktree and includes the
  `📦 dat-pp-cli (rate fetcher)` Settings section + the
  `cliCheckAuth`/`cliFetchRates`/`showAuthNeededModal`/`buildAuthBookmarklet`
  helpers we forked into CLOVr). Also see `CLAUDE.md` in
  `C:\Users\aleca\Desktop\Logistics Suite\` for Mass Post's project context.

- `C:\Users\aleca\Desktop\dat-cli\dat-one.har` — **original HAR** from the
  rate-fetcher session. Probably has *some* DAT One posted-truck traffic to
  reference before a fresh CLOVr-specific capture is done — worth grepping
  for `SearchTrucks`, `PostedTrucks`, `GetContacts` first.

## Open questions worth flagging

1. **Auth model — same as Mass Post or separate?** Best guess: same. DAT
   issues one token per user-session, scoped to the user's company account,
   and that token is good for any GraphQL call the DAT One web app can make.
   The single shared token in the dat-pp-cli config file should work for both
   apps simultaneously. *Verify this assumption with the first /trucks call*
   — if DAT returns 403 on truck-board queries even with a valid rate-lookup
   token, we'll need a separate scope/client-id and a second auth flow.

2. **Ranking algorithm for "good options".** What makes a truck a *good
   match* for a given Bay & Bay load?
   - Lane match (origin within X miles, destination within Y miles of the
     truck's stated destination radius)
   - Equipment match (V/R/F → V/R/F, allow VR to satisfy V or R)
   - Recency (truck posted within last 4h scores higher than 24h)
   - Carrier history (have we done business before? in good standing?)
   Ask Alec for his explicit ranking rubric — he's been brokering long
   enough to have strong opinions.

3. **Stack decision.** Mass Post is single-file HTML/vanilla-JS (no build
   step). CLOVr starts the same way (this scaffold is one HTML file). That's
   fine for v1. But CLOVr could grow into territory where React/Solid pays
   off — especially around the match-table being highly interactive (sort,
   filter, multi-select for email blast, drill-down panels). **Plan: stay
   single-file until it hurts; reassess when the table interactivity
   exceeds ~500 lines of imperative DOM code.**

4. **Email blast — generate text vs actually send.** Three plausible modes:
   - **a) Compose-only**: CLOVr drafts the subject + body, opens
     `mailto:carrier1@x.com,carrier2@y.com?subject=...&body=...` and lets
     Outlook do the send. Simplest, no SMTP creds required, but breaks for
     >~50 recipients (mailto URL length limit).
   - **b) Copy-to-clipboard**: CLOVr generates the email body and recipient
     list; user pastes into Outlook themselves. Trivial to build, hands off
     all deliverability concerns.
   - **c) Daemon-side SMTP/SES**: CLOVr POSTs to a new `:53683/blast`
     endpoint, daemon talks to SES (or local SMTP) on the user's behalf.
     Requires creds management. *Only worth doing if Alec wants high-volume
     sends and analytics.*

   Default to (b) for v1 — it's the lowest-friction path and matches the
   "bookmarklet helper" philosophy of the rest of the Suite.

## What's in this scaffold

- `site/clovr.html` — single-file HTML app, copied from Mass Post and
  *aggressively trimmed*. Keeps:
  - Brand candy CSS variables (mint/teal accent instead of cyan/purple)
  - Header structure
  - Settings drawer with: Profile, Grab-DAT-Token bookmarklet, dat-pp-cli
    download links, Daemon Status check
  - `cliCheckAuth` / `cliFetchRates` (kept as a template) / `showAuthNeededModal`
    / `buildAuthBookmarklet` — verbatim from Mass Post
  - Toast
  - Stub `clovrFetchTrucks()` — `console.log`s the TODO and shows a toast

  Removed: Mass Post's Salesforce report URL plumbing, the Rate Lookup
  Formula section, `_bulkRows`/`bulkPasteDATRates`/`bulkApplyFormula`,
  Watt, notifications, tutorials, the cards/days grid.

- `CLAUDE.md` — this file.

## Branch / worktree info

- **Branch**: `clovr-init` (tracks `origin/main`)
- **Worktree path**: `C:\Users\aleca\Desktop\Logistics Suite\Logistics-Suite-clovr`
- **Main worktree**: `C:\Users\aleca` (the user's home dir is the git repo
  root; the live Logistics-Suite editing happens at
  `C:\Users\aleca\Desktop\Logistics Suite\Logistics-Suite\` as **untracked
  files** relative to that repo). Don't try to "clean up" the main worktree
  — it has uncommitted Mass Post `dat-pp-cli` work + `site/dl/` files + a
  `bake-cli.bat` that Alec is mid-iteration on.

- Branch is **not pushed**. Alec will push when he's ready.
