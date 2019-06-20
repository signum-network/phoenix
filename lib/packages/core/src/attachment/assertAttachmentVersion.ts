/** @module core */

import {Transaction} from '../typings/transaction';
import {isAttachmentVersion} from './isAttachmentVersion';

/**
 * Asserts a specific version of a transactions attachment
 * @param transaction The transaction to be checked
 * @param versionIdentifier The version string, i.e. MultiOutCreation
 * @throws An exception in case of wrong version
 */
export function assertAttachmentVersion(transaction: Transaction, versionIdentifier: string) {
    if (!isAttachmentVersion(transaction, versionIdentifier)) {
        throw new Error(`Attachment of Transaction ${transaction.transaction} is not of version '${versionIdentifier}'`);
    }
}
