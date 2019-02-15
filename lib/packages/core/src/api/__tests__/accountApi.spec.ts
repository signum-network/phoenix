import {HttpMockBuilder, Http} from '@burstjs/http';

import {BurstService} from '../../burstService';
import {getAccountTransactions} from '../account/getAccountTransactions';
import {getUnconfirmedAccountTransactions} from '../account/getUnconfirmedAccountTransactions';
import {getAccountBalance} from '../account/getAccountBalance';
import {generateSendTransactionQRCodeAddress} from '../account/generateSendTransactionQRCodeAddress';
import {generateSendTransactionQRCode} from '../account/generateSendTransactionQRCode';

describe('Account Api', () => {

    let httpMock: Http;

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
    });

    describe('GetAccountTransactions()', () => {
        const mockedTransactions = {
            'requestProcessingTime': 738,
            'transactions': [{
                'senderPublicKey': 'spk',
                'signature': 'sign',
                'feeNQT': '5000000',
                'type': 1,
                'confirmations': 659,
                'fullHash': 'fh',
                'version': 1,
                'ecBlockId': '14044948199172881479',
                'signatureHash': 'sh',
                'attachment': {
                    'version.Message': 1,
                    'messageIsText': true,
                    'message': 'message'
                },
                'senderRS': 'BURST-ABC',
                'subtype': 0,
                'amountNQT': '0',
                'sender': '123',
                'recipientRS': 'BURST-DEF',
                'recipient': '456',
                'ecBlockHeight': 10,
                'block': '6204640184665879259',
                'blockTimestamp': 141094246,
                'deadline': 1440,
                'transaction': '123',
                'timestamp': 141094191,
                'height': 20
            }, {
                'senderPublicKey': 'spk',
                'signature': 'sign',
                'feeNQT': '5000000',
                'type': 1,
                'confirmations': 659,
                'fullHash': 'fh',
                'version': 1,
                'ecBlockId': '14044948199172881479',
                'signatureHash': 'sh',
                'attachment': {
                    'version.Message': 1,
                    'messageIsText': true,
                    'message': 'message'
                },
                'senderRS': 'BURST-ABC',
                'subtype': 0,
                'amountNQT': '0',
                'sender': '123',
                'recipientRS': 'BURST-DEF',
                'recipient': '456',
                'ecBlockHeight': 21,
                'block': '6204640184665879259',
                'blockTimestamp': 141094246,
                'deadline': 1440,
                'transaction': '123',
                'timestamp': 141094191,
                'height': 30
            }]
        };


        it('should getAccountTransaction without paging', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            const transactions = await getAccountTransactions(service)('accountId');
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.transactions).toHaveLength(2);
            expect(transactions.transactions[0].height).toBe(20);
            expect(transactions.transactions[1].height).toBe(30);
        });

        it('should fail on getAccountTransaction', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            try {
                await getAccountTransactions(service)('accountId');
            } catch (e) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });

        it('should getAccountTransaction with paging', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            const transactions = await getAccountTransactions(service)('accountId', 0, 10);
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.transactions).toHaveLength(2);
            expect(transactions.transactions[0].height).toBe(20);
            expect(transactions.transactions[1].height).toBe(30);
        });

        it('should getAccountTransaction with number of confirmations', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            const transactions = await getAccountTransactions(service)('accountId', undefined, undefined, 10);
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.transactions).toHaveLength(2);
            expect(transactions.transactions[0].height).toBe(20);
            expect(transactions.transactions[1].height).toBe(30);
        });
    });

    describe('GetUnconfirmedAccountTransactions()', () => {
        const mockedTransactions = {
            'requestProcessingTime': 738,
            'unconfirmedTransactions': [{
                'senderPublicKey': 'spk',
                'signature': 'sign',
                'feeNQT': '5000000',
                'type': 1,
                'confirmations': 0,
                'fullHash': 'fh',
                'version': 1,
                'ecBlockId': '14044948199172881479',
                'signatureHash': 'sh',
                'attachment': {
                    'version.Message': 1,
                    'messageIsText': true,
                    'message': 'message'
                },
                'senderRS': 'BURST-ABC',
                'subtype': 0,
                'amountNQT': '0',
                'sender': '123',
                'recipientRS': 'BURST-DEF',
                'recipient': '456',
                'ecBlockHeight': 10,
                'block': '6204640184665879259',
                'blockTimestamp': 141094246,
                'deadline': 1440,
                'transaction': '123',
                'timestamp': 141094191,
                'height': 20
            }
            ]
        };

        it('should getUnconfirmedAccountTransactions', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            const transactions = await getUnconfirmedAccountTransactions(service)('accountId');
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.unconfirmedTransactions).toHaveLength(1);
        });

        it('should fail on getUnconfirmedAccountTransactions', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            try {
                await getUnconfirmedAccountTransactions(service)('accountId');
            } catch (e) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });
    });

    describe('GetAccountBalance', () => {

        it('should getAccountBalance', async () => {
            const mockedBalance = {
                unconfirmedBalanceNQT: '100000000000',
                guaranteedBalanceNQT: '100000000000',
                effectiveBalanceNXT: '100000000000',
                forgedBalanceNQT: '0',
                balanceNQT: '100000000000',
                requestProcessingTime: 0
            };

            httpMock = HttpMockBuilder.create().onGetReply(200, mockedBalance).build();
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            const balance = await getAccountBalance(service)('accountId');
            expect(balance.requestProcessingTime).toBe(0);
            expect(balance.unconfirmedBalanceNQT).toBe('100000000000');
            expect(balance.guaranteedBalanceNQT).toBe('100000000000');
            expect(balance.effectiveBalanceNXT).toBe('100000000000');
            expect(balance.balanceNQT).toBe('100000000000');
            expect(balance.forgedBalanceNQT).toBe('0');
        });

        it('should fail getAccountBalance', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            try {
                await getAccountBalance(service)('accountId');
            } catch (e) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });
    });

    describe('generateSendTransactionQRCode', () => {
        const mockAddress = `BURST-K8MA-U2JT-R6DJ-FVQLC`;

        it('should expose a method for constructing the URL', async () => {
            // tslint:disable-next-line
            const expected = 'relPath?requestType=generateSendTransactionQRCode&receiverId=BURST-K8MA-U2JT-R6DJ-FVQLC&amountNQT=0&feeSuggestionType=standard';
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            const generatedImageUrl = await generateSendTransactionQRCodeAddress(service)(mockAddress);
            expect(generatedImageUrl).toBe(expected);
        });

        it('should fetch the QR image', async () => {
            const mockedImage = new ArrayBuffer(1337);
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedImage).build();
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            const generatedImage = await generateSendTransactionQRCode(service)(mockAddress);
            expect(generatedImage.byteLength).toBe(1337);
        });

        it('should fail generateSendTransactionQRCode', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = new BurstService('baseUrl', 'relPath', httpMock);
            try {
                await generateSendTransactionQRCode(service)(mockAddress);
            } catch (e) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });
    });
});
