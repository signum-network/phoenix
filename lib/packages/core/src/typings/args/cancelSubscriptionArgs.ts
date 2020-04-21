import {Attachment} from '../attachment';

/**
 * The argument object for [[TransactionApi.cancelSubscription]]
 *
 * @param subscriptionId The subscription to be cancelled
 * @param feePlanck The fee as Planck value
 * @param senderPublicKey The senders public key for sending an _unsigned_ message
 * @param senderPrivateKey The senders private key to _sign_ the message
 * @param attachment An _optional_ attachment
 * @param deadline The _optional_ transactions deadline in minutes until it's being removed from mempool.
 * This may happen on low fees. Defaults to 1440 (maximum)
 *
 * @module core
 */
export interface CancelSubscriptionArgs {
    subscriptionId: string;
    feePlanck: string;
    senderPublicKey: string;
    senderPrivateKey: string;
    attachment?: Attachment;
    deadline?: number;
}
