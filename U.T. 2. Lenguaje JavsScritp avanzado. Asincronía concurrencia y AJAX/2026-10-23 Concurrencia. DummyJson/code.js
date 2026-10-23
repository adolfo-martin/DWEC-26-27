const products = [1, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 33, 37];

const nTbody = document.getElementById('tTbdProducts');

// SOLUCION 1. SECUENCIAL

// for (const productId of products) {
//     const url = `https://dummyjson.com/products/${productId}?delay=1000`;
//     const response = await fetch(url);
//     const data = await response.json();
//     const product = data;

//     const nTr = document.createElement('tr');
//     nTbody.appendChild(nTr);

//     const nTdId = document.createElement('td');
//     nTr.appendChild(nTdId);
//     nTdId.textContent = product.id;

//     const nTdName = document.createElement('td');
//     nTr.appendChild(nTdName);
//     nTdName.textContent = product.title;

//     const nTdPhoto = document.createElement('td');
//     nTr.appendChild(nTdPhoto);

//     const nImage = document.createElement('img');
//     nTdPhoto.appendChild(nImage);
//     nImage.setAttribute('src', product.images[0]);
// }

// SOLUCIÓN 2. CONCURRENTE DESORDENADA

// products.forEach(async productId => {
//     const url = `https://dummyjson.com/products/${productId}?delay=1000`;
//     const response = await fetch(url);
//     const data = await response.json();
//     const product = data;

//     const nTr = document.createElement('tr');
//     nTbody.appendChild(nTr);

//     const nTdId = document.createElement('td');
//     nTr.appendChild(nTdId);
//     nTdId.textContent = product.id;

//     const nTdName = document.createElement('td');
//     nTr.appendChild(nTdName);
//     nTdName.textContent = product.title;

//     const nTdPhoto = document.createElement('td');
//     nTr.appendChild(nTdPhoto);

//     const nImage = document.createElement('img');
//     nTdPhoto.appendChild(nImage);
//     nImage.setAttribute('src', product.images[0]);
// });


// SOLUCIÓN 3. CONCURRENTE ORDENADA

async function getProductById(productId) {
    const url = `https://dummyjson.com/products/${productId}?delay=1000`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const promises = products.map(productId => getProductById(productId));
const productsAux = await Promise.all(promises);

productsAux.forEach(product => {
    const nTr = document.createElement('tr');
    nTbody.appendChild(nTr);

    const nTdId = document.createElement('td');
    nTr.appendChild(nTdId);
    nTdId.textContent = product.id;

    const nTdName = document.createElement('td');
    nTr.appendChild(nTdName);
    nTdName.textContent = product.title;

    const nTdPhoto = document.createElement('td');
    nTr.appendChild(nTdPhoto);

    const nImage = document.createElement('img');
    nTdPhoto.appendChild(nImage);
    nImage.setAttribute('src', product.images[0]);
});