# PPF Master Platform Architecture

## Brand hierarchy

PPF is the permanent umbrella. Division experiences are routes inside the same organization, not independent brands.

- PPF SPORT — athlete development
- PPF PRO — professional football, Draft, Combine, Pro Day, offseason
- PPF INTEGRATED — adaptive/human development
- PPF PERFORMANCE — adults, first responders, personal training
- PPF LAB — testing, PPF ID, PPF Verified, performance records
- PPF MEDIA — originals, film, Draft Notebook, athlete and Integrated stories

## Public data objects

### Athlete
Permanent `ppfId`, public identity, position, school, status, image, public metrics and relationships.

### Result
Permanent result ID, athlete reference when known, metric, value, units, event, date when known, method when known, verification state, source type and media.

### Media
Channel, title, deck, status, poster/media references and related athlete/division IDs.

## Privacy boundary

Public PPF data and protected operational/participant data are separate systems. Integrated attendance, transportation, health, staff notes, family communications and other protected records must never be exposed through public static JSON or public profile routes.

## Interaction layers

1. Base content and semantic navigation
2. Responsive layout
3. Progressive reveal and metric motion
4. PPF NOW editorial rail
5. PPF Control Room division navigator
6. Experience-specific motion/data rendering
7. Future authenticated portal layer

## Production route intent

- `/` — PPF Master
- `/sport/` — PPF SPORT
- `/pro/` — PPF PRO
- `/pro/draft/2027/` — 2027 Draft Central
- `/integrated/` — PPF Integrated
- `/performance/` — PPF Performance
- `/verified/` — PPF Verified
- `/athletes/` — Athlete index
- `/athletes/{slug}/` — permanent public athlete record
- `/media/` — PPF Media
- `/facility/` — PPF HQ
- `/coaches/` — coaching system

The current HTML paths under `/master/` are build-stage prototypes and should be converted to clean production routes during deployment.