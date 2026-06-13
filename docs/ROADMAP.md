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
- [x] About page — founder story at `/about`; footer + mission link; SEO canonical

---

## Current focus

**Recommended next:** optional outdoor photo on About when you have one — or hero product still (clean duffle poster / slow-connection fallback). Control center wiring stays in Mission Control repo when ready.

### Go-live checklist — done

1. [x] Ship code — Buy on MacTech + returns on mactechgear.ca
2. [x] Smoke test — checkout creates live sessions; test payments in Dashboard
3. [x] Vercel env — `SITE_URL`, shipping cents, `STRIPE_SECRET_KEY` (live)
4. [x] Stripe live key + redeploy
5. [ ] **Optional proof order** — one real card purchase → confirmation email + shipping address in Stripe (Live → Payments)
6. [ ] **Stripe branding** — confirm business name MacTech Gear + receipt emails on (if not done during setup)

**Owner notification today:** Stripe Dashboard until control center is wired.

---

## Later (optional, not urgent)

- [ ] **Main control center** — hub for all projects (MacTech Gear, MyLeaguePortal, etc.). **Owner has a plan** — Stripe webhook (or shared API) sends **new orders** and **return requests** into control center; pack & ship from one place. Returns may share `RETURN_TO_EMAIL` / Resend path or webhook only.
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
MacTech Gear — pick next polish slice.

Read AGENTS.md and docs/ROADMAP.md first.
Live: https://mactechgear.ca (real Stripe payments on)

Last shipped (2026-06-13): About page at /about — founder story, footer + mission link.

Options (owner picks one):
- Drop an outdoor photo into assets/ → add to About page
- Hero product still — clean duffle photo as video poster / slow-connection fallback
- Analytics (Plausible / GA) when owner wants traffic data

Don't change Amazon ASIN or Behold feed URL unless I ask.
Partner style: plain English, one slice at a time. Local first — only push when I say ship it.
```

---

## Maintenance notes

**Preview page only:** `npx serve . -l 3000` → http://localhost:3000

**Test checkout / returns API:** `npx vercel dev` with `STRIPE_SECRET_KEY` in `.env.local`

**Swap media:** drop files in `assets/` — see `README.md`

**Instagram feed:** `BEHOLD_FEED_URL` in `script.js`

**Links:** `LINKS` object in `script.js`

**On ship:** prepend `CHANGELOG.md`, update this file if "what's next" changed.
