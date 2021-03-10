import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for [[TransactionApi.sendAmountToSingleRecipient]]
 *
 * @param amountPlanck The amount to be sent as Planck value
 * @param feePlanck The fee as Planck value
 * @param recipientId The id of the recipient
 * @param recipientPublicKey The _optional_ recipients public key in hex format.
 * Using this arg allows to activate a recipients account, if not activated yet
 * @param senderPublicKey The senders public key for sending an _unsigned_ message
 * @param senderPrivateKey The senders private key to _sign_ the message
 * @param attachment An _optional_ attachment
 * @param deadline The _optional_ transactions deadline in minutes until it's being removed from mempool.
 * This may happen on low fees. Defaults to 1440 (maximum)
 * @module core
 */
export interface CommitmentArgs extends DefaultSendArgs {
    amountPlanck: string;
}
