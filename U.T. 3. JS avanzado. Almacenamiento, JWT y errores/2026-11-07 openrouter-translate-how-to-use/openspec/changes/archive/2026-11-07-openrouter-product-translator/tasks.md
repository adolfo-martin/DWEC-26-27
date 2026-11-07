## 1. Project setup

- [x] 1.1 Create `.gitignore` ignoring `config.local.js` and `.DS_Store`
- [x] 1.2 Create `config.example.js` with `OPENROUTER_API_KEY`, `TRANSLATOR_MODEL`, `GENERATOR_MODEL` constants and a curated list of free model IDs
- [x] 1.3 Create empty `config.local.js` from the example and fill in the key and default models

## 2. Markup and styling

- [x] 2.1 Create `index.html` with API key input, two model `<select>`s, product `<select>`, details panel, and "how to use" section
- [x] 2.2 Create `styles.css` with plain CSS layout (header, two-column body, loading/error states)

## 3. Core JavaScript

- [x] 3.1 Implement config resolution (local config → localStorage → prompt) in `app.js`
- [x] 3.2 Implement DummyJSON fetch of 5 products with error/retry handling
- [x] 3.3 Implement OpenRouter chat completion helper (fetch wrapper, auth header, error handling)
- [x] 3.4 Implement batch title translation with tolerant JSON parsing and English fallback
- [x] 3.5 Implement product selection → details render
- [x] 3.6 Implement "how to use" generation with loading and retry
- [x] 3.7 Implement localStorage caching for translations and "how to use" keyed by model + product
- [x] 3.8 Wire model `<select>` changes to invalidate cache and re-run translation

## 4. Documentation and verification

- [x] 4.1 Write `README.md` with setup, run (`python3 -m http.server 8000`), key security note, and model swap instructions
- [x] 4.2 Manually test: load page, translate 5 titles to Spanish, select each product, generate "how to use", verify caching on reload, verify retry on failure