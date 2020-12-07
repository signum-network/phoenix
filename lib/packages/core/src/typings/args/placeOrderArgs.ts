import {BurstValue} from '@burstjs/util';
import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AssetApi.placeAskOrderArgs]] and [[AssetApi.placeBidOrderArgs]]
 *
 * @param asset The asset id
 * @param price The price that is offered for bid/ask
 * @param quantity The amount of assets to ask/bid for
 * @module core
 */
export interface PlaceOrderArgs extends DefaultSendArgs {
    asset: string;
    price: BurstValue;
    quantity: string | number;
}
