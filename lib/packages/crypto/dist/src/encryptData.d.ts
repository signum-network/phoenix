import { EncryptedData } from '../typings/encryptedData';
export declare function encryptData(plaintext: Uint8Array, recipientPublicKeyHex: string, senderPrivateKeyHex: string): EncryptedData;
