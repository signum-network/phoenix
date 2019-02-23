/** @module core */

import {BlockchainStatus} from '../blockchainStatus';
import {ServerStatus} from '../serverStatus';
import {SuggestedFees} from '../suggestedFees';

/**
 * Network API
 *
 * This module provides methods about the network itself
 */
export interface NetworkApi {
    /**
     * Get the blockchain status.
     * @return The Blockchain Status
     */
    getBlockchainStatus: () => Promise<BlockchainStatus>;

    /**
     * Get the state of the server node and network
     * @return The server Status
     */
    getServerStatus: () => Promise<ServerStatus>;

    /**
     * Get the current suggested fees
     * @return The Suggested Fees
     */
    suggestFee: () => Promise<SuggestedFees>;
}
