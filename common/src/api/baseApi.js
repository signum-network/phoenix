import Http from './http';

/**
 * Base API class.
 * Extend and specific APIs here
 */
class BaseApi  {

    /**
     * Creates API instance
     * @param baseUrl The host url of API
     */
    constructor(baseUrl) {
        this._http = new Http("http://mighty.ba.org");
    }

    /**
     * @returns {Http} The internal Http client
     */
    get http() { return this._http;}

    //TODO unify/centralize exception handling here!
}

export default BaseApi;
