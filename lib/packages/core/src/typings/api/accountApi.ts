/** @module core */

import {TransactionList} from '../transactionList';
import {UnconfirmedTransactionList} from '../unconfirmedTransactionList';
import {Balance} from '../balance';
import {AliasList} from '../aliasList';

/**
 * Account API
 */
export interface AccountApi {

    /**
     * Get transactions of given account
     * @param {string} accountId The numeric accountId
     * @param {number?} firstIndex The first index of the transaction list, beginning at 0
     * @param {number?} lastIndex The last index of the transaction list
     * @param {number?} numberOfConfirmations The minimum required number of confirmations per transaction
     * @return {Promise<TransactionList>} List of transactions
     */
    getAccountTransactions: (
        accountId: string,
        firstIndex?: number,
        lastIndex?: number,
        numberOfConfirmations?: number
    ) => Promise<TransactionList>;



    /**
     * Get _unconfirmed_ transactions of given account
     * @param {string} accountId The numeric accountId
     * @return {Promise<UnconfirmedTransactionList>} List of unconfirmed transactions
     */
    getUnconfirmedAccountTransactions: (accountId: string) => Promise<UnconfirmedTransactionList>;

    /**
     * Get the balance of an account
     * @param {string} accountId
     * @return {Promise<Balance>} The account's balance
     */
    getAccountBalance: (accountId: string) => Promise<Balance>;

    /**
     * Get QR Code image for a given BURST address
     * @param {string} receiverId The recipient burst
     * @param {number?} amountNQT The amount (in NQT) to request (Default = 0)
     * @param {string?} feeSuggestionType The fee suggestion type string (Default = 'standard')
     * @return {Promise<ArrayBufferLike>} QR code image data
     */
    generateSendTransactionQRCode: (
        receiverId: string,
        amountNQT?: number,
        feeSuggestionType?: string
    ) => Promise<ArrayBufferLike>;


    /**
     * Generate the URL for a QR Code for a given BURST address. Useful for IMG tags in HTML.
     * @param {string} receiverId The recipient burst address
     * @param {number?} amountNQT The amount (in NQT) to request (Default = 0)
     * @param {string?} feeSuggestionType The fee suggestion type string (Default = 'standard')
     * @return {Promise<string>} The url
     */
    generateSendTransactionQRCodeAddress: (
        receiverId: string,
        amountNQT?: number,
        feeSuggestionType?: string
    ) => Promise<string>;

    /**
     * Gets the aliases of an account
     * @param {string} accountId
     * @return {Promise<AliasList>} A list of aliases of given account
     */
    getAliases: (accountId: string) => Promise<AliasList>;
}
