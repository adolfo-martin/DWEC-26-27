const encodedToken = window.sessionStorage.getItem('token');
// if (encodedToken === null) {
if (!encodedToken) {
    alert('Va a ser redirigido a la página de inicio de sesión.');
    window.location = '/views/login.html';
}

let decodedToken;
try {
    decodedToken = decodeToken(encodedToken);    
} catch (error) {
    window.sessionStorage.removeItem('token');
    alert('Va a ser redirigido a la página de inicio de sesión.');
    window.location = '/views/login.html';
}

console.log(decodedToken);


function decodeToken(token) {
    const parseJwt = token => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
            throw new Error(`Problem decoding token "${token}": ${error.message}.`);
        }
    }
    const tokenDecodificado = parseJwt(token);
    return tokenDecodificado;
}