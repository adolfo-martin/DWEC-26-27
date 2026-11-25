import { DummyService } from "../services/dummy.service.js";

await setup();

async function setup() {
    // Ponemos bien el número de elementos en la cesta
    document.querySelector('#tSpnCart').dataset.quantity = (JSON.parse(window.localStorage.getItem('cart')) ?? []).length;
    document.querySelector('#tSpnCart').addEventListener('mouseover', showCart);
    document.querySelector('#tSpnCart').addEventListener('click', _ => {
        window.location = './cart.html';
    });

    const token = checkToken();
    const categoryId = extractCategoryFromUrl();
    if (categoryId) {
        document.querySelector('#tH1Category').textContent = `Productos de la categoría ${categoryId}`;
        try {
            const products = await (new DummyService()).retrieveProductsByCategory(token, categoryId, 0, 5);
            renderProducts(products);
        } catch (error) {
            alert('Hay un problema: ' + error.message);
        }
    } else {

    }
}

function showCart() {
    const cart = JSON.parse(window.localStorage.getItem('cart')) ?? [];
    const nTbody = document.querySelector('#tSpnCart+table>tbody');
    nTbody.innerHTML = '';
    cart.forEach(item => {
        nTbody.innerHTML += `
            <tr>
                <td>${item.title}</td>
                <td>${item.price}</td>
            </tr>
        `;
    })
}

function checkToken() {
    const encodedToken = window.localStorage.getItem('token-2026-11-24');

    if (!encodedToken) {
        alert('La sesión no es válida. Será enviado a la página de inicio');
        window.location = './index.html';
        return;
    }

    // Actualizamos la cabecera mostrando el nombre del usuario

    return encodedToken;
}

function extractCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    return category;
}

function renderProducts(products) {
    const nTbody = document.querySelector('#tTabProducts>tbody');

    products.forEach(product => {
        const nTr = nTbody.appendChild(document.createElement('tr'));

        const nTdTitle = nTr.appendChild(document.createElement('td'));
        nTdTitle.textContent = product.title;

        const nTdImage = nTr.appendChild(document.createElement('td'));
        const nImage = nTdImage.appendChild(document.createElement('img'));
        nImage.src = product.thumbnail;

        const nTdCheckbox = nTr.appendChild(document.createElement('td'));
        const nCheckbox = nTdCheckbox.appendChild(document.createElement('input'));
        nCheckbox.type = 'checkbox';
        nCheckbox.id = `tChk${product.id}`;
        nCheckbox.dataset.productId = product.id;
        nCheckbox.dataset.productTitle = product.title;
        nCheckbox.dataset.productPrice = product.price;

        nCheckbox.addEventListener('change', e => {
            const nCheckbox = e.target;
            const product = {
                id: parseInt(nCheckbox.dataset.productId),
                title: nCheckbox.dataset.productTitle,
                price: nCheckbox.dataset.productPrice,
            };

            // Deserializo la cesta porque era un array
            // let cart = JSON.parse(window.localStorage.getItem('cart'));
            // if (!cart) {
            //     cart = [];
            // }
            // let cart = JSON.parse(window.localStorage.getItem('cart')) || [];

            // Nullish coalescing
            /** @type { Array<number> } */
            let cart = JSON.parse(window.localStorage.getItem('cart')) ?? [];

            if (nCheckbox.checked) {
                cart.push(product);
            } else {
                cart.splice(cart.indexOf(productId), 1);
            }
            // Serializo la cesta porque es un array
            window.localStorage.setItem('cart', JSON.stringify(cart));
            document.querySelector('#tSpnCart').dataset.quantity = cart.length;
        });
 
    });
}