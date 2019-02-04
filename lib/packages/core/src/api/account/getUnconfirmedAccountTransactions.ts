/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../burstService';
import {UnconfirmedTransactionList} from '../../typings/unconfirmedTransactionList';

/**
 * Get _unconfirmed_ transactions of given account
 * @param {string} accountId The numeric accountId
 * @return {Promise<UnconfirmedTransactionList>}
 */
export const getUnconfirmedAccountTransactions = (service: BurstService):
    (accountId: string) => Promise<UnconfirmedTransactionList> =>
    (accountId: string): Promise<UnconfirmedTransactionList> =>
        service.query('getUnconfirmedTransactions', {account: accountId});
