import {HttpMockBuilder, Http} from '@burstjs/http';

import {BurstService} from '../../burstService';
import {getBlockByTimestamp} from '../block/getBlockByTimestamp';
import {getBlockByHeight} from '../block/getBlockByHeight';
import {getBlockById} from '../block/getBlockById';
import {getBlockId} from '../block/getBlockId';
import {getAccountTransactions} from '../account/getAccountTransactions';

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
            try{
                await getAccountTransactions(service)('accountId');
            }catch(e){
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
    });
});
