import {TransactionList} from '../transactionList';
import {UnconfirmedTransactionList} from '../unconfirmedTransactionList';
import {Balance} from '../balance';

/**
 * Account API
 */
export interface AccountApi {
    getAccountTransactions: (
        accountId: string,
        firstIndex?: number,
        lastIndex?: number,
        numberOfConfirmations?: number
    ) => Promise<TransactionList>;
    getUnconfirmedAccountTransactions: (accountId: string) => Promise<UnconfirmedTransactionList>;

    /**
     * Gets the balance of an account
     * @param {string} accountId
     * @return {Promise<Balance>}
     */
    getAccountBalance: (accountId: string) => Promise<Balance>;


    generateSendTransactionQRCode: (
        receiverId: string,
        amountNQT?: number,
        feeSuggestionType?: string
    ) => Promise<ArrayBufferLike>;
    generateSendTransactionQRCodeAddress: (
        receiverId: string,
        amountNQT: number,
        feeSuggestionType: string
    ) => Promise<string>;
}
