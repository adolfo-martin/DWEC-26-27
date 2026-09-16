'use strict';

console.clear();
console.log('En JavaScript, las funciones son ciudadanos de primera clase.');


function esMayorDeEdad(edad) {
    return edad <= 18 ? true : false;
}


function devolverSiete() {
    return 7;
}

console.log(devolverSiete);
console.log(devolverSiete());

let getSeven = devolverSiete;
console.log(getSeven);
console.log(getSeven());

//-------------------------------------
function sumar(numero1, numero2) {
    return numero1 + numero2;
}

function restar(numero1, numero2) {
    return numero1 - numero2;
}

function operarYMostrarResultado(operacion, numero1, numero2) {
    let resultado = operacion(numero1, numero2);
    console.log(resultado);
}

// callback: una función que se pasa como argumento a otra función
operarYMostrarResultado(sumar, 2, 3);
operarYMostrarResultado(restar, 10, 1);