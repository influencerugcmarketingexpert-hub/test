# The Jacket Studio — Landing Page

A static, responsive landing page for a fictional handcrafted leather-jacket brand called **The Jacket Studio**. Built with plain HTML5, CSS3, and vanilla JavaScript — no build tools, no frameworks, no npm.

## How to view

Open `index.html` directly in any modern browser by double-clicking it, or serve the directory locally for the cleanest experience:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Sections

1. **Announcement bar** — free shipping / returns promo strip
2. **Header / Navigation** — sticky header, text logo, primary nav, search / account / wishlist / cart icons, mobile hamburger drawer
3. **Hero** — full-bleed image, gradient overlay, headline, and two CTAs
4. **Shop by Category** — 4-card grid (Biker, Bomber, Trench, Shearling) with hover zoom
5. **Bestsellers** — 8-item responsive product grid with hover "Add to Cart"
6. **Promo banner** — split image / text "Handcrafted Since Day One" block
7. **New Arrivals** — horizontal snap-scroll carousel with prev / next controls
8. **Testimonials** — three 5-star customer quotes
9. **Instagram / Lookbook** — 6-tile image grid
10. **Newsletter** — dark "Join The Studio" sign-up with inline success message
11. **Footer** — 4-column info grid, social icons, copyright, and payment method labels

## File structure

```
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── README.md
```

## JavaScript behaviors

- Sticky-header shadow on scroll
- Mobile drawer toggle (with Escape key + resize + link-tap closing)
- Newsletter form: email validation, prevents default, shows inline thank-you message
- New Arrivals carousel: prev / next buttons use `scrollBy` with snap-to-start
- `IntersectionObserver`-based fade-in for sections (respects `prefers-reduced-motion`)

## Images

All imagery is **hotlinked from [Unsplash](https://unsplash.com)** for demo purposes only. Before any production use you should:

- Replace each `images.unsplash.com/...` URL with your own licensed or owned assets
- Serve images from your own CDN for performance and reliability
- Provide appropriate `alt` text (placeholders are included)

## Design notes

- **Palette:** off-white background (`#faf8f5`), deep charcoal ink (`#1a1a1a`), warm cognac accent (`#8b5a2b`)
- **Type pairing:** Playfair Display (serif) for headings + Inter (sans-serif) for body, served via Google Fonts
- **Breakpoints:** 1024px, 768px, 480px
- **Accessibility:** semantic landmarks, visible focus styles, `aria-*` on interactive controls, `alt` text on every image, reduced-motion support

## Attribution and originality

This is an **original design** inspired by the common layout pattern of online fashion and leather-goods retailers (hero, category grid, bestsellers, split promo, carousel, testimonials, Instagram grid, newsletter, footer). It is **not** a copy of any specific brand or website. The brand name "The Jacket Studio", all copy, product names, and testimonials are fictional and were written for this demo.
