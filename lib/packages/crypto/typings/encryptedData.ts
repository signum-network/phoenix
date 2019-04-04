/** @module crypto */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

export interface EncryptedData {
    data: Uint8Array;
    nonce: Uint8Array;
}
