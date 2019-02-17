/** @module core */

import {TransactionId} from '../transactionId';

/**
 * The Message API
 */
export interface MessageApi {

    /**
     * Broadcasts a text message to the network/blockchain
     *
     * The message will be broadcasted in two steps.
     * 1. Send the message with public key to the network
     * 2. Take the returned unsigned message and sign it, i.e. the private key won't be transmitted.
     *
     * @param message The _text_ message to be sent
     * @param recipientId The recipients Id, not RS Address
     * @param senderPublicKey The senders public key for sending an _unsigned_ message
     * @param senderPrivateKey The senders private key to _sign_ the message
     * @param fee The optional fee (expressed in Burst) for the message, default is 0.1 Burst.
     * @return The Transaction Id
     */
    sendTextMessage: (
        message: string,
        recipientId: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        fee?: number
    ) => Promise<TransactionId>;
}
