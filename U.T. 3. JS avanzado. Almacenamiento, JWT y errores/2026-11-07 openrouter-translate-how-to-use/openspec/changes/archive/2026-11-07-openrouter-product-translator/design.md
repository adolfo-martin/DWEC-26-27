## Context

Learning project: a single static page with no backend. Two external HTTP APIs are consumed directly from the browser:

- DummyJSON (`https://dummyjson.com/products?limit=5`) for the product catalog.
- OpenRouter (`https://openrouter.ai/api/v1/chat/completions`) for LLM calls.

Both APIs send `Access-Control-Allow-Origin: *`, so browser `fetch` works without a proxy. OpenRouter requires a Bearer API key even for `:free` models.

Current state: empty repo, no specs, no code.

## Goals / Non-Goals

**Goals:**
- Fetch 5 products and show their titles in Spanish.
- Show selected product's main details.
- Generate a Spanish "how to use" guide on selection.
- Use two distinct free OpenRouter models (one for translation, one for generation).
- Keep secrets out of committed source (gitignored local config + localStorage).
- Cache LLM outputs in localStorage to respect free-model rate limits.

**Non-Goals:**
- No backend, no auth, no persistence beyond localStorage.
- No production hardening, no tests, no accessibility beyond basics.
- No pagination, search, or category filtering.
- No streaming responses.

## Decisions

**D1 — Two models, two jobs.**
- Translator: `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free` (reliable on the free shared pool, good Spanish). `google/gemma-4-31b-it:free` / `google/gemma-4-26b-a4b-it:free` remain in the curated list.
- How-to-use: `nvidia/nemotron-3-ultra-550b-a55b:free` (large, practical instructions).
- Rationale: separates concerns so each can be swapped/tuned independently; both are free. Alternatives considered: single model for both (simpler but less illustrative of "two models"), `openrouter/free` auto-router (convenient but unpredictable quality). Model IDs live as constants in `config.example.js` so they're easy to change.

**D2 — Secret handling: gitignored local config + localStorage fallback.**
- `config.local.js` (gitignored) may export `OPENROUTER_API_KEY` and model overrides; `app.js` falls back to `localStorage['or_key']`, prompting once if absent.
- Rationale: keeps the key out of committed source while allowing zero-friction local runs. Alternative: hardcode in `app.js` — rejected because the key would leak into any shared repo; even for a test page, the gitignored pattern is cheap.

**D3 — Batch translation in one request.**
- Send all 5 titles in a single chat completion with a prompt demanding a JSON array of Spanish titles in the same order. Parse with a tolerant extractor (try `JSON.parse`, else regex the first `[...]`).
- Rationale: 1 request vs 5; free-model rate limits are per-minute. Risk: model returns prose; mitigated by prompt strictness + extractor + fallback to English titles with a visible warning.

**D4 — "How to use" generated per selection, cached.**
- On select, call Model B with title + category + description; cache result keyed by product id + model in localStorage. Show a spinner while pending; retry button on failure.
- Rationale: avoids regenerating on repeated clicks; keeps UX responsive.

**D5 — Curated model dropdown (not dynamic fetch).**
- A small hardcoded list of free model IDs in `config.example.js`, rendered as `<select>`s for each job. No runtime fetch of `/api/v1/models`.
- Rationale: readable, stable, no extra failure mode. Alternative: dynamic fetch — more robust to catalog changes but adds complexity for a learning project.

**D6 — Plain CSS, no build step, no framework.**
- Single `index.html` + `styles.css` + `app.js`. Served with `python3 -m http.server 8000`.
- Rationale: matches "frontend only, learning" and keeps the focus on the API consumption.

**D7 — Language.**
- Titles and "how to use" in Spanish. Other fields (description, brand, category, etc.) left in English as returned by DummyJSON, since only titles were required to be Spanish.

## Risks / Trade-offs

- [Free model availability changes] → Model IDs are constants; update `config.example.js`. Documented in README.
- [Free model rate limits / cold starts] → Batched translation, caching, visible loading state, retry button.
- [Model returns malformed JSON for translation] → Tolerant extractor + fallback to English titles + warning banner.
- [Key in browser is stealable] → Accepted for a test/learning page; gitignored config keeps it out of the repo. README warns.
- [DummyJSON or OpenRouter downtime] → Error message + retry; no silent failure.
- [CORS on `file://`] → README instructs using the static server.

## Migration Plan

Not applicable (greenfield). To run: copy `config.example.js` to `config.local.js`, set key/models, `python3 -m http.server 8000`, open `http://localhost:8000`.

## Open Questions

- None blocking. Model IDs are defaults and easily swapped.