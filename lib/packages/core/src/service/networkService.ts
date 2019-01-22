import BaseService from './baseService';
import BlockchainStatus from '../model/blockchainStatus';
import NetworkStatus from '../model/networkStatus';

/**
 * This service provides information about the blockchains network status
 *
 * https://burstwiki.org/wiki/The_Burst_API#Server_Information_Operations
 */
class NetworkService extends BaseService {

    /**
     * Get the blockchain status.
     */
    public getBlockchainStatus(): Promise<BlockchainStatus> {
        return this.requestGet(this.toBRSEndpoint('getBlockchainStatus'));
    }

    /**
     * Get the state of the server node and network.
     */
    public getNetworkStatus(): Promise<NetworkStatus> {
        return this.requestGet(this.toBRSEndpoint('getState'));
    }
}

export default NetworkService;
