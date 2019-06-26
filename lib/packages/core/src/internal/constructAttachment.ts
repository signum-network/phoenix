/** @module core */
/** @ignore */

import { EncryptedMessage, Message } from '../typings/attachment';
import { Transaction } from '../typings/transaction';

/**
 * @deprecated Remove this when removing sendMoney
 *
 * Constructs an Attachment
 *
 * @param transaction The transaction with the attachment
 * @param params Some HttpParams
 * @return HttpParams
 */
export const constructAttachment = (transaction: Transaction, params: any) => {
    if (transaction.attachment.type === 'encrypted_message') {
        const em: EncryptedMessage = transaction.attachment;
        params = Object.assign({
            encryptedMessageData: em.data,
            encryptedMessageNonce: em.nonce,
            messageToEncryptIsText: String(em.isText)
        }, params);
    } else if (transaction.attachment.type === 'message') {
        const m: Message = transaction.attachment;
        params = Object.assign({
            message: m.message,
            messageIsText: String(m.messageIsText)
        }, params);
    }
    return params;
};
