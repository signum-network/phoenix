import {BurstService} from '../../burstService';
import {BlockchainStatus} from '../../typings/blockchainStatus';
import {ServerStatus} from '../../typings/serverStatus';

/**
 * Get the state of the server node and network
 * @return The server Status
 */
export const getServerStatus = (service: BurstService): () => Promise<ServerStatus> =>
    (): Promise<ServerStatus> => service.query('getState');
