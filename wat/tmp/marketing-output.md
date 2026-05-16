# Mass Post — Marketing output (marketing/trend sub-agent)

## Target viewer profile

- Title: Freight broker, dispatcher, carrier sales rep (1–10 yrs in).
- Where they are: 3PL or brokerage, 5–500 employees, often a Revenova/Salesforce + DAT shop.
- Daily pain: re-typing rates between DAT and Revenova, posting fifty loads manually, eyeballing market rates before every call.
- What they already watch: Freight 360, FreightWaves How-To, DAT's own demo videos, Truckin Hustle, brokerage Slack-shared Loom walkthroughs.
- Click trigger: a specific number on the thumbnail ("50 LOADS. 5 MINUTES.") + the words "Revenova" or "DAT" in the title.
- Watch-time trigger: feeling like the host is a peer, not a vendor. Voice must remain broker-to-broker.

## Trend angle (what's working on freight-YouTube right now, May 2026)

1. **Tool walk-throughs by working brokers** are out-performing slick agency-produced "DAT 101" videos. Authentic > polished.
2. **Time-saved framing** ("from an hour to five minutes") gets clicks; abstract benefits ("efficiency") do not.
3. **DAT One UI demos** are seeing spike volume because of recent Quick Rate Lookup changes — riding that searchable keyword.
4. **Revenova / Salesforce TMS** content is sparse, so any honest tutorial that names the platform pulls niche traffic — high LTV but low volume.
5. **"Built it myself"** narratives travel further on LinkedIn shares than on raw YouTube — cross-post a 60-second teaser there to feed the YouTube algorithm.

This video rides #1, #2, #3, and #4 simultaneously. The hook is built around #2; the title and tags target #3 + #4.

## Title A/B options (5)

> All under 70 chars, all freight-keyworded, all honest.

1. **`50 loads, 5 minutes: posting to DAT without retyping rates`** (chosen — leads with the number, names DAT, includes the pain word "retyping")
2. `How I post 50 loads to DAT from Revenova in under 5 minutes`
3. `The free broker tool that ended my DAT-to-Revenova retyping`
4. `Bulk-post 50 freight loads to DAT (Revenova → DAT in one tab)`
5. `Mass Post: a broker built this so we'd stop retyping rates`

## Description (paste-ready)

**Paragraph 1 (hook for humans + YouTube):**
I'm a freight broker at Bay & Bay, and I got tired of two tabs — Revenova on one, DAT on the other — typing the same rate into both. So I built Mass Post, a single HTML file that pulls my report from Revenova, looks up Quick Rate Lookup rates for fifty lanes at once on DAT, lets me adjust them with a snap-to-$50 stepper, pushes the new rates back to Revenova, and drops a bulk-upload CSV onto DAT. The morning roundtrip went from an hour to five minutes. This is the full tour.

**Paragraph 2 (what's covered):**
We walk through every feature: the Bulk Export modal, the 🔄 Mass Post Helper bookmarklet that scrapes DAT Quick Rate Lookup, the 20× faster dat-pp-cli daemon path, the rate formula (default: Spot minus $150, round down to $50), the Revenova writeback flow, the Watt local helper that flags booked-while-posted conflicts, Post Alone for single-load urgents, Quick Reply for carrier emails, and the gotchas I want you to know before you start.

**Paragraph 3 (the offer):**
Mass Post is free, no signup, no SaaS. It's a single HTML file you open in Chrome — your data lives in your browser, the only thing the app talks to is your own Salesforce session. Built by brokers, for brokers. Link to the Logistics Suite hub below. Questions or feature requests, my number's in the description too.

**Chapter timestamps:**
```
00:00  Cold open — why I built it
00:25  The 24-minute tour
01:25  Chapter 1 · The 60-second tour
03:00  Chapter 2 · Pulling the report from Revenova
04:20  Chapter 3 · The Bulk Export modal
05:45  Chapter 4 · Quick Rate Lookup, 50 lanes at once
08:30  Chapter 5 · The 20× faster path (dat-pp-cli daemon)
10:00  Chapter 6 · Adjusting rates without breaking your spreadsheet brain
12:30  Chapter 7 · Writing back to Revenova
14:00  Chapter 8 · Download CSV → upload to DAT
15:00  Chapter 9 · Express Export — for when you're late
15:35  Chapter 10 · Post Alone — the urgent one
16:35  Chapter 11 · Watt watches the dangerous part
17:45  Chapter 12 · The little settings that pay rent
18:55  Chapter 13 · Gotchas — the stuff I wish I'd told my past self
20:00  Chapter 14 · Quick Reply for carrier emails
20:35  Chapter 15 · A morning with Mass Post
22:00  Outro
```

**Hashtags (footer of description):** `#freightbroker #DAT #Revenova #freight #trucking #logistics`

## Tags (15, prioritized — broad first)

1. freight broker
2. DAT load board
3. freight broker tutorial
4. how to post loads on DAT
5. freight broker software
6. Revenova
7. Salesforce freight TMS
8. DAT Quick Rate Lookup
9. bulk post DAT
10. freight broker tools
11. broker rate negotiation
12. freight technology
13. Mass Post Logistics Suite
14. broker workflow automation
15. Bay and Bay Transportation

## Word-for-word 15-second hook (00:00–00:15)

> "If you've ever had two tabs open — Revenova on one side, DAT on the other — typing the same rate into both, this is for you. I'm Alec, I broker freight at Bay and Bay, and I built this so I'd stop doing that. Fifty loads, five minutes, no retyping. Let me show you."

(Word count: 49. Spoken pace: ~3.3 words/sec — lands at ~14.8 s.)

## Why this hook works

- Opens with a concrete shared experience ("two tabs open"), not a feature.
- Names both platforms (Revenova, DAT) within the first 8 seconds — keyword density + viewer self-identification.
- "Fifty loads, five minutes" anchors the value before the viewer can bounce.
- Ends on "let me show you" — directly cues a watch commitment.

## A/B testing plan

- Week 1: ship with title #1 + thumbnail v1 (current SVG).
- After 48 h: if CTR < 5%, A/B swap to title #3 (more pain-framed).
- If CTR > 7% and retention dips before 02:00, the hook is fine but the chapter-1 pacing isn't — re-cut chapter 1 with more cursor motion.

## Recommended YouTube settings

- Category: **Science & Technology** (best fit for tool walk-throughs; Education would also work but underperforms for this niche).
- Visibility: Public.
- Made for kids: No.
- Comments: On, hold potentially inappropriate for review.
- License: Standard YouTube License (single-file HTML is on Logistics Suite hub for distribution — link only).
- End screen: 20 s — left card: subscribe; right card: "Next: Bolt Post (Episode 02)".
- Cards: 1 card at 05:45 pointing to the Logistics Suite hub.
- Playlist: "Logistics Suite — the seven-app tour".
- Default audience tag: Industry-specific (Trucking / Logistics).
