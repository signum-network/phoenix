import {loadEnvironment} from './helpers/environment';
import {ChainService} from '../../../service/chainService';
import {
    createSubscription,
    getTransaction,
    getUnconfirmedTransactions,
    sendAmountToSingleRecipient
} from '../../factories/transaction';
import {HttpError} from '@signumjs/http';
import {BurstValue, convertNumberToNQTString, FeeQuantPlanck} from '@signumjs/util';
import {generateMasterKeys, getAccountIdFromPublicKey} from '@signumjs/crypto';


const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe('[E2E] Transaction Api', () => {

    const service = new ChainService({
        nodeHost: environment.testNetHost,
        apiRootUrl: environment.testNetApiPath
    });

    const senderKeys = generateMasterKeys(environment.testPassphrase);
    const recipientKeys = generateMasterKeys(environment.testRecipientPassphrase);
    const recipientId = getAccountIdFromPublicKey(recipientKeys.publicKey);


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


     it('should sendAmountToSingleRecipient', async () => {
        const transaction = await sendAmountToSingleRecipient(service)({
            feePlanck: FeeQuantPlanck + '',
            senderPrivateKey: senderKeys.signPrivateKey,
            senderPublicKey: senderKeys.publicKey,
            amountPlanck: BurstValue.fromBurst(1).getPlanck(),
            recipientId,
            recipientPublicKey: recipientKeys.publicKey
        });
        expect(transaction.transaction).toBeDefined();
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

    describe('Subscription', () => {
        it('should createSubscription', async () => {
            const Day = 60 * 60 * 24;
            const subscription = await createSubscription(service)({
                amountPlanck: convertNumberToNQTString(1),
                frequency: Day * 30,
                feePlanck: `${FeeQuantPlanck}`,
                deadline: 24,
                recipientId: environment.testRecipientId,
                senderPublicKey: senderKeys.publicKey,
                senderPrivateKey: senderKeys.signPrivateKey,
            });

            expect(subscription.transaction).toBeDefined();
        });
    });

    describe('getUnconfirmedTransactions', () => {
        it('should getUnconfirmedTransactions as expected', async () => {
            const unconfirmedTransactionList = await getUnconfirmedTransactions(service)();
            expect(unconfirmedTransactionList).toBeDefined();
            expect(unconfirmedTransactionList.unconfirmedTransactions).toBeDefined();
            expect(unconfirmedTransactionList.unconfirmedTransactions.length).toBeGreaterThanOrEqual(0);
        });
    });
});
