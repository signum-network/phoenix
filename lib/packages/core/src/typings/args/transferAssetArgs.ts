import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AssetApi.transferAsset]]
 *
 * @param asset The assets id
 * @param recipientId The id of the recipient
 * @param recipientPublicKey The _optional_ recipients public key in hex format.
 * @param quantity The amount of assets to be issued
 * @param senderPrivateKey The senders private key to _sign_ the message
 * @param senderPublicKey The senders public key for sending an _unsigned_ message
 * This may happen on low fees. Defaults to 1440 (maximum)
 * @module core
 */
export interface TransferAssetArgs extends DefaultSendArgs {
    asset: string;
    quantity: string | number;
    recipientId: string;
    recipientPublicKey?: string;
}
