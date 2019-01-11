import Http from '../../http';
import HttpResponse from '../../httpResponse';

jest.mock('../../http');

interface MockBehavior {
    reply(status: number, payload?: any): void;

    error(status: number, message: string): void;
}

function createMockImplementationFunctionForReply(method: string, status: number, response?: any) {
    return () => ({
        // @ts-ignore
        [method]: () => Promise.resolve(new HttpResponse(status, response))
    });
}

function createMockImplementationFunctionForError(method: string, status: number, message: string) {
    return () => ({
        // @ts-ignore
        [method]: () => Promise.resolve(new HttpResponse(status, '', message))
    });
}

/*
        (Http as any).mockImplementationOnce(() => {
            return {
                get : () => Promise.resolve(new HttpResponse(200, [{login: 'ohager'}]))
            };
        });

 */

/*
httpMock.onGet('foo/bar').reply(200, {foo:'bar'})
 */

class HttpMock {
    public onGet(url: string): MockBehavior {
        return {
            reply: (status: number, response: any) => {
                // @ts-ignore
                Http.mockImplementionOnce(createMockImplementationFunctionForReply('get', status, response));
            },
            error: (status: number, message: string) => {
                // @ts-ignore
                Http.mockImplementionOnce(createMockImplementationFunctionForError('get', status, message));
            },
        };
    }
}
