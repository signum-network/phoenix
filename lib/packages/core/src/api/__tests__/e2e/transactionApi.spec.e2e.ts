import {environment} from './helpers/environment';
import {BurstService} from '../../../burstService';
import {getTransaction} from '../../transaction/getTransaction';

jest.setTimeout(environment.timeout);

describe('[E2E] Transaction Api', () => {

    const service = new BurstService(environment.testNetHost, environment.testNetApiUrl);

    it('should getTransaction', async () => {
        const transaction = await getTransaction(service)('16869443137219243808');
        expect(transaction.transaction).toBe('16869443137219243808');
        expect(transaction.senderPublicKey).toBe('7210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b');
        expect(transaction.senderRS).toBe('BURST-K37B-9V85-FB95-793HN');
        expect(transaction.sender).toBe('6502115112683865257');
        expect(transaction.block).toBe('3540664400458918145');
        expect(transaction.deadline).toBe(1440);
        expect(transaction.confirmations).toBeGreaterThan(1);
        expect(transaction.amountNQT).toBe('0');
        expect(transaction.feeNQT).toBe('10000000');
        expect(transaction.height).toBe(2972);
        // ... more here, if you want :P
    });

});
