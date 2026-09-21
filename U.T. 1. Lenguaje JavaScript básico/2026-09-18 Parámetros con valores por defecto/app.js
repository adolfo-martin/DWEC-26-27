'use strict';

console.clear();

function mostrarMensaje(
    nombre = 'Adolfo',
    apellidos = 'Martín González', 
    poblacion = 'Lorca', 
    pais = 'España'
) {
    console.log(`Hola, soy ${nombre} ${apellidos}. Vivo en ${poblacion} y nací en ${pais}`);
}

mostrarMensaje();
mostrarMensaje('María', 'Sánchez López');
mostrarMensaje(undefined, 'Pérez Giménez', undefined, 'Francia')

// esto funciona en Python pero no en JavaScript
// mostrarMensaje(pais = 'Alemania', nombre = 'Gunter');