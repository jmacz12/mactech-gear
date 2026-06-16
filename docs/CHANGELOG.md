# Changelog

Newest first. One line per ship.

## 2026-06-16 (hero morph + visual polish — live)

- Hero shop morph CTA — Shop now morphs in place to Amazon (primary) + MacTech buy links; brand-word emerald accents, rail bloom, whole-link hover grow; Explore the Duffle ghost link with chevron
- Visual polish — emerald glass tokens, CTA hierarchy, feature/gallery/shop-band touches; removed duplicate hero trust pill (shipping stays in shop band + footer) · https://mactechgear.ca

## 2026-06-14 (visual refresh + analytics live)

- Futuristic visual refresh — mactech.app-aligned dark/glass look (Syne typography, emerald accents, glass cards, official MacTech logo); all shop pages including about, privacy, returns, success
- Analytics ops — fixed Vercel env (Mission Control URL + matched secrets); live visitor pings stored in Mission Control · https://mactechgear.ca

## 2026-06-13 (analytics — live)

- Privacy policy at `/privacy` — orders, returns, first-party analytics disclosure; footer link on home + about
- First-party analytics — anonymous session id + page path via `/api/analytics-ping` → Mission Control · https://mactechgear.ca

## 2026-06-13 (About page)

- Shipped founder story at `/about` — polished three-chapter copy (origin, the bag, in use), footer + mission link on homepage, SEO title/meta/canonical

## 2026-06-11 (live payments)

- Flipped MacTech direct shop to Stripe live mode on Vercel — real checkout sessions on mactechgear.ca

## 2026-06-11 (go live — direct shop + returns)

- Re-enabled Buy on MacTech ($119.89 in shop section; hero without price) — flat standard shipping CA/US via Stripe Checkout; customer order confirmation email; polished returns page with live camera photo; footer returns link; success page copy without Stripe branding

## 2026-06-10 (direct shop paused — Amazon only)

- Paused Buy on MacTech buttons while MacTech Stripe account is set up; all shop CTAs back to Amazon only (Stripe API kept in repo for re-enable)

## 2026-06-10 (direct shop — Stripe)

- Shipped Buy on MacTech via Stripe Checkout ($119.89 CAD) — Amazon stays primary; nav Shop Now scrolls to buy section; Canada & US shipping at checkout; 30-day returns copy; order success page

## 2026-06-10 (OG image)

- Shipped dedicated 1200×630 Open Graph image — branded link preview (logo, duffle, “Built to Endure”) when sharing mactechgear.ca on social and messaging apps

## 2026-06-10 (scroll progress + back-to-top)

- Shipped scroll progress bar and back-to-top button — subtle wayfinding on long scroll; respects prefers-reduced-motion

## 2026-06-10 (hero pause/play)

- Shipped hero background video pause/play control — visitors can stop looping motion for readability; respects prefers-reduced-motion (still image first, optional play)

## 2026-06-10 (Instagram lightbox)

- Shipped Instagram gallery lightbox — tap any tile for a larger in-page preview, caption, and “View on Instagram” link; reuses same zoom pattern as feature photos

## 2026-06-10 (product video web file)

- Added compressed 1080p `product.mp4` (~20 MB) so “See it in action” play button works on live; keeps sound and cinematic quality

## 2026-06-10 (product video, mobile hero, rotating highlights)

- Shipped “See it in action” product video section (tap-to-play with sound, above features); mobile hero video with shorter hero height; rotating hero highlight cards (3 benefit sets)

## 2026-06-10 (polish + interactivity + feature photos)

- Shipped Amazon-aligned trust bar, “Good to know” eyebrow, mission copy tweak; smooth scroll with nav offset; tap-to-zoom feature lightbox; refreshed all six feature photos

## 2026-06-10 (premium duffle polish)

- Shipped 40L duffle premium pass: hero specs, mission/features copy, numbered cards, info cards above Instagram, bottom CTA band, footer tagline; removed community section; Amazon remains primary buy path

## 2026-06-10 (pre-launch polish)

- Shipped favicon + SEO (Open Graph, Twitter, canonical), hero/nav/mobile polish, owner product copy on all six features, security pull + unboxing notes; removed returns/shipping until direct shop exists

## 2026-06-10

- Added agent docs: `AGENTS.md`, `.cursor/rules/`, lightweight `docs/ROADMAP.md` + `CHANGELOG.md`

## 2026-06-10 (earlier)

- Shipped real assets (logo, hero video, feature photos), Behold Instagram feed, Amazon/social links, UI polish; pushed to `main`

## Initial

- Static MacTech Gear landing page recreated from GoDaddy site; deployed on Vercel
