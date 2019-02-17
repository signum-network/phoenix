/** @module core */
/** @ignore */

/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {Api} from '../typings/api';
import {BlockApi} from '../typings/api/blockApi';
import {AccountApi} from '../typings/api/accountApi';
import {MessageApi} from '../typings/api/messageApi';
import {NetworkApi} from '../typings/api/networkApi';
import {TransactionApi} from '../typings/api/transactionApi';
import {BurstService} from '../burstService';


class ApiImpl implements Api {
    account: AccountApi;
    block: BlockApi;
    message: MessageApi;
    network: NetworkApi;
    transaction: TransactionApi;
}

/**
 * The API composer mounts the API with given service
 *
 *
 * Usage:
 ```  const api = apiComposer
 .withMessageApi({
                sendTextMessage
            })
 .withAccountApi({
                getAccountTransactions,
                getUnconfirmedAccountTransactions,
                getAccountBalance,
                generateSendTransactionQRCode,
                generateSendTransactionQRCodeAddress,
            })
 .compose();
```
 *
 */
export class ApiComposer {
    private api: Api = new ApiImpl();

    /**
     * Creates the composer instance
     * @param service
     * @return the composer instance
     */
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

    /**
     * Adds the [[BlockAPI]] to be composed
     * @param creatorMap A map of creator/factory functions for the endpoints
     */
    public withBlockApi(creatorMap: any): ApiComposer {
        this.mapCreators('block', creatorMap);
        return this;
    }

    /**
     * Adds the [[AccountAPI]]  to be composed
     * @param creatorMap A map of creator/factory functions for the endpoints
     */
    public withAccountApi(creatorMap: any): ApiComposer {
        this.mapCreators('account', creatorMap);
        return this;
    }

    /**
     * Adds the [[NetworkAPI]]  to be composed
     * @param creatorMap A map of creator/factory functions for the endpoints
     */
    public withNetworkApi(creatorMap: any): ApiComposer {
        this.mapCreators('network', creatorMap);
        return this;
    }

    /**
     * Adds the [[MessageAPI]]  to be composed
     * @param creatorMap A map of creator/factory functions for the endpoints
     */
    public withMessageApi(creatorMap: any): ApiComposer {
        this.mapCreators('message', creatorMap);
        return this;
    }

    /**
     * Adds the [[TransactionAPI]]  to be composed
     * @param creatorMap A map of creator/factory functions for the endpoints
     */
    public withTransactionApi(creatorMap: any): ApiComposer {
        this.mapCreators('transaction', creatorMap);
        return this;
    }

    /**
     * Composes the API
     * Note: As of being a builder pattern, this need to call this method as last
     */
    public compose(): Api { return this.api; }
}
