import {BurstService} from '../burstService';
import {HttpMockBuilder, HttpError} from '@burstjs/http';

describe('BurstService', () => {

    describe('toBRSEndpoint() relative Path', () => {

        let service = new BurstService('localhost');

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
            service = new BurstService('localhost', '/burst/'); // chopps trailing slash
            const url = service.toBRSEndpoint('getBlockByHeight', {id: 123, includeTransactions: true});
            expect(url).toBe('/burst?requestType=getBlockByHeight&id=123&includeTransactions=true');
        });

    });


    describe('send()', () => {
        it('should successfully send data', async () => {
            const httpMock = HttpMockBuilder.create().onPostReply(200, {
                foo: 'someData'
            }).build();
            const burstService = new BurstService('localhost', '', httpMock);
            const result = await burstService.send('someMethod');

            expect(result).toEqual({foo: 'someData'});

        });

        it('should throw normal Http error', async () => {
            const httpMock = HttpMockBuilder.create().onPostThrowError(
                500,
                'error',
                {data: 'any'}
            ).build();

            const burstService = new BurstService('localhost', '', httpMock);

            try {
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

            const burstService = new BurstService('localhost', '', httpMock);

            try {
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
            const burstService = new BurstService('localhost', '', httpMock);
            const result = await burstService.query('someMethod');

            expect(result).toEqual({foo: 'someData'});

        });

        it('should throw normal Http error', async () => {
            const httpMock = HttpMockBuilder.create().onGetThrowError(
                500,
                'error',
                {data: 'any'}
            ).build();

            const burstService = new BurstService('localhost', '', httpMock);

            try {
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

            const burstService = new BurstService('localhost', '', httpMock);

            try {
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
