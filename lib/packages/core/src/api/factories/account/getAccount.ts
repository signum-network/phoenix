/** @module core.api.factories */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {BurstService} from '../../../service/burstService';
import { Account } from '../../../typings/account';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccount]]
 */
export const getAccount = (service: BurstService):
    (accountId: string) => Promise<Account> =>
    (accountId: string): Promise<Account> => service.query('getAccount', {
        account: accountId,
    });
