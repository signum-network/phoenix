import {BlockApi} from './blockApi';
import {NetworkApi} from './networkApi';
import {TransactionApi} from './transactionApi';
import {MessageApi} from './messageApi';
import {AccountApi} from './accountApi';
import {AliasApi} from './aliasApi';
import {ContractApi} from './contractApi';
import {AssetApi} from './assetApi';
import {BurstValue} from '@burstjs/util';
import {BurstService} from '../../service';

export {
    AccountApi,
    AliasApi,
    AssetApi,
    BlockApi,
    ContractApi,
    MessageApi,
    NetworkApi,
    TransactionApi,
};

/**
 * The API structure returned by [[composeApi]]
 *
 * The programming interface uses a _builder pattern_ to mount an API.
 * For sake of simplicity the [[composeApi]] method mounts the __entire__ API, i.e.
 * all available methods are mounted using this class
 *
 * ```ts
 * const api = composeApi({
 *   nodeHost: 'https://wallet1.burst-team.us:2083', // one of the mainnet nodes
 *   apiRootUrl: '/burst' // endpoint to the BURST API
 * })
 * ```
 *
 * While this is a straightforward way to have access to all BURST functionality, this methods
 * has the disadvantage of including all needed dependencies, thus leading to a bigger bundle, for those
 * who use bundlers like [webpack](https://webpack.js.org/). To reduce the bundle size, one may mount the API
 * conforming his needs using the [[ApiComposer]] class.
 *
 * @module core.api
 */
export class Api {
    /**
     * This leaks the underlying service instance to interact with the BRS API directly, e.g. to use an API method that
     * is not supported by BurstJS yet.
     */
    readonly service: BurstService;
    readonly asset: AssetApi;
    readonly block: BlockApi;
    readonly network: NetworkApi;
    readonly transaction: TransactionApi;
    readonly message: MessageApi;
    readonly account: AccountApi;
    readonly alias: AliasApi;
    readonly contract: ContractApi;
}
