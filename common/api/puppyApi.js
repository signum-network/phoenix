import Http from "./http";

const puppies = ['Fluffy', 'Puffy', 'Ruffy'];

/**
 * Just a fake api
 */
class PuppyApi {

    constructor(){
        this.http = new Http();
    }

    async getAllPuppies() {
        const result = await this.http.get('http://mighty.ba.org/puppies');
        return puppies.map((p, i) => ({id: i, name: p}))
    }
}

export default PuppyApi;
