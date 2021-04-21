import {Http} from './http';
import {HttpResponse} from './httpResponse';
import {HttpError} from './httpError';

class HttpMock implements Http {

    public static ForAll = '__all';

    constructor() {
        this.reset();
    }

    _replyFunctions: object = HttpMock.initialReplyFunctions();

    private static initialReplyFunctions(): object {
        return {
            get: {},
            post: {},
            put: {},
            delete: {}
        };
    }

    private createReplyFn(status: number, data: any): () => Promise<HttpResponse> {
        return () => Promise.resolve(new HttpResponse(status, data));
    }

    private createErrorFn(requestUrl: string, status: number, message: string, data: any = null): () => {} {
        return () => {
            throw new HttpError(requestUrl, status, message, data);
        };
    }

    public reset(): void {
        this._replyFunctions = HttpMock.initialReplyFunctions();
    }

    public registerResponse(method: string, url: string, status: number, data: any) : void {
        // @ts-ignore
        this._replyFunctions[method][url] = this.createReplyFn(status, data);
    }

    public registerError(method: string, url: string, status: number, message: string, data: any) : void {
        // @ts-ignore
        this._replyFunctions[method][url] = this.createErrorFn(url, status, message, data);
    }

    public get(url: string): Promise<HttpResponse> {
        return this.request('get', url);
    }

    public delete(url: string): Promise<HttpResponse> {
        return this.request('delete', url);
    }

    public post(url: string, payload: any): Promise<HttpResponse> {
        return this.request('post', url); // ignore payload...
    }

    public put(url: string, payload: any): Promise<HttpResponse> {
        return this.request('put', url); // ignore payload...
    }

    private request(method: string, url: string): Promise<HttpResponse> {
        // @ts-ignore
        const replyFn = this._replyFunctions[method][url] || this._replyFunctions[method][HttpMock.ForAll];
        if (!replyFn) {
            throw new Error(`Could not find any mocked function for method ${method.toUpperCase()} url ${url}`);
        }
        return replyFn();
    }

}

/**
 * Http Mocker Builder for easy to http testing
 *
 * Example:
 * ```
 const mockedHttp = HttpMockBuilder
 .create()
 .onGetReply(200, {foo: 'get'})
 .onPostThrowError(500, 'Post Error', {e: 'post'})
 .onPutThrowError(404, 'Put Error', {e: 'put'})
 .onDeleteThrowError(403, 'Delete Error', {e: 'delete'})
 .build();

 const response = await mockedHttp.get('/url');

 await mockedHttp.post('/url/post', {faz: 'post'}); // will throw exception

 * ```
 *
 * @module http
 */
export class HttpMockBuilder {

    private readonly _httpMock: HttpMock;

    private constructor() {
        this._httpMock = new HttpMock();
    }

    /**
     * Creates a builder instance
     * @return {HttpMockBuilder} the builder
     */
    public static create(): HttpMockBuilder {
        return new HttpMockBuilder();
    }

    private onReply(method: string, status: number, data: any, url: string = HttpMock.ForAll): HttpMockBuilder {
        this._httpMock.registerResponse(method, url, status, data);
        return this;
    }

    private onThrowError(method: string, status: number, errorMessage: string, data: any, url: string = HttpMock.ForAll): HttpMockBuilder {
        this._httpMock.registerError(method, url, status, errorMessage, data);
        return this;
    }

    /**
     * Mocks responses for get methods
     * You may pass a specific endpoint as parameter to mock only selected endpoints.
     * This is very useful, when having methods that do several Http requests,
     * so you can mock them one on one.
     *
     * The following code returns the same content on _every_ get call
     * ```
     *   HttpMockBuilder
     *   .create()
     *   .onGetReply(200, {response: 'foo}) // mocks all get requests
     *   .onPostReply(201, {response: 'foo}) // mocks all post requests
     *   .build()
     * ```
     *
     *  The next code returns the different content depending on the passed endpoint
     * ```
     *   HttpMockBuilder
     *   .create()
     *   .onGetReply(200, {response: 'foo}, '/url/specific') // mocks get request for '/url/specific'
     *   .build()
     * ```
     * @param status {number} The status to be returned
     * @param data The data to be returned
     * @param url {string?} If given, the mock applies for that specific url, other for all method calls
     * @return {HttpMockBuilder} The builder instance (Fluent API)
     */
    public onGetReply(status: number, data: any, url?: string): HttpMockBuilder {
        return this.onReply('get', status, data, url);
    }

    /**
     * Mocks response exceptions for get methods. It works like onGetReply(), but throws an HttpError instead
     * @param status {number} The status to be returned in exception object
     * @param errorMessage {string} The error message
     * @param data {any?} Eventual data carried with the error object
     * @param url {string?} The specific url for which the exception should be thrown
     * @return {HttpMockBuilder} The builder instance (Fluent API)
     */
    public onGetThrowError(status: number, errorMessage: string, data: any = null, url: string = HttpMock.ForAll): HttpMockBuilder {
        return this.onThrowError('get', status, errorMessage, data, url);
    }

    /**
     * Mocks post requests. Works analog to onGetReply().
     */
    public onPostReply(status: number, data: any, url?: string): HttpMockBuilder {
        return this.onReply('post', status, data, url);
    }

    /**
     * Mocks response exceptions for post methods. It works like onPostReply(), but throws an HttpError instead
     */
    public onPostThrowError(status: number, errorMessage: string, data: any, url: string = HttpMock.ForAll): HttpMockBuilder {
        return this.onThrowError('post', status, errorMessage, data, url);
    }

    /**
     * Mocks put requests. Works analog to onGetReply().
     */
    public onPutReply(status: number, data: any, url?: string): HttpMockBuilder {
        return this.onReply('put', status, data, url);
    }

    /**
     * Mocks response exceptions for put methods. It works like onPutReply(), but throws an HttpError instead
     */
    public onPutThrowError(status: number, errorMessage: string, data: any, url: string = HttpMock.ForAll): HttpMockBuilder {
        return this.onThrowError('put', status, errorMessage, data, url);
    }

    /**
     * Mocks delete requests. Works analog to onGetReply().
     */
    public onDeleteReply(status: number, data: any, url?: string): HttpMockBuilder {
        return this.onReply('delete', status, data, url);
    }

    /**
     * Mocks response exceptions for delete methods. It works like onDeleteReply(), but throws an HttpError instead
     */
    public onDeleteThrowError(status: number, errorMessage: string, data: any, url: string = HttpMock.ForAll): HttpMockBuilder {
        return this.onThrowError('delete', status, errorMessage, data, url);
    }

    /**
     * Builds the Http mock.
     * @return {Http} The mocked Http implementation
     */
    public build(): Http {
        return this._httpMock;
    }
}
