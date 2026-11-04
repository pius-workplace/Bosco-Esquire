<<<<<<< HEAD
# Bosco Esquire — Website (React prototype)

A full storefront prototype for boscoesquire.com, built by Piusdenis Tech.

## Run it

```bash
npm install
npm run dev        # local development at http://localhost:5173
npm run build      # production build into /dist
npm run preview    # serve the build
npm run typecheck  # TypeScript check
```

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (brand colours from the current boscoesquire.com in `src/index.css`)
- GSAP + ScrollTrigger (scroll animation), Lenis (smooth scrolling, desktop only)
- Three.js via @react-three/fiber + drei (3D honey jar, 360° shop viewer)
- React Router (HashRouter, so the build runs from any folder or static host)

## What's inside

| Page | Route |
| --- | --- |
| Home: video hero, categories, best sellers, why buy from us, 3D jar, hive-to-hand story, testimonials, Atelier, 360° teaser, journal, trade | `#/` |
| Shop with collection, category, search and sort | `#/shop` |
| Product page with sizes, gallery, 3D view (honey), WhatsApp ordering | `#/product/:slug` |
| About Us, mission, vision, why choose us | `#/about` |
| 360° virtual visit of the Imaara Mall shop | `#/visit` |
| Journal and articles with shoppable products | `#/journal` |
| Trade & corporate gifting quote builder | `#/trade` |
| Checkout with M-Pesa STK Push simulation | `#/checkout` |

## Content and data

- **Catalogue**: `src/data/products.ts` — 47 products from the shop, the August 2026 price list and the WhatsApp catalogue. Items with `confirm: true` have prices that differ between sources.
- **Testimonials, reasons, journal**: `src/data/content.ts` (testimonials are the real ones published on boscoesquire.com).
- **360° hotspots**: `src/data/tour.ts`.
- **Photos**: `public/img/products` are Bosco's own photos from boscoesquire.com. `public/img/wa` are crops from the WhatsApp catalogue (low resolution, replace after the photo shoot). `public/img/cut` are background-removed product cutouts.
- **Bee photos** (credited in the footer): "Bee October 2007-1" by Alvesgaspar, CC BY-SA 3.0; "European honeybees in a hive" by CSIRO, CC BY 3.0 — both via Wikimedia Commons.

## Before launch (needs Bosco)

1. Confirm prices where sources disagree (wines, body butters, candles) and prices for macadamia and Chilli Kick Snackers.
2. Product photo shoot for items still showing the branded tile.
3. A real 360° photo of the Imaara Mall shop: replace `public/img/tour-preview.jpg` (2:1 equirectangular) and update `src/data/tour.ts`.
4. Delivery zones and fees (placeholders in `src/pages/Checkout.tsx`).
5. TikTok handle (`src/components/Icons.tsx`), Google Business Profile link.
6. Batch numbers and lab results for the Proof of Purity panel.

## Next phase (backend)

Orders, stock, M-Pesa Daraja (STK Push + callback), admin dashboard, email/WhatsApp notifications. For production SEO, move to Next.js or switch to `BrowserRouter` with server rewrites.
=======
# Bosco-Esquire
Selling organic Products
>>>>>>> d50f078435284b2abb4f187ad4d52731b60b22eb
