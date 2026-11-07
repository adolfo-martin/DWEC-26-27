# OpenRouter Product Viewer

Pequeña demo de frontend (sin backend) que consume la API de OpenRouter desde el navegador:

- Obtiene 5 productos de DummyJSON.
- Traduce los títulos al español con un modelo gratuito de OpenRouter (Modelo A).
- Al seleccionar un producto, muestra sus detalles y genera una guía "cómo usar" en español con un segundo modelo gratuito (Modelo B).

## Requisitos

- Navegador moderno.
- Python 3 (para servir los archivos estáticos) o cualquier servidor estático.
- Una API key de OpenRouter (https://openrouter.ai/keys). Incluso los modelos `:free` requieren clave.

## Configuración

1. Copia `config.example.js` a `config.local.js` (este último está en `.gitignore`):

   ```bash
   cp config.example.js config.local.js
   ```

2. Edita `config.local.js` y pon tu clave:

   ```js
   window.OPENROUTER_API_KEY = "sk-or-v1-...";
   window.TRANSLATOR_MODEL = "google/gemma-4-31b-it:free";
   window.GENERATOR_MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";
   ```

   Si no usas `config.local.js`, la app te pedirá la clave en la página y la guardará en `localStorage`.

## Ejecutar

```bash
python3 -m http.server 8000
```

Abre http://localhost:8000 en el navegador.

> No abras `index.html` directamente con `file://`: aunque las APIs tienen CORS abierto, es más fiable usar el servidor estático.

## Notas de seguridad

La clave de OpenRouter se envía desde el navegador y es visible en DevTools. Este proyecto es solo para aprendizaje; no lo uses en producción ni compartas la clave. `config.local.js` está en `.gitignore` para no commitearla.

## Cambiar de modelo

Edita `TRANSLATOR_MODEL` / `GENERATOR_MODEL` en `config.local.js` (o usa los desplegables de la página). Modelos gratuitos disponibles (lista curada en `config.example.js`); la disponibilidad cambia, consulta https://openrouter.ai/models.

## Caché

Las traducciones y las guías "cómo usar" se cachean en `localStorage` por modelo y producto para no repetir llamadas (y respetar los rate limits de los modelos gratuitos). Si cambias de modelo, se usan claves de caché distintas.

## Estructura

- `index.html` — marcado
- `styles.css` — estilos (CSS plano)
- `app.js` — lógica (fetch, OpenRouter, traducción, generación, caché)
- `config.example.js` / `config.local.js` — configuración
- `openspec/` — propuesta, diseño, specs y tareas del cambio