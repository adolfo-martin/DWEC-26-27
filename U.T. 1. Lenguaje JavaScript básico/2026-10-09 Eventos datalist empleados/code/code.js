import { empleados } from "./empleados.js";

setup();

function setup() {
    llenarListaEmpleados(empleados);
    configurarEmpleadoCambido(); 
}

function configurarEmpleadoCambido() {
    const nText = document.getElementById('eTxtEmpleado');
    nText.addEventListener('change', llenarDetalleEmpleado);
}

function llenarDetalleEmpleado(e) {
    const nText = e.target;
    const dniEmpleado = parseInt(nText.value);

    // const dniEmpleado = parseInt(e.target.value);

    // const empleado = empleados.find( empleado => empleado.dni === dni);
    // document.getElementById('eTxtNombre').setAttribute('value', empleado.nombre);
    // document.getElementById('eTxtApellido').setAttribute('value', empleado.apellido);
    // document.getElementById('eTxtEdad').setAttribute('value', empleado.edad);
    // document.getElementById('eTxtCategoria').value = empleado.categoria;
    // document.getElementById('eTxtSalario').value = empleado.salarioBruto;

    const { nombre, apellido, edad, categoria, salarioBruto: salario } = empleados.find( ({dni}) => dni === dniEmpleado);

    document.getElementById('eTxtNombre').setAttribute('value', nombre);
    document.getElementById('eTxtApellido').setAttribute('value', apellido);
    document.getElementById('eTxtEdad').setAttribute('value', edad);
    document.getElementById('eTxtCategoria').value = categoria;
    document.getElementById('eTxtSalario').value = salario;

    // nText.setAttribute('value', `${empleado.nombre} ${empleado.apellido}`);
    // nText.value = `${empleado.nombre} ${empleado.apellido}`;
    nText.value = `${nombre} ${apellido}`;
}

/**
 * Recorre el arrego y añade el empleado a la lista.
 * @param { [{ dni: number, nombre: string, apellido: string }] } empleados El arreglo de empleados.
 * @returns { undefined }
 */
function llenarListaEmpleados(empleados) {
    const nDatalist = document.getElementById('eDtlsEmpleados');

    empleados.forEach( empleado => {
        const nOption = document.createElement('option');
        nDatalist.appendChild(nOption);
        nOption.setAttribute('value', empleado.dni);
        nOption.setAttribute('label', `${empleado.nombre} ${empleado.apellido}`);
    });
}