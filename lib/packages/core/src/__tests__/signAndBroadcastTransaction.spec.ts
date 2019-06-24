import {Http, HttpMockBuilder} from '@burstjs/http';
import {createBurstService} from './helpers/createBurstService';
import {generateSignature, verifySignature, generateSignedTransactionBytes} from '@burstjs/crypto';
import {signAndBroadcastTransaction} from '../internal';

describe('signAndBroadcastTransaction', () => {

    let httpMock: Http;

    beforeEach(() => {
        // @ts-ignore
        generateSignature = jest.fn(() => 'signature');
        // @ts-ignore
        verifySignature = jest.fn(() => true);
        // @ts-ignore
        generateSignedTransactionBytes = jest.fn(() => 'signedTransactionBytes');

    });

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
        jest.restoreAllMocks();
    });

    it('should sign as expected', async () => {
        httpMock = HttpMockBuilder.create().onPostReply(200, {
            fullHash: 'fullHash',
            transaction: 'transaction'
        }).build();
        const service = createBurstService(httpMock, 'relPath');
        const transactionId = await signAndBroadcastTransaction({
            unsignedHexMessage: 'unsignedHexMessage',
            senderPrivateKey: 'senderPrivateKey',
            senderPublicKey: 'senderPublicKey',
        }, service);


        expect(transactionId.fullHash).toBe('fullHash');
        expect(transactionId.transaction).toBe('transaction');
        expect(generateSignature).toBeCalled();
        expect(verifySignature).toBeCalled();
        expect(generateSignedTransactionBytes).toBeCalled();
    });

    it('should throw exception if verification fails', async () => {
        httpMock = HttpMockBuilder.create().onPostReply(200, {
            fullHash: 'fullHash',
            transaction: 'transaction'
        }).build();

        // @ts-ignore
        verifySignature = jest.fn(() => false);

        const service = createBurstService(httpMock, 'relPath');
        try {

            await signAndBroadcastTransaction({
                unsignedHexMessage: 'unsignedHexMessage',
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            }, service);
            expect(false).toBe('Expected Exception');
        } catch (e) {
            expect(e.message).toBe('The signed message could not be verified! Transaction not broadcasted!');
        }

        expect(generateSignature).toBeCalled();
        expect(verifySignature).toBeCalled();
        expect(generateSignedTransactionBytes).not.toBeCalled();
    });

});
