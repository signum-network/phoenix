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


        it('should decrypt a text message sent with BRS successfully', () => {

            const encrypted = {
                data: '8abb9c7b9c61edf877eb4576b1f19486cb7c5d5770b4d5e2ea14a0d5175ef46cd6a40c95925fc1e015bea65dc4b57d3c547bfd31a6889e3d4c33e34964a08427',
                nonce: '2983562ee782cd71bcb6d24ee8b0f25aa557fa2c54ba5890ebf0208bb1c35efe',
                isText: true
            };

            const message = decryptMessage(
                encrypted,
                '7210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b',
                '5014cb242b904cb75d86bcc23bf73d9f91471a578d22d0fb5633361cfb6a7865'
            );

            expect(message).toEqual('Test Encrypted BRS Message');
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
