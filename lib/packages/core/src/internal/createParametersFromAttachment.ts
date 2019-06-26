/** @module core */
/** @ignore */

import {Attachment, EncryptedMessage, Message} from '../typings/attachment';

/**
 *
 * Creates BRS Http send parameters for a transaction from attachment data
 *
 * @param attachment The attachment
 * @param params Any object
 * @return HttpParams
 */
export const createParametersFromAttachment = (attachment: Attachment, params: any) => {
    if (attachment instanceof EncryptedMessage) {
        const em = <EncryptedMessage>attachment;
        return {
            encryptedMessageData: em.data,
            encryptedMessageNonce: em.nonce,
            messageToEncryptIsText: String(em.isText),
            ...params
        };
    }

    if (attachment instanceof Message) {
        const m = <Message>attachment;
        return {
            message: m.message,
            messageIsText: String(m.messageIsText),
            ...params
        };
    }

    throw new Error(`Unknown attachment type: ${JSON.stringify(attachment)}`);
};
