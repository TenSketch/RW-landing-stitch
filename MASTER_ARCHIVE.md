# MASTER ARCHIVE — RW Landing Stitch

Last updated: 2026-05-09  
Repository root: `/home/bala/Desktop/WEBSITE_PROJECTS/RW-landing-stitch`  
Primary branch audited: `main`  
Audit scope: tracked source/config/assets/docs + repository structure + git history + local build/lint behavior

---

## 1. Project Overview and Purpose

This repository is a **frontend-only marketing landing page** for the brand **Revive Wardrobe**.  
Current implementation is a **single-page Next.js App Router site** focused on premium fashion storytelling and product showcase.

Observed characteristics:
- One public route: `/`
- No backend service code in this repository
- No internal API routes
- No database models or ORM
- No authentication/account system
- No cart/checkout implementation inside codebase

Primary objective inferred from implemented UI:
- Present high-fashion identity and curated Abaya collection
- Drive users to external product/shop pages on `revivewardrobe.com`
- Provide social/contact links (Instagram, Facebook, phone)

---

## 2. Brand/Design System Understanding

Design language is editorial, luxury, and high-contrast serif/sans pairing.

Brand/system signals in code:
- Typography: Google Fonts `Noto Serif` + `Manrope` (in `app/globals.css`)
- Color tokens defined in Tailwind v4 `@theme` block (surface/off-white + deep red primary)
- Messaging: exclusivity, single-owner design narrative
- Visual style: cinematic hero image, parallax/fade reveals, masonry gallery, marquee statement band

Core brand assets:
- Logo: `public/assets/revive logo.png`
- Hero: `public/assets/hero.jpg`
- Product photos by named collection folders
- Atelier videos in `public/videos`

---

## 3. Technology Stack

Runtime/framework:
- Next.js `15.5.15` (resolved from lockfile/node_modules)
- React `19.2.5`
- React DOM `19.2.5`
- TypeScript `5.8.3`

Styling/UI:
- Tailwind CSS v4 (`@tailwindcss/postcss` plugin model)
- Global custom CSS (`app/globals.css`)
- Lucide icons (`lucide-react`)

Animation/interaction:
- Framer Motion `12.38.0`
- Motion package `12.38.0`
- Native `IntersectionObserver`

Tooling:
- npm scripts for `dev`, `build`, `start`, `clean`, `lint`

No evidence of:
- Testing framework
- ESLint/Prettier config
- CI/CD workflow file
- Server runtime dependency usage at app level

---

## 4. Folder and Architecture Breakdown

