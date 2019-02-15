import {Block} from './block';
import {BlockId} from './blockId';
import {BlockchainStatus} from './blockchainStatus';
import {ServerStatus} from './serverStatus';
import {SuggestedFees} from '../suggestedFees';
import {TransactionId} from './transactionId';
import {Transaction} from './transaction';
import {TransactionList} from './transactionList';
import {UnconfirmedTransactionList} from './unconfirmedTransactionList';
import {Balance} from './balance';

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

interface BlockApi {
    getBlockByTimestamp: (timestamp: number, includeTransactions: boolean) => Promise<Block>;
    getBlockByHeight: (height: number, includeTransactions: boolean) => Promise<Block>;
    getBlockById: (block: string, includeTransactions: boolean) => Promise<Block>;
    getBlockId: (height: number) => Promise<BlockId>;
}

interface NetworkApi {
    getBlockchainStatus: () => Promise<BlockchainStatus>;
    getServerStatus: () => Promise<ServerStatus>;
    suggestFee: () => Promise<SuggestedFees>;
}


interface TransactionApi {
    broadcastTransaction: (signedTransactionPayload: string) => Promise<TransactionId>;
    getTransaction: (transactionId: string) => Promise<Transaction>;
    sendMoney: (
        transaction: Transaction,
        senderPublicKey: string,
        senderPrivateKey: string,
        recipientAddress: string
    ) => Promise<TransactionId | Error>;
}

interface MessageApi {
    sendTextMessage: (
        message: string,
        recipientId: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        fee?: number
    ) => Promise<TransactionId>;
}

/**
 * Account API
 */
interface AccountApi {
    getAccountTransactions: (
        accountId: string,
        firstIndex?: number,
        lastIndex?: number,
        numberOfConfirmations?: number
    ) => Promise<TransactionList>;
    getUnconfirmedAccountTransactions: (accountId: string) => Promise<UnconfirmedTransactionList>;

    /**
     * Gets the balance od an account
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

/**
 * API Interface used by #composeApi
 */
export interface Api {
    readonly block: BlockApi;
    readonly network: NetworkApi;
    readonly transaction: TransactionApi;
    readonly message: MessageApi;
    readonly account: AccountApi;
}
