// IMPORTANT: mocking http at first
jest.mock('@burstjs/http/src/http');
import {HttpMock} from '@burstjs/http';
import {BurstService} from '../../burstService';
import {getBlockchainStatus} from '../network/getBlockchainStatus';
import {getServerStatus} from '../network/getServerStatus';

describe('Network Api', () => {

    beforeEach(() => {
        HttpMock.reset();
    });

    describe('getBlockchainStatus', () => {
        it('should getBlockchainStatus', async () => {

            HttpMock.onGet().reply(200, {application: 'BRS', numberOfBlocks: 100});

            const service = new BurstService('localhost');
            const status = await getBlockchainStatus(service)();
            expect(status.application).toBe('BRS');
            expect(status.numberOfBlocks).toBe(100);
            expect(status.lastBlockchainFeederHeight).toBeUndefined(); // not mapped
        });

        it('should fail on getBlockchainStatus', async () => {

            HttpMock.onGet().error(500, 'Internal Server Error');

            try {
                const service = new BurstService('localhost');
                await getBlockchainStatus(service)();
                expect(true).toBe('Exception expected');
            } catch (error) {
                expect(error.status).toBe(500);
            }
        });
    });

    describe('getNetworkState', () => {
        it('should getNetworkState', async () => {

            HttpMock.onGet().reply(200, {
                application: 'BRS',
                numberOfPeers: 100,
                numberOfAccounts: 10,
            });

            const service = new BurstService('localhost');
            const status = await getServerStatus(service)();
            expect(status.application).toBe('BRS');
            expect(status.numberOfAccounts).toBe(10);
            expect(status.numberOfPeers).toBe(100);
            expect(status.numberOfAskOrders).toBeUndefined(); // not mapped
        });

        it('should fail on getNetworkState', async () => {

            HttpMock.onGet().error(500, 'Internal Server Error');

            try {
                const service = new BurstService('localhost');
                await getServerStatus(service)();
                expect(true).toBe('Exception expected');
            } catch (error) {
                expect(error.status).toBe(500);
            }
        });
    });

});
