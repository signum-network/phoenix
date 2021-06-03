/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {BlockList} from '../../../typings/blockList';
import {GetAccountBlocksArgs} from '../../../typings/args/getAccountBlocksArgs';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccountBlocks]]
 * @module core.api.factories
 */
export const getAccountBlocks = (service: ChainService):
    (args: GetAccountBlocksArgs) => Promise<BlockList> =>
    (args): Promise<BlockList> => {

        const params = {
            account: args.accountId,
            firstIndex: args.firstIndex,
            lastIndex: args.lastIndex,
            includeTransactions: args.includeTransactions || false
        };

        return service.query('getAccountBlocks', params);
    };
