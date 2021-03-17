import {HttpResponse} from './httpResponse';

/**
 * A generic HTTP interface
 *
 * @module http
 */
export interface Http {

    /**
     * Get Method
     * @param url The relative url
     * @param options [optional] Option/Configuration object for the http clients configuration
     * @returns request result in case of success or error
     */
    get(url: string, options?: any): Promise<HttpResponse>;

    /**
     * Post Method
     * @param url The relative url
     * @param payload The post data
     * @param options [optional] Option/Configuration object for the http clients configuration
     * @returns request result in case of success or error
     */
    post(url: string, payload: any, options?: any): Promise<HttpResponse>;

    /**
     * Put Method
     * @param url The relative url
     * @param payload The put data
     * @param options [optional] Option/Configuration object for the http clients configuration
     * @returns request result in case of success or error
     */
    put(url: string, payload: any, options?: any): Promise<HttpResponse>;

    /**
     * Delete Method
     * @param url The relative url
     * @param options [optional] Option/Configuration object for the http clients configuration
     * @returns request result in case of success or error
     */
    delete(url: string, options?: any): Promise<HttpResponse>;
}

