/** @module core.api */

import {BlockchainStatus} from '../blockchainStatus';
import {ServerStatus} from '../serverStatus';
import {SuggestedFees} from '../suggestedFees';
import {Peer} from '../peer';
import {PeerAddressList} from '../peerAddressList';
import {BurstTime} from '../burstTime';

/**
 * Network API
 *
 * This module provides methods about the network itself
 */
export interface NetworkApi {
    /**
     * Get the blockchain status.
     * @return {BlockchainStatus} The Blockchain Status
     */
    getBlockchainStatus: () => Promise<BlockchainStatus>;

    /**
     * Get the state of the server node and network
     * @return {ServerStatus} The server Status
     */
    getServerStatus: () => Promise<ServerStatus>;

    /**
     * Get the current suggested fees
     * @return {SuggestedFees} The Suggested Fees
     */
    suggestFee: () => Promise<SuggestedFees>;

    /**
     * Get a peer by a given IP address
     * @param address The peer's address
     * @return {Peer} The Peer
     */
    getPeer: (address: string) => Promise<Peer>;

    /**
     * Get a list of peers
     * @param {boolean} active Only return active peers (default: true)
     * @return {PeerAddressList} The Peer Address List
     */
    getPeers: (active?: boolean) => Promise<PeerAddressList>;

    /**
     * Get the current blockchain/Burst timestamp in seconds since Genesis Block
     * @return timestamp in seconds since Genesis Block
     */
    getTime: () => Promise<BurstTime>;

}
