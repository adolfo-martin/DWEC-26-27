await setup();

async function setup() {
    const jokeInEnglish = await retrieveJoke();
    const jokeInSpanish = await translateFromEnglishToSpanish(jokeInEnglish);
    document.getElementById('tParJoke').textContent = jokeInSpanish;
}

async function retrieveJoke() {
    const url = 'https://api.chucknorris.io/jokes/random';
    const response = await fetch(url);
    const data = await response.json();
    const joke = data.value;
    return joke;
}

async function translateFromEnglishToSpanish(sentenceInEnglish) {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=' + sentenceInEnglish;
    const response = await fetch(url);
    const data = await response.json();
    const translatedSentence = data[0][0][0];
    return translatedSentence;
}