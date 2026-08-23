# PPF Master Experience

This directory is the production foundation for the future primary PPFAthletics.com experience.

## Architecture principles

- One master PPF brand with distinct SPORT, PRO, INTEGRATED, PERFORMANCE, LAB, and MEDIA experiences.
- Progressive enhancement: content remains usable without animation or JavaScript.
- Native browser animation primitives first; heavy motion libraries only where a clear visual need justifies them.
- `prefers-reduced-motion` is respected globally.
- Motion is composited primarily through transform and opacity to protect frame rate.
- Editorial content, verified results, athlete records, and program content will move toward structured data sources rather than hard-coded presentation markup.
- Mobile is a first-class experience, not a reduced desktop layout.
- SEO migration to PPFAthletics.com will use explicit URL mapping and permanent redirects rather than discarding existing authority.

## Initial structure

- `index.html` — master landing experience prototype.
- `styles/tokens.css` — brand tokens, spacing, type scale, easing curves, shadows, and semantic color roles.
- `styles/base.css` — layout, typography, navigation, sections, responsive behavior, accessibility.
- `styles/motion.css` — cinematic transitions and motion states.
- `scripts/app.js` — progressive motion engine, scroll progress, hero canvas, reveal choreography, magnetic interactions.

## Planned system modules

1. PPF Master / homepage
2. PPF SPORT
3. PPF PRO + Draft Central
4. PPF INTEGRATED
5. PPF PERFORMANCE
6. PPF LAB / Verified
7. PPF MEDIA
8. Athlete profiles + PPF ID
9. PPF Verified result objects
10. Facility + coach graph
11. Agent / program portal layer
12. Structured content and analytics pipeline

This branch is intentionally isolated from `main` until visual QA, performance QA, accessibility QA, and redirect planning are complete.