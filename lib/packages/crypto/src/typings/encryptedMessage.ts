/** @module crypto */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

export interface EncryptedMessage {
    data: string;
    nonce: string;
    isText: boolean;
}
