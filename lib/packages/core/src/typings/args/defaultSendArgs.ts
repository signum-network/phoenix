import {Attachment} from '../attachment';

/**
 * The base argument object for common transactions
 *
 * @param feePlanck The fee as Planck value
 * @param senderPublicKey The senders public key for sending an _unsigned_ message
 * @param senderPrivateKey The senders private key to _sign_ the message
 * @param attachment An _optional_ attachment
 * @param deadline The _optional_ transactions deadline in minutes until it's being removed from mempool.
 * This may happen on low fees. Defaults to 1440 (maximum)
 * @module core
 */
export interface DefaultSendArgs {
    /**
     * The fee expressed in Planck
     * @note It's recommended to use [[util.Amount]]
     */
    feePlanck: string;
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
