import { AuthorizationService } from "/services/authorization.service.js";

setup();

function setup() {
    setupButtonLogin();
}

function setupButtonLogin() {
    document.querySelector('#tButLogin').addEventListener('click', async _ => {
        const username = document.querySelector('#tTxtUsername').value;
        const password = document.querySelector('#tTxtPassword').value;

        try {
            const service = new AuthorizationService();
            const token = await service.validateUserAndGetToken(username, password);
            window.localStorage.setItem('token-13', token);
            window.location = '/views/index.html';
        } catch (error) {
            alert(error.message);
        }
    });
}