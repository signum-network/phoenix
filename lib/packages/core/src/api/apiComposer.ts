/** @module core.api */

/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {Api} from '../typings/api';
import {AssetApi} from '../typings/api/assetApi';
import {AliasApi} from '../typings/api/aliasApi';
import {BlockApi} from '../typings/api/blockApi';
import {AccountApi} from '../typings/api/accountApi';
import {MessageApi} from '../typings/api/messageApi';
import {NetworkApi} from '../typings/api/networkApi';
import {TransactionApi} from '../typings/api/transactionApi';
import {BurstService} from '../service/burstService';
import {ContractApi} from '../typings/api/contractApi';


class ApiImpl implements Api {
    alias: AliasApi;
    account: AccountApi;
    asset: AssetApi;
    block: BlockApi;
    message: MessageApi;
    network: NetworkApi;
    transaction: TransactionApi;
    contract: ContractApi;
}

/**
 * The API composer mounts the API for given service and selected methods
 *
 * Usually you would use [[composeApi]], which gives you _all_ available API methods.
 * Unfortunately, this will import almost all dependencies, even if you need only a fraction
 * of the methods. To take advantage of tree-shaking (dead code elimination) you can
 * compose your own API with the methods you need. This can reduce your final bundle significantly.
 *
 * Usage:
 * ```typescript
 *
 * const burstService = new BurstService({
 *     nodeHost: 'https://testnet.burst.fun',
 *     apiRootUrl: '/burst'
 * })
 *
 * const api = apiComposer
 * .create(burstService)
 * .withMessageApi({
 *                sendTextMessage
 *            })
 * .withAccountApi({
 *                getAccountTransactions,
 *                getUnconfirmedAccountTransactions,
 *                getAccountBalance,
 *                generateSendTransactionQRCode,
 *                generateSendTransactionQRCodeAddress,
 *            })
 * .compose();
 * ```
 *
 * The `with<section>Api` uses factory methods from the [api.core.factories](/phoenix/docs/modules/core.api.factories.html) package
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
     * Adds the [[BlockApi]] to be composed
     * @param creatorMap A map of creator/factory functions for the endpoints
     */
    public withBlockApi(creatorMap: any): ApiComposer {
        this.mapCreators('block', creatorMap);
        return this;
    }

    /**
     * Adds the [[AccountApi]]  to be composed
     * @param creatorMap A map of creator/factory functions for the endpoints
     */
    public withAccountApi(creatorMap: any): ApiComposer {
        this.mapCreators('account', creatorMap);
        return this;
    }

    /**
     * Adds the [[NetworkApi]]  to be composed
     * @param creatorMap A map of creator/factory functions for the endpoints
     */
    public withNetworkApi(creatorMap: any): ApiComposer {
        this.mapCreators('network', creatorMap);
        return this;
    }

    /**
     * Adds the [[MessageApi]]  to be composed
     * @param creatorMap A map of creator/factory functions for the endpoints
     */
    public withMessageApi(creatorMap: any): ApiComposer {
        this.mapCreators('message', creatorMap);
        return this;
    }

    /**
     * Adds the [[TransactionApi]]  to be composed
     * @param creatorMap A map of creator/factory functions for the endpoints
     */
    public withTransactionApi(creatorMap: any): ApiComposer {
        this.mapCreators('transaction', creatorMap);
        return this;
    }

    /**
     * Adds the [[AliasApi]]  to be composed
     * @param creatorMap A map of creator/factory functions for the endpoints
     */
    public withAliasApi(creatorMap: any): ApiComposer {
        this.mapCreators('alias', creatorMap);
        return this;
    }

    /**
     * Adds the [[AssetApi]]  to be composed
     * @param creatorMap A map of creator/factory functions for the endpoints
     */
    public withAssetApi(creatorMap: any): ApiComposer {
        this.mapCreators('asset', creatorMap);
        return this;
    }

    /**
     * Adds the [[ContractApi]]  to be composed
     * @param creatorMap A map of creator/factory functions for the endpoints
     */
    public withContractApi(creatorMap: any): ApiComposer {
        this.mapCreators('contract', creatorMap);
        return this;
    }

    /**
     * Composes the API
     * Note: As of being a builder pattern, this need to call this method as last
     */
    public compose(): Api { return this.api; }
}
