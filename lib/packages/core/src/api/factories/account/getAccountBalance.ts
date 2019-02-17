/** @module core */
/** @ignore */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

 /**
 * Submits a getBalance query given an accountId
 */
import {BurstService} from '../../../burstService';
import {Balance} from '../../../typings/balance';

export const getAccountBalance = (service: BurstService):
    (accountId: string) => Promise<Balance> =>
    (accountId: string): Promise<Balance> => service.query('getBalance', {
        account: accountId,
    });
