// IMPORTANT: mocking http at first
jest.mock('@burst/http/src/http');

import {HttpMock} from '@burst/http';
import {NetworkService} from '../networkService';
import {NetworkStatus} from '../../model/networkStatus';
import {BlockchainStatus} from '../../model/blockchainStatus';

describe('BlockApi', () => {

    beforeEach(() => {
        HttpMock.reset();
    });

    describe('getBlockchainStatus', () => {
        it('should getBlockchainStatus', async () => {

            const mockedStatus = new BlockchainStatus({application: 'BRS', numberOfBlocks: 100});
            HttpMock.onGet().reply(200, mockedStatus);

            const service = new NetworkService('localhost');
            const status = await service.getBlockchainStatus();
            expect(status.application).toBe('BRS');
            expect(status.numberOfBlocks).toBe(100);
            expect(status.lastBlockchainFeederHeight).toBeUndefined(); // not mapped
        });

        it('should fail on getBlockchainStatus', async () => {

            HttpMock.onGet().error(500, 'Internal Server Error');

            try {
                const service = new NetworkService('localhost');
                await service.getBlockchainStatus();
                expect(true).toBe('Exception expected');
            } catch (error) {
                expect(error.status).toBe(500);
            }
        });
    });

    describe('getNetworkState', () => {
        it('should getNetworkState', async () => {

            const mockedStatus = new NetworkStatus({
                application: 'BRS',
                numberOfPeers: 100,
                numberOfAccounts: 10,
            });
            HttpMock.onGet().reply(200, mockedStatus);

            const service = new NetworkService('localhost');
            const status = await service.getNetworkStatus();
            expect(status.application).toBe('BRS');
            expect(status.numberOfAccounts).toBe(10);
            expect(status.numberOfPeers).toBe(100);
            expect(status.numberOfAskOrders).toBeUndefined(); // not mapped
        });

        it('should fail on getNetworkState', async () => {

            HttpMock.onGet().error(500, 'Internal Server Error');

            try {
                const service = new NetworkService('localhost');
                await service.getNetworkStatus();
                expect(true).toBe('Exception expected');
            } catch (error) {
                expect(error.status).toBe(500);
            }
        });
    });

});
