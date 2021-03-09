import {Http} from './http';
import {HttpAdapterAxios} from './httpAdapterAxios';

export class HttpClientFactory {
    static createHttpClient(baseUrl: string, options?: any): Http {
        return new HttpAdapterAxios(baseUrl, options);
    }
}
