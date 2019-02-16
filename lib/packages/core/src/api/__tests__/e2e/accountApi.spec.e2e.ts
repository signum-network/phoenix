import {convertNQTStringToNumber} from '@burstjs/util';
import {loadEnvironment} from './helpers/environment';
import {getAccountIdFromPassphrase} from './helpers/account';
import {BurstService} from '../../../burstService';
import {getAccountTransactions} from '../../account/getAccountTransactions';
import {getUnconfirmedAccountTransactions} from '../../account/getUnconfirmedAccountTransactions';
import {getAccountBalance} from '../../account/getAccountBalance';

const environment = loadEnvironment();

jest.setTimeout(environment.timeout);

describe(`[E2E] Account Api`, () => {

    const service = new BurstService(environment.testNetHost, environment.testNetApiPath);
    const accountId = getAccountIdFromPassphrase(environment.testPassphrase);

    describe('getAccountTransactions', () => {
        it('should getAccountTransactions', async () => {
            const transactionList = await getAccountTransactions(service)(accountId);
            expect(transactionList).not.toBeUndefined();
            const {transactions} = transactionList;
            expect(transactions.length).toBeGreaterThan(1);

            const testTransaction = transactions.filter(
                ({transaction}) => transaction === environment.testTransactionId
            )[0];
            expect(testTransaction).toBeDefined();
            expect(testTransaction.sender).toBe(accountId);

        });

        it('should getAccountTransactions paged', async () => {
            const transactionList = await getAccountTransactions(service)(accountId, 0, 3);
            expect(transactionList).not.toBeUndefined();
            const {transactions} = transactionList;
            expect(transactions).toHaveLength(4);
        });

        it('should getAccountTransactions minimum confirmations', async () => {
            const transactionList = await getAccountTransactions(service)(accountId, undefined, undefined, 1440);
            expect(transactionList).not.toBeUndefined();
            const {transactions} = transactionList;
            expect(transactions.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('getUnconfirmedAccountTransactions', () => {
        it('should getUnconfirmedAccountTransactions', async () => {
            const transactionList = await getUnconfirmedAccountTransactions(service)(accountId);
            // e2e cannot guarantee existing unconfirmed transactions...but at least an answer
            expect(transactionList).not.toBeUndefined();
            expect(transactionList.unconfirmedTransactions.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('getAccountBalance', () => {
        it('should getAccountBalance', async () => {
            const balance = await getAccountBalance(service)(accountId);

            const c = convertNQTStringToNumber;
            expect(c(balance.balanceNQT)).toBeGreaterThan(1);
            expect(c(balance.forgedBalanceNQT)).toBeGreaterThanOrEqual(0);
            expect(c(balance.effectiveBalanceNXT)).toBeGreaterThan(1);
            expect(c(balance.guaranteedBalanceNQT)).toBeGreaterThan(1);
            expect(c(balance.unconfirmedBalanceNQT)).toBeGreaterThan(1);
        });
    });
});
