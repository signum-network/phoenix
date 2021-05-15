import {Http} from './http';
import {HttpAdapterAxios} from './httpAdapterAxios';

/**
 * Factory for clients of [[Http]]
 *
 * @module http
 */
export class HttpClientFactory {
    /**
     * Creates an Http instance
     *
     * The current default implementation uses https://github.com/axios/axios
     *
     * @param baseUrl The base/root host url for the adapter, i.e. https://contoso.com
     * @param options An arbitrary options object, depending on the implementation.
     * As the default implementation uses axios the available options are here: https://axios-http.com/docs/req_config
     */
    static createHttpClient(baseUrl: string, options?: any): Http {
        return new HttpAdapterAxios(baseUrl, options);
    }
}
