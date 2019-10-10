import {HttpMockBuilder, Http} from '@burstjs/http';
import {getBlockchainStatus} from '../factories/network/getBlockchainStatus';
import {createBurstService} from '../../__tests__/helpers/createBurstService';
import {getAsset} from '../factories/asset/getAsset';

describe('Asset Api', () => {

    let httpMock: Http;

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
    });

    describe('getAsset', () => {
        it('should getAsset', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {
                account: 'accountId',
                accountRS: 'BURST-ADDRESS',
                name: 'TestName',
                description: 'Test Description',
                decimals: 0,
                quantityQNT: '100000000000000000',
                asset: 'assetId',
                numberOfTrades: 0,
                numberOfTransfers: 10,
                numberOfAccounts: 100,
            }).build();
            const service = createBurstService(httpMock, 'relPath');
            const asset = await getAsset(service)('assetId');
            expect(asset).toEqual({
                account: 'accountId',
                accountRS: 'BURST-ADDRESS',
                name: 'TestName',
                description: 'Test Description',
                decimals: 0,
                quantityQNT: '100000000000000000',
                asset: 'assetId',
                numberOfTrades: 0,
                numberOfTransfers: 10,
                numberOfAccounts: 100,
            });
        });

        it('should fail on getAsset', async () => {
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

});
