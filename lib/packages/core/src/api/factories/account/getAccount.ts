/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {BurstService} from '../../../service/burstService';
import {Account} from '../../../typings/account';
import {GetAccountArgs} from '../../../typings/args/getAccountArgs';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccount]]
 * @module core.api.factories
 */
export const getAccount = (service: BurstService):
    (args: GetAccountArgs) => Promise<Account> =>
    (args: GetAccountArgs): Promise<Account> => {

        const params = {
            account: args.accountId,
            height : args.commitmentAtHeight || undefined,
            getCommittedAmount : args.includeCommittedAmount || false,
            estimateCommitment : args.includeEstimatedCommitment || false
        };

        return service.query('getAccount', params);
    };
