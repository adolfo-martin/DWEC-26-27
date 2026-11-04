// const params = new URLSearchParams(window.location.search);
// const categoryId = params.get('category');

const categoryId = window.localStorage.getItem('category');

// Sinónimos de false en JS: false, null, undefined, 0, '' 
if (categoryId) {
    document.querySelector('#tH1Title').textContent = 'Productos de la categoría ' + categoryId;
} else {
    document.querySelector('#tH1Title').textContent = 'Productos';
}

// Deserializar
console.log(window.localStorage.getItem('alumno'));
const alumno = JSON.parse(window.localStorage.getItem('alumno'));
console.log(alumno);