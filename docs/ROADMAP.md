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

---

## Current focus

1. **Product video file** — `assets/video/4k_Final.mp4` is ~187 MB; GitHub max is 100 MB. Export a **1080p web MP4** (~15–30 MB), drop in `assets/video/`, update `PRODUCT_VIDEO_SRC` in `script.js` if renamed, then push. Until then, play button on live site won’t load the file.
2. **Pick next optional slice** — see “Next up” below (Instagram lightbox is the easy win).
3. **Domain — staying at GoDaddy** — DNS → Vercel already set. Confirm GoDaddy billing is **domain-only** (no monthly Website Builder).

**Buy path:** ~95% of orders via **Amazon** — site drives to Amazon; direct checkout is a later slice, not urgent.

---

## Next up

Pick one optional slice when ready:

| Priority | Slice | What visitors get |
|----------|--------|-------------------|
| **Easy win** | Instagram lightbox | Tap gallery tile → larger preview in-page |
| **Accessibility** | Hero pause/play | Less motion; user control over hero video |
| **Polish** | Scroll progress / back-to-top | Subtle wayfinding on long scroll |
| **Optional** | Dedicated OG image (1200×630) | Richer previews when sharing the link |
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
MacTech Gear — pick next slice (or add compressed product video).

Read AGENTS.md and docs/ROADMAP.md first.
Live: https://mactechgear.ca (also mactech-gear.vercel.app)

Last shipped: product video section (above features), mobile hero video + shorter hero, rotating hero highlights (40L/100%/Dual + 2 more sets).

Pending asset: compress 4k_Final.mp4 to ~15–30 MB web MP4 (GitHub 100 MB limit) — section is live but play won’t work until file is pushed.

Next optional (pick one):
- Compress + push product video
- Instagram lightbox (tap gallery tile → larger preview)
- Hero pause/play (accessibility)
- Scroll progress / back-to-top
- Dedicated OG image (1200×630)
- Analytics (Plausible / GA)

Domain: staying at GoDaddy. DNS → Vercel already set. Confirm domain-only billing (no Website Builder).

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
