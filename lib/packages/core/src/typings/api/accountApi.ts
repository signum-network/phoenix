import {TransactionList} from '../transactionList';
import {SubscriptionList} from '../subscriptionList';
import {UnconfirmedTransactionList} from '../unconfirmedTransactionList';
import {Balance} from '../balance';
import {AliasList} from '../aliasList';
import {Account} from '../account';
import {TransactionId} from '../transactionId';
import {Block} from '../block';
import {CommitmentArgs, GetAccountBlocksArgs, GetAccountTransactionsArgs} from '../args';
import {SetRewardRecipientArgs} from '../args/setRewardRecipientArgs';
import {RewardRecipient} from '../rewardRecipient';
import {GetAccountArgs} from '../args/getAccountArgs';
import {BlockList} from '../blockList';

/**
 * Account API
 *
 * @module core.api
 */
export interface AccountApi {

    /**
     * Get transactions of given account
     * @param {GetAccountTransactionsArgs} args The arguments
     * @return {Promise<TransactionList>} List of transactions
     */
    getAccountTransactions: (args: GetAccountTransactionsArgs) => Promise<TransactionList>;

    /**
     * Get _unconfirmed_ transactions of given account
     * @param {string} accountId The numeric accountId
     * @param {boolean?} includeIndirect Includes indirect transaction, i.e. multi out payments.
     * For BRS Versions before 2.3.2 this must be `undefined`
     * @return {Promise<UnconfirmedTransactionList>} List of unconfirmed transactions
     */
    getUnconfirmedAccountTransactions: (
        accountId: string,
        includeIndirect?: boolean
    ) => Promise<UnconfirmedTransactionList>;

    /**
     * Get the balance of an account
     * @param {string} accountId
     * @return {Promise<Balance>} The account's balance
     */
    getAccountBalance: (accountId: string) => Promise<Balance>;

    /**
     * Get an account given an ID
     * @param {GetAccountArgs} args The arguments
     * @return {Promise<Account>} The account from the backend, not including transactions
     */
    getAccount: (args: GetAccountArgs) => Promise<Account>;

    /**
     * Get blocks forged by an account
     * @param {GetAccountBlocksArgs} args The arguments
     * @return {Promise<Block[]>} The list of blocks
     */
    getAccountBlocks: (args: GetAccountBlocksArgs) => Promise<BlockList>;

    /**
     * Get blockIds forged by an account
     * @param {GetAccountBlocksArgs} args The arguments
     * @return {Promise<string[]>} The list of blocks
     */
    getAccountBlockIds: (args: GetAccountBlocksArgs) => Promise<string[]>;

    /**
     * Get QR Code image for a given BURST address
     * @param {string} receiverId The recipient burst
     * @param {number?} amountNQT The amount (in NQT) to request (Default = 0)
     * @param {string?} feeSuggestionType The fee suggestion type string (Default = 'standard')
     * @param {number?} feeNQT The fee amount (in NQT)
     * @param {immutable?} immutable Whether to allow this to be modified
     * @return {Promise<ArrayBufferLike>} QR code image data
     */
    generateSendTransactionQRCode: (
        receiverId: string,
        amountNQT?: number,
        feeSuggestionType?: string,
        feeNQT?: number,
        immutable?: boolean
    ) => Promise<ArrayBufferLike>;


    /**
     * Generate the URL for a QR Code for a given BURST address. Useful for IMG tags in HTML.
     * @param {string} receiverId The recipient burst address
     * @param {number?} amountNQT The amount (in NQT) to request (Default = 0)
     * @param {string?} feeSuggestionType The fee suggestion type string (Default = 'standard')
     * @param {number?} feeNQT The fee amount (in NQT)
     * @param {immutable?} immutable Whether to allow this to be modified
     * @return {Promise<string>} The url
     */
    generateSendTransactionQRCodeAddress: (
        receiverId: string,
        amountNQT?: number,
        feeSuggestionType?: string,
        feeNQT?: number,
        immutable?: boolean
    ) => Promise<string>;

    /**
     * Gets the aliases of an account
     * @param {string} accountId
     * @return {Promise<AliasList>} A list of aliases of given account
     */
    getAliases: (accountId: string) => Promise<AliasList>;

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
    ) => Promise<TransactionId>;


    /**
     * Sets account information for an account
     *
     * The transaction will be broadcasted in two steps.
     * 1. Send the setAccountInfo call with public key to the network
     * 2. Take the returned unsigned message and sign it, i.e. the private key won't be transmitted.
     *
     * @param name The name of the account
     * @param description The description for the account
     * @param feeNQT The fee to pay
     * @param name The name of the account
     * @param senderPublicKey The senders public key for sending an _unsigned_ message
     * @param senderPrivateKey The senders private key to _sign_ the message
     * @param deadline The deadline, in minutes, for the transaction to be confirmed
     * @return The Transaction ID
     */
    setAccountInfo: (
        name: string,
        description: string,
        feeNQT: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        deadline?: number,
    ) => Promise<TransactionId>;

    /**
     * Assigns a reward recipient for an account
     *
     * This function is usually used to bind an account to a mining pool.
     *
     * @param {SetRewardRecipientArgs} args The arguments
     * @return The Transaction ID
     */
    setRewardRecipient: (args: SetRewardRecipientArgs) => Promise<TransactionId>;


    /**
     * Gets a list of subscriptions for this account (sender)
     *
     * @param accountId The sender account Id
     * @return List of Subscriptions
     */
    getAccountSubscriptions: (accountId: string) => Promise<SubscriptionList>;

    /**
     * Gets a list of subscriptions paying to the given account (recipient)
     *
     * @param accountId The recipient account Id
     * @return List of Subscriptions
     */
    getSubscriptionsToAccount: (accountId: string) => Promise<SubscriptionList>;

    /**
     * Gets the reward recipient for an account
     *
     * So you can see, if an account is bound to a pool.
     *
     * @param {string} account The account Id
     * @return The Reward Recipient
     */
    getRewardRecipient: ( accountId: string ) => Promise<RewardRecipient>;

    /**
     * Adds an additional amount as commitment
     *
     * The commitment is part of the PoC+ consensus, and allows miners
     * to improve their mining power through additionally locked amount
     *
     * @param {CommitmentArgs} args The args
     * @return The Transaction Id
     * @see [[AccountApi.removeCommitment]]
     */
    addCommitment: (args: CommitmentArgs) => Promise<TransactionId>;

    /**
     * Removes/Reduces a miners commitment
     *
     * The commitment is part of the PoC+ consensus, and allows miners
     * to improve their mining power through additionally locked amount
     *
     * @param {CommitmentArgs} args The args
     * @return The Transaction Id
     * @see [[AccountApi.addCommitment]]
     */
    removeCommitment: (args: CommitmentArgs) => Promise<TransactionId>;
}
