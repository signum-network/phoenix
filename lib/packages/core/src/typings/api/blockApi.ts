import {Block} from '../block';
import {BlockId} from '../blockId';

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

export interface BlockApi {
    getBlockByTimestamp: (timestamp: number, includeTransactions: boolean) => Promise<Block>;
    getBlockByHeight: (height: number, includeTransactions: boolean) => Promise<Block>;
    getBlockById: (block: string, includeTransactions: boolean) => Promise<Block>;
    getBlockId: (height: number) => Promise<BlockId>;
}
