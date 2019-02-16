import {Api} from '../typings/api';
import {BlockApi} from '../typings/api/blockApi';
import {AccountApi} from '../typings/api/accountApi';
import {MessageApi} from '../typings/api/messageApi';
import {NetworkApi} from '../typings/api/networkApi';
import {TransactionApi} from '../typings/api/transactionApi';
import {BurstService} from "../burstService";


class ApiImpl implements Api {
    account: AccountApi;
    block: BlockApi;
    message: MessageApi;
    network: NetworkApi;
    transaction: TransactionApi;
}

export class ApiComposer {
    private api: Api = new ApiImpl();

    public static create(service: BurstService): ApiComposer {
        return new ApiComposer(service);
    }

    private constructor(private service: BurstService) {}

    private mapCreators(apiSection: string, creatorMap: any) {
        this.api[apiSection] = {};

        Object.keys(creatorMap)
            .forEach(
                creatorName => this.api[apiSection][creatorName] = creatorMap[creatorName](this.service)
            );
    }

    public withBlockApi(creatorMap: any): ApiComposer {
        this.mapCreators('block', creatorMap);
        return this;
    }

    public withAccountApi(creatorMap: any): ApiComposer {
        this.mapCreators('account', creatorMap);
        return this;
    }

    public withNetworkApi(creatorMap: any): ApiComposer {
        this.mapCreators('network', creatorMap);
        return this;
    }

    public withMessageApi(creatorMap: any): ApiComposer {
        this.mapCreators('message', creatorMap);
        return this;
    }

    public withTransactionApi(creatorMap: any): ApiComposer {
        this.mapCreators('transaction', creatorMap);
        return this;
    }

    public compose(): Api { return this.api; }
}
