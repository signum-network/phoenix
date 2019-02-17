/** @module core */

import {TransactionId} from '../transactionId';
import {Transaction} from '../transaction';

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
        recipientAddress: string
    ) => Promise<TransactionId | Error>;
}
