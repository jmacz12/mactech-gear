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

- [x] Static landing page (hero, features, community, gallery, footer)
- [x] Dark rugged outdoor aesthetic + premium polish pass
- [x] Real assets: logo, hero video, 6 feature images
- [x] Amazon product link (ASIN B09GM92D7X)
- [x] Social links (Instagram, Facebook)
- [x] Live Instagram gallery via Behold
- [x] Agent docs + Cursor rules (`AGENTS.md`, `.cursor/rules/`, `docs/`)
- [x] Pushed to GitHub; live on Vercel preview

---

## Current focus

**Polish pass** — typography, spacing, mobile, hero readability, favicon/SEO if missing.

**DNS cutover** — point mactechgear.ca at Vercel when owner is happy with the preview.

---

## Future (optional, not urgent)

- [ ] Favicon + richer Open Graph image
- [ ] Dedicated gallery images (if different from Instagram)
- [ ] Analytics (Plausible / GA) when owner wants traffic data
- [ ] Cancel GoDaddy website builder after DNS is stable

---

## New session — start here

Copy into a fresh Cursor chat:

```
Polish MacTech Gear landing page (mactech-gear).

Read AGENTS.md and docs/ROADMAP.md first.
Preview: https://mactech-gear.vercel.app
Domain pending: mactechgear.ca

Work in my partner style (plain English, proactive polish, local check before push).
Review live site, say what you'd improve, then implement.

Don't change Amazon ASIN or Behold feed URL unless I ask.
Only push when I say so.
```

---

## Maintenance notes

**Preview locally:** `npx serve . -l 3000` → http://localhost:3000

**Swap media:** drop files in `assets/` — see `README.md`

**Instagram feed:** `BEHOLD_FEED_URL` in `script.js`

**Links:** `LINKS` object in `script.js`

**On ship:** prepend `CHANGELOG.md`, update this file if "what's next" changed.
