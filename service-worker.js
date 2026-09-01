// ============================================================
// EasyStack Service Worker - Full Offline PWA
// Strategy: Cache-First for all assets
// Bump CACHE_VERSION whenever you deploy new content
// ============================================================
const CACHE_VERSION = "v101";
const CACHE_NAME = `easystack-${CACHE_VERSION}`;

// --------------- Core assets (must succeed to install) ---------------
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/extra.css",
  "/script.js",
  "/extra.js",
  "/hig.css",
  "/hig.js",
  "/manifest.json",
  "/contact.html",
  "/privacy.html",
  "/about.html",
  "/feedback.html",
  "/404.html",
  "/offline.html",
  "/guides.html",
  "/stack-operations.html",
  "/push-pop.html",
  "/array-stack.html",
  "/linked-list-stack.html",
  "/stack-complexity.html",
  "/stack-analogies.html",
  "/javascript-stack.html",
  "/call-stack.html",
  "/stack-memory.html",
  "/monotonic-stack.html",
  "/stack-debugging.html",
  "/stack-recursion.html",
  "/stack-best-practices.html",
  "/stack-problems.html",
  "/stacks-vs-queues.html",
  "/stack-dfs.html",
  "/browser-stack.html",
  "/os-stack.html",
  "/stack-interview.html",
  "/python-stack.html",
  "/java-stack.html",
  "/cpp-stack.html",
  "/c-stack.html",
  "/stack-visualizer.html",
  "/stack-frame-visualizer.html",
  "/complexity-analyzer.html",
  "/service-worker.js",
];

// --------------- Clean URL aliases ---------------
const CLEAN_URL_ALIASES = [
  "/contact",
  "/privacy",
  "/about",
  "/feedback",
  "/guides",
  "/stack-operations",
  "/push-pop",
  "/array-stack",
  "/linked-list-stack",
  "/stack-complexity",
  "/stack-analogies",
  "/javascript-stack",
  "/call-stack",
  "/stack-memory",
  "/monotonic-stack",
  "/stack-debugging",
  "/stack-recursion",
  "/stack-best-practices",
  "/stack-problems",
  "/stacks-vs-queues",
  "/stack-dfs",
  "/browser-stack",
  "/os-stack",
  "/stack-interview",
  "/python-stack",
  "/java-stack",
  "/cpp-stack",
  "/c-stack",
  "/stack-visualizer",
  "/stack-frame-visualizer",
  "/complexity-analyzer",
  "/offline",
];

// --------------- Supplemental assets ---------------
const SUPPLEMENTAL_ASSETS = [
  "/images/stack.gif",
  "/images/stack-fav.png",
  "/images/finger.gif",
];

// ============================================================
// INSTALL
// ============================================================
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(CORE_ASSETS);

      await Promise.allSettled(
        CLEAN_URL_ALIASES.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[SW] Failed to cache alias: ${url}`, err);
          }),
        ),
      );

      const results = await Promise.allSettled(
        SUPPLEMENTAL_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[SW] Failed to cache asset: ${url}`, err);
          }),
        ),
      );

      const failed = results.filter((r) => r.status === "rejected");
      if (failed.length) {
        console.warn(`[SW] ${failed.length} supplemental assets failed to cache.`);
      }

      console.log(`[SW] Install complete. Cache: ${CACHE_NAME}`);
    }),
  );
  self.skipWaiting();
});

// ============================================================
// ACTIVATE
// ============================================================
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => {
              console.log(`[SW] Deleting old cache: ${key}`);
              return caches.delete(key);
            }),
        );
      })
      .then(() => {
        console.log(`[SW] Activated. Now using: ${CACHE_NAME}`);
        return self.clients.claim();
      }),
  );
});

// ============================================================
// FETCH - Cache-First
// ============================================================
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") return;
  if (url.protocol === "chrome-extension:") return;

  if (
    url.hostname.includes("googlesyndication.com") ||
    url.hostname.includes("googletagmanager.com") ||
    url.hostname.includes("doubleclick.net") ||
    url.hostname.includes("google-analytics.com")
  ) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(request);
      if (cachedResponse) return cachedResponse;

      try {
        const networkResponse = await fetch(request);
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type !== "opaque-redirect"
        ) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch (err) {
        console.warn(`[SW] Fetch failed for: ${request.url}`);

        if (request.mode === "navigate") {
          const cachedPage =
            (await cache.match(url.pathname)) ||
            (await cache.match("/offline.html")) ||
            (await cache.match("/index.html"));
          return cachedPage;
        }

        if (request.destination === "image") {
          return cache.match("/images/stack-fav.png");
        }

        return new Response("Offline - resource not cached.", {
          status: 503,
          statusText: "Service Unavailable",
          headers: { "Content-Type": "text/plain" },
        });
      }
    }),
  );
});
