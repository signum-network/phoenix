import { EncryptedData } from '../typings/encryptedData';
export declare function decryptData(encryptedData: EncryptedData, senderPublicKeyHex: string, recipientPrivateKeyHex: string): Uint8Array;
