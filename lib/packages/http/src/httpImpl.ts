/** @module http */

import axios from 'axios';
import HttpResponse from './httpResponse';
import HttpError from './httpError';
import Http from './http';

/**
 * Generic Http client
 */
export default class HttpImpl implements Http {

    private _clientImpl: any;

    /**
     * Creates your Http client
     * @param baseURL The baseUrl, i.e host url
     */
    constructor(baseURL: string) {
        // see https://github.com/axios/axios#request-config for more
        this._clientImpl = axios.create({
            baseURL,
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

    async get(url: string): Promise<HttpResponse> {
        try {
            const {status, data} = await this._clientImpl.get(url);
            return new HttpResponse(status, data);
        } catch (error) {
            throw HttpImpl.mountError(url, error);
        }
    }

    async post(url: string, payload: any): Promise<HttpResponse> {
        try {
            const {status, data} = await this._clientImpl.post(url, payload);
            return new HttpResponse(status, data);
        } catch (error) {
            throw HttpImpl.mountError(url, error);
        }
    }

    async put(url: string, payload: any): Promise<HttpResponse> {
        try {
            const {status, data} = await this._clientImpl.put(url, payload);
            return new HttpResponse(status, data);
        } catch (error) {
            throw HttpImpl.mountError(url, error);
        }
    }

    async delete(url: string): Promise<HttpResponse> {
        try {
            const {status, data} = await this._clientImpl.delete(url);
            return new HttpResponse(status, data);
        } catch (error) {
            throw HttpImpl.mountError(url, error);
        }
    }
}
