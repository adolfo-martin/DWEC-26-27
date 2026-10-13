
import ollama from '/node_modules/ollama/dist/browser.mjs';

await setup();

async function setup() {
  const bromaEnIngles = await conseguirBroma();
  const bromaEnEspanol = await traducirTexto(bromaEnIngles);
  console.log(bromaEnEspanol);
}


async function conseguirBroma() {
  const url = 'https://api.chucknorris.io/jokes/random';
  const response = await fetch(url);
  const data = await response.json();
  return data.value;
}

async function traducirTexto(textoATraducir) {
  const promptSistema = `Actúa como un traductor profesional. Traduce el siguiente texto del inglés al español manteniendo el tono original. No agregues explicaciones, notas, ni comentarios, devuelve única y exclusivamente el texto traducido.`;

  try {
    const response = await ollama.chat({
      model: 'translategemma:4b',
      messages: [
        { role: 'system', content: promptSistema },
        { role: 'user', content: textoATraducir }
      ],
      options: {
        temperature: 0.1 // Temperatura baja para evitar que invente texto
      }
    });

    return response.message.content;
  } catch (error) {
    console.error("Error al conectar con Ollama:", error);
    throw error;
  }
}