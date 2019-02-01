/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../burstService';
import {TransactionList} from '../../typings/transactionList';

/**
 * Get transactions of given account
 * @param {string} accountId The numeric accountId
 * @param {number?} firstIndex The first index of the transaction list, beginning at 0
 * @param {number?} lastIndex The last index of the transaction list
 * @param {number?} numberOfConfirmations The minimum required number of confirmations per transaction
 * @return {Promise<TransactionList>}
 */
export const getAccountTransactions = (service: BurstService):
    (
        accountId: string,
        firstIndex?: number,
        lastIndex?: number,
        numberOfConfirmations?: number
    ) => Promise<TransactionList> =>
    (
        accountId: string,
        firstIndex?: number,
        lastIndex?: number,
        numberOfConfirmations?: number
    ): Promise<TransactionList> =>
        service.query('getAccountTransactions', {
            account: accountId,
            firstIndex,
            lastIndex,
            numberOfConfirmations
        });
