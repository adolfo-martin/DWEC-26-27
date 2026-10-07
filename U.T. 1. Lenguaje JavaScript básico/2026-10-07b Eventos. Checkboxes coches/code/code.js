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
    
        const nLabel = document.createElement('label');
        nDiv.appendChild(nLabel);
        nLabel.setAttribute('for', `tChk${vehicle.key}`);
    
        const nText = document.createTextNode(vehicle.model);
        nLabel.appendChild(nText);
    }
}