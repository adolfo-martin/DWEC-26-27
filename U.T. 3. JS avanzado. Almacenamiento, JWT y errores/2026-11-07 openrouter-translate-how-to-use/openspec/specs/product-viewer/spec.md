# product-viewer Specification

## Purpose

TBD — product viewer capability for fetching products, translating titles, and generating usage guides.

## Requirements

### Requirement: Fetch five products from DummyJSON
The system SHALL fetch exactly five products from the DummyJSON public API on page load.

#### Scenario: Successful fetch
- **WHEN** the page loads and the network is available
- **THEN** the system requests `https://dummyjson.com/products?limit=5` and renders five product entries

#### Scenario: Fetch failure
- **WHEN** the DummyJSON request fails or returns a non-OK status
- **THEN** the system displays an error message and a retry control instead of an empty list

### Requirement: Translate product titles to Spanish
The system SHALL translate all fetched product titles from English to Spanish using the configured OpenRouter translator model (Model A) and display only the Spanish title.

#### Scenario: Successful batch translation
- **WHEN** five products are fetched successfully
- **THEN** the system sends a single OpenRouter chat completion request containing all five titles and renders the returned Spanish titles in the product list

#### Scenario: Malformed model response
- **WHEN** the translator model response cannot be parsed as a JSON array of five strings
- **THEN** the system falls back to displaying the original English titles and shows a warning that translation failed

#### Scenario: Translation request failure
- **WHEN** the OpenRouter translation request fails
- **THEN** the system displays the original English titles and shows a retry control for translation

### Requirement: Product selection and details
The system SHALL, when a product is selected, display its main details: Spanish title, description, price, brand, category, rating, stock, and thumbnail image.

#### Scenario: Selection renders details
- **WHEN** a user selects a product from the list
- **THEN** the details panel updates to show the Spanish title, description, price, brand, category, rating, stock, and thumbnail

#### Scenario: No selection yet
- **WHEN** the page has loaded but no product is selected
- **THEN** the details panel shows a prompt to select a product

### Requirement: Generate "how to use" in Spanish
The system SHALL generate a Spanish "how to use" guide for the selected product using the configured OpenRouter generator model (Model B).

#### Scenario: Generation on selection
- **WHEN** a product is selected
- **THEN** the system sends an OpenRouter chat completion request with the product's title, category, and description, and displays the returned Spanish guide in a dedicated field

#### Scenario: Loading state
- **WHEN** a generation request is in flight
- **THEN** the "how to use" field shows a loading indicator and is not editable

#### Scenario: Generation failure
- **WHEN** the OpenRouter generation request fails
- **THEN** the "how to use" field shows an error message and a retry control

### Requirement: Configuration of key and models
The system SHALL obtain the OpenRouter API key and the two model IDs from a gitignored local config file (`config.local.js`) when present, falling back to values in `localStorage`, and prompt the user once if no key is available.

#### Scenario: Local config present
- **WHEN** `config.local.js` defines `OPENROUTER_API_KEY`, `TRANSLATOR_MODEL`, and `GENERATOR_MODEL`
- **THEN** the system uses those values without prompting

#### Scenario: No key available
- **WHEN** no key is found in config or localStorage
- **THEN** the system displays an input prompting the user to enter an OpenRouter API key and saves it to localStorage on submit

### Requirement: Caching of LLM outputs
The system SHALL cache translated title arrays and generated "how to use" text in localStorage keyed by model ID and product identity, and reuse cached values without making a new request.

#### Scenario: Cache hit on reload
- **WHEN** the page reloads and cached translations exist for the current translator model
- **THEN** the system renders Spanish titles from cache without calling OpenRouter

#### Scenario: Cache invalidation on model change
- **WHEN** the configured model ID changes
- **THEN** the system does not reuse cached values from the previous model

### Requirement: Two distinct models
The system SHALL use two separately configurable model IDs — one for translation (Model A) and one for "how to use" generation (Model B) — and SHALL NOT require them to be equal.

#### Scenario: Different models configured
- **WHEN** Model A and Model B are set to different IDs
- **THEN** translation requests use Model A and generation requests use Model B