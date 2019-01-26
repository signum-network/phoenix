import {generateMasterKeys} from '../../../../crypto/src';

jest.mock('@burst/http/src/http');
import {HttpMock} from '@burst/http';
import {BurstService} from '../../burstService';
import {broadcastTransaction, sendTextMessage} from '..';
import {TransactionId} from '../../typings/transactionId';
import {generateSignature} from '../../../../crypto/src/generateSignature';
import {verifySignature} from '../../../../crypto/src/verifySignature';
import {generateSignedTransactionBytes} from '../../../../crypto/src/generateSignedTransactionBytes';

describe('Message Api', () => {

    const keys = generateMasterKeys('SuperSecretPhrase');

    beforeEach(() => {
        HttpMock.reset();
    });

    describe('sendTextMessage', () => {

        beforeEach(() => {
            HttpMock.reset();
            jest.resetAllMocks();

            // @ts-ignore
            broadcastTransaction = jest.fn().mockImplementation(s => (_) => Promise.resolve({
                fullHash: 'fullHash',
                transaction: 'transaction'
            }));

            // @ts-ignore
            generateSignature = jest.fn(() => 'signature');

            // @ts-ignore
            verifySignature = jest.fn(() => true);


            // @ts-ignore
            generateSignedTransactionBytes = jest.fn(() => 'signedTransactionBytes');

            HttpMock.onPost().reply(200, {
                unsignedTransactionBytes: 'unsignedHexMessage'
            });

        });

        it('should sendTextMessage', async () => {

            const service = new BurstService('localhost');
            const {fullHash, transaction} = await sendTextMessage(service)(
                'Message Text',
                'recipientId',
                'senderPublicKey',
                'senderPrivateKey');

            expect(fullHash).toBe('fullHash');
            expect(transaction).toBe('transaction');
            expect(broadcastTransaction).toBeCalledTimes(1);
            expect(generateSignature).toBeCalledTimes(1);
            expect(verifySignature).toBeCalledTimes(1);
            expect(generateSignedTransactionBytes).toBeCalledTimes(1);

        });
        it('try sendTextMessage, but verification fails', async () => {

            // @ts-ignore
            verifySignature = jest.fn(() => false); // verification fails

            const service = new BurstService('localhost');
            try {

                await sendTextMessage(service)(
                    'Message Text',
                    'recipientId',
                    'senderPublicKey',
                    'senderPrivateKey');

                expect(true).toBe('Expected Verification Exception');
            } catch (e) {
                expect(generateSignature).toBeCalledTimes(1);
                expect(verifySignature).toBeCalledTimes(1);
                expect(generateSignedTransactionBytes).toBeCalledTimes(0);
                expect(broadcastTransaction).toBeCalledTimes(0);
            }

        });

    });

});
