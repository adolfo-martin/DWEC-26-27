await retrieveAndShowJoke()

async function retrieveAndShowJoke() {
    const url = 'https://api.chucknorris.io/jokes/random';
    const response = await fetch(url);
    const data = await response.json();
    const joke = data.value;
    document.getElementById('tParJoke').textContent = joke;
}
