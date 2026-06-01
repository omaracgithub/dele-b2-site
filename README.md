# DELE B2 Marketing Site

Marketing website for the DELE B2 exam prep app — [b2.prepdele.com](https://b2.prepdele.com)

## Deployment

Hosted on GitHub Pages with Cloudflare DNS.

### Setup

1. Push to `main` branch on GitHub
2. GitHub Pages serves from root of `main`
3. Cloudflare CNAME: `b2` → `omaracgithub.github.io`

### DNS (Cloudflare)

- Type: CNAME
- Name: `b2`
- Target: `omaracgithub.github.io`
- Proxy: Orange (Proxied) or Grey (DNS only)

### Google Analytics

GA4 Measurement ID: `G-YB13BHW7X5`

## Structure

```
├── index.html              # Homepage (Spanish)
├── en/index.html           # Homepage (English)
├── styles.css              # Global styles
├── analytics.js            # GA4 event tracker
├── smart-link.js           # App Store routing
├── blog/                   # SEO articles (Spanish)
├── en/blog/                # SEO articles (English)
├── modelo-examen/          # Free exam model
├── en/sample-exam/         # Free exam model (English)
├── support/                # FAQ + contact
├── privacy/                # Privacy policy
├── terms/                  # Terms of use
└── screenshots/            # App screenshots
```

## Contact

hello@prepdele.com
