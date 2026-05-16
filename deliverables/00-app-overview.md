# Load Manager — App Overview

**What it is:** A single-file HTML freight load management app. Reads your Salesforce / Revenova daily loads report, turns it into a triage dashboard, fires your G2G / Driver Details / In Depth emails in batches, and tracks deliveries through pickup, on-site, detention, and delivered.

**App #03 of 7** in the Logistics Suite umbrella.

**Built for:** working freight brokers and dispatchers at small-to-mid brokerages (5-100 people) running Salesforce-based TMS systems like Revenova. Built at Bay & Bay Transportation by a working broker — not a software company.

**What's inside (the actual file)**
- ~5,685 lines of vanilla JS in one HTML
- No build system, no npm, no framework
- All state in `localStorage` — no server, no SaaS bill
- Salesforce report fetched via hidden iframe + session cookie (same trick Mass Post uses)
- Leaflet + MarkerCluster for the Fleet Map
- SheetJS for XLSX parsing
- DeepSeek API for the Kimbo chatbot, Smart Shuffle, and the AI template editor
- OpenWeatherMap for per-load weather badges

**The two modes**
- **Shipping** — your morning. 12 stat tabs (Active, Today, In Transit, Delivering Today, All, Needs Driver, Has Driver, Today Unassigned, On Site, Late, Detention, Confirmed). Card view of every load with one-click email actions.
- **Deliveries** — your afternoon. In Transit / On Site / Delivered Today / Delayed / Detention / Calendar. Late and detention cards expose follow-up emails.

**The signature features**
- **Smart Shuffle** — DeepSeek re-orders the load list so the loads most likely to fall through the floor rise to the top.
- **Batch email sender** — walks through every load that needs a touch, opens each in mailto, advances on click.
- **AI template editor** — paste your sent emails, the model learns your voice, then drafts new templates from a one-line prompt.
- **Fleet Map** — Leaflet view of every active load, origin + destination + driver position when available.
- **Kimbo** — DeepSeek-powered chatbot fed your live load state. Ask: "which loads picking up tomorrow are still missing a driver?"
- **Workflow Benefits modal** — side-by-side legacy-vs-Load-Manager workflow with time savings and an Export PDF button (the ROI slide for your director).

**Brand & tone**
- The app itself renders in Bay & Bay's navy/gold theme (`#0B1120` background, `#C9A96E` accent).
- The Logistics Suite *wrapper* (landing page, tutorials, marketing) is candy pink / cream / purple.
- Tagline: "Built by brokers · for brokers."

**Where it lives**
- Source: `Logistics-Suite/site/load-manager.html`
- Hub: `Logistics-Suite/site/app.html` (tile #3, left-to-right)
- Deployed: `logisticssuitev1.pages.dev` (Cloudflare Pages)
