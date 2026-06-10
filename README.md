# MacTech Gear â€” Product Landing Page

A free, static recreation of the MacTech product page. No monthly hosting fees.

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

## Customize

- Replace placeholder images in `index.html` with your product photos
- Update Amazon link (`href="https://www.amazon.ca"`) with your real listing URL
- Update social links and email in the footer/community section
- Swap Unsplash hero image in `styles.css` (`.hero` background) with your own
