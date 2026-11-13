export class AuthorizationService {
    async validateUserAndGetToken(username, password) {
        const url = 'https://dummyjson.com/auth/login';

        let response;
        try {
            response = await fetch(url, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({ username, password, expiresInMins: 30 })
            });
        } catch (error) {
            throw new Error(`Cannot validate user: ${error}`);
        }

        if (!response.ok) {
            throw new Error(`Cannot validate user: [${response.status} ${response.statusText}]`);
        }

        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot validate user: ${error}`);
        }

        return data.accessToken;
    }
}