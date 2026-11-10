export default class AuthenticationService {
    /**
     * @param {string} username The username of the user.
     * @param {string} password The password of the user.
     * @returns {string} The token generated for the user.
     * @throws {Error} A generic exception.
     */
    async validateUser(username, password) {
        const url = 'https://dummyjson.com/auth/login';

        let response;
        try {
            response = await fetch(url, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
        } catch (error) {
            throw new Error(`Cannot validate user: ${error.message}`);
        }

        // Comprueba si el fetch fue correcto
        if (!response.ok) {
            throw new Error(`Cannot validate user: [${response.status} ${response.statusText}]`);
        }

        // Comprueba si estoy recibiendo JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot validate user: ${error.message}`);
        }

        return data.accessToken;
    }
}