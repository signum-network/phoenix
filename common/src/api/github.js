import BaseApi from "./baseApi";

/**
 * Playing around with the guthub API
 */
class GithubApi extends BaseApi{

    constructor(){
        super('https://api.github.com/repos/burst-apps-team')
    }

    async getAllPhoenixContributors() {
        const httpResponse = await this.http.get('/phoenix/contributors');
        if(httpResponse.hasError()) throw httpResponse.error;
        return httpResponse.response.map( c => c.login);
    }
}

export default GithubApi;
