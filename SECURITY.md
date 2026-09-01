# Security Policy

## About this project

EasyStack is a static educational website. It has no server code, no database, no user accounts, and no authentication. Everything runs in the browser. Even so, we take security seriously because the site is served over HTTPS, uses a service worker, and sets security headers.

## Supported versions

The site is deployed continuously from the default branch. There are no maintained release branches. The latest version at https://easystack.netlify.app is the only supported version, and fixes are released by merging to the default branch and letting Netlify redeploy.

## Reporting a vulnerability

Please do NOT open a public issue for security problems.

Report privately through either channel:

1. **Contact page:** https://easystack.netlify.app/contact
2. **GitHub Security tab:** use "Report a vulnerability" in the Security tab of the repository to open a private advisory.

Please include:

- A description of the issue and its impact
- Steps to reproduce, including the affected page or URL
- Your environment (browser and version) if relevant

### Response timeline

- We acknowledge reports within **3 business days**.
- We aim to fix confirmed issues within **14 days**.
- We will coordinate with you on disclosure timing. Please do not disclose publicly until a fix is live.

## In scope

The following issue types are in scope:

- Cross-site scripting (XSS) in any page, including injected scripts from user-controlled input
- Misconfigured or missing security headers in `_headers`
- PWA and service worker issues (cache poisoning, stale content served as fresh, scope problems)
- Broken links that lead to open redirects or unexpected external destinations
- Anything that could run unexpected code in a visitor's browser on our origin

## Out of scope

The following are out of scope:

- Vulnerabilities in upstream CDN or third-party services that we do not control
- Netlify platform and deploy tooling issues (report those to Netlify)
- Availability attacks such as DDoS
- Issues that require social engineering of the maintainer
- Theoretical issues with no practical reproduction

## Security settings already in place

- **HTTPS only** with `Strict-Transport-Security` (HSTS) including `includeSubDomains` and `preload`
- **`X-Frame-Options: DENY`** to prevent clickjacking
- **`X-Content-Type-Options: nosniff`** to prevent MIME sniffing
- **`Referrer-Policy: strict-origin-when-cross-origin`**
- **`Permissions-Policy`** disabling camera, microphone, geolocation, and interest-cohort
- **`X-XSS-Protection: 1; mode=block`** as a legacy fallback
- **Immutable caching** for static assets via `Cache-Control` in `_headers`
- **No secrets in the repository.** There are no API keys, tokens, or credentials anywhere in the source

## Attribution

This policy follows the style of the EasySorting security policy.
