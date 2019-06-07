import { EncryptedMessage } from '../typings/encryptedMessage';
export declare function decryptMessage(encryptedMessage: EncryptedMessage, senderPublicKeyHex: string, recipientPrivateKeyHex: string): string;
