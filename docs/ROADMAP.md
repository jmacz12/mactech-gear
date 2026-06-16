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
- [x] Privacy policy at `/privacy` — orders, returns, first-party analytics disclosure; footer link
- [x] First-party analytics — anonymous session pings to Mission Control (2026-06-14 live)
- [x] **Unified trust bar (2026-06-16)** — Amazon + direct shop · Canada & US shipping under hero

---

## Current focus

**Shipped (2026-06-16):** Unified trust bar under hero — live on mactechgear.ca (`Amazon + direct shop · Canada & US shipping`). Post-hero polish + hero morph (F008) unchanged.

**Next (when you want it):** Optional owner tasks only — proof order, Stripe receipt branding, **mactech.app** root DNS on Namecheap. No urgent product slice until you ask.

**Do not change without asking:** Stripe checkout, returns API, analytics, ASIN / Behold URL locks (`AGENTS.md`). **Hero is locked** unless you ask.

**Owner:** Namecheap DNS for **mactech.app**; optional proof order; Stripe receipt branding in Dashboard.

### Go-live checklist — done

1. [x] Ship code — Buy on MacTech + returns on mactechgear.ca
2. [x] Smoke test — checkout creates live sessions; test payments in Dashboard
3. [x] Vercel env — `SITE_URL`, shipping cents, `STRIPE_SECRET_KEY` (live)
4. [x] Stripe live key + redeploy
5. [ ] **Optional proof order** — one real card purchase → confirmation email + shipping address in Stripe (Live → Payments)
6. [ ] **Stripe branding** — confirm business name MacTech Gear + receipt emails on (Stripe Dashboard → Settings)

**Owner notification today:** Mission Control order alerts + Stripe Dashboard.

---

## Later (optional, not urgent)

- [ ] **Main control center** — hub for all projects (MacTech Gear, MyLeaguePortal, etc.). **Owner has a plan** — Stripe webhook (or shared API) sends **new orders** and **return requests** into control center; pack & ship from one place. Returns may share `RETURN_TO_EMAIL` / Resend path or webhook only.
- [ ] **Shipping tiers** — express vs standard; local pickup (free) — flat rates for now
- [ ] **Taxes** — Stripe Tax + accountant before scaling live volume
- [ ] **Optional:** Retry Namecheap transfer (owner deferred — OK at GoDaddy)
- [x] DNS → Vercel — **already set at GoDaddy** (mactechgear.ca)
- [ ] **mactech.app root DNS** — A + www CNAME on Namecheap (Vercel project ready)
- [x] Return page polish — done locally (camera UX, copy, layout)
- [ ] Hero product still — clean duffle photo as video poster / slow-connection fallback
- [ ] Dedicated gallery images (if different from Instagram)

---

## New session — start here

Copy into a fresh Cursor chat:

```
MacTech Gear — maintenance mode. Owner happy with site (2026-06-16).

Read first (on disk):
- C:\Projects\_tools\OWNER-PLAYBOOK.md
- C:\Projects\_tools\SESSION-START.md
- C:\Projects\MacTech\website\docs\ROADMAP.md
- C:\Projects\MacTech\website\AGENTS.md (config locks — ASIN / Behold URL)

Repo: C:\Projects\MacTech\website
Live: https://mactechgear.ca

State:
- Live (2026-06-16): trust bar + hero morph + post-hero polish + visual refresh + analytics
- Hero LOCKED unless I ask

No urgent product work. Next portfolio task: doc split — see _tools/DOC-STRUCTURE.md (new chat).
```

---

## Maintenance notes

**Preview page only:** `npx serve . -l 3000` → http://localhost:3000

**Test checkout / returns API:** `npx vercel dev` with `STRIPE_SECRET_KEY` in `.env.local`

**Swap media:** drop files in `assets/` — see `README.md`

**Instagram feed:** `BEHOLD_FEED_URL` in `script.js`

**Links:** `LINKS` object in `script.js`

**On ship:** prepend `CHANGELOG.md`, update this file if "what's next" changed.
