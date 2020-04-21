import {Transaction} from '../typings/transaction';

/**
 * Checks if a transaction attachment is of specific version
 * @param transaction The transaction to be checked
 * @param versionIdentifier The version string, i.e. MultiOutCreation
 * @return _true_, if version string matches
 * @module core
 */
export function isAttachmentVersion(transaction: Transaction, versionIdentifier: string): boolean {
    const {attachment} = transaction;
    return attachment && (attachment[`version.${versionIdentifier}`] !== undefined);
}
