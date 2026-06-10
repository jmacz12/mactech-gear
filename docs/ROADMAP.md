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

Direct shop is **live** (Stripe key in Vercel). Test checkout with test key before real orders.

Amazon stays **primary**; **Buy on MacTech** is secondary ($119.89 CAD + shipping at checkout).

**Optional next:** analytics (Plausible / GA).

---

## Later (optional, not urgent)

- [ ] **Optional:** Retry Namecheap transfer (owner deferred — OK at GoDaddy)
- [x] DNS → Vercel — **already set at GoDaddy** (no Namecheap cutover needed)
- [x] Dedicated 1200×630 Open Graph image (richer link previews when sharing the site)
- [ ] Hero product still — clean duffle photo as video poster / slow-connection fallback
- [ ] Dedicated gallery images (if different from Instagram)
- [ ] Analytics (Plausible / GA) when owner wants traffic data

---

## New session — start here

Copy into a fresh Cursor chat:

```
MacTech Gear — what's next?

Read AGENTS.md and docs/ROADMAP.md first.
Live: https://mactechgear.ca

Last shipped: Direct shop (Stripe Checkout — Buy on MacTech; Amazon primary).

Optional: Analytics (Plausible / GA).

Don't change Amazon ASIN or Behold feed URL unless I ask.
Partner style: plain English, local check before push. Only push when I say so.
```

---

## Maintenance notes

**Preview locally:** `npx serve . -l 3000` → http://localhost:3000

**Swap media:** drop files in `assets/` — see `README.md`

**Instagram feed:** `BEHOLD_FEED_URL` in `script.js`

**Links:** `LINKS` object in `script.js`

**On ship:** prepend `CHANGELOG.md`, update this file if "what's next" changed.
