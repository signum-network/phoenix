import { EncryptedMessage, Message } from '../../typings/attachment';
import { Transaction } from '../../typings/transaction';

/**
 * Constructs an Attachment
 *
 * @param transactions The transaction with the attachment
 * @param params Some HttpParams
 * @return HttpParams
 */
export const constructAttachment = (transaction: Transaction, params: any) => {
    if (transaction.attachment.type == 'encrypted_message') {
        const em: EncryptedMessage = <EncryptedMessage>transaction.attachment;
        params = {
            encryptedMessageData: em.data,
            encryptedMessageNonce: em.nonce,
            messageToEncryptIsText: String(em.isText),
            ...params
        };
    } else if (transaction.attachment.type == 'message') {
        const m: Message = <Message>transaction.attachment;
        params = {
            message: m.message,
            messageIsText: String(m.messageIsText),
            ...params
        };
    }
    return params;
};
