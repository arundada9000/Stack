# Contributing to EasyStack

Thank you for your interest in contributing to EasyStack. EasyStack is a free, interactive stack data structure visualizer with in-depth guides and tools. It is built with plain HTML, CSS, and vanilla JavaScript. There is no build step and no framework. The site deploys to Netlify as a static site and is installable as a PWA.

Live site: https://easystack.netlify.app

## Table of contents

1. [Code of conduct](#code-of-conduct)
2. [Ways to contribute](#ways-to-contribute)
3. [Project structure](#project-structure)
4. [Before you start](#before-you-start)
5. [Making changes](#making-changes)
6. [New page requirements](#new-page-requirements)
7. [Style guide](#style-guide)
8. [Commit messages](#commit-messages)
9. [Pull request checklist](#pull-request-checklist)

## Code of conduct

By participating in this project, you agree to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## Ways to contribute

You do not need to write code to contribute. Helpful ways to get involved include:

- **Bug reports.** Broken layouts, animations that misbehave, incorrect stack behavior, dead links, or offline mode failures.
- **Feature improvements.** Better visualizations, clearer step logs, more keyboard shortcuts, improved tooling pages.
- **Educational copy.** Clearer explanations, better analogies, corrected technical details, more worked examples in the guides.
- **SEO metadata.** Improved titles, meta descriptions, JSON-LD structured data, and internal linking.
- **More language implementations.** Stack examples in additional languages (for example Go, Rust, C#, TypeScript) following the pattern of the existing Python, Java, C++, and C guides.
- **Accessibility.** Better focus styles, ARIA labels, contrast, reduced-motion support, and keyboard navigation.
- **New guides.** New topics that fit the stack theme, such as expression evaluation, backtracking, or undo-redo patterns.

## Project structure

```
stack/
|-- index.html              Home page with the interactive stack visualizer
|-- guides.html             Guides hub page
|-- stack-*.html            Guide and tool pages (one file per route)
|-- 404.html                Not found page
|-- offline.html            Offline fallback page
|-- about.html              About page
|-- contact.html            Contact page
|-- feedback.html           Feedback page
|-- privacy.html            Privacy policy page
|
|-- styles.css              Base styles for the visualizer home page
|-- extra.css               Extended styles for the visualizer home page
|-- script.js               Core visualizer logic (stack operations)
|-- extra.js                Extended visualizer features
|
|-- hig.css                 iOS HIG design system used by guide and tool pages
|-- hig.js                  Shared runtime for guide and tool pages
|                           (theme toggle, charts, toasts, utilities)
|
|-- service-worker.js       PWA caching (bump CACHE_VERSION on asset changes)
|-- manifest.json           PWA manifest (name, icons, colors)
|-- _redirects              Clean URL rewrites (301 from .html, 200 to file)
|-- _headers                Security and caching headers
|-- sitemap.xml             List of all public clean URLs
|-- robots.txt              Crawler directives
|
|-- images/                 Images, icons, and images/social-card.png
```

## Before you start

Before opening a pull request, please:

1. Read the [README](README.md) to understand the site layout and conventions.
2. Open the page you plan to change in a browser from the default branch so you know the current behavior.
3. Check `CACHE_VERSION` in `service-worker.js`. If your change touches cached assets, plan to bump it.

## Making changes

1. Fork the repository and create a branch from `main`. Use a short descriptive name, for example `fix/pop-animation` or `docs/guide-undo-redo`.
2. Keep changes focused. One concern per pull request makes review faster.
3. Serve the site locally and test in the browser:

   ```bash
   python -m http.server 8000
   ```

   or

   ```bash
   npx serve
   ```

4. Test both light and dark themes, and test online and offline if you touched the service worker.
5. Commit using the [Conventional Commits](#commit-messages) format and push to your fork.
6. Open a pull request against `main` and fill in the template.

## New page requirements

Every new page must ship as a complete unit. A new page is only accepted when it includes all of the following:

1. **Unique title and meta description.** No duplicates across the site.
2. **Canonical clean URL.** For example `https://easystack.netlify.app/stack-undo-redo` (no `.html`).
3. **Open Graph and Twitter Card tags.** Use `images/social-card.png` unless a page-specific image exists.
4. **JSON-LD structured data.** Use `Article` or `SoftwareApplication` as appropriate, plus `BreadcrumbList`, plus `FAQPage` when the page contains questions and answers.
5. **A row in `sitemap.xml`** with the clean URL.
6. **Rules in `_redirects`.** A 301 from the `.html` path to the clean URL, and a 200 rewrite from the clean URL to the `.html` file.
7. **Internal links from at least one existing page.** Orphan pages are not accepted. The guides hub is usually the right place.

## Style guide

### HTML

- Use lowercase tags and double-quoted attributes.
- Use semantic HTML: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Every interactive control needs an accessible name (`aria-label` where visible text is not enough).
- Preserve visible focus styles for keyboard users.

### CSS

- Use CSS custom properties for colors, spacing, and typography tokens. Guide and tool pages share `hig.css`; do not hardcode colors that already exist as tokens.
- Theme switching is done with `html[data-theme="dark"]`. Both themes must look correct for any change.

### JavaScript

- Vanilla JavaScript, ES2015+. No frameworks, no bundlers, no npm dependencies.
- Shared guide and tool utilities live on `window.EasyStack.hig` in `hig.js`. Reuse them before writing new helpers.

### Content

- NO em dashes and NO emojis anywhere in content, code, or commit messages. Use plain hyphens.
- Plain ASCII except where a symbol genuinely helps (for example O(n) superscript 2 as O(n^2), the multiplication sign, or an up arrow).

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/). Format:

```
type(scope): short description
```

Examples:

```
fix(visualizer): pop animation now waits for push to finish
feat(guides): add undo-redo pattern guide
docs(readme): document local development workflow
style(hig): increase contrast on dark theme code blocks
chore(pwa): bump CACHE_VERSION to v102
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `a11y`, `chore`.

## Pull request checklist

Before requesting review, confirm:

- [ ] Changes are focused and described in the PR template
- [ ] Site runs locally with no console errors
- [ ] Light and dark themes both look correct
- [ ] No em dashes or emojis were introduced
- [ ] New pages include all items from [New page requirements](#new-page-requirements)
- [ ] `CACHE_VERSION` in `service-worker.js` was bumped if cached assets changed
- [ ] Commits follow the Conventional Commits format

Thank you for helping make EasyStack better.
