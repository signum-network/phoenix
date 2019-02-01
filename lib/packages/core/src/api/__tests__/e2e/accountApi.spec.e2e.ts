import {loadEnvironment} from './helpers/environment';
import {getAccountIdFromPassphrase} from './helpers/account';
import {BurstService} from '../../../burstService';
import {getAccountTransactions} from '../../account/getAccountTransactions';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe(`[E2E] Account Api`, () => {

    const service = new BurstService(environment.testNetHost, environment.testNetApiPath);
    const accountId = getAccountIdFromPassphrase(environment.testPassphrase);

    it('should getAccountTransactions', async () => {
        const transactionList = await getAccountTransactions(service)(accountId);
        // always returns block zero
        expect(transactionList).not.toBeUndefined();
        const {transactions} = transactionList;
        expect(transactions.length).toBeGreaterThan(1);

        const testTransaction = transactions.filter(
            ({transaction})  => transaction === environment.testTransactionId
        )[0];
        expect(testTransaction).toBeDefined();
        expect(testTransaction.sender).toBe(accountId);
    });

});
