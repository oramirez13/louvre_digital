# Louvre Digital

Interactive art gallery presenting classic artworks with a search box, filters by art movement, sorting and an enlarged image viewer.

## Technologies

- HTML5
- CSS3 (custom properties, BEM naming, media queries)
- Bootstrap 4 (loaded as part of the course)
- JavaScript (ES6: `const`/`let`, template literals)
- jQuery 3.7

## Features

- Search by title, author or art movement (accent-insensitive).
- Filter by art movement.
- Sort by title, author, or year (ascending/descending).
- Active filter chips with individual removal.
- Lightbox viewer opened by click or keyboard (Enter/Space), with `Escape` and backdrop click to close.
- "Back to top" button that respects the `prefers-reduced-motion` preference.
- Responsive layout and `prefers-reduced-motion` support.

## Structure

```text
louvre_digital/
├── index.html          # Main page (hero, filters, gallery, lightbox)
├── css/
│   └── style.css       # Global styles (CSS variables, BEM, media queries)
├── js/
│   └── main.js         # Gallery logic: search, filters, sorting, lightbox
└── img/
    ├── favicon.png     # Square site icon
    └── *.webp          # 10 artworks stored in WebP format
```

## Notes

- The images are stored as WebP to keep the site light (about 90% smaller than the original PNGs).
- The gallery works by opening `index.html` directly or from any local server.
