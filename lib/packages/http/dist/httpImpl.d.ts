import HttpResponse from './httpResponse';
import HttpError from './httpError';
import Http from './http';
export default class HttpImpl implements Http {
    private _clientImpl;
    constructor(baseURL: string);
    static mountError(url: string, error: any): HttpError;
    get(url: string): Promise<HttpResponse>;
    post(url: string, payload: any): Promise<HttpResponse>;
    put(url: string, payload: any): Promise<HttpResponse>;
    delete(url: string): Promise<HttpResponse>;
}
