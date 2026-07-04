# Mickey Ever After — Links

Custom link-in-bio landing page for **Mickey Ever After**, hosted at
`links.mickeyeverafter.com.br` via Cloudflare Pages.

Replaces the previous `linktr.ee/mickeyeverafter` URL.

## Stack

- Pure static **HTML + CSS + JS** — no build step, no framework, no runtime dependencies
- Cloudflare Pages — global CDN, free SSL, automatic deploys on push to `main`

## Local preview

```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

## Project structure

```
.
├── index.html         # Semantic single-page
├── styles.css         # Design tokens + Disney-themed styles
├── script.js          # Sparkle particles + reduced-motion guard
├── assets/
│   ├── favicon.svg    # 3-circle Mickey-style silhouette (geometric primitive)
│   └── og-image.svg   # 1200×630 social share preview
├── LICENSE
└── README.md
```

## Brand tokens

| Token | Hex | Use |
|---|---|---|
| `--brand-bg` | `#1255a0` | Page background base |
| `--brand-bg-deep` | `#072050` | Gradient end, header text |
| `--brand-accent` | `#c0282a` | Borders, sparkles |
| `--brand-button` | `#e74c3c` | CTA fill |
| `--brand-button-fg` | `#ffffff` | CTA text (18px/600+ for WCAG AA) |
| `--brand-label` | `#2980b9` | Category chip background |
| `--brand-label-fg` | `#FFFFFF` | Category chip text |

## Updating the links

Edit the `<a class="link-card">` elements in `index.html`. Keep this order:

1. **Loja** (storefront) — `mickeyeverafter.com.br`
2. **WhatsApp** — VIP group, direct, catalog
3. **Social** — Instagram, TikTok, X

After editing, commit and push:

```bash
git add index.html
git commit -m "content: update link list"
git push origin main
```

Cloudflare Pages rebuilds automatically. Verify in ~30 s at `links.mickeyeverafter.com.br`.

## Deploy (Cloudflare Pages)

The site is connected to the GitHub repo `mickeyeverafter-links`. Cloudflare Pages
rebuilds and deploys on every push to the default branch.

### Manual DNS (registrar → Cloudflare)

The `mickeyeverafter.com.br` DNS zone is hosted at the **registrar**, not on
Cloudflare. To point `links.mickeyeverafter.com.br` at the Cloudflare Pages
project, add this CNAME record at the registrar's DNS panel:

```
Type:  CNAME
Name:  links
Value: mickeyeverafter-links.pages.dev
TTL:   3600   (or "Auto")
```

After saving, wait for DNS propagation (typically 5–60 minutes). Verify with:

```bash
dig CNAME links.mickeyeverafter.com.br
# Should resolve to mickeyeverafter-links.pages.dev.
```

Once the CNAME resolves, add `links.mickeyeverafter.com.br` as a **Custom
Domain** in the Cloudflare Pages project dashboard. Cloudflare will provision
a Let's Encrypt certificate automatically (≤ ~5 min).

## Trademark note

"Mickey Ever After" is the brand owner's property. Disney, Mickey Mouse, and
related characters and marks are trademarks of The Walt Disney Company; this
project uses only generic geometric primitives (three overlapping circles) and
does not reproduce any Disney intellectual property.

## License

MIT — see [`LICENSE`](./LICENSE).
