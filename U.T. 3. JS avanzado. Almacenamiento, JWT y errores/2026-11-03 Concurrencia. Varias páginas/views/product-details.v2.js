import { DummyService } from "/services/dummy-service.js";

await showProductNameInTitle();
await showDetails();

async function showProductNameInTitle() {
    const productId = parseInt(window.localStorage.getItem('product-id'));
    
    const service = new DummyService();
    const product = await service.getProductById(productId);
    
    document.querySelector('#tH2Producto').textContent = product.title;
}

async function showDetails() {
    const productId = parseInt(window.localStorage.getItem('product-id'));
    
    const service = new DummyService();
    const product = await service.getProductById(productId);

    const productAsString = JSON.stringify(product);
    window.localStorage.setItem('product', productAsString);

    const theProduct = JSON.parse(productAsString);
    
    document.querySelector('#tImgProduct').src = product.thumbnail;
    document.querySelector('#tTxtPrice').value = product.price;
}