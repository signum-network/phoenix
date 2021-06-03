/** @ignore */
/** @internal */

import {Attachment, AttachmentEncryptedMessage, AttachmentMessage} from '../typings/attachment';

/**
 * Creates send parameters for a transaction from attachment data
 *
 * @internal
 * @param attachment The attachment
 * @param params Any object
 * @return HttpParams
 * @module core
 */
export const createParametersFromAttachment = (attachment: Attachment, params: any) => {
    if (attachment instanceof AttachmentEncryptedMessage) {
        const em = <AttachmentEncryptedMessage>attachment;
        return {
            encryptedMessageData: em.data,
            encryptedMessageNonce: em.nonce,
            messageToEncryptIsText: String(em.isText),
            ...params
        };
    }

    if (attachment instanceof AttachmentMessage) {
        const m = <AttachmentMessage>attachment;
        return {
            message: m.message,
            messageIsText: String(m.messageIsText),
            ...params
        };
    }

    throw new Error(`Unknown attachment type: ${JSON.stringify(attachment)}`);
};
