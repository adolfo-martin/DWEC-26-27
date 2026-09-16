'use strict';

console.clear();

var nombre = "Adolfo";
var apellidos = 'Martín González';
var poblacion = `Lorca`;
var pais = 'España 🇪🇸';
var edad = 15;

var mensaje1 = 'Hola, soy ' + nombre + ' ' + apellidos + '. Vivo en ' + poblacion + '. Nací en ' + pais + '. Tengo ' + edad + ' años.';
console.log(mensaje1);

// Interpolación de cadenas
var mensaje2 = `Hola, soy ${nombre} ${apellidos}. Vivo en ${poblacion}. Nací en ${pais}. Tengo ${edad} años.`;
console.log(mensaje2);

var mensaje3 = `Hola, soy ${nombre + ' ' + apellidos}. 
\tVivo en ${poblacion}. 
\nNací en ${pais}. 
Tengo ${edad} años.
Soy ${edad <18 ? 'menor' : 'mayor'} de edad.
`;
console.log(mensaje3);