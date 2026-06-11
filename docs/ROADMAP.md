# MacTech Gear — roadmap

Simple landing page for **mactechgear.ca**. Static HTML on Vercel.

## Doc map

| File | Purpose |
|------|---------|
| **This file** | What's done / what's next |
| **`CHANGELOG.md`** | Dated ship log |
| **`AGENTS.md`** | Agent entry + config locks |
| **`.cursor/rules/`** | Working style |

---

## Shipped (past)

- [x] Static landing page (hero, features, gallery, footer)
- [x] Dark rugged outdoor aesthetic + premium polish pass
- [x] Real assets: logo, hero video, 6 feature images
- [x] Amazon product link (ASIN B09GM92D7X)
- [x] Social links (Instagram, Facebook)
- [x] Live Instagram gallery via Behold
- [x] Agent docs + Cursor rules (`AGENTS.md`, `.cursor/rules/`, `docs/`)
- [x] Pushed to GitHub; live on Vercel preview
- [x] Pre-launch polish: favicon, SEO meta, hero/nav/mobile fixes
- [x] Owner product copy (6 features, security pull, unboxing note)
- [x] **mactechgear.ca** live on Vercel (DNS working)
- [x] Premium duffle polish (hero specs, numbered features, info cards, CTA band; community section removed)
- [x] Quick polish (Amazon trust bar, Good to know eyebrow, mission copy)
- [x] Interactivity (smooth scroll + feature lightbox)
- [x] Updated 6 feature photos
- [x] Product video section (“See it in action”, above features, tap-to-play)
- [x] Mobile hero video + shorter mobile hero height
- [x] Rotating hero highlight cards (3 benefit sets)

- [x] Product video web file (`product.mp4`, 1080p ~20 MB)
- [x] Instagram gallery lightbox (tap tile → larger preview + link to post)
- [x] Hero pause/play (stop looping hero video; prefers-reduced-motion)
- [x] Scroll progress / back-to-top (subtle wayfinding on long scroll)
- [x] Dedicated OG image (1200×630 link preview for social sharing)
- [x] Direct shop via Stripe Checkout (Amazon primary; MacTech secondary)

---

## Current focus

**Session 1: Go live** — code **shipped** 2026-06-11. Finish checklist below before real money.

### Go-live checklist (this session)

Do these in order — one slice at a time:

1. [x] **Ship code** — Buy on MacTech + return page on mactechgear.ca
2. [ ] **Smoke test on live (test mode)** — Buy on MacTech → MacTech Gear at checkout → order confirmed → footer returns page
3. [ ] **Vercel env audit** — `SITE_URL=https://mactechgear.ca`, `SHIPPING_CA_CENTS`, `SHIPPING_US_CENTS` (`PRODUCT_PRICE_CENTS=11989` optional; defaults in code)
4. [ ] **Stripe Dashboard** — public business name = MacTech Gear (not MyLeaguePortal); customer receipt emails on
5. [ ] **Flip to live payments** — swap `STRIPE_SECRET_KEY` to `sk_live_…` → redeploy → one real order when ready
6. [ ] **Fulfillment** — Stripe → Payments shows shipping address + phone

**Not in go-live slice:** taxes (Stripe Tax + accountant), express/local shipping tiers, control center wiring, analytics.

**Owner notification today:** no site-built order alert yet — use Stripe Dashboard (or Stripe Settings → Notifications) until control center is wired.

**Session 2 (after live): Control center** — owner has a plan: MacTech orders + return emails feed the **main control center for all apps** (not a one-off inbox ping). Bring architecture/repo details in that chat.

---

## Later (optional, not urgent)

- [ ] **Main control center** — hub for all projects (MacTech Gear, MyLeaguePortal, etc.). **Owner has a plan** — next session after go-live: Stripe webhook (or shared API) sends **new orders** and **return requests** into control center; pack & ship from one place. Returns may share `RETURN_TO_EMAIL` / Resend path or webhook only.
- [ ] **Shipping tiers** — express vs standard; local pickup (free) — flat rates for now
- [ ] **Taxes** — Stripe Tax + accountant before scaling live volume
- [ ] **Optional:** Retry Namecheap transfer (owner deferred — OK at GoDaddy)
- [x] DNS → Vercel — **already set at GoDaddy**
- [x] Return page polish — done locally (camera UX, copy, layout)
- [ ] Hero product still — clean duffle photo as video poster / slow-connection fallback
- [ ] Dedicated gallery images (if different from Instagram)
- [ ] Analytics (Plausible / GA) when owner wants traffic data

---

## New session — start here

Copy into a fresh Cursor chat:

```
MacTech Gear — wire orders to control center.

Read AGENTS.md and docs/ROADMAP.md first.
Live: https://mactechgear.ca

Last shipped (2026-06-11): Buy on MacTech re-enabled + returns page + flat CA/US shipping.

This chat — control center:
- I have a plan for emails/orders across all my apps
- MacTech Stripe orders + returns should feed the main control center (not a standalone email-only hack)
- Bring control center repo/API details in this session

Don't change Amazon ASIN or Behold feed URL unless I ask.
Partner style: plain English, one slice at a time. Only push when I say ship it.
```

---

## Maintenance notes

**Preview page only:** `npx serve . -l 3000` → http://localhost:3000

**Test checkout / returns API:** `npx vercel dev` with `STRIPE_SECRET_KEY` in `.env.local`

**Swap media:** drop files in `assets/` — see `README.md`

**Instagram feed:** `BEHOLD_FEED_URL` in `script.js`

**Links:** `LINKS` object in `script.js`

**On ship:** prepend `CHANGELOG.md`, update this file if "what's next" changed.
