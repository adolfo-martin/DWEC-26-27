import { empleados } from './empleados.js';

console.clear();
console.log('Número de emplados:', empleados.length);


function mostrarNombreCompleto(empleado, i) {
    console.log(i, `${empleado.nombre} ${empleado.apellido}`);
}

empleados.forEach(mostrarNombreCompleto);


// Devuelve todos los informáticos
// function esInformatico(empleado) {
//     if (empleado.categoria === 'informatico')
//         return true;
//     else 
//         return false;
// }

function esInformatico(empleado) {
    return empleado.categoria === 'informatico';
}

const informaticos = empleados.filter(esInformatico);
console.clear();
console.log('Número de informáticos:', informaticos.length);

// Devuelve todos los administrativos con ojos azules
function esAdministrativo(empleado) {
    return empleado.categoria === 'administrativo';
}

function tieneOjosAzules(empleado) {
    return empleado.colorOjos === 'azul';
}

const administrativosDeOjosAzules = empleados
    .filter(esAdministrativo)
    .filter(tieneOjosAzules);

console.clear();
console.log('Número de administrativos con ojos azules:', administrativosDeOjosAzules.length);