/* OpenRouter Product Viewer - vanilla JS, no backend */

const state = {
  products: [],
  spanishTitles: {},   // productId -> spanish title
  selectedId: null,
  translating: false,
  translateError: null
};

// ---------- helpers ----------
const $ = (sel) => document.querySelector(sel);

function escapeHtml(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function setStatus(el, msg, type) {
  el.textContent = msg;
  el.className = "status" + (type ? " " + type : "");
}

function showRetry(btn, fn) {
  btn.hidden = false;
  btn.onclick = fn;
}
function hideRetry(btn) {
  btn.hidden = true;
  btn.onclick = null;
}

function getTranslatorModel() {
  return $("#translatorModel").value;
}
function getGeneratorModel() {
  return $("#generatorModel").value;
}
function getKey() {
  const v = ($("#apiKeyInput").value || "").trim();
  if (v) return v;
  const ls = (localStorage.getItem("or_key") || "").trim();
  if (ls) return ls;
  return (window.OPENROUTER_API_KEY || "").trim();
}

// ---------- config ----------
function resolveConfig() {
  const key = (window.OPENROUTER_API_KEY || "").trim() ||
              (localStorage.getItem("or_key") || "").trim();
  const translator = (window.TRANSLATOR_MODEL || "").trim() ||
                     (localStorage.getItem("or_translator") || "").trim() ||
                     "google/gemma-4-31b-it:free";
  const generator = (window.GENERATOR_MODEL || "").trim() ||
                    (localStorage.getItem("or_generator") || "").trim() ||
                    "nvidia/nemotron-3-ultra-550b-a55b:free";
  const freeModels = (Array.isArray(window.FREE_MODELS) && window.FREE_MODELS.length)
    ? window.FREE_MODELS.slice()
    : [translator, generator, "openrouter/free"];
  // ensure selected models are in the list
  if (!freeModels.includes(translator)) freeModels.unshift(translator);
  if (!freeModels.includes(generator)) freeModels.unshift(generator);
  return { key, translator, generator, freeModels };
}

function populateModelSelects(freeModels, translator, generator) {
  for (const id of ["translatorModel", "generatorModel"]) {
    const sel = $("#" + id);
    sel.innerHTML = "";
    freeModels.forEach((m) => {
      const opt = document.createElement("option");
      opt.value = m;
      opt.textContent = m;
      sel.appendChild(opt);
    });
  }
  $("#translatorModel").value = translator;
  $("#generatorModel").value = generator;
}

// ---------- OpenRouter client ----------
async function openRouterChat(model, messages, temperature) {
  const key = getKey();
  if (!key) throw new Error("Falta la API key de OpenRouter.");
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + key,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.href,
      "X-Title": "OpenRouter Product Viewer"
    },
    body: JSON.stringify({ model, messages, temperature: temperature == null ? 0.3 : temperature })
  });
  if (!res.ok) {
    let detail = "";
    try { detail = await res.text(); } catch (e) { /* ignore */ }
    throw new Error(`OpenRouter ${res.status}: ${detail || res.statusText}`);
  }
  const data = await res.json();
  const content = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
  if (typeof content !== "string" || !content.trim()) throw new Error("Respuesta sin contenido.");
  return content.trim();
}

// ---------- JSON parsing (tolerant) ----------
function parseJsonArray(text) {
  const trimmed = text.trim();
  try {
    const v = JSON.parse(trimmed);
    if (Array.isArray(v)) return v;
  } catch (e) { /* continue */ }
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) {
    try {
      const v = JSON.parse(fence[1].trim());
      if (Array.isArray(v)) return v;
    } catch (e) { /* continue */ }
  }
  const m = trimmed.match(/\[[\s\S]*\]/);
  if (m) {
    try {
      const v = JSON.parse(m[0]);
      if (Array.isArray(v)) return v;
    } catch (e) { /* continue */ }
  }
  return null;
}

// ---------- translation ----------
function translationCacheKey(model) {
  return "or_tr_" + model;
}

