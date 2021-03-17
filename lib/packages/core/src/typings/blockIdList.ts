import {BlockId} from './blockId';

/**
 * Original work Copyright (c) 2020 Burst Apps Team
 */

/**
 * Block Id List
 * @module core
 */
export interface BlockIdList {
    blockIds: BlockId[];
    requestProcessingTime: number;
}
