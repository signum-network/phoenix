/** @module core.api */

import {TransactionId} from '../transactionId';
import {Alias} from '../alias';

/**
 * Alias API
 *
 * Work in Progress
 */
export interface AliasApi {

    /**
     * Get alias by its id, i.e. get basic account info for given alias name
     * @param {string} aliasId The alias id
     * @return {Promise<Alias>} List of transactions
     */
    getAliasById: (
        aliasId: string,
    ) => Promise<Alias>;


    /**
     * Get alias by name, i.e. get basic account info for given alias name
     * @param {string} aliasName The alias name
     * @return {Promise<Alias>} List of transactions
     */
    getAliasByName: (
        aliasName: string,
    ) => Promise<Alias>;

    /**
     * Registers an Alias with the Burst blockchain
     *
     * The transaction will be broadcasted in two steps.
     * 1. Send the setAlias call with public key to the network
     * 2. Take the returned unsigned message and sign it, i.e. the private key won't be transmitted.
     *
     * @param aliasName The alias name
     * @param aliasURI The alias URI
     * @param feeNQT The fee to pay
     * @param name The name of the account
     * @param senderPublicKey The senders public key for sending an _unsigned_ message
     * @param senderPrivateKey The senders private key to _sign_ the message
     * @param deadline The deadline, in minutes, for the transaction to be confirmed
     * @return The Transaction ID
     */
    setAlias: (
        aliasName: string,
        aliasURI: string,
        feeNQT: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline?: number,
        signFunc?: (unsignedBytes: string) => string,
    ) => Promise<TransactionId>;

}
