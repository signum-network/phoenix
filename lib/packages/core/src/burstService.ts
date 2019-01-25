import {Http} from '@burst/http';

/**
 * Generic BRS Web Service class.
 * Extend and specific services here
 */
export class BurstService {
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
     * Requests a query to BRS
     * @param method The BRS method according https://burstwiki.org/wiki/The_Burst_API
     * @param args A JSON object which will be mapped to url params, e.g. {foo:1; bar:true} -> foo=1&bar=true
     * @return The response data of success
     * @throws HttpError in case of failure
     */
    public async query<T>(method: string, args: any = {}): Promise<T> {
        const brsUrl = this.toBRSEndpoint(method, args);
        const response = await this.http.get(brsUrl);
        return Promise.resolve(response.response);
    }

    /**
     * Send data to BRS
     * @param method The BRS method accordinghttps://burstwiki.org/wiki/The_Burst_API#Create_Transaction.
     *        Note that there are only a few POST methods
     * @param args A JSON object which will be mapped to url params, e.g. {foo:1; bar:true} -> foo=1&bar=true
     * @return The response data of success
     * @throws HttpError in case of failure
     */
    public async send<T>(method: string, args: any = {}): Promise<T> {
        const brsUrl = this.toBRSEndpoint(method, args);
        const response = await this.http.post(brsUrl, {});
        return Promise.resolve(response.response);
    }
}
