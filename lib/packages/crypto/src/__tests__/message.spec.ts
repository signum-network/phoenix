import {generateMasterKeys} from '../generateMasterKeys';
import {verifySignature} from '../verifySignature';
import {encryptMessage} from '../encryptMessage';
import {encryptAES} from '../encryptAES';
import {decryptMessage} from '../decryptMessage';
import {escapeRegExp} from 'tslint/lib/utils';

describe('Encrypt and Decrypt messages', () => {

    it('Decrypt an encrypted message successfully', () => {

        const recipientKeys = generateMasterKeys('testSecret_Recipient');
        const recipientPinHash = '345';
        const  encryptedRecipientPrivateKey = encryptAES(recipientKeys.signPrivateKey, recipientPinHash);

        const senderKeys = generateMasterKeys('testSecret_Sender');
        const senderPinHash = '123';
        const encryptedSenderPrivateKey = encryptAES(senderKeys.signPrivateKey, senderPinHash);

        const encryptedMessage = encryptMessage(
            'Test Message',
            recipientKeys.publicKey,
            encryptedSenderPrivateKey,
            senderPinHash
        );

        const message = decryptMessage(
            encryptedMessage,
            senderKeys.publicKey,
            encryptedRecipientPrivateKey,
            recipientPinHash
        );

        expect(message).toBe('Test Message');
    });

});
