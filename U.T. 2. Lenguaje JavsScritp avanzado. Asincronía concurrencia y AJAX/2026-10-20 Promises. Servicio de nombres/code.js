setupButton();
setupRange();

function setupRange() {
    const nRange = document.getElementById('tRngQuantity');
    nRange.addEventListener('change', updateQuantity);

    function updateQuantity(e) {
        const quantity = nRange.value;
        document.getElementById('tNumQuantity').value = quantity;
    }
}

function setupButton() {
    document.getElementById('tButNames').addEventListener('click', retrieveNames);
}

async function retrieveNames(e) {
    const quantity = parseInt(document.getElementById('tRngQuantity').value);

    let genres = 'both';
    if (document.getElementById('tRadMale').checked) {
        genres = 'male';
    } else if (document.getElementById('tRadFemale').checked) {
        genres = 'female';
    }

    try {
        const url = `https://namey.muffinlabs.com/name.json?count=${quantity}&type=${genres}`;
        const response = await fetch(url);
        const data = await response.json();
        renderNames(data);
    } catch(e) {
        alert(e.message);
    }
}

// renderNames(['Francisco', 'José Iver', 'Miguel']);

function renderNames(names) {
    const nOl = document.getElementById('tOlNames');
    nOl.innerHTML = '';

    names.forEach(name => nOl.appendChild(document.createElement('li')).textContent = name);
}