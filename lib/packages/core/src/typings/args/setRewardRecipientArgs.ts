/**
 * The argument object for [[TransactionApi.sendAmountToSingleRecipient]]
 *
 * @param recipientId The id of the recipient
 * @param senderPublicKey The senders public key for sending an _unsigned_ message
 * @param senderPrivateKey The senders private key to _sign_ the message
 * @param feePlanck The fee to pay in planck
 * @param deadline The _optional_ transactions deadline in minutes until it's being removed from mempool.
 * This may happen on low fees. Defaults to 1440 (maximum)
 * @module core
 */
export interface SetRewardRecipientArgs {
    deadline?: number;
    feePlanck: string;
    recipientId: string;
    senderPrivateKey: string;
    senderPublicKey: string;
}
