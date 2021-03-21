/**
 * The argument object for [[AccountApi.getAccountArgs]]
 *
 * @param {string} accountId The numeric accountId
 * @param {number?} commitmentAtHeight The height for the commitment, if one wants to see the commitment in the past
 * For BRS Versions before 3.0 this must be `undefined`
 * @param {boolean?} includeCommittedAmount Includes the committed amount in the response
 * For BRS Versions before 3.0 this must be `undefined`
 * @param {boolean?} includeEstimatedCommitment Includes the estimated commitment in BURST/Terabyte. This is a relatively costly operation,
 * and should be set true only if you really need that info.
 * For BRS Versions before 3.0 this must be `undefined`*
 * @module core
 */
export interface GetAccountArgs {
    accountId: string;
    commitmentAtHeight?: number;
    includeCommittedAmount?: boolean;
    includeEstimatedCommitment?: true;
}
