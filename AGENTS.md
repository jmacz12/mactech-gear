# MacTech Gear — agent guide

**Owner playbook (all projects):** `C:\Projects\_tools\OWNER-PLAYBOOK.md`  
**New chat consistency:** `C:\Projects\_tools\SESSION-START.md`

Static product landing page (`index.html`, `styles.css`, `script.js`). Deployed on **Vercel**. No framework.

## Doc map (lightweight)

| # | File | Use for |
|---|------|---------|
| 1 | **`docs/ROADMAP.md`** | What's done, what's next, copy-paste for new chats |
| 2 | **`docs/CHANGELOG.md`** | Shipped history — prepend one dated line when we ship |
| 3 | **`C:\Projects\_tools\DESIGN-FAVORITES.md`** | Owner-approved UI patterns (all projects) |
| 4 | **`C:\Projects\_tools\SESSION-START.md`** | Cross-project new-chat consistency |
| 5 | **`.cursor/rules/`** | How to work with the owner (plain English, local-first, polish) |

No archive doc unless ROADMAP handoff blocks get long.

## Owner working style

Read **`.cursor/rules/mactech-gear-core.mdc`** first. Summary:

- **Plain English** — what visitors see, not code jargon (unless asked)
- **Proactive polish** — fix obvious spacing/mobile/hover issues in the same session
- **Local first** — `npx serve . -l 3000` → owner checks → then push only when they say so
- **State clearly** — "Local only (not pushed yet)" vs "Live on Vercel"

## Key config (don't change without asking)

- **Amazon:** `https://www.amazon.ca/dp/B09GM92D7X` — in `script.js` → `LINKS.amazon`
- **Behold Instagram:** `https://feeds.behold.so/wJQrdjRP6Nb3JsYTxNwK` — in `script.js` → `BEHOLD_FEED_URL`
- **Assets:** drop into `assets/` — see `README.md`

## On ship

1. Prepend **`docs/CHANGELOG.md`**
2. Update **`docs/ROADMAP.md`** → "New session — start here" if the next task changed
3. Push only after owner says **push / ship it**

## Preview

```bash
npx serve . -l 3000
```

Open http://localhost:3000
