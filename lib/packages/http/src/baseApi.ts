import Http from './http';

/**
 * Base API class.
 * Extend and specific APIs here
 */
class BaseApi  {
    private _http: Http;

    /**
     * @returns The internal Http client
     */
    protected get http(): Http {
        return this._http;
    }

    /**
     * Creates API instance
     * @param baseUrl The host url of API
     */
    constructor(baseUrl: string) {
        this._http = new Http(baseUrl);
    }


    // TODO unify/centralize exception handling here!
}

export default BaseApi;
