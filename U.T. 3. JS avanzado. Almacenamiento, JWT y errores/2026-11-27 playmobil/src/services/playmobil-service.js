export class PlaymobilService {
    static URL_BASE = 'http://192.168.88.217:7082/api/';

    /**
     * Devuelve las series de Playmobil
     * @param {string} token 
     * @returns { Array<{uuid: string, denomination: string}> }
     */
    async retrieveSeries(token) {
        const url = PlaymobilService.URL_BASE + 'series';

        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            response = await fetch(url, {
                method: 'get',
                headers
            });
        } catch (error) {
            throw new Error(`Cannot retrieve series: ${error}`);
        }

        if (!response.ok) {
            throw new Error(`Cannot retrieve series: [${response.status} ${response.statusText}]`);
        }

        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve series: ${error}`);
        }

        if (!data.ok) {
            throw new Error(`Cannot retrieve series: ${data.message}`);
        }

        return data.series;
    }


    /**
     * Devuelve las series de Playmobil
     * @param {string} token 
     * @returns { Array<{uuid: string, denomination: string}> }
     */
    async retrieveSerieById(token, id) {
        const url = PlaymobilService.URL_BASE + 'serie/' + id;

        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            response = await fetch(url, {
                method: 'get',
                headers
            });
        } catch (error) {
            throw new Error(`Cannot retrieve serie: ${error}`);
        }

        if (!response.ok) {
            throw new Error(`Cannot retrieve serie: [${response.status} ${response.statusText}]`);
        }

        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve serie: ${error}`);
        }

        if (!data.ok) {
            throw new Error(`Cannot retrieve serie: ${data.message}`);
        }

        return data.serie;
    }
}