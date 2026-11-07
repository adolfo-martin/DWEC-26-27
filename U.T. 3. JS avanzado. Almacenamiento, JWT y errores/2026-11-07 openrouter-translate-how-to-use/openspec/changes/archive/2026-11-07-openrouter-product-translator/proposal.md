## Why

A small, self-contained learning project to practice consuming the OpenRouter LLM API directly from a browser (no backend). It demonstrates two distinct uses of a free OpenRouter model against a public product catalog: translating product names to Spanish and generating a "how to use" guide for a selected product. The goal is understanding, not production.

## What Changes

- Add a static frontend (HTML/CSS/vanilla JS) served by a tiny local static server.
- Fetch 5 products from the public DummyJSON API.
- Translate all product titles from English to Spanish via a free OpenRouter model (Model A), showing only the Spanish title in the UI.
- On product selection, render the product's main details plus a generated "how to use" field produced by a second free OpenRouter model (Model B), in Spanish.
- Configure the OpenRouter API key and the two model IDs via a small gitignored local config (with localStorage fallback), keeping secrets out of committed source.
- Cache translated titles and generated "how to use" text in localStorage to avoid re-hitting free-model rate limits.

## Capabilities

### New Capabilities
- `product-viewer`: browser page that lists 5 DummyJSON products with Spanish-translated titles, shows selected product details, and generates a Spanish "how to use" guide via OpenRouter.

### Modified Capabilities
<!-- none -->

## Impact

- New files under project root: `index.html`, `styles.css`, `app.js`, `config.local.js` (gitignored), `config.example.js`, `README.md`.
- External dependencies (runtime, via CDN/browser): DummyJSON public API, OpenRouter chat completions API.
- No backend, no build step, no package manager.
- Affected systems: OpenRouter account/rate limits (free models); browser localStorage.