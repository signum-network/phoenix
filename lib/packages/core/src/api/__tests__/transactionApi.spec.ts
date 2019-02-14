import { HttpMockBuilder, Http } from '@burstjs/http';
import { BurstService } from '../../burstService';
import { broadcastTransaction } from '../transaction/broadcastTransaction';
import { getTransaction } from '../transaction/getTransaction';
import { sendMoney } from '../transaction/sendMoney';
import { Transaction } from '../../typings/transaction';
import { generateSignature } from '@burstjs/crypto';
import { verifySignature } from '@burstjs/crypto';
import { generateSignedTransactionBytes } from '@burstjs/crypto';

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
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            const status = await broadcastTransaction(service)('some_data');
            expect(status.fullHash).toBe('fullHash');
            expect(status.transaction).toBe('transaction');
        });

    });

    describe('getTransaction', () => {
        it('should getTransaction', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, { transaction: 'transactionId', block: 'blockId' }).build();
            const service = new BurstService('baseUrl', 'relPath', httpMock);
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
            feeNQT: "1",
            amountNQT: "1",
            fullHash: "808d5c32b12f4d4b963404c19523b6391ddf7a04a96ec4a495703aeead76c6ff",
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
            .onPostReply(200, mockBroadcastResponse, 
                'relPath?requestType=sendMoney&requestType=sendMoney&amountNQT=100000000&publicKey=recipientId&recipient=senderPrivateKey&deadline=1440&feeNQT=100000000')
            .onPostReply(200, mockTransaction.transaction, 
                'relPath?requestType=broadcastTransaction&transactionBytes=signedTransactionBytes')
            .build();

            service = new BurstService('baseUrl', 'relPath', httpMock);
        })

        afterEach(() => {
            // @ts-ignore
            httpMock.reset();
        });

        it('should sendMoney', async () => {
            const status = await sendMoney(service)(
                mockTransaction, 
                'recipientId',
                'senderPublicKey',
                'senderPrivateKey'
            );
            expect(status).toBe('transactionId');
            expect(generateSignature).toBeCalledTimes(1);
            expect(verifySignature).toBeCalledTimes(1);
            expect(generateSignedTransactionBytes).toBeCalledTimes(1);
        });

    });

});
