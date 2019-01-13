jest.mock('../../http');
import Http from '../../http';
import HttpResponse from '../../httpResponse';


interface MockBehavior {
    reply(status: number, payload?: any): void;

    error(status: number, message: string): void;
}

function createMockImplementationFunctionForReply(method: string, status: number, response?: any) {
    return () => ({
        [method]: () => Promise.resolve(new HttpResponse(status, response))
    });
}

function createMockImplementationFunctionForError(method: string, status: number, message: string) {
    return () => ({
        [method]: () => Promise.resolve(new HttpResponse(status, '', message))
    });
}

class MockBehavior {
    constructor(private method: string) { }
    public reply(status: number, response: any) {
        // @ts-ignore
        Http.mockImplementationOnce(createMockImplementationFunctionForReply(this.method, status, response));
    }
    public error(status: number, message: string) {
        // @ts-ignore
        Http.mockImplementationOnce(createMockImplementationFunctionForError(this.method, status, message));
    }
}


/**
 * Easy http mocking
 * @example
 *
 *  HttpMock.onGet().reply(200, [{login: 'ohager'}]);
 */
module HttpMock {
    export function onGet(): MockBehavior { return new MockBehavior('get'); }
    export function onPost(): MockBehavior { return new MockBehavior('post'); }
    export function onPut(): MockBehavior { return new MockBehavior('put'); }
    export function onDelete(): MockBehavior { return new MockBehavior('delete'); }
}

export default HttpMock;
