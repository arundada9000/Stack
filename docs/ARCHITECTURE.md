# EasyStack Architecture

This document explains how EasyStack is structured, how requests are served, and how to add a new page. EasyStack is a static site: plain HTML, CSS, and vanilla JavaScript with no build step and no server code. It deploys to Netlify and works as an installable PWA.

## Overview

```
Browser
   |
   v
Netlify edge
   |-- _redirects   (canonicalize and rewrite URLs)
   |-- _headers     (security and caching headers)
   |
   v
Static files (this repository, published from the root)
   |-- *.html pages
   |-- styles.css / extra.css / script.js / extra.js   (visualizer)
   |-- hig.css / hig.js                                 (guides and tools)
   |-- service-worker.js / manifest.json                (PWA)
   |-- sitemap.xml / robots.txt / images/
   |
   v
Client runtime
   |-- DOM rendering and animation
   |-- window.EasyStack.hig shared runtime (guide and tool pages)
   |-- Service worker cache-first strategy (offline support)
   |-- Theme preference from localStorage
```

## Page groups

The site has three page groups plus error and offline pages.

### 1. Visualizer pages

`index.html` is the home page and the original interactive stack visualizer. It uses its own asset set:

- `styles.css` and `extra.css` for styling
- `script.js` and `extra.js` for stack operations, animation, and extended features

### 2. Guide and tool pages

All guide and tool pages share the iOS HIG design system:

- `hig.css` provides design tokens, light and dark themes, and layout
- `hig.js` provides the shared runtime (theming, charts, toasts, utilities)
- Light and dark themes are switched via `data-theme` on `<html>`
- Fonts are Inter for body text and JetBrains Mono for code

| Route | File | Purpose |
| --- | --- | --- |
| /guides | guides.html | Guides hub |
| /stack-operations | stack-operations.html | Core stack operations |
| /push-pop | push-pop.html | Push and pop in depth |
| /array-stack | array-stack.html | Array-based implementation |
| /linked-list-stack | linked-list-stack.html | Linked-list implementation |
| /stack-complexity | stack-complexity.html | Time and space complexity |
| /stack-analogies | stack-analogies.html | Real-world analogies |
| /javascript-stack | javascript-stack.html | JavaScript implementation |
| /call-stack | call-stack.html | The call stack |
| /stack-memory | stack-memory.html | Stack memory |
| /monotonic-stack | monotonic-stack.html | Monotonic stacks |
| /stack-debugging | stack-debugging.html | Debugging with stacks |
| /stack-recursion | stack-recursion.html | Recursion and stacks |
| /stack-best-practices | stack-best-practices.html | Best practices |
| /stack-problems | stack-problems.html | Classic problems |
| /stacks-vs-queues | stacks-vs-queues.html | Stacks vs queues |
| /stack-dfs | stack-dfs.html | DFS with stacks |
| /browser-stack | browser-stack.html | Browser use of stacks |
| /os-stack | os-stack.html | OS use of stacks |
| /stack-interview | stack-interview.html | Interview preparation |
| /python-stack | python-stack.html | Python implementation |
| /java-stack | java-stack.html | Java implementation |
| /cpp-stack | cpp-stack.html | C++ implementation |
| /c-stack | c-stack.html | C implementation |
| /stack-visualizer | stack-visualizer.html | Advanced visualizer tool |
| /stack-frame-visualizer | stack-frame-visualizer.html | Call stack frame visualizer tool |
| /complexity-analyzer | complexity-analyzer.html | Complexity analyzer tool |

### 3. Support pages

| Route | File | Purpose |
| --- | --- | --- |
| /about | about.html | About the project |
| /contact | contact.html | Contact |
| /feedback | feedback.html | Feedback |
| /privacy | privacy.html | Privacy policy |

Plus `/404` (404.html) and `/offline` (offline.html).

## Shared runtime: hig.js

Guide and tool pages use the shared runtime exposed as `window.EasyStack.hig`. The main members are:

- `drawGrowthCurve` - render a complexity growth curve on a canvas
- `drawBars` - render bar charts (for example complexity comparisons)
- `drawRacers` - render animated "racer" comparisons
- `el` - element helper for creating and querying DOM nodes
- `cssVar` - read CSS custom property values
- `showToast` - display a transient toast message
- `themeIs` - check the current theme

Reuse these helpers instead of duplicating logic.

## Routing

Netlify handles routing through `_redirects`. Every page has two rules:

1. **Canonicalize (301).** `/<page>.html` redirects to the clean URL `/<page>`.
2. **Rewrite (200).** The clean URL `/<page>` serves `/<page>.html`.

This gives clean, canonical, extension-free URLs while keeping simple static files on disk.

## Theming

- `:root` defines the light theme tokens.
- `html[data-theme="dark"]` overrides those tokens for the dark theme.
- The visitor's choice is persisted in `localStorage` under the key `es-theme`.
- Always define colors through tokens so both themes stay consistent.

## SEO, AEO, and GEO conventions

Every page follows the same metadata conventions:

- Unique `<title>` and meta description, no duplicates.
- Canonical URL pointing to the clean URL (no `.html`).
- Open Graph and Twitter Card tags using `images/social-card.png`.
- JSON-LD that matches the on-page content. Typical types are `Article` and `SoftwareApplication`, plus `BreadcrumbList`, and `FAQPage` or `HowTo` where relevant. The home page also uses `WebSite`.
- Internal linking from related pages and the guides hub.
- A matching row in `sitemap.xml`.

## Cache and headers

- `_headers` applies security headers site-wide (HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-XSS-Protection`).
- Static assets (`/images/*`, the CSS and JS bundles) are cached with `max-age=31536000, immutable`.
- HTML is served with `max-age=0, must-revalidate`.
- `/service-worker.js` is served with `no-cache` so updates propagate.
- The service worker uses a cache-first strategy keyed by `CACHE_VERSION`. Bump `CACHE_VERSION` whenever cached assets change.

## Adding a new page checklist

1. Create the `.html` file with a unique title, meta description, canonical clean URL, Open Graph and Twitter tags, and matching JSON-LD (`Article` or `SoftwareApplication`, plus `BreadcrumbList`, plus `FAQPage` if relevant).
2. Add a 301 rule from `/<page>.html` to `/<page>` and a 200 rewrite from `/<page>` to `/<page>.html` in `_redirects`.
3. Add the clean URL row to `sitemap.xml`.
4. Link the new page from at least one existing page (usually the guides hub).
5. If the page's assets should be precached, add it to the service worker and bump `CACHE_VERSION`.
