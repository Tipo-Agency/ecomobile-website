# ECOMOBILE — new design (branch `redesign-static`)

A complete, redesigned, **multi-page** marketing site for the new ECOMOBILE
passenger line — **BARLAS** (sedan) and **NAYMAN** (SUV) — built around battery
swap / Battery-as-a-Service.

This branch adds a **standalone static build** (`index.html` + `public/`). It does
**not** touch the existing Next.js app on `main`.

## What's inside
Single-file React app (React 18 + Framer Motion + Tailwind via CDN, no build step)
with a hash router. Pages:

- `#/` — Home (hero with real BARLAS + interactive cursor field, models & pricing, why, battery swap, ecosystem, open platform, taxi market, network map, energy, CTA)
- `#/barlas`, `#/nayman` — vehicle pages (gallery, specs, pricing/trims)
- `#/swap` — Battery swap & BaaS + station network + energy
- `#/news` — newsroom
- `#/faq` — FAQ
- `#/investors` — investor relations (problem/solution, roadmap)
- `#/contacts` — contact (sales / partners / investors) + form

Design: light, premium (Polestar / Apple / Lucid direction). Real logo + favicon +
spinning logomark loader. Real photography from `public/images/`. Languages EN/RU/UZ
on the home page; inner pages currently EN.

Models & pricing: BARLAS Comfort 259 999 000 / Max 279 999 000 сум;
NAYMAN Comfort 289 999 000 / Max 319 999 000 сум.

## Run / preview
Any static server, e.g.:
```bash
npx serve .            # then open the printed URL
# or
python3 -m http.server 8080
```
Open `http://localhost:8080/` (or `/index.html`).

## Deploy
Drop `index.html` + `public/` on any static host (Netlify / Vercel / Cloudflare
Pages / Apache). No build required.

## Next step
Port this design into the existing Next.js app (`main`) for production SSR/SEO,
or ship this static build as-is.
