const url = 'https://pokeapi.co/api/v2/pokemon';
const response = await fetch(url);
const data = await response.json();

const pokemons = data.results;

const nOl = document.getElementById('tOlPokemons');

for (const pokemon of pokemons) {
    const nLi = document.createElement('li');
    nOl.appendChild(nLi);
    // textContent me ahorra emplear createTextNode
    nLi.textContent = pokemon.name;
}