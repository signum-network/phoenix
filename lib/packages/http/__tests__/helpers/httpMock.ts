jest.mock('../../src/http');
import Http from '../../src/http';
import HttpResponse from '../../src/httpResponse';

const FOR_ALL_ENDPOINTS = '__all';

interface ResponseMap {[endpoint: string]: HttpResponse; }

let replyMap: ResponseMap = {};
let errorMap: ResponseMap = {};

function getMappedResponse(map: ResponseMap, endpoint: string ) {
    const response = map[endpoint] || map[FOR_ALL_ENDPOINTS];
    if (!response && endpoint !== FOR_ALL_ENDPOINTS) {
        throw new Error(`No mock for endpoint '${endpoint}' found.`);
    }

    return response;
}

function createMockImplementationFunctionForReply(method: string, endpoint: string, status: number, response?: any) {
    replyMap[endpoint] = new HttpResponse(status, response);
    return () => ({
        [method]: (url: string ) => Promise.resolve(getMappedResponse(replyMap, url))
    });
}

function createMockImplementationFunctionForError(method: string, endpoint: string, status: number, message: string) {
    errorMap[endpoint] = new HttpResponse(status, '', message);
    return () => ({
        [method]: (url: string) => Promise.resolve(getMappedResponse(errorMap, url) )
    });
}

interface MockBehavior {
    reply(status: number, payload?: any): void;
    error(status: number, message: string): void;
}

class MockBehavior {
    constructor(private method: string, private endpoint: string = FOR_ALL_ENDPOINTS) { }
    public reply(status: number, response: any) {
        // @ts-ignore
        Http.mockImplementationOnce(createMockImplementationFunctionForReply(this.method, this.endpoint, status, response));
    }
    public error(status: number, message: string) {
        // @ts-ignore
        Http.mockImplementationOnce(createMockImplementationFunctionForError(this.method, this.endpoint, status, message));
    }
}

/**foo
 * Easy http mocking
 * @example
 *
 *  HttpMock.onGet().reply(200, [{login: 'ohager'}]);
 *  HttpMock.onGet('foo/bar').error(404, 'Not found');
 */
module HttpMock {

    /**
     * Mocks responses for get methods
     * @param endpoint An endpoint, to allow specific behavior on that endpoint
     */
    export function onGet(endpoint?: string): MockBehavior { return new MockBehavior('get', endpoint); }
    export function onPost(endpoint?: string): MockBehavior { return new MockBehavior('post', endpoint); }
    export function onPut(endpoint?: string): MockBehavior { return new MockBehavior('put', endpoint); }
    export function onDelete(endpoint?: string): MockBehavior { return new MockBehavior('delete', endpoint); }

    /**
     * Resets all mocked behavior
     */
    export function reset() {
        errorMap = {};
        replyMap = {};
    }

}

export default HttpMock;
