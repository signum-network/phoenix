import {Transaction} from '../typings/transaction';

/**
 * Get the transaction attachment version identifier
 *
 * Attachment types are identified by a field _version.<Identifier>_
 *
 * @param transaction The transaction to be checked
 * @return return _Identifier_, if exists, otherwise `undefined`
 * @module core
 */
export function getAttachmentVersion(transaction: Transaction): string {
    const {attachment} = transaction;
    if (!attachment) { return undefined; }

    const versionIdentifier = Object.keys(attachment).filter(k => k.startsWith('version'));
    if (versionIdentifier.length === 0) { return undefined; }

    const identifier = versionIdentifier[0];
    return identifier.substr(identifier.indexOf('.') + 1);
}
