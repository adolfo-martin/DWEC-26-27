'use strict';

const frutas = new Array();
frutas.push('pera', '🍌', '🍉');
frutas.push('naranja');
frutas.push('limón', '🥑', 'melón');

console.clear();
console.log(frutas.length);
console.table(frutas);

// Primera forma. Bucle de toda la vida
for (let i=1; i<=frutas.length; i++) {
    console.log(i, frutas[i-1]);
}

console.clear();
// Segunda forma. Foreach de posición o tipo in
for (let i in frutas) {
    console.log(i, frutas[i]);
}

// Tercera forma. Forach de tipo of
for (let fruta of frutas) {
    console.log(fruta);
}

// Cuarta forma. Métodos de la clase Array.
// Forma 4.1
console.clear();
function mostrarFruta(fruta) {
    console.log(fruta);
}

frutas.forEach(mostrarFruta); //callback

// Forma 4.2. La función no se usa en otros sitios
console.clear();

frutas.forEach(function mostrarFruta(fruta) {
    console.log(fruta);
});

// Forma 4.3. La función es anónima
console.clear();

frutas.forEach(function(fruta) {
    console.log(fruta);
});

// Forma 4.4. La función se expresa como función lambda (flecha)
console.clear();

// 1. Le quitamos el nombre
// 2. Le ponemos la flecha entre los paréntesis y la llave
// 3. Quitamos la palabra reservada function
// 4. Si la función tiene un único parámetro, podemos quitar los paréntesis
// 5. Si la función tiene una única línea de código, podemos quitar las llaves y el punto y coma
// 6. Si la función tiene una única línea de código, subimos la línea
// 7. Si no hay llaves y hay un return, quitamos el return 

frutas.forEach( fruta => console.log(fruta) );

// Forma 4.5. Podemos guarda la lambda en una variable para que se sepa lo que hace
console.clear();
const mostrarFruta2 = fruta => console.log(fruta);
frutas.forEach( mostrarFruta2 );