Top-level observed folders/files:
- `app/`: App Router entry files (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/`: main page implementation (`App.tsx`)
- `public/`: images + videos
- `.git/`: repository history and objects
- `.next/`: local build artifacts (ignored)
- `node_modules/`: local dependencies (ignored)
- `.agents/`, `.codex/`: present as empty local directories

Important structural note:
- `app/page.tsx` re-exports default from `@/src/App`
- `src/` is currently listed in `.gitignore`, but `src/App.tsx` remains tracked

---

## 5. Frontend Architecture and Routing

Routing:
- App Router with a single page route:
  - `/` -> `app/page.tsx` -> re-export from `src/App.tsx`

Layout:
- `app/layout.tsx` defines root HTML shell and metadata
- Global styles imported in layout (`./globals.css`)

Page composition (`src/App.tsx`):
- Fixed top navigation with desktop links + mobile slide-down menu
- Hero section with scroll-reactive opacity/scale/translate behavior
- “Statement” narrative section (parallax wrapper)
- Featured collection grid with external product links
- Sovereign collection mobile auto-scroll carousel + desktop masonry
- Atelier horizontal video strip with play/pause per card
- Scrolling marquee statement
- Bespoke CTA block
- Footer with brand title + social/phone links

Reusable local UI utilities:
- `FadeIn` component for directional reveal animations
- `ParallaxSection` component wrapping section content with `useScroll`/`useTransform`

---

## 6. Backend/API Architecture (If Available)

No backend application code is present in this repository.

No evidence of:
- `app/api/*`
- `pages/api/*`
- Express server entrypoint in current branch
- API client integration (`fetch`/`axios`) in active app code

Historical note:
- Older Vite-era `package.json` (in git history) contained `express`, `dotenv`, `@google/genai`, but these are no longer part of current active stack.

---

## 7. Database/Schema Understanding (If Available)

No database layer exists in the current codebase.

No evidence of:
- Prisma schema
- Mongoose models
- SQL migrations
- DB connection utilities

---

## 8. Authentication/Account Flow (If Available)

No authentication or account flow is implemented.

No login/signup pages, session handling, token middleware, or auth provider wiring found.

---

## 9. Checkout/Payment Flow (If Available)

No in-app checkout or payment flow exists.

Current strategy:
- Outbound product/shop links to external domain `revivewardrobe.com`.

---

## 10. User/Profile Flow

No user profile system exists in this repository.

User interaction model is anonymous content browsing + external navigation + direct contact links.

---

## 11. Admin/Dashboard Capabilities (If Available)

No admin panel or dashboard modules found.

---

## 12. Business Logic Understanding

Current business logic is presentation and interaction oriented:
- Hero transforms update from scroll position (`heroOpacity`, `heroScale`, `heroY`)
- Mobile nav state toggles with `isMenuOpen`
- Video playback control uses `playingVideoIndex`
- `IntersectionObserver` resets playing state when Atelier section exits viewport

Commercial flow logic:
- Product discovery is static and hardcoded in arrays inside component
- “View Piece” actions open external product pages in new tab
- “Archive Access” and bespoke CTA direct brand conversion behavior (CTA button currently has no click handler)

---

## 13. State Management and Reusable Component Patterns

State management:
- Pure local React state via `useState`
- Side effects via `useEffect`
- Section ref via `useRef`

Pattern characteristics:
- Single large component for page structure (`src/App.tsx`)
- Two reusable animation wrappers (`FadeIn`, `ParallaxSection`)
- Data arrays embedded inline rather than external JSON/content modules

Implication:
- Fast to iterate for one page, but content updates require code edits.

---

## 14. Existing Coding Standards and Conventions

Observed conventions:
- TypeScript strict mode enabled in `tsconfig.json`
- Functional React component style
- Tailwind utility classes with some inline style usage
- Semantic section comments in JSX

Notable inconsistencies:
- Mixed image path patterns (with and without leading slash)
- Inline style use in some places despite utility-class-heavy approach
- Unused import in `app/layout.tsx` (`logo`)
- Large monolithic `App.tsx` rather than section components

---

## 15. Responsive/Mobile Implementation Observations

Implemented:
- Mobile menu toggle + animated dropdown
- Mobile-specific sovereign carousel (`md:hidden`) with continuous auto-scroll
- Desktop/tablet masonry gallery (`hidden md:block`)
- Responsive typography/scales across hero and sections
- Horizontal touch-scrolling video rail with `snap-x` behavior

Potential UX issues:
- Hero section uses `h-[120vh]` which can feel overly tall on some mobile browsers
- Marquee text is visually strong and could dominate small screens depending on viewport

---

## 16. SEO/Content Structure Observations

Current SEO setup:
- `metadata` object in `app/layout.tsx` provides `title` + `description`
- `lang="en"` set on root HTML

Missing in current implementation:
- Open Graph tags
- Twitter card tags
- Canonical URL
- Structured data/JSON-LD
- Sitemap/robots configuration
- Favicon/app icon metadata wiring in repo

Content structure:
- All content is hardcoded in `src/App.tsx`; no CMS/content JSON for live text/product config.

---

## 17. Existing Completed Modules/Features

Completed and present:
- Next.js App Router migration from former Vite app
- Visual theme tokenization in `app/globals.css`
- Cinematic hero with scroll transform behavior
- Section-based editorial landing composition
- Product showcase grids/carousels with external product links
- Video strip with play/pause overlay controls
- Mobile/desktop navigation variants
- Footer with social and phone contact actions
- Successful production build (`npm run build`) as of this audit

---

## 18. Existing Incomplete Modules/Features

Observed incomplete/partial items:
- “Revive Story” section link exists in nav (`#story`) but associated section is commented out
- Designer Profile section is present as commented JSX block (not rendered)
- Bespoke CTA button (“Grab your unique piece”) has no action handler/link
- Environment template variables (`GEMINI_API_KEY`, `APP_URL`) exist but are not used by active code

---

## 19. Existing Bugs/Issues/Technical Debt Found

1. **Cold lint/typecheck fragility**
- `npm run lint` fails on fresh state if `.next/types` files are absent because `tsconfig.json` includes `.next/types/**/*.ts`.
- After running `npm run build`, lint succeeds.
- This creates CI/onboarding instability unless build/dev is run first.

2. **`.gitignore` conflict with active architecture**
- `.gitignore` excludes `src/`, but app entry depends on tracked `src/App.tsx`.
- Existing tracked file still works, but new files under `src/` can be silently ignored, causing team confusion.

3. **Dead anchor target**
- Nav includes `href="#story"` while story section is commented out; this creates a non-functional in-page link.

4. **Potential path portability issue**
- At least one image path is relative (`assets/Aurora Blossom Abaya/close.png`) while others are absolute (`/assets/...`).
- Works on `/`, but absolute paths are safer for route expansion.

5. **Monolithic component complexity**
- Single `App.tsx` (~480 lines) contains all sections, data arrays, and interaction logic, increasing maintenance risk.

---

## 20. Existing Security/Performance Observations

Security posture (frontend-only):
- No secret usage in runtime app code
- External links mostly use safe attributes (`target="_blank"` with `rel="noopener noreferrer"` where applicable)

Performance considerations:
- Public media footprint is large (`public/` approx 215 MB), largely from MP4 videos
- `.git` size is high (~233 MB) due binary asset history, affecting clone speed and repo operations
- Autoplay-like continuous animations (marquee + carousel) may affect low-power devices if not reduced-motion-aware
- Next `<img>` tags are used instead of Next `<Image>` optimization

---

## 21. Existing Deployment/Environment Assumptions

Scripts:
- `dev`: `next dev --hostname 0.0.0.0 --port 3000`
- `build`: `next build`
- `start`: `next start --hostname 0.0.0.0 --port 3000`

Environment file:
- `.env.example` contains `GEMINI_API_KEY` and `APP_URL` placeholders from older app template context
- Active code does not currently consume these values

Deployment assumptions:
- Static-first marketing page can be deployed on standard Next.js hosting
- No backend/runtime service dependencies required by application code

---

## 22. Important Implementation Restrictions/Warnings

- Do not remove `src/App.tsx` without updating `app/page.tsx` re-export path.
- If keeping current architecture, resolve `.gitignore` rule for `src/` to avoid future accidental omission.
- Running lint before generating `.next/types` can fail.
- Large binary assets increase repo cost; avoid repeated binary overwrite churn in git history.

---

## 23. Important Architectural Decisions Already Followed

From repository history and current state:
- Migrated from Vite SPA to Next.js App Router (`2026-04-30`, commit `920e061`)
- Retained single-page experience pattern post-migration
- Shifted styling to Tailwind v4 + global tokenized CSS
- Expanded rich media storytelling via large image/video asset additions
- Implemented animation-heavy premium landing aesthetic as core UX direction

---

## 24. Existing UX/UI Patterns and Standards

Patterns in use:
- Fixed translucent nav over content
- High-impact hero headline with cinematic background
- Alternating large typography + concise editorial copy
- External e-commerce deep links on product cards
- Horizontal media storytelling strips
- Minimal footer with icon-first social access

Interaction style:
- Motion-based reveal and scroll feedback
- Hover-driven affordances on desktop
- Touch-scroll rails and mobile-specific carousel behavior on small viewports

---

## 25. Suggested Improvements and Optimization Opportunities

High-value improvements:
- Normalize lint/typecheck workflow so `npm run lint` is stable without prebuilt `.next/types`
- Remove or adjust `src/` ignore rule to match actual architecture
- Extract section data into typed constants/JSON to simplify content operations
- Break `App.tsx` into focused section components
- Replace dead in-page links or re-enable target section
- Add explicit action for bespoke CTA
- Improve SEO metadata depth (OG/Twitter/canonical/schema)
- Add reduced-motion support and animation fallbacks
- Evaluate video compression/stream strategy for faster first interaction
- Consider `next/image` for responsive image optimization

---

## 26. Suggested Next Sprint Priorities

1. **Stability sprint**
- Fix lint cold-start failure and gitignore/source alignment.

2. **Content architecture sprint**
- Componentize sections and externalize product/media/text config.

3. **Conversion + UX sprint**
- Restore/replace story section, wire bespoke CTA, and validate anchor map.

4. **SEO + performance sprint**
- Add full metadata set, optimize media delivery, and add motion accessibility controls.

---

## 27. Suggested Testing Checklist

Local engineering checks:
- `npm install`
- `npm run build`
- `npm run lint` (verify it passes from clean clone workflow)
- `npm run start` and smoke test `/`

Functional checks:
- Desktop nav links and mobile menu toggle
- In-page anchor navigation (`#collection`, `#story`, `#bespoke`)
- Product links open correct external URLs
- Video play/pause toggles and stops when section exits view
- Footer social/phone actions

Responsive checks:
- Mobile, tablet, desktop breakpoints
- Horizontal video scroll usability on touch devices
- Hero visual fit across viewport heights

Performance/accessibility checks:
- Lighthouse baseline for performance and best practices
- Reduced-motion behavior
- Color contrast on key text overlays

---

## 28. Important Repository Insights from Git History

Commit timeline (9 commits total):
- `bef66a2` (2026-04-17): initial README seed
- `b8a01e9` (2026-04-17): initial Vite React landing setup
- `920e061` (2026-04-30): converted into Next.js (major migration)
- `fbb5828`, `17ba61f`, `788d169`, `64b5b86`, `2386990`: iterative visual/content/media expansion
- `b717523` (2026-05-05): .gitignore expansion + media replacements + minor app link update

Author distribution:
- RitheshKumar26: 6 commits
- TenSketch: 3 commits

Branch notes:
- `main` is ahead of `origin/dev`
- `origin/dev` contains no commits ahead of `main`

History risk:
- Heavy binary asset churn contributes significant repository object size.

---

## 29. Important Operational Notes for Future Development

- This codebase currently behaves as a **single-route branded landing site**, not a multi-module application.
- Treat it as a **content + performance + conversion optimization** project unless product scope changes.
- Keep architecture decisions explicit when introducing:
  - API/backend features
  - CMS/content layer
  - Form submission endpoints
  - Multi-route expansion
- If expanding to additional pages/routes, normalize all asset paths to root-relative and formalize shared components early.
- Before onboarding new contributors, resolve the `src/` ignore mismatch and lint bootstrap requirement to reduce setup friction.

---

## Appendix A — Key Files of Record

- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `src/App.tsx`
- `package.json`
- `tsconfig.json`
- `.gitignore`
- `.env.example`
- `README.md`
- `metadata.json`

## Appendix B — Operational State at Audit Time

- Working tree: clean (`git status --short` -> no changes)
- Build: success (`npm run build`)
- Lint/typecheck: fails before `.next/types` exists, passes after build generation
- Repository size snapshot:
  - `.git`: ~233 MB
  - `public`: ~215 MB
  - `node_modules`: ~592 MB (local install artifact)

