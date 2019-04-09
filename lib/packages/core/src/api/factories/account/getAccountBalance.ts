/** @module core.api.factories */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {BurstService} from '../../../service/burstService';
import {Balance} from '../../../typings/balance';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccountBalance]]
 */
export const getAccountBalance = (service: BurstService):
    (accountId: string) => Promise<Balance> =>
    (accountId: string): Promise<Balance> => service.query('getBalance', {
        account: accountId,
    });
