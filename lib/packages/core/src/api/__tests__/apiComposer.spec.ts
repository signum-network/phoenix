import {ApiComposer} from '../apiComposer';
import {BurstService} from '../../burstService';
import {getBlockById} from '../block/getBlockById';
import {getBlockByHeight} from '../block/getBlockByHeight';
import {getBlockId} from '../block/getBlockId';
import {getBlockByTimestamp} from '../block/getBlockByTimestamp';
import {getBlockchainStatus} from '../network/getBlockchainStatus';
import {getServerStatus} from '../network/getServerStatus';
import {suggestFee} from '../network/suggestFee';
import {broadcastTransaction} from '../transaction/broadcastTransaction';
import {getTransaction} from '../transaction/getTransaction';
import {sendMoney} from '../transaction/sendMoney';
import {sendTextMessage} from '../message/sendTextMessage';
import {getAccountTransactions} from '../account/getAccountTransactions';
import {getUnconfirmedAccountTransactions} from '../account/getUnconfirmedAccountTransactions';
import {generateSendTransactionQRCode} from '../account/generateSendTransactionQRCode';
import {getAccountBalance} from '../account/getAccountBalance';
import {generateSendTransactionQRCodeAddress} from '../account/generateSendTransactionQRCodeAddress';


describe('ApiComposer', () => {
    const burstService = new BurstService('nodeHose', 'apiRootUrl');
    let apiComposer;

    beforeEach(() => {
        apiComposer = ApiComposer.create(burstService);
    });


    describe('mapCreators (private)', () => {

        it('should map creators correctly', () => {

            // @ts-ignore
            apiComposer.mapCreators('block', {getBlockById});

            const api = apiComposer.compose();

            expect(api.block.getBlockById).toBeDefined();
            expect(api.block.getBlockByHeight).not.toBeDefined();
            expect(api.network).not.toBeDefined();

            const getBlockByIdFn = getBlockById(burstService);
            expect(getBlockByIdFn.toString()).toEqual(api.block.getBlockById.toString());

        });

    });

    it('should compose (empty) Api', () => {
        const api = apiComposer.compose();

        expect(api).toBeDefined();
        expect(api.block).not.toBeDefined();
        expect(api.account).not.toBeDefined();
        expect(api.message).not.toBeDefined();
        expect(api.network).not.toBeDefined();
        expect(api.transaction).not.toBeDefined();
    });

    it('should compose block Api', () => {

        const api = apiComposer.withBlockApi({
            getBlockById,
            getBlockByHeight,
            getBlockByTimestamp,
            getBlockId,
        }).compose();
        expect(api).toBeDefined();

        expect(api.block).toBeDefined();
        expect(api.block.getBlockById).toBeDefined();
        expect(api.block.getBlockByHeight).toBeDefined();
        expect(api.block.getBlockByTimestamp).toBeDefined();
        expect(api.block.getBlockId).toBeDefined();

    });

    it('should compose network Api', () => {

        const api = apiComposer
            .withNetworkApi({
                getBlockchainStatus,
                getServerStatus,
                suggestFee,
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.network).toBeDefined();
        expect(api.network.getBlockchainStatus).toBeDefined();
        expect(api.network.getServerStatus).toBeDefined();
        expect(api.network.suggestFee).toBeDefined();

    });

    it('should compose transaction Api', () => {

        const api = apiComposer
            .withTransactionApi({
                broadcastTransaction,
                getTransaction,
                sendMoney,
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.transaction).toBeDefined();
        expect(api.transaction.broadcastTransaction).toBeDefined();
        expect(api.transaction.getTransaction).toBeDefined();
        expect(api.transaction.sendMoney).toBeDefined();

    });

    it('should compose message Api', () => {

        const api = apiComposer
            .withMessageApi({
                sendTextMessage
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.message).toBeDefined();
        expect(api.message.sendTextMessage).toBeDefined();

    });

    it('should compose account Api', () => {

        const api = apiComposer
            .withAccountApi({
                getAccountTransactions,
                getUnconfirmedAccountTransactions,
                getAccountBalance,
                generateSendTransactionQRCode,
                generateSendTransactionQRCodeAddress,
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.account).toBeDefined();
        expect(api.account.getAccountTransactions).toBeDefined();
        expect(api.account.getUnconfirmedAccountTransactions).toBeDefined();
        expect(api.account.getAccountBalance).toBeDefined();
        expect(api.account.generateSendTransactionQRCode).toBeDefined();
        expect(api.account.generateSendTransactionQRCodeAddress).toBeDefined();

    });

});
