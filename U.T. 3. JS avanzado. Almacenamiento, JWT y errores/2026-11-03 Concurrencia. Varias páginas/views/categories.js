import { DummyService } from "../services/dummy-service.js";

const service = new DummyService();
const categories = await service.getCategories();

const nSection = document.querySelector('#tSctCategories');
categories.forEach(category => {
    const nArticle = nSection.appendChild(document.createElement('article'));
    nArticle.classList.add('card-category');
    nArticle.dataset.category = category.id;
    nArticle.addEventListener('click', cardClickedHandler);

    const nHeader = nArticle.appendChild(document.createElement('header'));
    const nAnchor = nHeader.appendChild(document.createElement('a'));
    nAnchor.setAttribute('href', `http://127.0.0.1:5500/views/products.html?category=${category.id}`);
    nAnchor.textContent = category.name;

    const nImage = nArticle.appendChild(document.createElement('img'));
    // nImage.src = 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp';
    nImage.src = category.image;
});

function cardClickedHandler(e) {
    const nCard = e.currentTarget;
    // const categoryId = nCard.getAttribute('data-category');
    const categoryId = nCard.dataset.category;

    // Guardamos la categoría en LocalStorage
    window.localStorage.setItem('category', categoryId);

    // Reenvío empleando la sintaxis de JavaScript
    window.location = `http://127.0.0.1:5500/views/products.html?category=${categoryId}`;

    // window.location = `http://www.google.es?category=${categoryId}`;
    // window.localStorage.setItem('alumno', 'Adolfo');

    window.localStorage.setItem('edad', 25);
    window.localStorage.setItem('mayor-de-edad', true);
    // Serializar
    window.localStorage.setItem('alumno', JSON.stringify({nombre: 'Adolfo', apellido: 'Martín'}));

    window.sessionStorage.setItem('alumno', JSON.stringify({nombre: 'Adolfo', apellido: 'Martín'}));

}