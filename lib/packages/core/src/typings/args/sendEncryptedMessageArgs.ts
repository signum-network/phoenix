import {Keys} from '@signumjs/crypto';

/**
 * The argument object for [[MessageApi.sendEncryptedMessage]]
 *
 * @param message The message as text that will be encrypted
 * @param feePlanck The fee as Planck value
 * @param recipientId The id of the recipient
 * @param recipientPublicKey The recipients public key in hex format.
 * @param keys The senders keys used for encryption and signing
 * @param deadline The _optional_ transactions deadline in minutes until it's being removed from mempool.
 * This may happen on low fees. Defaults to 1440 (maximum)
 * @module core
 */
export interface SendEncryptedMessageArgs {
    message: string;
    feePlanck: string;
    recipientId: string;
    recipientPublicKey: string;
    senderKeys: Keys;
    deadline?: number;
}
