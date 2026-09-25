// desestructurar nos permite extraer a mas de una variable partes de un objeto complejo en una única línea

const person = {
    firstname: 'Adolfo',
    lastname: 'Martín',
    age: 36, 
    eyes: 'green',
    height: 195,
    weight: 84,
}

// const height = person.height;
// const weight = person.weight;

// Desestructuración de objetos
// const { height, weight } = person;
// console.log(height, weight);

// const { height: altura, weight: masa } = person;
// console.log(altura, masa);

// Operador rest ... permite guardar en una variable todas las propiedades que no hemos usado
const { firstname, eyes, ...rest } = person;
console.log(firstname, eyes, rest);

// Operador spread ... permite descomponer un elemento en todas sus partes
const teacher = {...person, subjects: ['dwec', 'diw'], departament: 'tic'};
console.log(teacher);

// function getFullname(person) {
//     return `${person.firstname} ${person.lastname}`;
// }

function getFullname({firstname, lastname}) {
    return `${firstname} ${lastname}`;
}

console.clear();
console.log(getFullname(person));


function conseguirMasaCorporal({height: altura, weight: masa, ...resto}) {
    return masa / Math.pow(altura/100, 2);
}