import { DummyService } from "/services/dummy-service.js";

await showProductNameInTitle();

async function showProductNameInTitle() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    
    const service = new DummyService();
    const product = await service.getProductById(productId);
    console.log(product);
    
    document.querySelector('#tH2Producto').textContent = product.title;
}