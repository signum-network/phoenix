import {Http} from '@burst/http';
import BurstUrlBuilder from './burstUrlBuilder';

/**
 * Base Web Service class.
 * Extend and specific services here
 */
class BaseService {
    private _http: Http;

    /**
     * @returns The internal Http client
     */
    protected get http(): Http {
        return this._http;
    }

    public static toBRSUrl(method: string, data: any = {}): string {
        const request = `?requestType=${method}`;
        const params = Object.keys(data).map(k => `${k}=${data[k]}`).join('&');

        return params ? `${request}&${params}` : request;
    }

    /**
     * Creates Service instance
     * @param baseUrl The host url of web service
     */
    constructor(baseUrl: string) {
        this._http = new Http(baseUrl);
    }

}

export default BaseService;
