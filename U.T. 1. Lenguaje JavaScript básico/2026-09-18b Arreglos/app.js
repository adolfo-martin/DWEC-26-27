// Primera forma. Literal de arreglo
let diasSemana = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo',
];

console.clear();
console.log(diasSemana);
console.table(diasSemana);


// Segunda forma. Indicando la posición
var frutas = [];
frutas[0] = 'Pera';
frutas[1] = 'Manzana';
frutas[2] = '🍌';
frutas[5] = 'Kiwi';
frutas[6] = '🍉';

console.log(frutas);
console.table(frutas);


// Tercera forma. Clase Array
const alumnos = new Array();
alumnos.push('José Iver');
alumnos.push('Francisco');
alumnos.push('Adrián', 'Aymen', 'Miguel');
alumnos.push('Daniel');
alumnos.unshift('Álvaro', 'Francisco 2');
// operador spread
alumnos.push(...['Alexander', 'Belzunces']);
console.table(alumnos);


// Cuarta forma. Array asociativo
let mesesDelAño = [];
mesesDelAño['en'] = 'enero';
mesesDelAño['fe'] = 'febrero';
mesesDelAño['ma'] = 'marzo';
mesesDelAño['ab'] = 'abril';
mesesDelAño['my'] = 'mayo';
mesesDelAño['ju'] = 'junio';
mesesDelAño['jl'] = 'julio';
console.table(mesesDelAño);
console.log(mesesDelAño['my']);
console.log(mesesDelAño[4]);
