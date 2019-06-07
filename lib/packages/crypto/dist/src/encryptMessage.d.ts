import { EncryptedMessage } from '../typings/encryptedMessage';
export declare function encryptMessage(plaintext: string, recipientPublicKeyHex: string, senderPrivateKeyHex: string): EncryptedMessage;
