import {generateMasterKeys} from '../generateMasterKeys';
import {encryptMessage} from '../encryptMessage';
import {decryptMessage} from '../decryptMessage';
import {encryptData} from '../encryptData';
import {decryptData} from '../decryptData';

describe('Encrypt and Decrypt data', () => {

    it('should decrypt a data ciphertext successfully', () => {

        const recipientKeys = generateMasterKeys('testSecret_Recipient');
        const senderKeys = generateMasterKeys('testSecret_Sender');

        const originalData = Uint8Array.from([0, 1, 2, 3]);

        const encrypted = encryptData(
            originalData,
            recipientKeys.publicKey,
            senderKeys.agreementPrivateKey
        );

        const data = decryptData(
            encrypted,
            senderKeys.publicKey,
            recipientKeys.agreementPrivateKey
        );

        expect(data).toEqual(originalData);
    });

});
