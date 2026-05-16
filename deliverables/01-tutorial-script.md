# Load Manager — Tutorial Script (23 min)

> Two-column rhythm. Left = on-screen action. Right = narration. Recorded at 1920x1080 / 60fps. Voice: broker-to-broker, conversational, no SaaS jargon.

---

## 0:00 — Cold Open (30s)

| On-screen | Narration |
|---|---|
| Tight macro shot of the **Needs Driver** stat tab. A ticker climbs from 4 → 5 → 6. | "It's 7:42 AM." |
| Cut to broker hands opening a laptop. | "You've got six loads picking up today." |
| Tighter on the stat tab — the 6 pulses. | "Four of them still don't have a driver assigned." |
| Beat. Cut to mailto draft in Outlook with a load number typed in. | "The carrier you booked Friday hasn't pushed the truck info. You're about to spend ninety minutes copy-pasting load numbers into emails." |
| Hold beat. | "Or — you could open this." |
| **Reveal:** Load Manager dashboard, Today tab lit up, six cards rendered. | *(beat)* |

**Lower-third:** `7:42 AM. [N] loads. No drivers.` (use real morning numbers if recording captures them)

---

## 0:30 — What is Load Manager (45s)

| On-screen | Narration |
|---|---|
| Pan across the dashboard. | "I'm a freight broker. I built Load Manager for my own desk at Bay & Bay because the TMS we run on — Salesforce / Revenova — is great at storing loads but terrible at telling me which six I need to chase right now." |
| Zoom on the Logistics Suite mark in the corner. | "Load Manager is one HTML file. No login, no SaaS bill, no IT ticket. It reads your morning report straight out of Salesforce and turns it into a triage screen." |
| Cut to the Suite hub `app.html` showing the 7 app tiles. Highlight tile #3. | "It's app number three in a stack of seven I'm shipping under the Logistics Suite brand. Today's tour: end-to-end." |

**Title card:** "Load Manager — EP 03 · Logistics Suite" (held 2.5s)

---

## 1:15 — Pulling today's report from Salesforce (1m45s)

| On-screen | Narration |
|---|---|
| Loader screen. Click the **Settings cog**. | "First time you run it, you'll paste your Salesforce report URL into Settings. Mine's the AA_Modified1 report." |
| Show the URL field. Save. Close settings. | "After that, the app remembers — every morning it's one click." |
| Click **Get Today's Loads**. The truck-progress overlay opens. | "Behind the scenes, it's borrowing your active Salesforce session through an iframe, downloading the XLSX, and parsing it with SheetJS. **Nothing leaves your machine.**" |
| Loader finishes. Name autocomplete appears. Type "Alec". | "Type your name. It matches against the broker column in the report so the templates know who's signing the emails." |
| Click **Continue**. Dashboard reveals. | "Hit Continue." |

---

## 3:00 — The Shipping board: 12 stat tabs (3m30s)

| On-screen | Narration |
|---|---|
| Pan across the stat tabs at the top. | "This is your morning. Top of the screen, twelve stat tabs." |
| Hover each in sequence with a 1s hold. | "Active, Today, In Transit, Delivering Today, All, Needs Driver, Has Driver, Today Unassigned, On Site, Late, Detention, Confirmed." |
| Zoom on the four that matter at 8 AM. | "The four that actually matter at 8 AM: Today, Needs Driver, Today Unassigned, and Late." |
| Click **Needs Driver**. List filters to four loads, each with a red left-border bar. | "Click Needs Driver. Four loads, all picking up today, none have a truck." |
| Click a card. Expands to show the buttons row. | "Watch what happens when I open one. Three buttons here are doing three different jobs." |
| Hover **Driver Details**. | "Driver Details asks the carrier for the driver name, cell, last four of the VIN — the stuff Bay & Bay's safety policy requires before we let the truck roll." |
| Hover **In Depth**. | "In Depth is the full vetting — driver, truck, trailer, ETA, escalation contact — for high-value or high-risk lanes." |
| Hover **G2G**. | "G2G is the green-light email: 'we're good to go, here's the rate con, see you Monday.'" |
| Click 🌙 and 🛣️ on the card. | "Two toggles on every card: the moon is CS On Call — flag this load for the after-hours team. The road is Track & Trace — surface this load to whoever's doing live tracking today." |

**Lower-third per stat tab hover:** "← stat tab" callout in pink

---

## 6:30 — Smart Shuffle + batch G2G emails (2m30s)

| On-screen | Narration |
|---|---|
| Click **✨ Smart Shuffle**. Spinner. | "Smart Shuffle is the only place I let an LLM near my dispatch." |
| List reshuffles in slow-mo. | "DeepSeek reads the current loads and re-orders the list so the ones most likely to fall through the floor are at the top. Behind on a driver detail? Picking up in three hours and no carrier confirmed? Those rise. Confirmed and booked? Those sink." |
| Click **G2G** on the top card. Mailto draft opens with pre-filled body. | "Now I batch. Click G2G — it opens a draft pre-filled with the load number, carrier, lane, ship date, my signature." |
| Show the body. Hit **Open in Email**. Next batch slides in. | "I review, hit Open in Email, the next load slides in. Five loads in maybe two minutes." |
| Close batch sender. | "And when I'm done, the dot on the bell up top tells me which ones bounced back overnight." |

---

## 9:00 — Templates + AI editor (2m30s)

