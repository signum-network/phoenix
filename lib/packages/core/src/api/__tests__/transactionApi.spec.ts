import {HttpMockBuilder, Http} from '@burstjs/http';
import {BurstService} from '../../burstService';
import {broadcastTransaction} from '../transaction/broadcastTransaction';
import {getTransaction} from '../transaction/getTransaction';

describe('Transaction Api', () => {

    let httpMock: Http;

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
    });

    describe('broadcastTransaction', () => {
        it('should broadcastTransaction (generic)', async () => {
            httpMock = HttpMockBuilder.create().onPostReply(200, {fullHash: 'fullHash', transaction: 'transaction'}).build();
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            const status = await broadcastTransaction(service)('some_data');
            expect(status.fullHash).toBe('fullHash');
            expect(status.transaction).toBe('transaction');
        });

    });

   describe('getTransaction', () => {
        it('should getTransaction', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, { transaction: 'transactionId', block: 'blockId' }).build();
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            const status = await getTransaction(service)('transactionId');
            expect(status.transaction).toBe('transactionId');
            expect(status.block).toBe('blockId');
        });

    });

});
