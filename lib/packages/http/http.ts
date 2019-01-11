import axios from 'axios';
import HttpResponse from './httpResponse';

/**
 * An generic HTTP client
 */
class Http {

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

    static _getErrorResponse(error: any): HttpResponse {
        if (error.response) {
            return new HttpResponse(error.response.status, error.response.statusText, error.response.data);
        } else if (error.request) {
            return new HttpResponse(0, error.request, 'Request failed');
        }
        return new HttpResponse(-1, '', 'Axios Configuration error');
    }

    /**
     * Get Method
     * @param url The relative url
     * @returns request result in case of success or error
     */
    async get(url: string): Promise<HttpResponse> {
        try {
            const {status, data} = await this._clientImpl.get(url);
            return new HttpResponse(status, data);
        } catch (error) {
            return Http._getErrorResponse(error);
        }
    }

    /**
     * Post Method
     * @param url The relative url
     * @param payload The post data
     * @returns request result in case of success or error
     */
    async post(url: string, payload: any): Promise<HttpResponse> {
        try {
            const {status, data} = await this._clientImpl.post(url, payload);
            return new HttpResponse(status, data);
        } catch (error) {
            return Http._getErrorResponse(error);
        }
    }

    /**
     * Put Method
     * @param url The relative url
     * @param payload The put data
     * @returns request result in case of success or error
     */
    async put(url: string, payload: any): Promise<HttpResponse> {
        try {
            const {status, data} = await this._clientImpl.put(url, payload);
            return new HttpResponse(status, data);
        } catch (error) {
            return Http._getErrorResponse(error);
        }
    }

    /**
     * Delete Method
     * @param url The relative url
     * @returns request result in case of success or error
     */
    async delete(url: string) {
        try {
            const {status, data} = await this._clientImpl.delete(url);
            return new HttpResponse(status, data);
        } catch (error) {
            return Http._getErrorResponse(error);
        }
    }
}

export default Http;
