/** @module core */
/** @ignore */

import {Http, HttpImpl} from '@burstjs/http';

/**
 * Generic BRS Web Service class.
 * Extend and specific services here
 */
export class BurstService {
    private _http: Http;
    private _relPath: string;

    /**
     * @returns {Http} The internal Http client
     */
    protected get http(): Http {
        return this._http;
    }

    /**
     * Mounts a BRS conform API (V1) endpoint of format `<host>?requestType=getBlock&height=123`
     *
     * @see https://burstwiki.org/wiki/The_Burst_API
     *
     * @param {string} method The method name for `requestType`
     * @param {any} data A JSON object which will be mapped to url params
     * @return {string} The mounted url (without host)
     */
    public toBRSEndpoint(method: string, data: any = {}): string {
        const request = `${this._relPath}?requestType=${method}`;
        const params = Object.keys(data)
            .filter(k => data[k] !== undefined)
            .map(k => `${k}=${data[k]}`)
            .join('&');
        return params ? `${request}&${params}` : request;
    }

    /**
     * Creates Service instance
     * @param {string} baseUrl The host url of web service
     * @param {string} relativePath The relative path will be prepended before each url created with toBRSEndpoint()
     * @param {Http?} httpClient If passed an client instance, it will be used instead of default HttpImpl. Good for testing.
     */
    constructor(baseUrl: string, relativePath: string = '', httpClient?: Http) {
        this._http = httpClient ? httpClient : new HttpImpl(baseUrl);
        this._relPath = relativePath.endsWith('/') ? relativePath.substr(0, relativePath.length - 1) : relativePath;
    }


    /**
     * Requests a query to BRS
     * @param {string} method The BRS method according https://burstwiki.org/wiki/The_Burst_API
     * @param {any} args A JSON object which will be mapped to url params
     * @return {Promise<T>} The response data of success
     * @throws HttpError in case of failure
     */
    public async query<T>(method: string, args: any = {}): Promise<T> {
        const brsUrl = this.toBRSEndpoint(method, args);
        const response = await this.http.get(brsUrl);
        return Promise.resolve(response.response);
    }

    /**
     * Send data to BRS
     * @param {string} method The BRS method accordinghttps://burstwiki.org/wiki/The_Burst_API#Create_Transaction.
     *        Note that there are only a few POST methods
     * @param {any} args A JSON object which will be mapped to url params
     * @param {any} body An object with key value pairs to submit as post body
     * @return {Promise<T>} The response data of success
     * @throws HttpError in case of failure
     */
    public async send<T>(method: string, args: any = {}, body: any= {}): Promise<T> {
        const brsUrl = this.toBRSEndpoint(method, args);
        const response = await this.http.post(brsUrl, body);
        return Promise.resolve(response.response);
    }
}
