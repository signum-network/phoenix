import {HttpMockBuilder, Http} from '@burstjs/http';
import {BurstService} from '../../burstService';
import {broadcastTransaction, sendTextMessage} from '..';
import {generateSignature} from '@burstjs/crypto';
import {verifySignature} from '@burstjs/crypto';
import {generateSignedTransactionBytes} from '@burstjs/crypto';
import { constructAttachment } from '../message/constructMessage';

describe('Message Api', () => {

    describe('sendTextMessage', () => {

        const params = {
            requestType: 'moon'
        };

        let httpMock: Http;
        let service: BurstService;

        beforeEach(() => {
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

            httpMock = HttpMockBuilder.create().onPostReply(200, {
                unsignedTransactionBytes: 'unsignedHexMessage'
            }).build();

            service = new BurstService('baseUrl', 'relPath', httpMock);

        });

        afterEach(() => {
            // @ts-ignore
            httpMock.reset();
        });


        it('should sendTextMessage', async () => {

            const {fullHash, transaction} = await sendTextMessage(service)(
                'Message Text',
                'recipientId',
                'senderPublicKey',
                'senderPrivateKey',
                0.2
            );

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

        it('constructs an encrypted attachment', () => {
            const mockTransaction = {
                attachment: {
                    data: '123',
                    nonce: '321',
                    isText: true,
                    type: 'encrypted_message'
                }
            }
            const output = constructAttachment(mockTransaction, params);
            expect(output.encryptedMessageData).toBe(mockTransaction.attachment.data);
            expect(output.encryptedMessageNonce).toBe(mockTransaction.attachment.nonce);
            expect(output.messageToEncryptIsText).toBe('true');
            expect(output.requestType).toBe(params.requestType);
        });

        it('constructs an unencrypted attachment', () => {
            const mockTransaction = {
                attachment: {
                    message: '123',
                    messageIsText: true,
                    type: 'message'
                }
            }
            const output = constructAttachment(mockTransaction, params);
            expect(output.message).toBe(mockTransaction.attachment.message);
            expect(output.messageIsText).toBe('true');
            expect(output.requestType).toBe(params.requestType);
        });
    });
});
