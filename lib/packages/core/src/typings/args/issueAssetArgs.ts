import {Attachment} from '../attachment';
import {BurstValue} from '@burstjs/util';


/**
 * The argument object for [[AssetApi.issueAsset]]
 *
 * @module core
 */
export interface IssueAssetArgs {
    /**
     * The amount to be split (_quantity_), must be at least 1000 BURST
     */
    amount: BurstValue;
    /**
     * The decimals supported for this asset.
     * Example:
     * 1. a quantity of 1000 with decimal 2 allows 10 integer assets with 2 digit fraction, i.e 5.32
     * 1. a quantity of 1000 with decimal 0 allows 1000 integer assets which cannot be fractioned
     */
    decimals: number;
    /**
     * The description for this asset
     */
    description: string;
    /**
     * The name of the asset
     */
    name: string;
    /**
     * The amount of assets to be issued
     */
    quantity: string | number;
    /**
     * The senders public key,  i.e. the [[crypto.Keys.publicKey]]
     */
    senderPublicKey: string;
    /**
     * The senders private key, i.e. the [[crypto.Keys.signPrivateKey]]
     */
    senderPrivateKey: string;
    /**
     * An optional attachment
     */
    attachment?: Attachment;
    /**
     * The deadline when after how many minutes the transaction will be discarded, if it was not
     * processed, e.g. due to very low fee
     */
    deadline?: number;
}
