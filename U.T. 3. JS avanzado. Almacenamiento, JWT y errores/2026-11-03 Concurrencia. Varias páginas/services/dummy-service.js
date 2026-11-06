import { CategoryModel } from "../models/category.model.js";

export class CategoryDTO {
    #slug;
    #name;

    constructor(slug, name) {
        this.#slug = slug;
        this.#name = name;
    }

    get slug() {
        return this.#slug;
    }

    get name() {
        return this.#name;
    }
}

export class DummyService {
    static BASE_URL = 'https://dummyjson.com/products/';

    async getCategories() {
        try {
            const url = DummyService.BASE_URL + 'categories';
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();

            // const categories = data.map(categoryDto => new CategoryModel(categoryDto.slug, categoryDto.name));
            const categories = data.map(({slug, name}) => new CategoryModel(slug, name));

            const promises = categories.map(category => this.getCategoryById(category.id));
            const resultadoIntermedio = await Promise.all(promises);
            const categoriesWithImage = resultadoIntermedio.map((resultado, i) => {
                const category = new CategoryModel(categories[i].id, categories[i].name);
                category.image = resultado.products[0].thumbnail;
                return category;
            })

            return categoriesWithImage;
        } catch (error) {
            throw new DummyServiceError('No puedo recuperar las categorías', error.message, 'getCategories');
        }
    }


    async getCategoryById(categoryId) {
        try {
            const url = DummyService.BASE_URL + 'category/' + categoryId;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new DummyServiceError('No puedo recuperar la categoría', error.message, 'getCategoryById');
        }
    }



    
    /**
     * 
     * @param {number} productId 
     * @returns {object}
     */
    async getProductById(productId) {
        try {
            const url = DummyService.BASE_URL + productId;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new DummyServiceError('No puedo recuperar el producto', error.message, 'getProductById');
        }
    }
}

export class DummyServiceError extends Error {
    constructor(message, cause, method) {
        super(`[DummyServiceError ${method}]: ${message}. ${cause}`);
    }
}