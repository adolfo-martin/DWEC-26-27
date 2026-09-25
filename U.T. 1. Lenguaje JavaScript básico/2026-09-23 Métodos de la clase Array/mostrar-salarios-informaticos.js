import { empleados } from './empleados.js';


// function mostrarNombreCompleto(empleado) {
//     return { 
//         nombre: `${empleado.nombre} ${empleado.apellido}`,
//         salario: salarioBruto,
//     }
// }

const sumaSalariosInformaticos = empleados
    .filter(({categoria}) => categoria === 'informatico')
    .map(empleado => ({ 
        nombre: `${empleado.nombre} ${empleado.apellido}`,
        salario: empleado.salarioBruto,
    }))
    .reduce((acc, cur) => acc += cur.salario, 0);

console.table(informaticos);



//.filter(empleado => empleado.categoria === 'informatico')
 