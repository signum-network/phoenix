// IMPORTANT: mocking http at first
import {TransactionId} from '../../typings/transactionId';

jest.mock('@burst/http/src/http');
import {HttpMock} from '@burst/http';
import {BurstService} from '../../burstService';
import {broadcastTransaction} from '../transaction/broadcastTransaction';

describe('Transaction Api', () => {

    beforeEach(() => {
        HttpMock.reset();
    });

    describe('broadcastTransaction', () => {
        it('should broadcastTransaction (generic)', async () => {

            HttpMock.onPost().reply<TransactionId>(200, {fullHase: 'fullHash', transaction: 'transaction'});

            const service = new BurstService('localhost');
            const status = await broadcastTransaction(service)('some_data');
            expect(status.fullHase).toBe('fullHash');
            expect(status.transaction).toBe('transaction');
        });

    });

});
