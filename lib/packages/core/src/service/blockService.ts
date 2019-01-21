import BaseService from './baseService';
import HttpResponse from '@burst/http/src/httpResponse';
import {Block} from '..';

// https://burstwiki.org/wiki/The_Burst_API#Block_Operations

/**
 * Service for block operations
 */
class BlockService extends BaseService {

    // http://3.16.150.48:6876/burst?requestType=getBlock&height=2956&includeTransactions=true&_=1547826203045
    public getBlock(height: number, includeTransactions: boolean): Promise<Block> {

        const url = BaseService.toBRSEndpoint('getBlock', {height, includeTransactions});

        return this.http.get(url)
            .then((response: HttpResponse) => {
                return Promise.resolve(response.response);
            });
    }
}

export default BlockService;
