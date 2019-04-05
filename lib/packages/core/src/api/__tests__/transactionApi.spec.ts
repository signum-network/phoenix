import { HttpMockBuilder, Http } from '@burstjs/http';
import { BurstService } from '../../service/burstService';
import { broadcastTransaction } from '../factories/transaction/broadcastTransaction';
import { getTransaction } from '../factories/transaction/getTransaction';
import { sendMoney } from '../factories/transaction/sendMoney';
import { sendMoneyMultiOut } from '../factories/transaction/sendMoneyMultiOut';
import { Transaction } from '../../typings/transaction';
import { generateSignature } from '@burstjs/crypto';
import { verifySignature } from '@burstjs/crypto';
import { generateSignedTransactionBytes } from '@burstjs/crypto';
import {createBurstService} from '../../__tests__/helpers/createBurstService';

describe('Transaction Api', () => {

    let httpMock: Http;

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
    });

    describe('broadcastTransaction', () => {
        it('should broadcastTransaction (generic)', async () => {
            httpMock = HttpMockBuilder.create().onPostReply(200, { fullHash: 'fullHash', transaction: 'transaction' }).build();
            const service = createBurstService(httpMock, 'relPath');
            const status = await broadcastTransaction(service)('some_data');
            expect(status.fullHash).toBe('fullHash');
            expect(status.transaction).toBe('transaction');
        });

    });

    describe('getTransaction', () => {
        it('should getTransaction', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, { transaction: 'transactionId', block: 'blockId' }).build();
            const service = createBurstService(httpMock, 'relPath');
            const status = await getTransaction(service)('transactionId');
            expect(status.transaction).toBe('transactionId');
            expect(status.block).toBe('blockId');
        });

    });

    describe('sendMoney', () => {
        let service;

        const mockTransaction: Transaction = {
            transaction: 'transactionId',
            requestProcessingTime: 4,
            feeNQT: '1',
            amountNQT: '1',
            fullHash: '808d5c32b12f4d4b963404c19523b6391ddf7a04a96ec4a495703aeead76c6ff',
        };

        const mockBroadcastResponse = {
            unsignedTransactionBytes: 'unsignedHexMessage'
        };

        beforeEach(() => {

            jest.resetAllMocks();

            // @ts-ignore
            generateSignature = jest.fn(() => 'signature');
            // @ts-ignore
            verifySignature = jest.fn(() => true);
            // @ts-ignore
            generateSignedTransactionBytes = jest.fn(() => 'signedTransactionBytes');

            httpMock = HttpMockBuilder.create()
            // tslint:disable:max-line-length
            .onPostReply(200, mockBroadcastResponse,
                'relPath?requestType=sendMoney&amountNQT=100000000&publicKey=senderPublicKey&recipient=recipientId&deadline=1440&feeNQT=100000000')
            .onPostReply(200, mockTransaction.transaction,
                'relPath?requestType=broadcastTransaction&transactionBytes=signedTransactionBytes')
            .build();

            service = createBurstService(httpMock, 'relPath');
        });

        afterEach(() => {
            // @ts-ignore
            httpMock.reset();
        });

        it('should sendMoney', async () => {
            const status = await sendMoney(service)(
                mockTransaction,
                'senderPublicKey',
                'senderPrivateKey',
                'recipientId'
            );
            expect(status).toBe('transactionId');
            expect(generateSignature).toBeCalledTimes(1);
            expect(verifySignature).toBeCalledTimes(1);
            expect(generateSignedTransactionBytes).toBeCalledTimes(1);
        });

    });
    describe('sendMoneyMultiOut', () => {
        let service;

        const mockTransaction: Transaction = {
            transaction: 'transactionId',
            requestProcessingTime: 4,
            feeNQT: '1',
            amountNQT: '1',
            fullHash: '808d5c32b12f4d4b963404c19523b6391ddf7a04a96ec4a495703aeead76c6ff',
        };

        const mockBroadcastResponse = {
            unsignedTransactionBytes: 'unsignedHexMessage'
        };

        beforeEach(() => {

            jest.resetAllMocks();

            // @ts-ignore
            generateSignature = jest.fn(() => 'signature');
            // @ts-ignore
            verifySignature = jest.fn(() => true);
            // @ts-ignore
            generateSignedTransactionBytes = jest.fn(() => 'signedTransactionBytes');


        });

        afterEach(() => {
            // @ts-ignore
            httpMock.reset();
        });

        it('should sendMoneyMulti', async () => {
            httpMock = HttpMockBuilder.create()
            // tslint:disable:max-line-length
            .onPostReply(200, mockBroadcastResponse,
                'relPath?requestType=sendMoneyMulti&publicKey=senderPublicKey&recipients=thisIsAStringRepresentingAMultiOutPayload&deadline=1440&feeNQT=100000000')
            .onPostReply(200, mockTransaction.transaction,
                'relPath?requestType=broadcastTransaction&transactionBytes=signedTransactionBytes')
            .build();

            service = createBurstService(httpMock, 'relPath');
            const status = await sendMoneyMultiOut(service)(
                mockTransaction,
                'senderPublicKey',
                'senderPrivateKey',
                'thisIsAStringRepresentingAMultiOutPayload',
                false
            );
            expect(status).toBe('transactionId');
            expect(generateSignature).toBeCalledTimes(1);
            expect(verifySignature).toBeCalledTimes(1);
            expect(generateSignedTransactionBytes).toBeCalledTimes(1);
        });


        it('should sendMoneyMultiSame', async () => {
            httpMock = HttpMockBuilder.create()
            // tslint:disable:max-line-length
            .onPostReply(200, mockBroadcastResponse,
                'relPath?requestType=sendMoneyMultiSame&publicKey=senderPublicKey&recipients=thisIsAStringRepresentingAMultiOutSamePayload&deadline=1440&feeNQT=100000000&amountNQT=100000000')
            .onPostReply(200, mockTransaction.transaction,
                'relPath?requestType=broadcastTransaction&transactionBytes=signedTransactionBytes')
            .build();

            service = createBurstService(httpMock, 'relPath');
            const status = await sendMoneyMultiOut(service)(
                mockTransaction,
                'senderPublicKey',
                'senderPrivateKey',
                'thisIsAStringRepresentingAMultiOutSamePayload',
                true
            );
            expect(status).toBe('transactionId');
            expect(generateSignature).toBeCalledTimes(1);
            expect(verifySignature).toBeCalledTimes(1);
            expect(generateSignedTransactionBytes).toBeCalledTimes(1);
        });


        it('should support deadlines', async () => {
            httpMock = HttpMockBuilder.create()
            // tslint:disable:max-line-length
            .onPostReply(200, mockBroadcastResponse,
                'relPath?requestType=sendMoneyMultiSame&publicKey=senderPublicKey&recipients=thisIsAStringRepresentingAMultiOutSamePayload&deadline=720&feeNQT=100000000&amountNQT=100000000')
            .onPostReply(200, mockTransaction.transaction,
                'relPath?requestType=broadcastTransaction&transactionBytes=signedTransactionBytes')
            .build();

            const mockTransaction2: Transaction = {
                deadline: 720, // 12 hrs instead of default 24
                ...mockTransaction
            };

            service = createBurstService(httpMock, 'relPath');
            const status = await sendMoneyMultiOut(service)(
                mockTransaction2,
                'senderPublicKey',
                'senderPrivateKey',
                'thisIsAStringRepresentingAMultiOutSamePayload',
                true
            );
            expect(status).toBe('transactionId');
            expect(generateSignature).toBeCalledTimes(1);
            expect(verifySignature).toBeCalledTimes(1);
            expect(generateSignedTransactionBytes).toBeCalledTimes(1);
        });

    });

});
