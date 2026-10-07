import { vehicles } from './data.js';

fillSelectVehicles(vehicles);

function fillSelectVehicles(vehicles) {
    const nSelect = document.getElementById('tSelVehicles');
    nSelect.addEventListener('change', showPhoto);

    for (const vehicle of vehicles) {
        const nOption = document.createElement('option');
        nSelect.appendChild(nOption);
        nOption.setAttribute('value', vehicle.key);
    
        const nText = document.createTextNode(vehicle.model);
        nOption.appendChild(nText);
    }
}

// Toda función asociada a un evente recibe automáticamente como primer 
// argumento el evento
function showPhoto(e) {
    // console.log(e);
    const nImg = document.getElementById('tImgVehicle');
    // La propiedad target almacena la etiqueta que lanzo el evento
    const nSelect = e.target;
    // La propiedad value me devuelve el value del option seleccionado
    const vehicleKey = nSelect.value;
    console.log(vehicleKey);

    const vehicle = vehicles.find(vehicle => vehicle.key === vehicleKey);
    nImg.setAttribute('src', `./photos/${vehicle.photo}`);
}