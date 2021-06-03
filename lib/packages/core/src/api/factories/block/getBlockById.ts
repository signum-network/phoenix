/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {Block} from '../../../typings/block';


/**
 * Use with [[ApiComposer]] and belongs to [[BlockApi]].
 *
 * See details at [[BlockApi.getBlockById]]
 * @module core.api.factories
 */
export const getBlockById = (service: ChainService):
    (block: string, includeTransactions: boolean) => Promise<Block> =>
    (block: string, includeTransactions: boolean): Promise<Block> =>
        service.query('getBlock', {
            block,
            includeTransactions
        });
