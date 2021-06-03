/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2021 Signum Network
 */

import {Http, HttpError, HttpClientFactory, HttpResponse} from '@signumjs/http';
import {asyncRetry} from '@signumjs/util';
import {ChainServiceSettings} from './chainServiceSettings';
import {AxiosRequestConfig} from 'axios';
import {DefaultApiEndpoint} from '../constants';

// Old API is inconsistent in its error responses
interface ApiError {
    readonly errorCode?: number;
    readonly errorDescription?: string;
    readonly error?: string;
}

class SettingsImpl implements ChainServiceSettings {
    constructor(settings: ChainServiceSettings) {
        this.apiRootUrl = settings.apiRootUrl || DefaultApiEndpoint;
        this.nodeHost = settings.nodeHost;
        this.httpClient = settings.httpClient || HttpClientFactory.createHttpClient(settings.nodeHost, settings.httpClientOptions);
        this.reliableNodeHosts = settings.reliableNodeHosts || [];
    }

    readonly apiRootUrl: string;
    readonly httpClient: Http;
    readonly nodeHost: string;
    readonly reliableNodeHosts: string[];
}

/**
 * Generic Chain Service class.
 *
 * This class can be used to call the chain api directly, in case a function is
 * not supported yet by SignumJS. Usually, you won't need to do it.
 *
 *
 *
 * @module core
 */
export class ChainService {
    /**
     * Creates Service instance
     * @param settings The settings for the service
     */
    constructor(settings: ChainServiceSettings) {

        this.settings = new SettingsImpl(settings);
        const {apiRootUrl} = this.settings;
        if (apiRootUrl) {
            this._relPath = apiRootUrl.endsWith('/') ? apiRootUrl.substr(0, apiRootUrl.length - 1) : apiRootUrl;
        }
    }

    public settings: ChainServiceSettings;
    private readonly _relPath: string = DefaultApiEndpoint;

    private static throwAsHttpError(url: string, apiError: ApiError): void {
        const errorCode = apiError.errorCode && ` (Code: ${apiError.errorCode})` || '';
        throw new HttpError(url,
            400,
            `${apiError.errorDescription || apiError.error}${errorCode}`,
            apiError);
    }


    /**
     * Mounts an API conformant endpoint of format `<host>?requestType=getBlock&height=123`
     *
     * @see https://www.burstcoin.community/burst-api/
     *
     * @param {string} method The method name for `requestType`
     * @param {any} data A JSON object which will be mapped to url params
     * @return {string} The mounted url (without host)
     */
    public toApiEndpoint(method: string, data: object = {}): string {
        const request = `${this._relPath}?requestType=${method}`;
        const params = Object.keys(data)
            .filter(k => data[k] !== undefined)
            .map(k => `${k}=${encodeURIComponent(data[k])}`)
            .join('&');
        return params ? `${request}&${params}` : request;
    }


    /**
     * Requests a query to the configured chain node
     * @param {string} method The method according https://www.burstcoin.community/burst-api/
     * @param {any} args A JSON object which will be mapped to url params
     * @param {any | AxiosRequestConfig} options The optional request configuration for the passed Http client
     * @return {Promise<T>} The response data of success
     * @throws HttpError in case of failure
     */
    public async query<T>(method: string, args: any = {}, options?: any | AxiosRequestConfig): Promise<T> {
        const endpoint = this.toApiEndpoint(method, args);

        const {response} = await this.faultTolerantRequest(() => this.settings.httpClient.get(endpoint, options));

        if (response.errorCode || response.error || response.errorDescription) {
            ChainService.throwAsHttpError(endpoint, response);
        }
        return response;

    }

    /**
     * Send data to chain node
     * @param {string} method The method according https://www.burstcoin.community/burst-api/.
     *        Note that there are only a few POST methods
     * @param {any} args A JSON object which will be mapped to url params
     * @param {any} body An object with key value pairs to submit as post body
     * @param  {any | AxiosRequestConfig} options The optional request configuration for the passed Http client
     * @return {Promise<T>} The response data of success
     * @throws HttpError in case of failure
     */
    public async send<T>(method: string, args: object = {}, body: object = {}, options?: any | AxiosRequestConfig): Promise<T> {
        const endpoint = this.toApiEndpoint(method, args);

        const {response} = await this.faultTolerantRequest(() => this.settings.httpClient.post(endpoint, body, options));

        if (response.errorCode || response.error || response.errorDescription) {
            ChainService.throwAsHttpError(endpoint, response);
        }
        return response;
    }

    private async faultTolerantRequest(requestFn: () => Promise<HttpResponse>): Promise<HttpResponse> {
        const onFailureAsync = async (e, retrialCount): Promise<boolean> => {
            const shouldRetry = this.settings.reliableNodeHosts.length && retrialCount < this.settings.reliableNodeHosts.length;
            if (shouldRetry) {
                await this.selectBestHost(true);
            }
            return shouldRetry;
        };

        return await asyncRetry({
            asyncFn: requestFn,
            onFailureAsync
        });
    }

    /**
     * Automatically selects the best host, according to its response time, i.e. the fastest node host will be returned (and set as nodeHost internally)
     * @param reconfigure An optional flag to set automatic reconfiguration. Default is `false`
     * Attention: Reconfiguration works only, if you use the default http client. Otherwise, you need to reconfigure manually!
     * @param checkMethod The optional API method to be called. This applies only for GET methods. Default is `getBlockchainStatus`
     * @throws Error If `reliableNodeHosts` is empty, or if all requests to the reliableNodeHosts fail
     */
    public async selectBestHost(reconfigure = false, checkMethod = 'getBlockchainStatus'): Promise<string> {
        if (!this.settings.reliableNodeHosts.length) {
            throw new Error('No reliableNodeHosts configured');
        }
        const checkEndpoint = this.toApiEndpoint(checkMethod);
        let timeout = null;
        const requests = this.settings.reliableNodeHosts.map(host => {
            const absoluteUrl = `${host}${checkEndpoint}`;
            return new Promise<string>(async (resolve, reject) => {
                try {
                    await this.settings.httpClient.get(absoluteUrl);
                    resolve(host);
                } catch (e) {
                    if (timeout) {
                        // @ts-ignore
                        clearTimeout(timeout);
                    }
                    // @ts-ignore
                    timeout = setTimeout(() => {
                        reject(null);
                    }, 10 * 1000);
                }
            });
        });

        const bestHost = await Promise.race(requests);
        // @ts-ignore
        clearTimeout(timeout);
        if (!bestHost) {
            throw new Error('All reliableNodeHosts failed');
        }
        if (reconfigure) {
            this.settings = new SettingsImpl({
                ...this.settings,
                httpClient: HttpClientFactory.createHttpClient(bestHost, this.settings.httpClientOptions),
                nodeHost: bestHost,
            });
        }
        return bestHost;
    }
}
