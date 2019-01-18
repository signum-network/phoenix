import BaseApi from './baseApi';

interface User {
    name: string;
    url: string;
}

/**
 * Playing around with the guthub API
 */
class Github extends BaseApi {

    constructor() {
        super('https://api.github.com/repos/burst-apps-team');
    }

    public async getAllPhoenixContributors(): Promise<User[]> {
        const httpResponse = await this.http.get('/phoenix/contributors');
        if (httpResponse.hasError()) { throw httpResponse.error; }
        return httpResponse.response.map( c => c.login);
    }
}

export default Github;
