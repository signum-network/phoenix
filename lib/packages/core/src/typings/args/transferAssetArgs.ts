import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AssetApi.transferAsset]]
 *
 * @module core
 */
export interface TransferAssetArgs extends DefaultSendArgs {
    /**
     * The assets id to be transferred
     */
    asset: string;
    /**
     * he amount of assets to be transferred
     */
    quantity: string | number;
    /**
     * The id of the recipient
     */
    recipientId: string;
    /**
     * The _optional_ recipients public key in hex format.
     */
    recipientPublicKey?: string;
}
