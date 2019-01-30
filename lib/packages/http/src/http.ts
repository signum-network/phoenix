import HttpResponse from './httpResponse';

/**
 * A generic HTTP interface
 */
export default interface Http {

    /**
     * Get Method
     * @param url The relative url
     * @returns request result in case of success or error
     */
    get(url: string): Promise<HttpResponse>;

    /**
     * Post Method
     * @param url The relative url
     * @param payload The post data
     * @returns request result in case of success or error
     */
    post(url: string, payload: any): Promise<HttpResponse>;

    /**
     * Put Method
     * @param url The relative url
     * @param payload The put data
     * @returns request result in case of success or error
     */
    put(url: string, payload: any): Promise<HttpResponse>;

    /**
     * Delete Method
     * @param url The relative url
     * @returns request result in case of success or error
     */
    delete(url: string): Promise<HttpResponse>;
}

