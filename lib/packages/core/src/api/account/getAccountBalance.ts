/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../burstService';
import {Balance} from '../../typings/balance';

/**
 * Gets the balance od an account
 * @param {string} accountId
 * @return {Promise<Balance>}
 */
export const getAccountBalance = (service: BurstService):
    (accountId: string) => Promise<Balance> =>
    (accountId: string): Promise<Balance> => service.query('getBalance', {
        account: accountId,
    });
