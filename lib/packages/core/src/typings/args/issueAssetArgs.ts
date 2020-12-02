import {Attachment} from '../attachment';
import {BurstValue} from '@burstjs/util';


/**
 * The argument object for [[AssetApi.issueAsset]]
 *
 * @param amount The amount to be split (_quantity_), must be at least 1000 BURST
 * @param attachment An _optional_ attachment
 * @param deadline The _optional_ transactions deadline in minutes until it's being removed from mempool.
 * @param decimals The decimals supported for this asset.
 * Example:
 * 1. a quantity of 1000 with decimal 2 allows 10 integer assets with 2 digit fraction, i.e 5.32
 * 1. a quantity of 1000 with decimal 0 allows 1000 integer assets which cannot be fractioned
 * @param description The description for this asset
 * @param quantity The amount of assets to be issued
 * @param name The name of the token
 * @param senderPrivateKey The senders private key to _sign_ the message
 * @param senderPublicKey The senders public key for sending an _unsigned_ message
 * This may happen on low fees. Defaults to 1440 (maximum)
 * @module core
 */
export interface IssueAssetArgs {
    amount: BurstValue;
    attachment?: Attachment;
    deadline?: number;
    decimals: number;
    description: string;
    name: string;
    quantity: string | number;
    senderPrivateKey: string;
    senderPublicKey: string;
}
