import {BlockApi} from './blockApi';
import {NetworkApi} from './networkApi';
import {TransactionApi} from './transactionApi';
import {MessageApi} from './messageApi';
import {AccountApi} from './accountApi';


/**
 * @interface API Interface used by #composeApi
 */
export class Api {
    /**
     * The Block API
     */
    readonly block: BlockApi;
    readonly network: NetworkApi;
    readonly transaction: TransactionApi;
    readonly message: MessageApi;
    readonly account: AccountApi;
}
