import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../burstService';
import {getTransaction} from '../../factories/transaction/getTransaction';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe('[E2E] Transaction Api', () => {

    const service = new BurstService(environment.testNetHost, environment.testNetApiPath);

    it('should getTransaction', async () => {
        const transaction = await getTransaction(service)(environment.testTransactionId);
        expect(transaction.transaction).toBe(environment.testTransactionId);
        expect(transaction.senderPublicKey).toBeDefined();
        expect(transaction.senderRS.startsWith('BURST-')).toBeTruthy();
        expect(transaction.confirmations).toBeGreaterThan(1);
        expect(transaction.height).toBeGreaterThan(1);
        expect(transaction.sender).toBeDefined();
        expect(transaction.recipient).toBeDefined();
        expect(transaction.recipientRS.startsWith('BURST-')).toBeTruthy();
        // ... more here, if you want :P
    });

});
