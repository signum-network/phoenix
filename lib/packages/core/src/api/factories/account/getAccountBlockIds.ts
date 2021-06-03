/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {BlockIdList} from '../../../typings/blockIdList';
import {GetAccountBlocksArgs} from '../../../typings/args/getAccountBlocksArgs';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccountBlockIds]]
 * @module core.api.factories
 */
export const getAccountBlockIds = (service: ChainService):
    (args: GetAccountBlocksArgs) => Promise<BlockIdList> =>
    (args): Promise<BlockIdList> => {

        const params = {
            account: args.accountId,
            firstIndex: args.firstIndex,
            lastIndex: args.lastIndex,
            includeTransactions: args.includeTransactions || false
        };

        return service.query('getAccountBlockIds', params);
    };


