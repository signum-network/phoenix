import {Http} from '@burst/http';

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

    /**
     * Mounts a BRS conform API endpoint of format `<host>?requestType=getBlock&height=123`
     *
     * @see https://burstwiki.org/wiki/The_Burst_API
     *
     * @param method The method name for `requestType`
     * @param data A JSON object which will be mapped to url params, e.g. {foo:1; bar:true} -> foo=1&bar=true
     * @return The mounted url (without host)
     */
    public static toBRSEndpoint(method: string, data: any = {}): string {
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
