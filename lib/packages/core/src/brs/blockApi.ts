import BaseApi from './baseApi';
import HttpResponse from '@burst/http/src/httpResponse';
import {Block} from '../block';


//     http://3.16.150.48:6876/burst?requestType=getBlock&height=2956&includeTransactions=true&_=1547826203045

class BlockApi extends BaseApi {
    public getBlock(height: number, includeTransactions: boolean): Promise<Block> {
        return this.http
            .get(`requestType=getBlock&height=${height}&includeTransactions=${includeTransactions}`)
            .then((response: HttpResponse) => {
                    return Promise.resolve(response.response);
                });
    }
}

export default BlockApi;