async function translateTitles(products, model) {
  const cacheKey = translationCacheKey(model);
  let cache = {};
  try { cache = JSON.parse(localStorage.getItem(cacheKey) || "{}"); } catch (e) { cache = {}; }
  const allCached = products.length > 0 && products.every((p) => typeof cache[p.id] === "string" && cache[p.id].trim());
  if (allCached) {
    return products.map((p) => ({ id: p.id, title: cache[p.id] }));
  }

  const list = products.map((p, i) => `${i + 1}. ${p.title}`).join("\n");
  const messages = [
    { role: "system", content: "Eres un traductor profesional de inglés a español de España. Devuelve ÚNICAMENTE un array JSON de strings con las traducciones en el mismo orden, sin texto adicional, sin markdown, sin explicaciones." },
    { role: "user", content: `Traduce al español los siguientes títulos de productos. Devuelve solo un array JSON de strings.\n${list}` }
  ];
  const content = await openRouterChat(model, messages, 0.2);
  const arr = parseJsonArray(content);
  if (!Array.isArray(arr) || arr.length !== products.length || !arr.every((x) => typeof x === "string")) {
    throw new Error("La respuesta de traducción no es un array JSON válido de " + products.length + " strings.");
  }
  const newCache = Object.assign({}, cache);
  products.forEach((p, i) => { newCache[p.id] = arr[i]; });
  try { localStorage.setItem(cacheKey, JSON.stringify(newCache)); } catch (e) { /* ignore */ }
  return products.map((p, i) => ({ id: p.id, title: arr[i] }));
}

// ---------- how to use ----------
function howToUseCacheKey(model, productId) {
  return "or_htu_" + model + "_" + productId;
}

async function generateHowToUse(product, model) {
  const cacheKey = howToUseCacheKey(model, product.id);
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;
  const spanishTitle = state.spanishTitles[product.id] || product.title;
  const messages = [
    { role: "system", content: "Eres un asistente que escribe guías prácticas de uso de productos. Responde en español, 3-5 frases, directo y útil, sin marketing ni rodeos." },
    { role: "user", content: `Producto: ${spanishTitle} (${product.title})\nCategoría: ${product.category}\nDescripción: ${product.description}\n\nEscribe una guía breve de "cómo usar" este producto.` }
  ];
  const text = await openRouterChat(model, messages, 0.4);
  try { localStorage.setItem(cacheKey, text); } catch (e) { /* ignore */ }
  return text;
}

// ---------- rendering ----------
function renderProductSelect() {
  const sel = $("#productSelect");
  const prev = sel.value;
  sel.innerHTML = '<option value="">-- Selecciona --</option>';
  state.products.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = state.spanishTitles[p.id] || p.title;
    sel.appendChild(opt);
  });
  if (prev && state.products.some((p) => String(p.id) === String(prev))) {
    sel.value = prev;
  }
}

function renderDetails(id) {
  const product = state.products.find((p) => String(p.id) === String(id));
  const panel = $("#detailPanel");
  if (!product) {
    panel.innerHTML = '<p class="placeholder">Selecciona un producto para ver sus detalles.</p>';
    return;
  }
  const title = state.spanishTitles[product.id] || product.title;
  panel.innerHTML = `
    <div class="detail">
      <img class="thumb" src="${escapeHtml(product.thumbnail)}" alt="${escapeHtml(title)}">
      <h3>${escapeHtml(title)}</h3>
      <dl class="meta">
        <dt>Precio</dt><dd>$${escapeHtml(product.price)}</dd>
        <dt>Marca</dt><dd>${escapeHtml(product.brand || "-")}</dd>
        <dt>Categoría</dt><dd>${escapeHtml(product.category)}</dd>
        <dt>Rating</dt><dd>${escapeHtml(product.rating)}</dd>
        <dt>Stock</dt><dd>${escapeHtml(product.stock)}</dd>
      </dl>
      <p>${escapeHtml(product.description)}</p>
      <div class="how-to-use">
        <h4>Cómo usar</h4>
        <div class="content loading" id="howToUseContent">Generando guía...</div>
        <button class="retry" id="retryHowBtn" hidden>Reintentar</button>
      </div>
    </div>
  `;
  generateAndShow(product);
}

