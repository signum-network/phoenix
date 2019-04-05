import {HttpMockBuilder, Http} from '@burstjs/http';
import {getBlockchainStatus} from '../factories/network/getBlockchainStatus';
import {getServerStatus} from '../factories/network/getServerStatus';
import {getTime} from '../factories/network/getTime';
import {createBurstService} from '../../__tests__/helpers/createBurstService';

describe('Network Api', () => {

    let httpMock: Http;

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
    });

    describe('getBlockchainStatus', () => {
        it('should getBlockchainStatus', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {
                application: 'BRS',
                numberOfBlocks: 100
            }).build();
            const service = createBurstService(httpMock, 'relPath');
            const status = await getBlockchainStatus(service)();
            expect(status.application).toBe('BRS');
            expect(status.numberOfBlocks).toBe(100);
            expect(status.lastBlockchainFeederHeight).toBeUndefined(); // not mapped
        });

        it('should fail on getBlockchainStatus', async () => {
            try {
                httpMock = HttpMockBuilder.create().onGetThrowError(500, 'Internal Server Error').build();
                const service = createBurstService(httpMock, 'relPath');
                await getBlockchainStatus(service)();
                expect(true).toBe('Exception expected');
            } catch (error) {
                expect(error.status).toBe(500);
            }
        });
    });

    describe('getNetworkState', () => {
        it('should getNetworkState', async () => {

            httpMock = HttpMockBuilder.create().onGetReply(200, {
                application: 'BRS',
                numberOfPeers: 100,
                numberOfAccounts: 10,
            }).build();
            const service = createBurstService(httpMock, 'relPath');
            const status = await getServerStatus(service)();
            expect(status.application).toBe('BRS');
            expect(status.numberOfAccounts).toBe(10);
            expect(status.numberOfPeers).toBe(100);
            expect(status.numberOfAskOrders).toBeUndefined(); // not mapped
        });

        it('should fail on getNetworkState', async () => {
            try {
                httpMock = HttpMockBuilder.create().onGetThrowError(500, 'Internal Server Error').build();
                const service = createBurstService(httpMock, 'relPath');
                await getServerStatus(service)();
                expect(true).toBe('Exception expected');
            } catch (error) {
                expect(error.status).toBe(500);
            }
        });
    });

    describe('getTime', () => {
        it('should getTime', async () => {

            httpMock = HttpMockBuilder.create().onGetReply(200, {
                time: 100000000,
            }).build();
            const service = createBurstService(httpMock, 'relPath');
            const status = await getTime(service)();
            expect(status.time).toBe(100000000);
        });
    });
});
