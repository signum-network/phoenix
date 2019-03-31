import {generateMasterKeys} from '../generateMasterKeys';
import {encryptMessage} from '../encryptMessage';
import {decryptMessage} from '../decryptMessage';
import {encryptData} from '../encryptData';
import {decryptData} from '../decryptData';

describe('Encrypt and Decrypt', () => {

    describe('Data', () => {

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


        it('should not decrypt a data ciphertext, with wrong key', () => {

            const recipientKeys = generateMasterKeys('testSecret_Recipient');
            const senderKeys = generateMasterKeys('testSecret_Sender');
            const bobKeys = generateMasterKeys('testSecret_Bob');

            const originalData = Uint8Array.from([0, 1, 2, 3]);

            const encrypted = encryptData(
                originalData,
                recipientKeys.publicKey,
                senderKeys.agreementPrivateKey
            );

            try {
                decryptData(
                    encrypted,
                    senderKeys.publicKey,
                    bobKeys.agreementPrivateKey
                );
                expect(false).toBe('Expected an exception');
            } catch (e) {
                expect(true).toBeTruthy();
            }

        });
    });

    describe('Text', () => {

        it('should decrypt a text message successfully', () => {

            const recipientKeys = generateMasterKeys('testSecret_Recipient');
            const senderKeys = generateMasterKeys('testSecret_Sender');

            // german umlauts to proof UTF-8
            const originalMessage = `Die Burstcoin-Blockchain ist ein öffentliches Hauptbuch,
            das jede Transaktion aufzeichnet. Es ist vollständig verteilt und funktioniert
            ohne eine zentrale vertrauenswürdige Instanz:
            Die Blockchain wird von einem Netzwerk von Computern verwaltet,
            die als Knoten bezeichnet werden und die Burstcoin-Software ausführen.`;

            const encrypted = encryptMessage(
                originalMessage,
                recipientKeys.publicKey,
                senderKeys.agreementPrivateKey
            );

            const message = decryptMessage(
                encrypted,
                senderKeys.publicKey,
                recipientKeys.agreementPrivateKey
            );

            expect(message).toEqual(originalMessage);
        });

        it('should not decrypt a text message, when key is wrong', () => {

            const recipientKeys = generateMasterKeys('testSecret_Recipient');
            const senderKeys = generateMasterKeys('testSecret_Sender');
            const bobKeys = generateMasterKeys('testSecret_Bob');

            const originalMessage = `Some message`;

            const encrypted = encryptMessage(
                originalMessage,
                recipientKeys.publicKey,
                senderKeys.agreementPrivateKey
            );

            try {

                decryptMessage(
                    encrypted,
                    senderKeys.publicKey,
                    bobKeys.agreementPrivateKey
                );
                expect(false).toBe('Expected exception');
            } catch (e) {
                expect(true).toBeTruthy();
            }
        });

    });

});
