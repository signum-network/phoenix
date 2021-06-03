/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {ChainService} from '../../../service/chainService';
import {Account} from '../../../typings/account';
import {GetAccountArgs} from '../../../typings/args/getAccountArgs';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccount]]
 * @module core.api.factories
 */
export const getAccount = (service: ChainService):
    (args: GetAccountArgs) => Promise<Account> =>
    (args: GetAccountArgs): Promise<Account> => {

        const params = {
            account: args.accountId,
            height : args.commitmentAtHeight, // || undefined,
            getCommittedAmount : args.includeCommittedAmount, // || undefined,
            estimateCommitment : args.includeEstimatedCommitment, // || undefined
        };

        return service.query('getAccount', params);
    };
