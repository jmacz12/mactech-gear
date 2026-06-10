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

---

## Current focus

1. **Quick polish slice** — see “Next up” below (~15 min; Amazon-first copy).
2. **Domain transfer (in progress)** — Namecheap paid (order #204950535); watch **johnmacabinguel@gmail.com** for GoDaddy/CIRA approval emails. Do **not** change DNS until transfer completes (~5–7 days). Then set Namecheap DNS → Vercel (same A + CNAME as GoDaddy today).

**Buy path:** ~95% of orders via **Amazon** — site drives to Amazon; direct checkout is a later slice, not urgent.

---

## Next up — quick polish

Small copy/layout tweaks from the premium review (~15 min):

- [ ] **Info cards header** — add eyebrow above Security Pull + Unboxing (e.g. “Good to know” or “Before you buy”)
- [ ] **Trust bar copy** — align with Amazon checkout (ships via Amazon, Amazon return policy, secure checkout on Amazon.ca)
- [ ] **Mission line** — swap “refined by community feedback” (e.g. “refined by real-world use”)
- [ ] **“Explore the Duffle” link** — decide scroll target: `#features` or `#mission`

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

- [ ] Namecheap DNS cutover after transfer completes
- [ ] Dedicated 1200×630 Open Graph image (richer link previews when sharing the site)
- [ ] Hero product still — clean duffle photo as video poster / slow-connection fallback
- [ ] Dedicated gallery images (if different from Instagram)
- [ ] Analytics (Plausible / GA) when owner wants traffic data

---

## New session — start here

Copy into a fresh Cursor chat:

```
MacTech Gear — quick polish slice (Amazon-first).

Read AGENTS.md and docs/ROADMAP.md first.
Live: https://mactechgear.ca (also mactech-gear.vercel.app)

~95% of orders via Amazon — keep Shop / Amazon CTAs primary.
Domain: Namecheap transfer in progress; watch johnmacabinguel@gmail.com.
Don't change DNS until transfer completes.

Next from ROADMAP "Next up — quick polish":
- Info cards eyebrow ("Good to know")
- Trust bar → honest Amazon wording
- Mission line (drop "community feedback")
- Explore the Duffle scroll target

Direct checkout = later, not this slice.
Don't change Amazon ASIN or Behold feed URL unless I ask.
Partner style: plain English, local check before push.
Only push when I say so.
```

---

## Maintenance notes

**Preview locally:** `npx serve . -l 3000` → http://localhost:3000

**Swap media:** drop files in `assets/` — see `README.md`

**Instagram feed:** `BEHOLD_FEED_URL` in `script.js`

**Links:** `LINKS` object in `script.js`

**On ship:** prepend `CHANGELOG.md`, update this file if "what's next" changed.
