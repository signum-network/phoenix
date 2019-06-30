/** @module core */
/** @ignore */

import { AttachmentEncryptedMessage, AttachmentMessage } from '../typings/attachment';
import { Transaction } from '../typings/transaction';

/**
 * @deprecated
 * <div class="deprecated">
 *     Will be removed with [[TransactionApi.sendMoney]]
 * </div>
 *
 * Constructs an Attachment
 * @hidden
 * @param transaction The transaction with the attachment
 * @param params Some HttpParams
 * @return HttpParams
 */
export const constructAttachment = (transaction: Transaction, params: any) => {
    if (transaction.attachment.type === 'encrypted_message') {
        const em: AttachmentEncryptedMessage = transaction.attachment;
        params = Object.assign({
            encryptedMessageData: em.data,
            encryptedMessageNonce: em.nonce,
            messageToEncryptIsText: String(em.isText)
        }, params);
    } else if (transaction.attachment.type === 'message') {
        const m: AttachmentMessage = transaction.attachment;
        params = Object.assign({
            message: m.message,
            messageIsText: String(m.messageIsText)
        }, params);
    }
    return params;
};
