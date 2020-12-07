import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for [[AssetApi.cancelAskOrder]] and [[AssetApi.cancelBidOrder]]
 *
 * @param order The order id
 * @module core
 */
export interface CancelOrderArgs extends DefaultSendArgs {
    order: string;
}
