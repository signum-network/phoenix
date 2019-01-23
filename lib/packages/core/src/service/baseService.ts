import {Http} from '@burst/http';
import HttpResponse from '@burst/http/src/httpResponse';
import AbstractModel from '../model/abstractModel';

/**
 * Base Web Service class.
 * Extend and specific services here
 */
export class BaseService {
    private _http: Http;
    private _relPath: string;

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
    public toBRSEndpoint(method: string, data: any = {}): string {
        const request = `${this._relPath}?requestType=${method}`;
        const params = Object.keys(data).map(k => `${k}=${data[k]}`).join('&');

        return params ? `${request}&${params}` : request;
    }

    /**
     * Creates Service instance
     * @param baseUrl The host url of web service
     * @param relativePath The relative path will be prepended before each url created with toBRSEndpoint()
     */
    constructor(baseUrl: string, relativePath: string = '') {
        this._http = new Http(baseUrl);
        this._relPath = relativePath.endsWith('/') ? relativePath.substr(0, relativePath.length - 1) : relativePath;
    }

    /**
     * Calls a HTTP Get with given BRS Url
     * @param brsUrl The Url created with toBRSEndpoint
     */
    protected requestGet(brsUrl: string): Promise<any> {
        return this.http.get(brsUrl)
            .then((response: HttpResponse) => {
                return Promise.resolve(response.response);
            });
    }
}
