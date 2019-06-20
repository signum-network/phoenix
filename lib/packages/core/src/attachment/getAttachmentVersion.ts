/** @module core */

import {Transaction} from '../typings/transaction';

/**
 * Get the transaction attachment version identitfier
 * @param transaction The transaction to be checked
 * @return , if version string matches
 */
export function getAttachmentVersion(transaction: Transaction): string {
    const {attachment} = transaction;
    if (!attachment) { return undefined; }

    const versionIdentifier = Object.keys(attachment).filter(k => k.startsWith('version'));
    if (versionIdentifier.length === 0) { return undefined; }

    const identifier = versionIdentifier[0];
    return identifier.substr(identifier.indexOf('.') + 1);
}
