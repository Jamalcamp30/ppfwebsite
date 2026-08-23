# PPF Master Experience — Launch Gate

This branch does not merge to `main` until every gate below is complete.

## Visual
- Desktop: 1440, 1680, 1920 widths reviewed.
- Mobile: 390, 430, tablet widths reviewed.
- No generic card-grid hero treatment.
- Real PPF media uses correct crops and no accidental overlays over faces.
- SPORT, PRO, INTEGRATED, PERFORMANCE, LAB, MEDIA remain visibly related but distinct.

## Motion
- Hero media loads without blocking primary copy.
- Scroll, reveal, ticker, control-room and metric animations remain smooth.
- Transform/opacity are preferred for continuous motion.
- `prefers-reduced-motion` removes non-essential movement.
- Page remains fully usable without animation.

## Accessibility
- Keyboard reaches all navigation and CTAs.
- Control Room can close with Escape and returns focus.
- Closed interactive overlays are hidden from accessibility/focus structure.
- Contrast and focus indicators pass review.
- Videos are muted when autoplaying; no surprise audio.

## Performance
- Images converted/resized for actual display dimensions.
- Video has an optimized web delivery format and poster.
- No oversized source media ships unnecessarily.
- JS does not run animation loops while page is hidden.
- Lighthouse/Core Web Vitals reviewed before launch.

## Data integrity
- Every public result has provenance.
- No inferred timing method/date/identity is published.
- PPF ID records contain only public athlete information.
- Protected Integrated participant, health, attendance, transportation and staff-note data never enters public JSON.

## SEO / migration
- Production canonical points to `https://ppfathletics.com/`.
- Existing indexed URLs are crawled before cutover.
- Redirect map is expanded from the migration contract using real legacy URLs.
- 301 redirects point to the closest relevant replacement, not indiscriminately to home.
- XML sitemap and robots.txt are regenerated.
- Structured data is validated.
- Search Console is monitored after cutover.

## Release
- Preview branch receives owner review.
- Broken-link crawl passes.
- HTML/CSS/JS validation passes.
- No placeholder links remain in production-critical journeys.
- Merge only after production-domain routing and redirects are ready.