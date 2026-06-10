# MacTech Gear — Product Landing Page

A free, static recreation of the MacTech product page. No monthly hosting fees.

**For agents:** see [`AGENTS.md`](AGENTS.md), [`docs/ROADMAP.md`](docs/ROADMAP.md), and [`.cursor/rules/`](.cursor/rules/).

## Preview locally

Open `index.html` in your browser, or run a local server:

```bash
npx serve .
```

## Deploy for free

Pick one â€” all are **$0/month** for a static site like this:

| Platform | Steps |
|----------|-------|
| **Cloudflare Pages** | Push to GitHub â†’ connect repo at [pages.cloudflare.com](https://pages.cloudflare.com) |
| **Vercel** | Push to GitHub â†’ import at [vercel.com](https://vercel.com) |
| **Netlify** | Drag-and-drop the folder at [netlify.com](https://netlify.com) |
| **GitHub Pages** | Push to GitHub â†’ Settings â†’ Pages â†’ deploy from `main` |

## Point your domain (mactechgear.ca)

After deploying, add a custom domain in your host's dashboard and update DNS at your registrar:

- **A record** â†’ your host's IP, or
- **CNAME** â†’ `your-site.pages.dev` (Cloudflare) / `your-site.vercel.app` etc.

Then cancel the GoDaddy website builder â€” you only need the domain (~$15/yr), not the $40/mo builder plan.

## Customize media (easiest way)

Drop your files into `assets/` with these **exact filenames** — no code edits needed:

```
assets/
  logo.png
  video/
    hero.mp4
  images/
    feature-waterproof.png
    feature-valve.png
    feature-capacity.png
    feature-carry.png
    feature-anchor.png
    feature-zippers.png
```

**Tips**
- Hero poster for mobile is auto-captured from `hero.mp4` on load
- Instagram gallery syncs via Behold (configured in `script.js`)
- Logo is the full wordmark — no separate nav text needed

## Instagram auto-feed (recommended: Behold)

**Can the site screenshot Instagram and upload photos?** No — Instagram blocks automated scraping/screenshots, it violates their terms, and the images would break often. There is no reliable way to do that for free.

**The easy alternative:** [Behold](https://behold.so) (free) connects to your Instagram for you — no Meta Developer app needed. New posts show up on your site automatically.

### Setup with Behold (~5 min)

1. **Switch Instagram to Creator or Business** (free, reversible)
   - Instagram app → Settings → Account type → **Creator** or **Business**

2. **Sign up at [behold.so](https://behold.so)** (free account)

3. **Connect `@mactechgear`** as a source (Behold walks you through Instagram login)

4. **Create a JSON feed**
   - Dashboard → Add Feed → type **JSON** → select your Instagram source
   - Copy your feed URL (looks like `https://feeds.behold.so/abc123...`)

5. **Paste the URL in `script.js`**
   ```js
   const BEHOLD_FEED_URL = 'https://feeds.behold.so/your-feed-id';
   ```

6. **Optional — domain lock**
   - In Behold feed settings, whitelist `mactechgear.ca` and `mactech-gear.vercel.app`

7. Push to GitHub → gallery updates automatically when you post on Instagram (Behold refreshes on their schedule, usually within a few hours)

### Fallback options

- **No feed configured** — gallery shows your local product photo fallbacks
- **Meta Developer API** — if you later get access, set `INSTAGRAM_ACCESS_TOKEN` in Vercel (see `.env.example`); the site tries Behold first, then Meta

## Other customization

- **Links** — edit the `LINKS` object at the top of `script.js`
- **Email** — update the trail report mailto in `index.html`
- **Gallery count** — change `data-count="4"` on `#instagram-gallery` in `index.html`
