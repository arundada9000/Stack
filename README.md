# EasyStack

Free interactive stack data structure visualizer, guides, and tools.

Live site: https://easystack.netlify.app

No build step. No framework. Plain HTML, CSS, and vanilla JavaScript, deployed as a static site on Netlify and installable as a PWA.

## What it is

EasyStack teaches the stack data structure through three things:

- An animated, interactive stack visualizer.
- 22 in-depth guides covering operations, implementations in 5 languages, the call stack, stack memory, monotonic stacks, recursion, DFS, browser and OS stacks, and interview problems.
- 3 tools: an advanced stack visualizer, a call stack frame visualizer, and a complexity analyzer.

## Features

- Animated push, pop, and peek operations with a live stack display.
- Code examples in C, C++, Java, Python, and JavaScript.
- Keyboard shortcuts for common operations.
- Light and dark mode across every page.
- PWA support with offline fallback.
- Clean, canonical URLs for every page.
- Rich structured data (JSON-LD) for search and answer engines.

## Page map

| Route | File | Description |
| --- | --- | --- |
| / | index.html | Home and interactive stack visualizer |
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
| /stack-visualizer | stack-visualizer.html | Advanced stack visualizer tool |
| /stack-frame-visualizer | stack-frame-visualizer.html | Call stack frame visualizer tool |
| /complexity-analyzer | complexity-analyzer.html | Complexity analyzer tool |
| /about | about.html | About the project |
| /contact | contact.html | Contact |
| /feedback | feedback.html | Feedback |
| /privacy | privacy.html | Privacy policy |
| /404 | 404.html | Not found page |
| /offline | offline.html | Offline fallback page |

## Tech stack

- HTML5, CSS3, and vanilla JavaScript (ES2015+).
- No build step, no bundler, no npm dependencies.
- Hosted on Netlify as a static site.
- PWA via `manifest.json` and `service-worker.js`.
- Guide and tool pages share the `hig.css` / `hig.js` design system.

## Local development

There is no build step. Serve the repository root and open a page:

```bash
python -m http.server 8000
```

or

```bash
npx serve
```

Then browse to http://localhost:8000.

## Deployment

- Push to `main` and Netlify publishes the repository root.
- `_redirects` and `_headers` are applied automatically by Netlify.
- When you change cached assets, bump `CACHE_VERSION` in `service-worker.js` so visitors get the new files.

## SEO conventions

- Clean, canonical URLs (no `.html`), enforced by `_redirects`.
- Unique `<title>` and meta description per page.
- Open Graph and Twitter Card tags using `images/social-card.png`.
- JSON-LD structured data: `WebSite` on the home page, `Article` and `SoftwareApplication` plus `BreadcrumbList`, `HowTo`, and `FAQPage` across pages.
- All public URLs listed in `sitemap.xml`.
- Crawler directives in `robots.txt`.

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full architecture, routing, theming, and how to add a new page.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute. Please also read the [Code of Conduct](CODE_OF_CONDUCT.md). To report a security issue, see [SECURITY.md](SECURITY.md).

## License

MIT. See [LICENSE](LICENSE).

## Author

Arun Neupane, a CSIT student from Nepal.

- GitHub: [@arundada9000](https://github.com/arundada9000)
- YouTube: [@code_with_ease](https://www.youtube.com/@code_with_ease)
