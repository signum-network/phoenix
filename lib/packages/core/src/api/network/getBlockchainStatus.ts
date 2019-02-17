/**
 * Original work Copyright (c) 2018 PoC-Consortium  
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../burstService';
import {BlockchainStatus} from '../../typings/blockchainStatus';

/**
 * Get the blockchain status.
  * @return The Blockchain Status
 */
export const getBlockchainStatus = (service: BurstService): () => Promise<BlockchainStatus> =>
    (): Promise<BlockchainStatus> => service.query('getBlockchainStatus');
