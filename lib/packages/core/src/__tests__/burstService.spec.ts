import {BurstService} from '../service/burstService';
import {Http, HttpError, HttpImpl, HttpMockBuilder, HttpResponse} from '@burstjs/http';
import {BurstServiceSettings} from '../service/burstServiceSettings';
import {createBurstService} from './helpers/createBurstService';

class TestHttpClient implements Http {
    delete(url: string): Promise<HttpResponse> {
        return undefined;
    }

    get(url: string): Promise<HttpResponse> {
        return undefined;
    }

    post(url: string, payload: any): Promise<HttpResponse> {
        return undefined;
    }

    put(url: string, payload: any): Promise<HttpResponse> {
        return undefined;
    }

}

describe('BurstService', () => {
    describe('constructor', () => {
        it('should create with least required parameters', () => {
            const {settings} = new BurstService({
                nodeHost: 'nodeHost',
                apiRootUrl: 'apiRootUrl',
            });
            expect(settings.nodeHost).toBe('nodeHost');
            expect(settings.apiRootUrl).toBe('apiRootUrl');
            expect(settings.httpClient instanceof HttpImpl).toBeTruthy();
        });

        it('should create with other HttpClient', () => {
            const {settings} = new BurstService({
                nodeHost: 'nodeHost',
                apiRootUrl: 'apiRootUrl',
                httpClient: new TestHttpClient()
            });
            expect(settings.nodeHost).toBe('nodeHost');
            expect(settings.apiRootUrl).toBe('apiRootUrl');
            expect(settings.httpClient instanceof TestHttpClient).toBeTruthy();
        });
    });

    describe('toBRSEndpoint() relative Path', () => {

        const settings: BurstServiceSettings = {
            nodeHost: 'localhost',
            apiRootUrl: '',
        };

        let service = new BurstService(settings);

        it('should create BRS BURST url without any parameter', () => {
            const url = service.toBRSEndpoint('getBlockByHeight');
            expect(url).toBe('?requestType=getBlockByHeight');
        });

        it('should create BRS BURST url with one parameter', () => {
            const url = service.toBRSEndpoint('getBlockByHeight', {id: 123});
            expect(url).toBe('?requestType=getBlockByHeight&id=123');
        });

        it('should create BRS BURST url with many parameters', () => {
            const url = service.toBRSEndpoint('getBlockByHeight', {id: 123, includeTransactions: true});
            expect(url).toBe('?requestType=getBlockByHeight&id=123&includeTransactions=true');
        });

        it('should create BRS BURST url with many parameters and encode correctly', () => {
            const url = service.toBRSEndpoint('getBlockByHeight', {
                id: 123,
                includeTransactions: true,
                data: '{"foo":"some data#&$%-";\n\t"bar":"1234"}'
            });
            expect(url).toBe('?requestType=getBlockByHeight&id=123&includeTransactions=true&data=%7B%22foo%22%3A%22some%20data%23%26%24%25-%22%3B%0A%09%22bar%22%3A%221234%22%7D');
        });

        it('should create BRS BURST url with many parameters ignoring undefined', () => {
            const url = service.toBRSEndpoint('getBlockByHeight',
                {
                    id: 123,
                    includeTransactions: true,
                    foo: undefined,
                    bar: undefined
                });
            expect(url).toBe('?requestType=getBlockByHeight&id=123&includeTransactions=true');
        });

        it('should create BRS BURST url with many parameters and relative Url', () => {
            service = new BurstService({
                    nodeHost: 'localhost',
                    apiRootUrl: '/burst/' // chopps trailing slash
                }
            );
            const url = service.toBRSEndpoint('getBlockByHeight', {id: 123, includeTransactions: true});
            expect(url).toBe('/burst?requestType=getBlockByHeight&id=123&includeTransactions=true');
        });

    });


    describe('send()', () => {

        it('should successfully send data', async () => {
            const httpMock = HttpMockBuilder.create().onPostReply(200, {
                foo: 'someData'
            }).build();
            const burstService = createBurstService(httpMock);
            const result = await burstService.send('someMethod');

            expect(result).toEqual({foo: 'someData'});

        });

        it('should throw normal Http error', async () => {
            const httpMock = HttpMockBuilder.create().onPostThrowError(
                500,
                'error',
                {data: 'any'}
            ).build();

            try {
                const burstService = createBurstService(httpMock);
                await burstService.send('someMethod');
                expect('Expected exception').toBeFalsy();
            } catch (e) {
                const httpError = <HttpError>e;
                expect(httpError.status).toBe(500);
                expect(httpError.message).toBe('error');
                expect(httpError.data).toEqual({data: 'any'});
            }
        });


        it('should throw Http error due to BRS API error', async () => {
            const httpMock = HttpMockBuilder.create().onPostReply(
                200,
                {errorCode: 123, errorDescription: 'BRS API Error'}
            ).build();

            try {
                const burstService = createBurstService(httpMock);
                await burstService.send('someMethod');
                expect('Expected exception').toBeFalsy();
            } catch (e) {
                const httpError = <HttpError>e;
                expect(httpError.status).toBe(400);
                expect(httpError.message).toContain('BRS API Error');
                expect(httpError.message).toContain('123');
                expect(httpError.data).toEqual({errorCode: 123, errorDescription: 'BRS API Error'});
            }
        });
    });

    describe('query()', () => {
        it('should successfully query data', async () => {
            const httpMock = HttpMockBuilder.create().onGetReply(200, {
                foo: 'someData'
            }).build();
            const burstService = createBurstService(httpMock);
            const result = await burstService.query('someMethod');

            expect(result).toEqual({foo: 'someData'});

        });

        it('should throw normal Http error', async () => {
            const httpMock = HttpMockBuilder.create().onGetThrowError(
                500,
                'error',
                {data: 'any'}
            ).build();


            try {
                const burstService = createBurstService(httpMock);
                await burstService.query('someMethod');
                expect('Expected exception').toBeFalsy();
            } catch (e) {
                const httpError = <HttpError>e;
                expect(httpError.status).toBe(500);
                expect(httpError.message).toBe('error');
                expect(httpError.data).toEqual({data: 'any'});
            }
        });


        it('should throw Http error due to BRS API error', async () => {
            const httpMock = HttpMockBuilder.create().onGetReply(
                200,
                {errorCode: 123, errorDescription: 'BRS API Error'}
            ).build();

            try {
                const burstService = createBurstService(httpMock);
                await burstService.query('someMethod');
                expect('Expected exception').toBeFalsy();
            } catch (e) {
                const httpError = <HttpError>e;
                expect(httpError.status).toBe(400);
                expect(httpError.message).toContain('BRS API Error');
                expect(httpError.message).toContain('123');
                expect(httpError.data).toEqual({errorCode: 123, errorDescription: 'BRS API Error'});
            }
        });
    });

});