| On-screen | Narration |
|---|---|
| Sidebar → click anywhere a template fires. Then open Template Editor from the kebab menu. | "Four tabs in the template editor." |
| Click **My Style**. | "My Style — paste your real sent emails here. Two or three dozen is enough. The AI learns your voice." |
| Click **G2G / Driver / In Depth**. Scroll the body text. | "G2G, Driver, and In Depth are your default templates." |
| Scroll to the token chip row at the bottom. Click `{load}`, `{lane}`, `{carrier}`. | "Token chips. Load number, carrier, lane, ship date, delivery date, customer name, your name, a smart greeting — all auto-fill from the current load." |
| Click into the AI prompt. Type "make it more urgent, ask about ETA". | "And the AI prompt." |
| Hit **Generate**. DeepSeek rewrites the template. | "DeepSeek rewrites the template in your voice." |
| Hit **Save Template**. | "Save. Done. The next time you click G2G on any card, this is what fires." |

---

## 11:30 — Exempt Carriers (1m30s)

| On-screen | Narration |
|---|---|
| Open Settings → **Manage Exempt Carriers**. | "Some carriers manage their own drivers." |
| Show the seed list (Werner, Knight, Schneider Dedicated, etc.). | "Big assets, dedicated lanes — they're not going to give you a driver name, and you don't need it." |
| Add a carrier from the grid. | "Mark them exempt." |
| Close modal. Return to dashboard. Find an exempt load. | "Their loads now show 'Driver name exempt' in purple, and the Driver Details button disappears from the card." |
| Pan the card actions row. | "One less reflex to suppress." |

---

## 13:00 — Deliveries mode + Calendar (3m)

| On-screen | Narration |
|---|---|
| Click **🚚 Deliveries** at the bottom-left. The board reshapes. | "Same data, different shape." |
| Show the filter chip row. | "In Transit by default. On Site, Delivered Today, Delayed, Detention, Calendar." |
| Click **On Site**. Show a gold-bordered card. | "On Site means the truck has scanned in at the receiver. The clock starts." |
| Cut to a Detention card (red left border). | "If it hits two hours, the card moves to Detention and goes red. There's a 'Check on driver' email pre-loaded with the load number and the receiver address." |
| Click **Delayed**. Show a late card with the pulsing badge. | "Delayed is the late-PU or late-DEL view. The badge pulses so you don't miss it." |
| Click **Calendar**. Month grid with colored dots. | "Calendar is the broker's planning eye." |
| Hover a day with multiple dots. | "Cyan dots are booked loads, gold is shipped, green is delivered, red is late. Click any day, drill in." |
| Click a day → loads for that day render below. | "Same load cards, scoped to the day. Same email actions." |

---

## 16:00 — Fleet Map (2m)

| On-screen | Narration |
|---|---|
| Sidebar → **Fleet Map**. Leaflet renders full-screen. | "This is everyone, on a map, right now." |
| Zoom out to continental US. Show clustered markers. | "Clustered when zoomed out — pop into a region, see the trucks." |
| Zoom into Texas. Cluster expands. | "Click any marker, you get a load card on the left with an Open Load button." |
| Click a marker. Card slides in. Click **Open Load**. Jumps back to the list. | "I use this when a customer calls and asks where their freight is. Pop the map, find the truck, answer with confidence." |

---

## 18:00 — Weather + notifications (1m30s)

| On-screen | Narration |
|---|---|
| Pan back to the Shipping board. Hover a load card with weather badges. | "OpenWeather hits every unique city on the board." |
| Macro on the weather badge. Origin temp, destination temp. | "Origin and destination temps live on the card." |
| Scroll to a card with a severe weather badge (orange or red border). | "Severe weather — high winds, ice, blizzards — pops a colored badge so you know to call the driver." |
| Click the 🔔 bell. Notification panel opens. | "And the bell buzzes for new bookings, status flips, internal notes, missing-driver red flags, and weather warnings." |

---

## 19:30 — Kimbo, the chill load advisor (1m30s)

| On-screen | Narration |
|---|---|
| Click the 🐻 button bottom-left. Kimbo chat opens. | "Kimbo is the DeepSeek chatbot." |
| Type: "Which loads picking up tomorrow are still missing a driver?" Hit Send. | "I trained him to be a chill freight ops sidekick. Ask him: 'which loads picking up tomorrow are still missing a driver?'" |
| Kimbo replies with a list. | "He reads the current state and answers." |
| Beat. Cut to caveat card. | "Don't ask him to book a load — he can't reach into Salesforce. Ask him to *think* with you. Pattern questions, drift, what's-the-risk-on-this-lane." |

---

## 21:00 — Workflow Benefits (1m30s)

| On-screen | Narration |
|---|---|
| Options menu → **Workflow Benefits**. Modal opens. | "This is the part where I justify it to my boss." |
| Scroll the side-by-side workflow viz. | "Legacy workflow on the left: open Salesforce, find the load, open Outlook, copy the load number, paste, type the email, send, back to Salesforce, repeat. Twelve clicks per load." |
| Show the Load Manager side. | "Load Manager on the right: open the card, click G2G, send. Three clicks. Twenty seconds." |
| Show the time savings ticker. | "Across thirty loads, that's the difference between leaving at 6 PM and leaving at 4." |
| Click **Export PDF**. | "And there's an Export PDF button if you need to slide this past a director." |

---

## 22:30 — Outro (30s)

| On-screen | Narration |
|---|---|
| Cut to the Logistics Suite landing page (pink, cream, the sweet side of freight). | "Load Manager is free. It's one HTML file." |
| Pan to the 7-app strip on the hub. | "Logistics Suite is the umbrella — seven apps, sweet side of freight. Link in the description." |
| Hold on the Suite wordmark. | "Built by brokers, for brokers." |
| Beat. Suite mark fade. | "See you in the next one." |

**End card:** Logistics Suite wordmark + URL `logisticssuitev1.pages.dev`. Music swell to silence.

---

## Total runtime
~23:00. Inside the 20-26 minute window.
~3,450 spoken words at 150 wpm.
