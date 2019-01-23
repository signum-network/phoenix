import {BaseService} from './baseService';
import {Block} from '../model/block';
import {BlockId} from '../model/blockId';


/**
 * Service for block operations
 * @link https://burstwiki.org/wiki/The_Burst_API#Block_Operations
 */
export class BlockService extends BaseService {

    /**
     * Get a block by given height
     * @param height The block height
     * @param includeTransactions _true_, if transactions shall be included
     * @return The Block
     */
    public getBlockByHeight(height: number, includeTransactions: boolean): Promise<Block> {
        const url = this.toBRSEndpoint('getBlock', {height, includeTransactions});
        return this.requestGet(url);
    }

    /**
     * Get a block by given id
     * @param id The block id
     * @param includeTransactions _true_, if transactions shall be included
     * @return The Block
     */
    public getBlockById(id: string, includeTransactions: boolean): Promise<Block> {
        const url = this.toBRSEndpoint('getBlock', {id, includeTransactions});
        return this.requestGet(url);
    }

    /**
     * Get a block by given timestamp
     * @param timestamp The block timestamp is the timestamp in seconds since the genesis block
     * @param includeTransactions _true_, if transactions shall be included
     * @return The Block
     */
    public getBlockByTimestamp(timestamp: number, includeTransactions: boolean): Promise<Block> {
        const url = this.toBRSEndpoint('getBlock', {timestamp, includeTransactions});
        return this.requestGet(url);
    }

    /**
     * Get a block ID given a block height
     * @param height The block height
     * @return The Block id
     */
    public getBlockId(height: number): Promise<BlockId> {
        const url = this.toBRSEndpoint('getBlockId', {height});
        return this.requestGet(url);
    }

}
