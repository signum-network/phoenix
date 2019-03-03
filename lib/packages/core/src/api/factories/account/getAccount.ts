/** @ignore */
/** @module core */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

 /**
 * Submits a getAccount query given an accountId
 */
import {BurstService} from '../../../burstService';
import { Account } from '../../../typings/account';

export const getAccount = (service: BurstService):
    (accountId: string) => Promise<Account> =>
    (accountId: string): Promise<Account> => service.query('getAccount', {
        account: accountId,
    });
