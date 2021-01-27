import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for [[AssetApi.cancelAskOrder]] and [[AssetApi.cancelBidOrder]]
 *
 * @module core
 */
export interface CancelOrderArgs extends DefaultSendArgs {
    /**
     * The order (transaction id) to be cancelled
     */
    order: string;
}
