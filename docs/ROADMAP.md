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

---

## Current focus

Pick next optional polish slice when ready (OG image, analytics).

**Source video:** keep `4k_Final.mp4` locally for re-exports; site uses `product.mp4`.

**Buy path:** ~95% of orders via **Amazon** — site drives to Amazon; direct checkout is a later slice, not urgent.

---

## Next up

Pick one optional slice when ready:

| Priority | Slice | What visitors get |
|----------|--------|-------------------|
| ~~Done~~ | ~~Scroll progress / back-to-top~~ | ~~Shipped~~ |
| **Recommended** | Dedicated OG image (1200×630) | Richer previews when sharing the link on social |
| **Optional** | Analytics (Plausible / GA) | Traffic data when owner wants it |

**Probably later:** direct checkout on site, 360° spin, size/spec picker — see sections below.

---

## Later — direct checkout on site

Owner may add **buy on mactechgear.ca** someday; **Amazon stays primary** until then (~95% of orders today).

**Plan when ready (separate slice — needs owner decisions):**

- [ ] Pick checkout provider (Stripe Checkout, Shopify Lite, Snipcart, etc.)
- [ ] Pricing, shipping zones (Canada-first?), returns policy copy
- [ ] Product flow: landing page + “Buy now” vs Amazon, or dedicated `/shop`
- [ ] Trust bar + footer updates once *you* own fulfillment
- [ ] Tax / business setup (owner — not a code task)

**Keep for now:** Amazon link stays primary. Don’t remove ASIN without owner saying so.

---

## Later (optional, not urgent)

- [ ] **Optional:** Retry Namecheap transfer (owner deferred — OK at GoDaddy)
- [x] DNS → Vercel — **already set at GoDaddy** (no Namecheap cutover needed)
- [ ] Dedicated 1200×630 Open Graph image (richer link previews when sharing the site)
- [ ] Hero product still — clean duffle photo as video poster / slow-connection fallback
- [ ] Dedicated gallery images (if different from Instagram)
- [ ] Analytics (Plausible / GA) when owner wants traffic data

---

## New session — start here

Copy into a fresh Cursor chat:

```
MacTech Gear — pick next polish slice.

Read AGENTS.md and docs/ROADMAP.md first.
Live: https://mactechgear.ca (also mactech-gear.vercel.app)

Last shipped: Scroll progress + back-to-top (green progress line, arrow button after hero).

Pick one when ready:
- Dedicated OG image (1200×630)
- Analytics (Plausible / GA)

Domain: GoDaddy domain-only (confirmed). DNS → Vercel set.

~95% of orders via Amazon — keep Shop / Amazon CTAs primary.
Direct checkout = later. Don't change Amazon ASIN or Behold feed URL unless I ask.

Partner style: plain English, local check before push. Only push when I say so.
```

---

## Maintenance notes

**Preview locally:** `npx serve . -l 3000` → http://localhost:3000

**Swap media:** drop files in `assets/` — see `README.md`

**Instagram feed:** `BEHOLD_FEED_URL` in `script.js`

**Links:** `LINKS` object in `script.js`

**On ship:** prepend `CHANGELOG.md`, update this file if "what's next" changed.
