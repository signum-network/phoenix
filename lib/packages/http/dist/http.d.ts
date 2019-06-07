import HttpResponse from './httpResponse';
export default interface Http {
    get(url: string): Promise<HttpResponse>;
    post(url: string, payload: any): Promise<HttpResponse>;
    put(url: string, payload: any): Promise<HttpResponse>;
    delete(url: string): Promise<HttpResponse>;
}