async function generateAndShow(product) {
  const model = getGeneratorModel();
  const contentEl = $("#howToUseContent");
  const retryBtn = $("#retryHowBtn");
  if (!contentEl) return;
  contentEl.className = "content loading";
  contentEl.textContent = "Generando guía...";
  retryBtn.hidden = true;
  try {
    const text = await generateHowToUse(product, model);
    contentEl.className = "content";
    contentEl.textContent = text;
  } catch (err) {
    contentEl.className = "content error";
    contentEl.textContent = "Error: " + err.message;
    retryBtn.hidden = false;
    retryBtn.onclick = () => generateAndShow(product);
  }
}

// ---------- data flow ----------
async function runTranslation() {
  const model = getTranslatorModel();
  const listStatus = $("#listStatus");
  state.translating = true;
  setStatus(listStatus, "Traduciendo títulos...", "info");
  hideRetry($("#retryTranslateBtn"));
  try {
    const results = await translateTitles(state.products, model);
    state.spanishTitles = {};
    results.forEach((r) => { state.spanishTitles[r.id] = r.title; });
    state.translateError = null;
    renderProductSelect();
    if (state.selectedId != null) renderDetails(state.selectedId);
    setStatus(listStatus, `${state.products.length} productos cargados y traducidos.`, "ok");
  } catch (err) {
    state.translateError = err.message;
    // fallback to English titles
    state.spanishTitles = {};
    state.products.forEach((p) => { state.spanishTitles[p.id] = p.title; });
    renderProductSelect();
    if (state.selectedId != null) renderDetails(state.selectedId);
    setStatus(listStatus, `Traducción fallida: ${err.message}. Se muestran títulos en inglés.`, "warn");
    showRetry($("#retryTranslateBtn"), () => runTranslation());
  } finally {
    state.translating = false;
  }
}

async function fetchProducts() {
  const listStatus = $("#listStatus");
  hideRetry($("#retryTranslateBtn"));
  setStatus(listStatus, "Cargando productos...", "info");
  try {
    const res = await fetch("https://dummyjson.com/products?limit=5");
    if (!res.ok) throw new Error(`DummyJSON ${res.status}`);
    const data = await res.json();
    state.products = (data && data.products) || [];
    if (state.products.length === 0) throw new Error("No se recibieron productos.");
    await runTranslation();
  } catch (err) {
    state.products = [];
    state.spanishTitles = {};
    renderProductSelect();
    setStatus(listStatus, `Error al cargar productos: ${err.message}`, "error");
    showRetry($("#retryTranslateBtn"), () => fetchProducts());
  }
}

// ---------- init ----------
document.addEventListener("DOMContentLoaded", () => {
  const cfg = resolveConfig();
  $("#apiKeyInput").value = cfg.key;
  populateModelSelects(cfg.freeModels, cfg.translator, cfg.generator);

  if (!cfg.key) {
    setStatus($("#globalStatus"), "Introduce tu API key de OpenRouter y pulsa 'Guardar clave'.", "warn");
  }

  $("#saveKeyBtn").addEventListener("click", () => {
    const k = ($("#apiKeyInput").value || "").trim();
    if (!k) {
      setStatus($("#globalStatus"), "La clave no puede estar vacía.", "error");
      return;
    }
    try { localStorage.setItem("or_key", k); } catch (e) { /* ignore */ }
    setStatus($("#globalStatus"), "Clave guardada en localStorage.", "ok");
  });

  $("#translatorModel").addEventListener("change", () => {
    try { localStorage.setItem("or_translator", $("#translatorModel").value); } catch (e) { /* ignore */ }
    if (state.products.length) runTranslation();
  });

  $("#generatorModel").addEventListener("change", () => {
    try { localStorage.setItem("or_generator", $("#generatorModel").value); } catch (e) { /* ignore */ }
    if (state.selectedId != null) {
      const p = state.products.find((x) => String(x.id) === String(state.selectedId));
      if (p) renderDetails(p.id);
    }
  });

  $("#productSelect").addEventListener("change", (e) => {
    const v = e.target.value;
    state.selectedId = v ? Number(v) : null;
    if (state.selectedId == null) {
      $("#detailPanel").innerHTML = '<p class="placeholder">Selecciona un producto para ver sus detalles.</p>';
    } else {
      renderDetails(state.selectedId);
    }
  });

  fetchProducts();
});