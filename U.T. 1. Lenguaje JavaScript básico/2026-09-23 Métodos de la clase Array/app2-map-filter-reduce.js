import { empleados } from './empleados.js';

// mapear es cambiar cada elemento del array por otro elemento
// function obtenerNombreCompleto(empleado) {
//     return `${empleado.nombre} ${empleado.apellido}`;
// }

const obtenerNombreCompleto = empleado => `${empleado.nombre} ${empleado.apellido}`;


const nombres = empleados.map(obtenerNombreCompleto);
console.log(nombres);
console.log(nombres.length);


function obtenerNombreYSalario(empleado) {
    return {
        nombre: `${empleado.nombre} ${empleado.apellido}`, 
        salario: empleado.salarioBruto
    };
}

const nombresYsalarios = empleados.map(obtenerNombreYSalario);
console.clear();
console.log(nombresYsalarios);

// Mostrar nombre y correo electrónico de los gerentes
const nombreYCorreoElectronico = empleado => ({ 
    nombre: `${empleado.nombre} ${empleado.apellido}`, 
    correo: empleado.correoElectronico 
});

const esGerente = empleado => empleado.categoria === 'gerente';

const gerentes = empleados
    .filter(esGerente)
    .map(nombreYCorreoElectronico);

console.clear();
console.table(gerentes);


console.clear();
const ordenarPorSalario = (empleado1, empleado2) => empleado1.salario - empleado2.salario;
console.table(nombresYsalarios.sort(ordenarPorSalario));