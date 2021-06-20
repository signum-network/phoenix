import {TransactionId} from '../transactionId';
import {Transaction} from '../transaction';
import {MultioutRecipientAmount} from '../multioutRecipientAmount';
import {Attachment} from '../attachment';
import {Subscription} from '../subscription';
import {UnconfirmedTransactionList} from '../unconfirmedTransactionList';
import {
    CancelSubscriptionArgs,
    CreateSubscriptionArgs,
    SendAmountArgs,
    UnsignedTransactionArgs
} from '../args';

/**
 * Transaction API
 *
 * This module provides methods related to blockchain transactions
 *
 * @module core.api
 */
export interface TransactionApi {

    /**
     * Broadcasts a transaction to the network/blockchain
     *
     * @param signedTransactionPayload The _signed_ transaction payload encoded in base64
     * @return The Transaction Id
     */
    broadcastTransaction: (signedTransactionPayload: string) => Promise<TransactionId>;

    /**
     * Get a transaction and its details from the network/blockchain
     *
     * @param transactionId The transaction Id
     * @return The Transaction
     */
    getTransaction: (transactionId: string) => Promise<Transaction>;

    /**
     * Sends a multi-out request to the blockchain with _same_ value for all recipients
     *
     * @param amountPlanck The amount to be sent as Planck value
     * @param feePlanck The fee to be paid as Planck value
     * @param recipientIds List of account IDs for the recipients
     * @param senderPublicKey The senders public key for sending an _unsigned_ message
     * @param senderPrivateKey The senders private key to _sign_ the message
     * @return The Transaction Id
     */
    sendSameAmountToMultipleRecipients: (
        amountPlanck: string,
        feePlanck: string,
        recipientIds: string[],
        senderPublicKey: string,
        senderPrivateKey: string,
    ) => Promise<TransactionId>;

    /**
     * Sends a multi-out request to the blockchain with _arbitrary_ value for each recipient
     *
     * @return The Transaction Id
     */
    /**
     *
     * @param recipientAmounts A list of recipient Ids and their respective amounts to be sent
     * @param feePlanck The fee to be paid as Planck value
     * @param senderPublicKey The senders public key for sending an _unsigned_ message
     * @param senderPrivateKey The senders private key to _sign_ the message
     * @return The Transaction Id
     */
    sendAmountToMultipleRecipients: (
        recipientAmounts: MultioutRecipientAmount[],
        feePlanck: string,
        senderPublicKey: string,
        senderPrivateKey: string,
    ) => Promise<TransactionId>;


    /**
     * Sends burst to another account/recipient
     *
     * @param args The argument object
     * @return The Transaction Id (as promise)
     */
    sendAmountToSingleRecipient:
        (args: SendAmountArgs) => Promise<TransactionId>;

    /**
     * Gets a subscription
     *
     * @param subscriptionId The id of the subscription
     * @return The Subscription Object (as promise)
     */
    getSubscription:
        (subscriptionId: string) => Promise<Subscription>;

    /**
     * Create a subscription
     *
     * @param args The argument object
     * @return The Transaction Id (as promise)
     */
    createSubscription:
        (args: CreateSubscriptionArgs) => Promise<TransactionId>;

    /**
     * Cancels a subscription
     *
     * @param args The argument object
     * @return The Transaction Id (as promise)
     */
    cancelSubscription:
        (args: CancelSubscriptionArgs) => Promise<TransactionId>;

    /**
     * Get the all current unconfirmed transactions
     * @return The UnconfirmedTransactionList of unconfirmed transactions
     */
    getUnconfirmedTransactions: () => Promise<UnconfirmedTransactionList>;

    /**
     * Signs and broadcasts a transaction
     *
     * Usually, you don't need this, as all sending methods in BurstJS sign and broadcast.
     * As not all BRS API functions are implemented yet in BurstJS this method is handy for those,
     * i.e. all direct calls to [[ChainService.send]]
     *
     * @param unsignedTransaction The unsigned Transaction Object (returned by [[ChainService.send]])
     * @return The TransactionId
     */
    signAndBroadcastTransaction: (unsignedTransaction: UnsignedTransactionArgs) => Promise<TransactionId>;
}
