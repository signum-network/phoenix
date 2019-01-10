import axios from 'axios';
import HttpResponse from "./httpResponse";

/**
 * An HTTP client
 */
class Http {

    _clientImpl;

    /**
     * Creates your Http client
     * @param baseURL The baseUrl, i.e host url
     */
    constructor(baseURL) {
        // see https://github.com/axios/axios#request-config for more
        this._clientImpl = axios.create({
            baseURL,
        })
    }

    static _getErrorResponse(error) {
        if (error.response) {
            return new HttpResponse(error.response.status, null, error.response.data);
        } else if (error.request) {
            return new HttpResponse(null, error.request, "Request failed");
        }
    }

    /**
     * Get Method
     * @param url The relative url
     * @returns {Promise<HttpResponse>} in case of success or error
     */
    async get(url) {
        try {
            const {status, responseData} = await this._clientImpl.get(url);
            return new HttpResponse(status, responseData);
        } catch (error) {
            return Http._getErrorResponse(error);
        }
    }

    /**
     * Post Method
     * @param url The relative url
     * @param data The post data
     * @returns {Promise<HttpResponse>} in case of success or error
     */
    async post(url, data) {
        try {
            const {status, responseData} = await this._clientImpl.post(url, data);
            return new HttpResponse(status, responseData);
        } catch (error) {
            return Http._getErrorResponse(error);
        }
    }

    /**
     * Put Method
     * @param url The relative url
     * @param data The put data
     * @returns {Promise<HttpResponse>} in case of success or error
     */
    async put(url, data) {
        try {
            const {status, responseData} = await this._clientImpl.put(url, data);
            return new HttpResponse(status, responseData);
        } catch (error) {
            return Http._getErrorResponse(error);
        }
    }

    /**
     * Delete Method
     * @param url The relative url
     * @returns {Promise<HttpResponse>} in case of success or error
     */
    async delete(url) {
        try {
            const {status, responseData} = await this._clientImpl.delete(url);
            return new HttpResponse(status, responseData);
        } catch (error) {
            return Http._getErrorResponse(error);
        }
    }
}

export default Http;
