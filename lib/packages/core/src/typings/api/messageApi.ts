import {TransactionId} from '../transactionId';
import {Keys} from '@signumjs/crypto';
import {SendMessageArgs} from '../args';
import {SendEncryptedMessageArgs} from '../args/sendEncryptedMessageArgs';

/**
 * The Message API
 * @module core.api
 */
export interface MessageApi {

    /**
     * Sends a plain text message to another account/recipient
     *
     * @param args The argument object
     * @return The Transaction Id (as promise)
     */
    sendMessage: (args: SendMessageArgs) => Promise<TransactionId>;

    /**
     * Sends an encrypted text message to another account/recipient
     *
     * @param args The argument object
     * @return The Transaction Id (as promise)
     */
    sendEncryptedMessage: (args: SendEncryptedMessageArgs) => Promise<TransactionId>;
}
