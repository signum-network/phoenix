import {HttpMockBuilder, Http} from '@burstjs/http';
import {BurstService} from '../../service/burstService';
import {generateSignedTransactionBytes, generateSignature, encryptMessage} from '@burstjs/crypto';
import {verifySignature} from '@burstjs/crypto';
import {constructAttachment} from '../../internal/constructAttachment';
import {sendTextMessage} from '../factories/message/sendTextMessage';
import {broadcastTransaction} from '../factories/transaction/broadcastTransaction';
import {sendEncryptedTextMessage} from '../factories/message/sendEncryptedTextMessage';
import {createBurstService} from '../../__tests__/helpers/createBurstService';
import {sendMessage} from '../factories/message';
import {signAndBroadcastTransaction} from '../../internal';
import {sendEncryptedMessage} from '../factories/message/sendEncryptedMessage';
import {FeeQuantPlanck} from '@burstjs/util';

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
            service = createBurstService(httpMock, 'relPath');

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
                1440,
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
            };
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
            };
            const output = constructAttachment(mockTransaction, params);
            expect(output.message).toBe(mockTransaction.attachment.message);
            expect(output.messageIsText).toBe('true');
            expect(output.requestType).toBe(params.requestType);
        });
    });

    describe('sendEncryptedTextMessage', () => {
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
            encryptMessage = jest.fn(
                () =>
                    ({
                        data: 'encryptedMessage',
                        nonce: 'nonce'
                    })
            );

            // @ts-ignore
            generateSignature = jest.fn(() => 'signature');
            // @ts-ignore
            verifySignature = jest.fn(() => true);
            // @ts-ignore
            generateSignedTransactionBytes = jest.fn(() => 'signedTransactionBytes');

            httpMock = HttpMockBuilder.create().onPostReply(200, {
                unsignedTransactionBytes: 'unsignedHexMessage'
            }).build();
            service = createBurstService(httpMock, 'relPath');
        });

        afterEach(() => {
            // @ts-ignore
            httpMock.reset();
        });

        it('should sendEncryptedTextMessage', async () => {
            const senderKeys = {
                publicKey: 'publicKey',
                signPrivateKey: 'signPrivateKey',
                agreementPrivateKey: 'agreementPrivateKey',
            };

            const {fullHash, transaction} = await sendEncryptedTextMessage(service)(
                'Message Text',
                'recipientId',
                'recipientPublicKey',
                senderKeys,
                1440,
                0.2
            );

            expect(fullHash).toBe('fullHash');
            expect(transaction).toBe('transaction');
            expect(broadcastTransaction).toBeCalledTimes(1);
            expect(encryptMessage).toBeCalledTimes(1);
            expect(generateSignature).toBeCalledTimes(1);
            expect(verifySignature).toBeCalledTimes(1);
            expect(generateSignedTransactionBytes).toBeCalledTimes(1);
        });

        it('should throw error for sendEncryptedTextMessage, when encrypted message is too large', async () => {

            // @ts-ignore
            encryptMessage = jest.fn(
                () =>
                    ({
                        data: new Array(1100).fill('a').join(''),
                        nonce: 'nonce'
                    })
            );

            const senderKeys = {
                publicKey: 'publicKey',
                signPrivateKey: 'signPrivateKey',
                agreementPrivateKey: 'agreementPrivateKey',
            };

            try {
                await sendEncryptedTextMessage(service)(
                    'Plaintext message',
                    'recipientId',
                    'recipientPublicKey',
                    senderKeys,
                    1440,
                    0.2
                );
                expect(false).toBe('Expected error');
            } catch (e) {
                expect(e.message).toContain('The encrypted message exceeds allowed limit of 1024 bytes');
            }

            expect(encryptMessage).toBeCalledTimes(1);
            expect(broadcastTransaction).not.toBeCalled();
            expect(generateSignature).not.toBeCalled();
            expect(verifySignature).not.toBeCalled();
            expect(generateSignedTransactionBytes).not.toBeCalled();
        });

    });

    describe('sendMessage', () => {

        let httpMock: Http;
        let service: BurstService;

        beforeEach(() => {
            jest.resetAllMocks();
            // @ts-ignore
            signAndBroadcastTransaction = jest.fn();
            httpMock = HttpMockBuilder.create().onPostReply(200, {
                unsignedTransactionBytes: 'unsignedHexMessage'
            }).build();
            service = createBurstService(httpMock, 'relPath');
            // @ts-ignore
            service.send = jest.fn(() => ({unsignedTransactionBytes: 'unsignedTransactionBytes'}));
        });

        afterEach(() => {
            // @ts-ignore
            httpMock.reset();
        });


        it('should sendMessage', async () => {

            await sendMessage(service)({
                message: 'Message Text',
                feePlanck: '' + FeeQuantPlanck,
                recipientId: 'recipientId',
                recipientPublicKey: 'recipientPublicKey',
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            });

            expect(signAndBroadcastTransaction).toBeCalledTimes(1);
            expect(service.send).toBeCalledWith('sendMessage', {
                'broadcast': true,
                'deadline': 1440,
                'feeNQT': '735000',
                'message': 'Message Text',
                'messageIsText': true,
                'publicKey': 'senderPublicKey',
                'recipient': 'recipientId',
                'recipientPublicKey': 'recipientPublicKey',
            });
        });

        it('should sendEncryptedMessage', async () => {

            // @ts-ignore
            encryptMessage = jest.fn(
                () =>
                    ({
                        data: 'encryptedMessage',
                        nonce: 'nonce'
                    })
            );

            await sendEncryptedMessage(service)({
                message: 'Message Text',
                feePlanck: '' + FeeQuantPlanck,
                recipientId: 'recipientId',
                recipientPublicKey: 'recipientPublicKey',
                senderKeys: {
                    signPrivateKey: 'signPrivateKey',
                    publicKey: 'publicKey',
                    agreementPrivateKey: 'agreementPrivateKey'
                }
            });

            expect(signAndBroadcastTransaction).toBeCalledTimes(1);
            expect(service.send).toBeCalledWith('sendMessage', {
                'deadline': 1440,
                'encryptedMessageData': 'encryptedMessage',
                'encryptedMessageNonce': 'nonce',
                'feeNQT': '735000',
                'messageToEncryptIsText': true,
                'publicKey': 'publicKey',
                'recipient': 'recipientId',
                'recipientPublicKey': 'recipientPublicKey',
            });
        });

    });
});
