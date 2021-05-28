import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AssetApi.placeAskOrder]] and [[AssetApi.placeBidOrder]]
 *
 * @module core
 */
export interface PlaceOrderArgs extends DefaultSendArgs {
    /**
     * The assets id
     */
    asset: string;
    /**
     * The price that is offered for bid/ask
     */
    pricePlanck: string;
    /**
     * The amount of assets to ask/bid for
     */
    quantity: string | number;
}
