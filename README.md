# The Jacket Studio - Landing Page

A static, responsive landing page for a fictional custom-leather brand called **The Jacket Studio**. Built with plain HTML5, CSS3, and vanilla JavaScript. No build tools, no frameworks, no npm.

## How to view

Open `index.html` directly in any modern browser, or serve the directory locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Sections

1. **Announcement bar** - three rotating messages (free shipping, easy returns, custom fit)
2. **Header / Navigation** - sticky header, text logo, primary nav (Men, Women, Bags, Shoes, Custom, Sale), search / account / wishlist / cart icons, mobile hamburger drawer
3. **Hero** - full-bleed image with mobile variant, headline "Create Your Custom Leather Jackets", Shop Men / Shop Women CTAs
4. **Value pillars** - "FINEST QUALITY. FAIR PRICING." with three pillars: Made for you, Made to fit, Made to last
5. **Category spotlights** - two side-by-side tiles for TruCarry leather bags and Eviternity leather shoes
6. **As Featured In** - six press-logo placeholders and a 4.9/5 rating line from 12,000+ customers
7. **Clearance promo** - full-bleed banner with "Up To 50% Off" and a Shop Clearance CTA
8. **Shop Best Sellers** - horizontal snap-scroll carousel with 12 product cards and prev / next controls. Three cards carry a Sale badge and a was-price
9. **Star Spotlight** - four portrait cards with name + occupation captions
10. **Secondary promo** - full-bleed "Flat 25% Off Leather Bags" banner with CTA
11. **Footer** - four columns (brand + inline newsletter, Customer Care, About, Shop), social icon row, copyright, and payment method labels

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

- **Announcement bar**: rotates three messages every 4 seconds. Pauses for users who set `prefers-reduced-motion: reduce`
- **Sticky header**: adds a shadow once the page is scrolled
- **Mobile drawer**: hamburger toggle with Escape key, resize, and link-tap closing
- **Newsletter form**: email validation, prevents default, shows an inline thank-you message in the footer
- **Best Sellers carousel**: prev / next buttons use `scrollBy` with snap-to-start
- **Reveal animation**: `IntersectionObserver` fade-in for sections, respects `prefers-reduced-motion`

## Images

All imagery is **hotlinked from [Unsplash](https://unsplash.com)** for demo purposes only. Before any production use you should:

- Replace each `images.unsplash.com/...` URL with your own licensed or owned assets
- Serve images from your own CDN for performance and reliability
- Provide appropriate `alt` text (placeholders are included)

## Design notes

- **Palette**: off-white background (`#faf8f5`), deep charcoal ink (`#1a1a1a`), warm cognac accent (`#8b5a2b`)
- **Type pairing**: Playfair Display (serif) for headings, Inter (sans-serif) for body, served via Google Fonts
- **Breakpoints**: 1024px, 768px, 480px
- **Accessibility**: semantic landmarks, visible focus styles, `aria-*` on interactive controls, `alt` text on every image, reduced-motion support

## Attribution and originality

The layout skeleton is inspired by the common homepage pattern of online leather-goods retailers, with thejacketmaker.com's section ordering as a reference for the 11 landmarks. It is **not** a copy of any specific brand or website. The brand name "The Jacket Studio", all copy, product names, press mentions, and star-spotlight captions are fictional and were written for this demo.
