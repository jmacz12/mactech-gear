# MacTech Gear — roadmap

**Live:** https://mactechgear.ca  
**Open in Cursor:** `C:\Projects\MacTech\website`

**Forward only** — product detail is in **`docs/PRODUCT.md`**; ship history in **`docs/CHANGELOG.md`**.

## Doc map

| File | Purpose |
|------|---------|
| **This file** | What's next, Later, handoff block |
| **`docs/PRODUCT.md`** | What the site is (stack, locks, shipped summary, ops) |
| **`docs/CHANGELOG.md`** | Dated ship log |
| **`docs/ROADMAP-archive.md`** | Old handoffs — search only |
| **`AGENTS.md`** | Agent entry + config locks |
| **`.cursor/rules/`** | Working style |

**On ship:** prepend **CHANGELOG** · refresh **Last ship** + **Current focus** here · update **PRODUCT** if behavior changed.

---

## Last ship

**2026-06-17:** Shop click tracking — Amazon + MacTech buy buttons → Mission Control · live on mactechgear.ca · see **CHANGELOG**

---

## Current focus

**Maintenance mode** — owner happy with site. No urgent product slice until you ask.

### Optional owner tasks (not agent work unless you say go)

- [ ] One **proof order** — real card purchase → confirmation email + shipping address in Stripe Live
- [ ] **Stripe branding** — business name + receipt emails in Dashboard
- [ ] **mactech.app** root DNS on Namecheap (A + www CNAME → Vercel)

**Do not change without asking:** Stripe checkout, returns API, analytics, ASIN / Behold URL · **Hero locked** unless you ask (`AGENTS.md`, **PRODUCT**).

---

## Later (optional, not urgent)

- [ ] **Mission Control hub** — orders + returns in one place (webhook path exists; polish in Mission Control repo)
- [ ] **Shipping tiers** — express vs standard; local pickup
- [ ] **Taxes** — Stripe Tax before scaling volume
- [ ] Hero product still — video poster / slow-connection fallback
- [ ] Dedicated gallery images (if different from Instagram)
- [ ] Retry Namecheap domain transfer (owner deferred)

---

## New session — start here

Copy into a fresh Cursor chat:

```
MacTech Gear — read tools + ROADMAP (+ PRODUCT if scoping). What's next?

Read first (on disk):
- C:\Projects\_tools\OWNER-PLAYBOOK.md
- C:\Projects\_tools\SESSION-START.md
- docs/ROADMAP.md
- docs/CHANGELOG.md (skim newest)
- docs/PRODUCT.md (locks, stack — when scoping)
- AGENTS.md (ASIN / Behold locks)
- C:\Projects\_tools\DESIGN-FAVORITES.md (if UI)
- .cursor/rules/

Repo: C:\Projects\MacTech\website
Live: https://mactechgear.ca

Last ship: 2026-06-17 — shop click tracking (live)
State: maintenance mode — hero LOCKED unless I ask

Local check before push — do not push until I say ship it.
```

---

## Maintenance notes

**Preview:** `npx serve . -l 3000` → http://localhost:3000  
**Checkout API:** `npx vercel dev` + `.env.local`  
**Media / links:** see **PRODUCT → Maintenance**
