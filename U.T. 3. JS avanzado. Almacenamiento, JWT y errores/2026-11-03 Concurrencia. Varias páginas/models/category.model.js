export class CategoryModel {
    #id;
    #name;
    #image;

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get image() {
        return this.#image;
    }

    set image(value) {
        this.#image = value;
    }
}