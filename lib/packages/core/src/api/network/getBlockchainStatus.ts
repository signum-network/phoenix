import {BurstService} from '../../burstService';
import {BlockchainStatus} from '../../typings/blockchainStatus';

/**
 * Get the blockchain status.
  * @return The Blockchain Status
 */
export const getBlockchainStatus = (service: BurstService): () => Promise<BlockchainStatus> =>
    (): Promise<BlockchainStatus> => service.query('getBlockchainStatus');
