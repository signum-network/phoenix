/** @module core */

/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {Http, HttpError, HttpImpl} from '@burstjs/http';
import {BurstServiceSettings} from './burstServiceSettings';


interface ApiError {
    readonly errorCode: number;
    readonly errorDescription: string;
}

class SettingsImpl implements BurstServiceSettings {
    constructor(settings: BurstServiceSettings) {
        this.apiRootUrl = settings.apiRootUrl;
        this.nodeHost = settings.nodeHost;
        this.httpClient = settings.httpClient || new HttpImpl(settings.nodeHost);
    }

    readonly apiRootUrl: string;
    readonly brsVersion: ApiVersion;
    readonly httpClient: Http;
    readonly nodeHost: string;
}

/**
 * Generic BRS Web Service class.
 */
export class BurstService {
    /**
     * Creates Service instance
     * @param settings The settings for the service
     */
    constructor(settings: BurstServiceSettings) {

        this.settings = new SettingsImpl(settings);
        const {apiRootUrl} = this.settings;
        this._relPath = apiRootUrl.endsWith('/') ? apiRootUrl.substr(0, apiRootUrl.length - 1) : apiRootUrl;
    }

    public readonly settings: BurstServiceSettings;
    private readonly _relPath: string;

    private static throwAsHttpError(url: string, apiError: ApiError) {
        throw new HttpError(url,
            400,
            `${apiError.errorDescription} (Code: ${apiError.errorCode})`,
            apiError);
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
     * Requests a query to BRS
     * @param {string} method The BRS method according https://burstwiki.org/wiki/The_Burst_API
     * @param {any} args A JSON object which will be mapped to url params
     * @return {Promise<T>} The response data of success
     * @throws HttpError in case of failure
     */
    public async query<T>(method: string, args: any = {}): Promise<T> {
        const brsUrl = this.toBRSEndpoint(method, args);
        const {response} = await this.settings.httpClient.get(brsUrl);
        if (response.errorCode) {
            BurstService.throwAsHttpError(brsUrl, response);
        }
        return response;

    }

    /**
     * Send data to BRS
     * @param {string} method The BRS method according https://burstwiki.org/wiki/The_Burst_API.
     *        Note that there are only a few POST methods
     * @param {any} args A JSON object which will be mapped to url params
     * @param {any} body An object with key value pairs to submit as post body
     * @return {Promise<T>} The response data of success
     * @throws HttpError in case of failure
     */
    public async send<T>(method: string, args: any = {}, body: any = {}): Promise<T> {
        const brsUrl = this.toBRSEndpoint(method, args);
        const {response} = await this.settings.httpClient.post(brsUrl, body);
        if (response.errorCode) {
            BurstService.throwAsHttpError(brsUrl, response);
        }
        return response;
    }
}
