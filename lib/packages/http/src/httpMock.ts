import Http from './http';
import HttpResponse from './httpResponse';
import HttpError from './httpError';

const FOR_ALL_ENDPOINTS = '__all';

interface ResponseMap {
    [endpoint: string]: HttpResponse | HttpError;
}

let replyMap: ResponseMap = {};
let errorMap: ResponseMap = {};

function getMappedResponse(map: ResponseMap, endpoint: string) {
    const response = map[endpoint] || map[FOR_ALL_ENDPOINTS];
    if (!response && endpoint !== FOR_ALL_ENDPOINTS) {
        throw new Error(`No mock for called endpoint '${endpoint}' found. Use onGet() or onGet('${endpoint}').`);
    }

    return response;
}

function createMockImplementationFunctionForReply(method: string, endpoint: string, status: number, response?: any) {
    replyMap[endpoint] = new HttpResponse(status, response);
    return function () {
        return {
            [method]: (url: string) => Promise.resolve(getMappedResponse(replyMap, url))
        };
    };
}

function createMockImplementationFunctionForError(method: string, endpoint: string, status: number, message: string) {
    errorMap[endpoint] = new HttpError(endpoint, status, message, {});
    return function () {
        return {
            [method]: (url: string) => { throw getMappedResponse(errorMap, url); }
        };
    };
}

class MockBehavior {
    constructor(private method: string, private endpoint: string = FOR_ALL_ENDPOINTS) {
    }

    public reply<T>(status: number, response: T) {
        // @ts-ignore
        Http.mockImplementationOnce(createMockImplementationFunctionForReply(this.method, this.endpoint, status, response));
    }

    public error(status: number, message: string) {
        // @ts-ignore
        Http.mockImplementationOnce(createMockImplementationFunctionForError(this.method, this.endpoint, status, message));
    }
}

/**
 * @internal
 * Http Mocker for easy to http testing using Jest
 *
 * When using this mocking helper you need to call `Http.onGet()`
 * before Http instance is created
 * @module http
 * */
class HttpMock {

    /**
     * Mocks responses for get methods
     * You may pass a specific endpoint as parameter to mock only selected endpoints.
     * This is very useful, when having methods that do several Http requests,
     * so you can mock them one on one.
     *
     * The following code returns the same content on _every_ get call
     * ```
     *   HttpMock.onGet().reply(200, [{login: 'foo'}, {login: 'bar'}]);
     * ```
     *
     *  The next code returns the different content depending on the passed endpoint
     * ```
     *   HttpMock.onGet('/foo').reply(200, {data: 'foo'});
     *   HttpMock.onGet('/bar').reply(200, {data: 'bar'});
     * ```
     * @param endpoint?  An endpoint, to allow specific behavior on that endpoint
     */
    public static onGet(endpoint?: string): MockBehavior {
        return new MockBehavior('get', endpoint);
    }

    /**
     * Mocks responses for post methods
     * @param endpoint?  An endpoint, to allow specific behavior on that endpoint
     */
    public static onPost(endpoint?: string): MockBehavior {
        return new MockBehavior('post', endpoint);
    }

    /**
     * Mocks responses for put methods
     * @param endpoint?  An endpoint, to allow specific behavior on that endpoint
     */
    public static onPut(endpoint?: string): MockBehavior {
        return new MockBehavior('put', endpoint);
    }

    /**
     * Mocks responses for delete methods
     * @param endpoint?  An endpoint, to allow specific behavior on that endpoint
     */
    public static onDelete(endpoint?: string): MockBehavior {
        return new MockBehavior('delete', endpoint);
    }

    /**
     * Resets all mocked behavior
     */
    public static reset() {
        // @ts-ignore
        Http.mockClear();
        errorMap = {};
        replyMap = {};
    }

}

export default HttpMock;
