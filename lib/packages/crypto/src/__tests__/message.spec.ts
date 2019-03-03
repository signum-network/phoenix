import {generateMasterKeys} from '../generateMasterKeys';
import {encryptMessage} from '../encryptMessage';
import {encryptAES} from '../encryptAES';
import {decryptMessage} from '../decryptMessage';

describe('Encrypt and Decrypt messages', () => {

    it('should decrypt an encrypted message successfully', () => {

        const recipientKeys = generateMasterKeys('testSecret_Recipient');
        const senderKeys = generateMasterKeys('testSecret_Sender');

        const encryptedMessage = encryptMessage(
            'Test Message',
            recipientKeys.publicKey,
            senderKeys.agreementPrivateKey
        );

        const message = decryptMessage(
            encryptedMessage,
            senderKeys.publicKey,
            recipientKeys.agreementPrivateKey
        );

        expect(message).toBe('Test Message');
    });

    it('should not decrypt an encrypted message successfully, due to wrong key', () => {

        const recipientKeys = generateMasterKeys('testSecret_Recipient');
        const senderKeys = generateMasterKeys('testSecret_Sender');
        const bobKeys = generateMasterKeys('testSecret_Bob');

        const encryptedMessage = encryptMessage(
            'Test Message',
            recipientKeys.publicKey,
            senderKeys.agreementPrivateKey
        );

        const message = decryptMessage(
            encryptedMessage,
            senderKeys.publicKey,
            bobKeys.agreementPrivateKey
        );

        expect(message).not.toBe('Test Message');
        expect(message).toBe('');
    });

});
