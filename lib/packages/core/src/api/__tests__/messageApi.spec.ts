import {HttpMockBuilder, Http} from '@signumjs/http';
import {ChainService} from '../../service/chainService';
import {encryptMessage} from '@signumjs/crypto';
import {signAndBroadcastTransaction} from '../factories/transaction/signAndBroadcastTransaction';
import {createChainService} from '../../__tests__/helpers/createChainService';
import {sendMessage} from '../factories/message';
import {sendEncryptedMessage} from '../factories/message/sendEncryptedMessage';
import {FeeQuantPlanck} from '@signumjs/util';

describe('Message Api', () => {
    describe('sendMessage', () => {

        let httpMock: Http;
        let service: ChainService;

        beforeEach(() => {
            jest.resetAllMocks();

            httpMock = HttpMockBuilder.create().onPostReply(200, {
                unsignedTransactionBytes: 'unsignedHexMessage'
            }).build();
            service = createChainService(httpMock, 'relPath');
            // @ts-ignore
            service.send = jest.fn(() => ({unsignedTransactionBytes: 'unsignedTransactionBytes'}));
        });

        afterEach(() => {
            // @ts-ignore
            httpMock.reset();
        });

        it('should sendMessage', async () => {
            // @ts-ignore
            signAndBroadcastTransaction = jest.fn().mockImplementation(s => (_) => Promise.resolve({
                fullHash: 'fullHash',
                transaction: 'transaction'
            }));

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
            signAndBroadcastTransaction = jest.fn().mockImplementation(s => (_) => Promise.resolve({
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
