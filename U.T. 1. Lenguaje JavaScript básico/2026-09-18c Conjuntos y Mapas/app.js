// Conjuntos
const frutas = new Set();
frutas.add('manzana');
frutas.add('pera');
frutas.add('manzana');
frutas.add('pera');
frutas.add('melón');
frutas.add('fresa');
frutas.add('melón');

console.clear();
console.log(frutas.size);
console.table(frutas);