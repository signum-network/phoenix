import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../service/burstService';
import {getTransaction} from '../../factories/transaction/getTransaction';
import {HttpError} from '@burstjs/http';


const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe('[E2E] Transaction Api', () => {

    const service = new BurstService({
        baseUrl: environment.testNetHost,
        relativePath: environment.testNetApiPath
    });

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

    it('should fail getTransaction on unknown transaction', async () => {

        try {
            await getTransaction(service)('123');
            expect('Should throw exception').toBeFalsy();
        } catch (e) {
            const httpError = <HttpError>e;
            expect(httpError.message).toContain('Unknown transaction');
            expect(httpError.message).toContain('5'); // error code
            expect(httpError.data).toEqual(expect.objectContaining({
                'errorCode': 5,
                'errorDescription': 'Unknown transaction'
            }));

        }
    });

});
