import { vehicles } from "./data.js";

createCheckboxes(vehicles);

function createCheckboxes(vehicles) {
    const nDiv = document.getElementById('tDivVehicles');

    for (const vehicle of vehicles) {
        const nCheckbox = document.createElement('input');
        nDiv.appendChild(nCheckbox);
        nCheckbox.setAttribute('type', 'checkbox');
        nCheckbox.setAttribute('id', `tChk${vehicle.key}`);
        nCheckbox.setAttribute('value', vehicle.key);

        nCheckbox.addEventListener('change', addOrRemoveVehicleToTable)
    
        const nLabel = document.createElement('label');
        nDiv.appendChild(nLabel);
        nLabel.setAttribute('for', `tChk${vehicle.key}`);
    
        const nText = document.createTextNode(vehicle.model);
        nLabel.appendChild(nText);
    }
}

function addOrRemoveVehicleToTable(e) {
    const nCheckbox = e.target;
    const key = nCheckbox.value;

    const nTbody = document.getElementById('tTbdVehicles');

    if (nCheckbox.checked) {
        const vehicle = vehicles.find(vehicle => vehicle.key === key);

        const nTr = document.createElement('tr');
        nTbody.appendChild(nTr);
        nTr.setAttribute('id', `nTr${key}`)

        const nTdBrand = document.createElement('td');
        nTr.appendChild(nTdBrand);
        nTdBrand.textContent = vehicle.model;

        const nTdImage = document.createElement('td');
        nTr.appendChild(nTdImage);
        const nImg = document.createElement('img');
        nTdImage.appendChild(nImg);
        nImg.setAttribute('src', `./photos/${vehicle.photo}`);
    } else {
        const nTr = document.getElementById(`nTr${key}`);
        nTbody.removeChild(nTr);
    }

}