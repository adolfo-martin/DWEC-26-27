
// const categories = [
//     {id: 'patos', name: 'Patos'},
//     {id: 'gatos', name: 'Gatos'},
//     {id: 'perros', name: 'Perros'},
// ];

import TranslateService from "./translate-service.js";
import DummyRestService from "./dummy-rest-service.js";
import { openSpinner, closeSpinner } from "./spinner.js";

await setup();

async function setup() {
    try {
        openSpinner();
        const service = new DummyRestService();
        const categories = await service.getCategories();
        await renderTableCategories(categories);
    } catch (error) {
        alert(error.message);
    } finally {
        closeSpinner();
    }
}


// function renderTableCategories(categories) {
//     const nTbody = document.querySelector('#tTabCategories>tbody');

//     categories.forEach(async ({id, name}) => {        
//         const service = new TranslateService();
//         const nameInSpanish = await service.translateFromEnglishToSpanish(name);

//         const nTr = nTbody.appendChild(document.createElement('tr'));
//         /* handler - manejador */

//         const nTdName = nTr.appendChild(document.createElement('td'));
//         nTdName.textContent = nameInSpanish;
//         // nTdName.setAttribute('data-category', id);
//         nTdName.dataset.category = id;
//         nTdName.addEventListener('click', categoryClickedHandler);

//         const nTdPhoto = nTr.appendChild(document.createElement('td'));
//         nTdPhoto.textContent = name;
//     });
// }


async function renderTableCategories(categories) {
    const nTbody = document.querySelector('#tTabCategories>tbody');

    const service = new TranslateService();
    const promises = categories.map(category => service.translateFromEnglishToSpanish(category.name));
    const namesInSpanish = await Promise.all(promises);

    categories.forEach(async ({id, name}, i) => {        
        const nTr = nTbody.appendChild(document.createElement('tr'));
        /* handler - manejador */

        const nTdName = nTr.appendChild(document.createElement('td'));
        nTdName.textContent = namesInSpanish[i];
        nTdName.dataset.category = id;
        nTdName.addEventListener('click', categoryClickedHandler);

        const nTdPhoto = nTr.appendChild(document.createElement('td'));
        nTdPhoto.textContent = name;
    });
}



async function categoryClickedHandler(e) {
    // const nTd = e.target;
    // const categoryId = nTd.getAttribute('data-category');
    const categoryId = e.target.dataset.category;
    
    const service = new DummyRestService();
    openSpinner();
    const products = await service.getProductsByCategory(categoryId);
    await renderTableProducts(products);
    closeSpinner();
}

async function renderTableProducts(products) {
    const service = new TranslateService();
    const promises = products.map(product => service.translateFromEnglishToSpanish(product.name));
    const namesInSpanish = await Promise.all(promises);

    const nTbody = document.querySelector('#tTabProducts>tbody');
    nTbody.innerHTML = '';

    products.forEach(({id, name, price, image}, i) => {
        const nTr = nTbody.appendChild(document.createElement('tr'));
        
        const nTdName = nTr.appendChild(document.createElement('td'));
        nTdName.textContent = namesInSpanish[i];
        
        const nTdPrice = nTr.appendChild(document.createElement('td'));
        nTdPrice.textContent = price;

        const nTdPhoto = nTr.appendChild(document.createElement('td'));
        const nImg = nTdPhoto.appendChild(document.createElement('img'));
        nImg.src = image;
    });
}