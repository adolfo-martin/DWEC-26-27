import { empleados } from "./empleados.js";

// const categorias = empleados.map(function(empleado){ return empleado.categoria});
// console.table(categorias);

// const categorias = empleados.map(empleado => empleado.categoria);
// console.table(categorias);

// const categorias = Array.from(new Set(empleados.map(({categoria}) => categoria)));
// console.table(categorias);

// Ahora uso el operador spread ...
const categorias = [...new Set(empleados.map(({categoria}) => categoria))];
console.table(categorias);

// const [ primeraCategoria, segundaCategoria ] = categorias;
// console.log(primeraCategoria, segundaCategoria);

// const [ primeraCategoria, , terceraCategoria ] = categorias;
// console.log(primeraCategoria, terceraCategoria);

const [ primeraCategoria, segundaCategoria, ...otras ] = categorias;
console.log(primeraCategoria, segundaCategoria, otras);

const catagorias2 = [segundaCategoria, ...otras, primeraCategoria];
console.table(catagorias2);