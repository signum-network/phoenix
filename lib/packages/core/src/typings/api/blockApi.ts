/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {Block} from '../block';
import {BlockId} from '../blockId';


/**
 * Block API
 * @module core.api
 */
export interface BlockApi {
    /**
     * Get a block from a given timestamp
     * @param timestamp The timestamp in seconds since genesis block
     * @param includeTransactions _true_, if transactions shall be included
     * @return The Block
     */
    getBlockByTimestamp: (timestamp: number, includeTransactions: boolean) => Promise<Block>;

    /**
     * Get a block by given height
     * @param height The block height
     * @param includeTransactions _true_, if transactions shall be included
     * @return The Block
     */
    getBlockByHeight: (height: number, includeTransactions: boolean) => Promise<Block>;

    /**
     * Get a block by given id
     * @param id The block id
     * @param includeTransactions _true_, if transactions shall be included
     * @return The Block
     */
    getBlockById: (block: string, includeTransactions: boolean) => Promise<Block>;

    /**
     * Get a block id by given height
     * @param height The block height
     * @return The Block Id
     */
    getBlockId: (height: number) => Promise<BlockId>;

    /**
     * Get blocks from the blockchain in reverse block height order.
     * @param firstIndex first block to retrieve (optional, default is zero or the last block on the blockchain)
     * @param lastIndex the last block to retrieve (optional, default is firstIndex + 99)
     * @param includeTransactions _true_, if transactions shall be included
     * @return {Block[]} the array of blocks retrieved
     */
    getBlocks: (firstIndex?: number, lastIndex?: number, includeTransactions?: boolean) => Promise<Block[]>;
}
