'use strict';

// 1. Le quitamos el nombre
// 2. Le ponemos la flecha entre el paréntesis y la llave
// 3. Quitamos la palabra function
// 4. Si la función tiene un único parámetro, podemos quitar los paréntesis
// 5. Si la función tiene una única línea de código, podemos quitar las llaves y el punto y coma
// 6. Si la función tiene una única línea de código, la subimos
// 7. Si no hay llaves y hay un return, quitamos el return.

function calcularFactorial(numero) {
    if (numero === 1) {
        return 1;
    } else {
        return numero * calcularFactorial(numero - 1);
    }
}

// Solución 1
const calcularFactorial2 = numero => {
    if (numero === 1) {
        return 1;
    } else {
        return numero * calcularFactorial2(numero - 1);
    }
}

// Solución 2
const calcularFactorial3 = numero => numero === 1 ? 1 : numero * calcularFactorial3(numero - 1);


console.log(calcularFactorial(1));
console.log(calcularFactorial(2));
console.log(calcularFactorial2(5));
console.log(calcularFactorial3(100));