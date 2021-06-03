/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {ChainService} from '../../../service/chainService';
import {Balance} from '../../../typings/balance';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccountBalance]]
 * @module core.api.factories
 */
export const getAccountBalance = (service: ChainService):
    (accountId: string) => Promise<Balance> =>
    (accountId: string): Promise<Balance> => service.query('getBalance', {
        account: accountId,
    });
