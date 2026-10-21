const pokemons = await getPokemons();
// console.clear();
console.table(pokemons);

// async function getPokemons() {
//     const url = 'https://pokeapi.co/api/v2/pokemon';
//     const response = await fetch(url);
//     const data = await response.json();
//     const pokemons = data.results;
//     return pokemons;
// }

// async function getPokemons() {
//     const url = 'https://pokeapi.co/api/v2/pokemon';
//     const response = await fetch(url);
//     const data = await response.json();

//     const pokemons = [];
//     for (const pokemon of data.results) {
//         const response = await fetch(pokemon.url);
//         const data = await response.json();
//         const pokemonAux = {
//             id: data.id,
//             name: data.name,
//             height: data.height,
//             weight: data.weight,
//             // image: data.sprites.other.home.front_default,
//         };
//         pokemons.push(pokemonAux);
//         console.log(pokemonAux);
//     }

//     return pokemons;
// }

async function getPokemonByUrl(url) {
    const response = await fetch(url);
    const data = await response.json();
    const pokemon = {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        image: data.sprites.other.home.front_default,
    };
    return pokemon;
}

// async function getPokemons() {
//     const url = 'https://pokeapi.co/api/v2/pokemon';
//     const response = await fetch(url);
//     const data = await response.json();

//     const pokemons = [];
//     for (const pokemon of data.results) {
//         const pokemonAux = await getPokemonByUrl(pokemon.url);
//         pokemons.push(pokemonAux);
//         console.log(pokemonAux);
//     }

//     return pokemons;
// }

// async function getPokemons() {
//     const url = 'https://pokeapi.co/api/v2/pokemon';
//     const response = await fetch(url);
//     const data = await response.json();

//     const pokemons = [];
//     data.results.forEach(async pokemon => {
//         const pokemonAux = await getPokemonByUrl(pokemon.url);
//         pokemons.push(pokemonAux);
//         console.log(pokemonAux);
//     });

//     return pokemons;
// }

async function getPokemons() {
    const url = 'https://pokeapi.co/api/v2/pokemon';
    const response = await fetch(url);
    const data = await response.json();

    const promises = data.results.map(pokemon => getPokemonByUrl(pokemon.url));
    const pokemons = await Promise.all(promises);
    return pokemons;
}