import BaseApi from './baseApi';


//     http://3.16.150.48:6876/burst?requestType=getBlock&height=2956&includeTransactions=true&_=1547826203045

class BlockApi extends BaseApi{
    public getBlock(height: number, includeTransactions: boolean){
        this.http.get(`requestType=getBlock&height=${height}&includeTransactions=${includeTransactions}`);
    }
}
