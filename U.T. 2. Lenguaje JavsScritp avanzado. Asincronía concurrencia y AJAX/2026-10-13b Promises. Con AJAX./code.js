// AJAX - Asynchronous JavaScript And XML

// const response = fetch('https://pokeapi.co/api/v2/pokemon');
// console.log(response);

// FORMA ANTIGUA

// fetch devuelve una promesa.
// Accedemos al resultado de la promesa empleando el método then pasando un callback.
// Necesitamos un segundo then para procesar correctamente el json.

// fetch('https://pokeapi.co/api/v2/pokemo')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

// fetch('https://pokeapi.co/api/v2/pokemon')
//     .then(response => response.json())
//     .then(data => console.log(data));

// console.log('FIN');

// FORMA MODERNA - async/await

// Una función asíncrona devuelve una promesa
async function retrievePokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    return data;
}

const data = await retrievePokemons();
console.log(data);
console.log('FIN');
