/** @module core.api */

import {TransactionId} from '../transactionId';
import {Transaction} from '../transaction';
import {MultioutRecipientAmount} from '../multioutRecipientAmount';
import {Attachment} from '../attachment';

/**
 * Transaction API
 *
 * This module provides methods related to blockchain transactions
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
     * @deprecated
     * <div class="deprecated">
     *     Use [[sendAmount]] instead
     * </div>
     *
     * Sends burst to the blockchain
     *
     * The transaction will be broadcasted in two steps.
     * 1. Send the sendMoney call with public key to the network
     * 2. Take the returned unsigned message and sign it, i.e. the private key won't be transmitted.
     *
     * @param transaction The unsigned transaction
     * @param senderPublicKey The senders public key for sending an _unsigned_ message
     * @param senderPrivateKey The senders private key to _sign_ the message
     * @param recipientAddress The recipients RS Address
     * @return The Transaction
     */
    sendMoney: (
        transaction: Transaction,
        senderPublicKey: string,
        senderPrivateKey: string,
        recipientAddress: string,
        signFunc?: (unsignedBytes: string) => Promise<string>,
    ) => Promise<TransactionId | Error>;


    /**
     * @deprecated
     * <div class="deprecated">
     *     Use [[sendSameAmountToMultipleRecipients]], [[sendAmountToMultipleRecipients]] instead
     * </div>
     *
     * Sends a multi-out request to the blockchain
     *
     * The transaction will be broadcasted in two steps.
     * 1. If sameAmount is true. "sendMoneyMultiSame" is called, otherwise "sendMoneyMulti" is called
     * 2. Take the returned unsigned message and sign it, i.e. the private key won't be transmitted.
     *
     * @param transaction The unsigned transaction
     * @param senderPublicKey The senders public key for sending an _unsigned_ message
     * @param senderPrivateKey The senders private key to _sign_ the message
     * @param recipients The multi-out string of recipient->amount key value pairs
     * @param sameAmount Whether all recipients will receive the same amount
     * @return The Transaction
     */
    sendMoneyMultiOut: (
        transaction: Transaction,
        senderPublicKey: string,
        senderPrivateKey: string,
        recipients: string,
        sameAmount: boolean,
        signFunc?: (unsignedBytes: string) => Promise<string>,
    ) => Promise<TransactionId>;


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
        signFunc?: (unsignedBytes: string) => Promise<string>,
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
        signFunc?: (unsignedBytes: string) => Promise<string>,
    ) => Promise<TransactionId>;


    /**
     * Sends burst to the blockchain
     *
     * The transaction will be broadcasted in two steps.
     * 1. Send the sendMoney call with public key to the network
     * 2. Take the returned unsigned message and sign it, i.e. the private key won't be transmitted.

     * @param amountPlanck The amount to be sent as Planck value
     * @param feePlanck The fee as Planck value
     * @param recipientId The id of the recipient
     * @param senderPublicKey The senders public key for sending an _unsigned_ message
     * @param senderPrivateKey The senders private key to _sign_ the message
     * @param attachment An optional attachment
     */
    sendAmount: (
        amountPlanck: string,
        feePlanck: string,
        recipientId: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        attachment?: Attachment,
        deadline?: number,
        signFunc?: (unsignedBytes: string) => Promise<string>,
    ) => Promise<TransactionId>;
}
