// Copy this file to config.local.js and fill in your values.
// config.local.js is gitignored and overrides these defaults.

// OpenRouter API key (https://openrouter.ai/keys). Required even for :free models.
window.OPENROUTER_API_KEY = "";

// Model used to translate product titles EN -> ES.
// Default chosen among models that respond reliably on the free shared pool.
window.TRANSLATOR_MODEL = "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free";

// Model used to generate the "how to use" guide.
window.GENERATOR_MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";

// Curated list of free models you can pick from in the dropdowns.
window.FREE_MODELS = [
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
  "nvidia/nemotron-3.5-lightning:free",
  "liquid/lfm-3-1.7b:free",
  "openrouter/free"
];