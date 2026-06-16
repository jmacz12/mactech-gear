# MacTech Gear — product reference

**Live:** https://mactechgear.ca  
**Open in Cursor:** `C:\Projects\MacTech\website`

**Plain English:** What this site *is* — not what's next (see **ROADMAP**) and not every ship date (see **CHANGELOG**).

---

## Doc map

| File | Purpose |
|------|---------|
| **`docs/ROADMAP.md`** | What's next, Later, **New session — start here** |
| **`docs/CHANGELOG.md`** | Dated ship log (newest first) |
| **This file** | Product purpose, stack, locks, shipped summary, ops |
| **`AGENTS.md`** | Agent entry + config locks |
| **`.cursor/rules/`** | Working style |

---

## What it is

**MacTech Gear** is a **static product landing page** for the rugged outdoor duffle bag — hero video, feature gallery, Instagram feed, **Amazon** primary purchase link, and **direct shop** via Stripe Checkout (secondary). Returns flow, About, and Privacy are first-party pages on the same site.

**Company showcase** (portfolio one-pager) lives separately at **https://mactech.app** (Mission Control repo `/showcase`).

---

## Stack & integrations

| Layer | Choice |
|-------|--------|
| **Site** | Static HTML/CSS/JS (`index.html`, `styles.css`, `script.js`) |
| **Hosting** | Vercel |
| **Payments** | Stripe Checkout (`/api/create-checkout-session`) |
| **Returns** | `/returns` + API route |
| **Instagram** | Behold feed embed |
| **Analytics** | First-party pings → Mission Control (`/api/analytics-ping`) |
| **Orders** | Stripe webhook → Mission Control (pack & ship hub) |

**Preview:** `npx serve . -l 3000` (static pages only)  
**Checkout API locally:** `npx vercel dev` with `STRIPE_SECRET_KEY` in `.env.local`

---

## Locked decisions (do not change without owner)

| Item | Value / rule |
|------|----------------|
| **Amazon ASIN** | `B09GM92D7X` — `script.js` → `LINKS.amazon` |
| **Behold feed** | `https://feeds.behold.so/wJQrdjRP6Nb3JsYTxNwK` — `BEHOLD_FEED_URL` |
| **Hero** | **Locked** unless owner asks (morph CTA, video, morph shop links) |
| **Stripe / returns / analytics** | Do not change without asking |
| **Amazon primary, MacTech direct secondary** | Product positioning unchanged |

---

## Shipped phases (summary)

High-level only — detail in **CHANGELOG**.

| Area | Status | Notes |
|------|--------|-------|
| **Landing + brand** | Shipped | Dark outdoor aesthetic, Syne typography, emerald glass tokens |
| **Hero** | Shipped | Video, pause/play, morph shop CTA (Amazon + MacTech), rotating highlight cards |
| **Features + gallery** | Shipped | 6 feature photos, lightbox, Instagram via Behold + tile lightbox |
| **Shop** | Shipped | Stripe Checkout live; flat CA/US shipping; trust bar under hero |
| **About / Privacy / Returns** | Shipped | `/about`, `/privacy`, `/returns` polished |
| **Analytics** | Shipped | Anonymous session pings to Mission Control |
| **Trust bar** | Shipped 2026-06-16 | Amazon + direct shop · Canada & US shipping |

---

## Go-live checklist (reference)

| Step | Status |
|------|--------|
| Buy on MacTech + returns on mactechgear.ca | Done |
| Smoke test checkout (live sessions) | Done |
| Vercel env (`SITE_URL`, shipping, `STRIPE_SECRET_KEY`) | Done |
| Stripe live key + redeploy | Done |
| **Optional:** one proof order (card → confirmation + address in Stripe) | Owner |
| **Optional:** Stripe receipt branding (Dashboard → Settings) | Owner |
| **Optional:** mactech.app root DNS on Namecheap | Owner |

**Owner notifications today:** Mission Control order alerts + Stripe Dashboard.

---

## Maintenance (agents)

| Task | Where |
|------|--------|
| Swap images/video | `assets/` — see `README.md` |
| Social / Amazon links | `LINKS` in `script.js` |
| Instagram feed URL | `BEHOLD_FEED_URL` in `script.js` |
| On ship | Prepend **CHANGELOG**; update **ROADMAP** if focus changed; **PRODUCT** if behavior/locks changed |

---

*What's next → `docs/ROADMAP.md` · Ship history → `docs/CHANGELOG.md`*
