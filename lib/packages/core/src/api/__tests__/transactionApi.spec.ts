jest.mock('@burstjs/http/src/http');
import {HttpMock} from '@burstjs/http';
import {BurstService} from '../../burstService';
import {broadcastTransaction} from '../transaction/broadcastTransaction';
import {getTransaction} from '../transaction/getTransaction';
import {TransactionId} from '../../typings/transactionId';

xdescribe('Transaction Api', () => {

    beforeEach(() => {
        HttpMock.reset();
    });

    describe('broadcastTransaction', () => {
        it('should broadcastTransaction (generic)', async () => {

            HttpMock.onPost().reply<TransactionId>(200, {fullHash: 'fullHash', transaction: 'transaction'});

            const service = new BurstService('localhost');
            const status = await broadcastTransaction(service)('some_data');
            expect(status.fullHash).toBe('fullHash');
            expect(status.transaction).toBe('transaction');
        });

    });

   describe('getTransaction', () => {
        it('should getTransaction', async () => {

            HttpMock.onGet().reply(200, { id: 'transactionId', block: 'blockId' });

            const service = new BurstService('localhost');
            const status = await getTransaction(service)('transactionId');
            expect(status.id).toBe('transactionId');
            expect(status.block).toBe('blockId');
        });

    });

});
