# Mass Post — Marketing (final)

## Chosen title

**`50 loads, 5 minutes: posting to DAT without retyping rates`**

(63 characters. Leads with the number, names DAT, includes pain word "retyping".)

## Title alternates (in priority order, in case CTR underperforms)

1. `How I post 50 loads to DAT from Revenova in under 5 minutes`
2. `The free broker tool that ended my DAT-to-Revenova retyping`
3. `Bulk-post 50 freight loads to DAT (Revenova → DAT in one tab)`
4. `Mass Post: a broker built this so we'd stop retyping rates`

## Description (paste-ready)

I'm a freight broker at Bay & Bay, and I got tired of two tabs — Revenova on one, DAT on the other — typing the same rate into both. So I built Mass Post, a single HTML file that pulls my report from Revenova, looks up Quick Rate Lookup rates for fifty lanes at once on DAT, lets me adjust them with a snap-to-$50 stepper, pushes the new rates back to Revenova, and drops a bulk-upload CSV onto DAT. The morning roundtrip went from an hour to about five minutes when the local helper is running, fifteen when it isn't. This is the full tour.

We walk through every feature: the Bulk Export modal, the 🔄 Mass Post Helper bookmarklet that scrapes DAT Quick Rate Lookup, the 20× faster dat-pp-cli daemon path, the rate formula (default: Spot minus $150, round down to $50), the Revenova writeback flow, the Watt local helper that flags booked-while-posted conflicts, Post Alone for single-load urgents, Quick Reply for carrier emails, and the gotchas I want you to know before you start.

Mass Post is free, no signup, no SaaS. It's a single HTML file you open in Chrome — your data lives in your browser, the only thing the app talks to is your own Salesforce session. Built by brokers, for brokers. Link to the Logistics Suite hub below. Questions or feature requests, my number's in the description too.

— Logistics Suite hub: [LINK PLACEHOLDER — paste hub URL]
— Contact: [PHONE PLACEHOLDER — (612) 836-4075 or whatever Alec wants public]

**Chapters**
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

**Hashtags (footer)**: `#freightbroker #DAT #Revenova #freight #trucking #logistics`

## Tags (15, prioritized)

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

> "If you've ever had two tabs open — Revenova on one, DAT on the other — typing the same rate into both, this is for you. I'm Alec, I broker freight at Bay and Bay, and I built this to stop doing that. Fifty loads, five minutes — with the local helper running. No retyping. Let me show you."

(50 words, ~3.3 wps → ~15.0 s.)

## Trend angle

Working on freight-YouTube in May 2026:
1. Working-broker tool walk-throughs beat agency-produced "DAT 101" content. Authentic > polished.
2. Time-saved framing ("from an hour to five minutes") earns clicks; abstract benefits do not.
3. DAT One Quick Rate Lookup demos are spiking in search volume.
4. Revenova / Salesforce TMS content is sparse — niche, high-LTV traffic.

This video rides all four. Cross-post a 60-second teaser to LinkedIn the same day for an algorithmic feed boost.

## YouTube settings checklist

- Category: **Science & Technology** (A/B with **Education** in week 2 if CTR is soft)
- Visibility: **Public**
- Made for kids: **No**
- Comments: **On**, hold potentially inappropriate for review
- License: **Standard YouTube License**
- End screen: 20 s — left card: subscribe; right card: "Next: Bolt Post (Episode 02)"
- Cards: 1 card at 05:45 pointing to Logistics Suite hub
- Playlist: **Logistics Suite — the seven-app tour**
- Default audience tag: Industry-specific (Trucking / Logistics)

## A/B testing plan

- **Day 1**: ship with title #1 + thumbnail v1.
- **48 h**: if CTR < 5%, swap to title #2 (more pain-framed).
- **96 h**: if retention dips before 02:00, re-cut chapter 1 tighter; do not change title.
- **Week 2**: if CTR still soft, swap category to Education.
