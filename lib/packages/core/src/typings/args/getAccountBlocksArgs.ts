/**
 * The argument object for [[AccountApi.getAccountBlocks]] and [[AccountApi.getAccountBlockIds]]
 *
 * @param {string} accountId The numeric accountId
 * @param {number} firstIndex The first index of a chunk of the list you want fetch. Use indices to paginate your calls
 * @param {number} firstIndex The last index of a chunk of the list you want fetch. Use indices to paginate your calls
 *
 * Currently, the indices do not work on BRS API :(
 * @see https://github.com/burst-apps-team/burstcoin/issues/477
 *
 * @param {boolean?} includeTransactions Includes the transactions also. Note, that this is call may take time
 * @module core
 */
export interface GetAccountBlocksArgs {
    accountId: string;
    firstIndex?: number;
    lastIndex?: number;
    includeTransactions?: boolean;
}
