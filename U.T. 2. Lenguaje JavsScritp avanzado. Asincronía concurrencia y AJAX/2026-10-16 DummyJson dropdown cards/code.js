const categories = await retrieveCategories();
fillSelectCategories(categories);

async function retrieveCategories() {
    const url = 'https://dummyjson.com/products/categories';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function fillSelectCategories(categories) {
    const nSelect = document.getElementById('tSelCategories');
    nSelect.addEventListener('change', mostrarProductosDeLaCategoria);

    for (const category of categories) {
        const nOption = document.createElement('option');
        nSelect.appendChild(nOption);
        nOption.setAttribute('value', category.slug);
        nOption.textContent = category.name;
    }
}

async function mostrarProductosDeLaCategoria(e) {
    const nSelect = e.target;
    const categoryId = nSelect.value;

    const products = await recuperarProductosDeLaCategoria(categoryId);

    const nSection = document.getElementById('tSctProducts');
    // nSection.textContent = ''; // createTextNode
    // nSection.innerText = '';   // createTextNode
    nSection.innerHTML = '';

    // while (nSection.hasChildNodes()) {
    //     nSection.removeChild(nSection.lastChild);
    // }

    for (const product of products) {
        const nArticle = document.createElement('article');
        nSection.appendChild(nArticle);
        
        const nHeader = document.createElement('header');
        nArticle.appendChild(nHeader);
        nHeader.textContent = product.title;

        const nImage = document.createElement('img');
        nArticle.appendChild(nImage);
        nImage.setAttribute('src', product.images[0]);

        const nPrice = document.createElement('div');
        nArticle.appendChild(nPrice);
        nPrice.textContent = product.price + '$';
    }
}

async function recuperarProductosDeLaCategoria(categoryId) {
    const url = 'https://dummyjson.com/products/category/' + categoryId;
    const response = await fetch(url);
    const data = await response.json();
    return data.products;
}

