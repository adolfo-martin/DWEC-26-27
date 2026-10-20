
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
    try {
        const response = await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'translategemma:4b',
                messages: [
                    {
                        role: 'system',
                        content: 'Translate the following text from English to Spanish. Return ONLY the translation.'
                    },
                    {
                        role: 'user',
                        content: textoATraducir
                    }
                ],
                stream: false, // Desactiva el streaming para recibir la respuesta completa de golpe
                options: {
                    temperature: 0.1
                }
            })
        });

        const data = await response.json();
        console.log("Traducción:", data.message.content);
    } catch (error) {
        console.error("Error:", error);
    }
}