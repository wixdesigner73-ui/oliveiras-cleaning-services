# Oliveira's Cleaning Services — website

Four pages (Home, About, Services, Contact) built with Next.js 15 (static export), React 19, Tailwind CSS 4,
GSAP + ScrollTrigger and Framer Motion.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in ./out  (upload to any static host)
```

## Things to confirm before launch

1. **Services** — `lib/site.ts` → `SERVICES`. Yelp blocked automated access, so the four categories from the brief
   (Residential, Deep, Move-In/Move-Out, Office) are *not yet verified*. Edit/remove entries there; the hero, showcase,
   Services page, contact dropdown and quote links all follow that file. Per-room copy is in `ROOMS` in the same file.
2. **Testimonials** — `lib/site.ts` → `REVIEWS` is intentionally empty, so the testimonial section does not render.
   Paste genuine Yelp reviews (name, rating, text) there and the carousel appears automatically.
3. **Contact form** — posts to [FormSubmit](https://formsubmit.co) and forwards to `suppleviviana79@gmail.com`.
   The **first** submission triggers an activation email to that address; click the link once. To use another
   provider (Formspree, Web3Forms…), set `NEXT_PUBLIC_FORM_ENDPOINT` at build time. If sending fails, the form shows
   an error with a prefilled email link and the phone number — it never fakes success.
4. **Imagery** — all rooms are original layered SVG illustrations (no people, no stock photos) and are labelled
   "Illustrative" on the site. Swap in real photography by replacing the `<Scene>` usages if desired.

## Structure

- `components/scenes/*` — the six illustrated rooms. Each reads one CSS variable, `--clean` (0 = untidy, 1 = pristine),
  which the hero, scroll sections and before/after sliders animate.
- `components/Hero.tsx` — color-morphing service hero (click, arrows, ← → keys, swipe).
- `components/SofaScroll.tsx`, `CleaningDemo.tsx` — scroll-scrubbed cleaning sequences.
- `components/RoomExplorer.tsx`, `Compare.tsx` — room tour and draggable before/after.

Note: the project folder name contains an apostrophe, which breaks Next's `@/` import alias and metadata icon routes
on Windows — imports are relative and the icon lives in `public/`.
