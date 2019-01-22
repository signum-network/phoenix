import BaseService from './baseService';
import BlockchainStatus from '../model/blockchainStatus';
import HttpResponse from '@burst/http/src/httpResponse';

// https://burstwiki.org/wiki/The_Burst_API#Server_Information_Operations

class NetworkService extends BaseService {

    public getBlockchainStatus(): Promise<BlockchainStatus> {

        const url = this.toBRSEndpoint('getBlockchainStatus');

        return this.http.get(url)
            .then((response: HttpResponse) => {
                return Promise.resolve(response.response);
            });
    }

}

export default NetworkService;
