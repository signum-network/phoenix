/** @module http */

import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import HttpResponse from './httpResponse';
import HttpError from './httpError';
import Http from './http';

const DefaultAxiosOptions = {};

/**
 * Generic Http client
 */
export default class HttpImpl implements Http {

    private _clientImpl: AxiosInstance;

    /**
     * Creates your Http client
     * @param baseURL The baseUrl, i.e host url
     * @param options [optional] An options/configurations object applied to all requests
     * The current implementation uses axios, so the options can be found here
     * [Axios Configuration](https://github.com/axios/axios#request-config)
     */
    constructor(baseURL: string, options: AxiosRequestConfig = DefaultAxiosOptions) {
        // see https://github.com/axios/axios#request-config for more
        this._clientImpl = axios.create({
            baseURL,
            ...options
        });
    }

    static mountError(url: string, error: any): HttpError {
        if (error.response) {
            return new HttpError(url, error.response.status, error.response.statusText, error.response.data);
        } else if (error.request) {
            return new HttpError(url, 0, 'Request failed', error.request);
        }
        return new HttpError(url, -1, 'Http Configuration error', null);
    }

    async get(url: string, options?: any | AxiosRequestConfig): Promise<HttpResponse> {
        try {
            const {status, data} = await this._clientImpl.get(url, options);
            return new HttpResponse(status, data);
        } catch (error) {
            throw HttpImpl.mountError(url, error);
        }
    }

    async post(url: string, payload: any, options?: any | AxiosRequestConfig): Promise<HttpResponse> {
        try {
            const {status, data} = await this._clientImpl.post(url, payload, options);
            return new HttpResponse(status, data);
        } catch (error) {
            throw HttpImpl.mountError(url, error);
        }
    }

    async put(url: string, payload: any, options?: any | AxiosRequestConfig): Promise<HttpResponse> {
        try {
            const {status, data} = await this._clientImpl.put(url, payload, options);
            return new HttpResponse(status, data);
        } catch (error) {
            throw HttpImpl.mountError(url, error);
        }
    }

    async delete(url: string, options?: any | AxiosRequestConfig): Promise<HttpResponse> {
        try {
            const {status, data} = await this._clientImpl.delete(url, options);
            return new HttpResponse(status, data);
        } catch (error) {
            throw HttpImpl.mountError(url, error);
        }
    }
}
