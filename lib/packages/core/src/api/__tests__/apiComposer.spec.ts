import {ApiComposer} from '../apiComposer';
import {getBlockById} from '../factories/block/getBlockById';
import {getBlockByHeight} from '../factories/block/getBlockByHeight';
import {getBlockId} from '../factories/block/getBlockId';
import {getBlockByTimestamp} from '../factories/block/getBlockByTimestamp';
import {getBlockchainStatus} from '../factories/network/getBlockchainStatus';
import {getServerStatus} from '../factories/network/getServerStatus';
import {getSuggestedFees} from '../factories/network/getSuggestedFees';
import {broadcastTransaction} from '../factories/transaction/broadcastTransaction';
import {getTransaction} from '../factories/transaction/getTransaction';
import {
    generateSendTransactionQRCode,
    generateSendTransactionQRCodeAddress,
    getAccountBalance,
    getAccountBlockIds,
    getAccountBlocks,
    getAccountTransactions,
    getUnconfirmedAccountTransactions,
    getAccountSubscriptions,
    getSubscriptionsToAccount,
} from '../factories/account';
import {createChainService} from '../../__tests__/helpers/createChainService';
import {getAllContractIds, getContract, getContractsByAccount} from '../factories/contract';
import {
    cancelSubscription,
    createSubscription,
    sendAmountToMultipleRecipients,
    sendAmountToSingleRecipient,
    sendSameAmountToMultipleRecipients
} from '../factories/transaction';
import {getAsset} from '../factories/asset/getAsset';
import {getAllAssets} from '../factories/asset';
import {sendMessage} from '../factories';


describe('ApiComposer', () => {
    const burstService = createChainService();
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
        expect(api.service).toBeDefined();
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
                getSuggestedFees,
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.network).toBeDefined();
        expect(api.network.getBlockchainStatus).toBeDefined();
        expect(api.network.getServerStatus).toBeDefined();
        expect(api.network.getSuggestedFees).toBeDefined();

    });

    it('should compose transaction Api', () => {

        const api = apiComposer
            .withTransactionApi({
                broadcastTransaction,
                getTransaction,
                sendAmountToSingleRecipient,
                sendAmountToMultipleRecipients,
                sendSameAmountToMultipleRecipients,
                createSubscription,
                cancelSubscription
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.transaction).toBeDefined();
        expect(api.transaction.broadcastTransaction).toBeDefined();
        expect(api.transaction.getTransaction).toBeDefined();
        expect(api.transaction.sendAmountToSingleRecipient).toBeDefined();
        expect(api.transaction.sendAmountToMultipleRecipients).toBeDefined();
        expect(api.transaction.sendSameAmountToMultipleRecipients).toBeDefined();
        expect(api.transaction.createSubscription).toBeDefined();
        expect(api.transaction.cancelSubscription).toBeDefined();
    });

    it('should compose message Api', () => {

        const api = apiComposer
            .withMessageApi({
                sendMessage,
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.message).toBeDefined();
        expect(api.message.sendMessage).toBeDefined();

    });

    it('should compose account Api', () => {

        const api = apiComposer
            .withAccountApi({
                getAccountTransactions,
                getUnconfirmedAccountTransactions,
                getAccountBalance,
                generateSendTransactionQRCode,
                generateSendTransactionQRCodeAddress,
                getAccountSubscriptions,
                getSubscriptionsToAccount,
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.account).toBeDefined();
        expect(api.account.getAccountTransactions).toBeDefined();
        expect(api.account.getUnconfirmedAccountTransactions).toBeDefined();
        expect(api.account.getAccountBalance).toBeDefined();
        expect(api.account.generateSendTransactionQRCode).toBeDefined();
        expect(api.account.generateSendTransactionQRCodeAddress).toBeDefined();
        expect(api.account.getAccountSubscriptions).toBeDefined();
        expect(api.account.getSubscriptionsToAccount).toBeDefined();

    });

    it('should compose contract Api', () => {

        const api = apiComposer
            .withContractApi({
                getContract,
                getContractsByAccount,
                getAllContractIds,
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.contract).toBeDefined();
        expect(api.contract.getContract).toBeDefined();
        expect(api.contract.getContractsByAccount).toBeDefined();
        expect(api.contract.getAllContractIds).toBeDefined();

    });

    it('should compose asset Api', () => {
        const api = apiComposer
            .withAssetApi({
                getAsset,
                getAllAssets,
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.asset).toBeDefined();
        expect(api.asset.getAsset).toBeDefined();
        expect(api.asset.getAllAssets).toBeDefined();
    });


    it('should compose account Api with multiple modules', () => {

        const api = apiComposer
            .withMessageApi({
                sendMessage
            })
            .withAccountApi({
                getAccountTransactions,
                getUnconfirmedAccountTransactions,
                getAccountBalance,
                getAccountBlocks,
                getAccountBlockIds,
                generateSendTransactionQRCode,
                generateSendTransactionQRCodeAddress,
            })
            .compose();

        expect(api).toBeDefined();
        expect(api.account).toBeDefined();
        expect(api.account.getAccountTransactions).toBeDefined();
        expect(api.account.getUnconfirmedAccountTransactions).toBeDefined();
        expect(api.account.getAccountBalance).toBeDefined();
        expect(api.account.getAccountBlocks).toBeDefined();
        expect(api.account.getAccountBlockIds).toBeDefined();
        expect(api.account.generateSendTransactionQRCode).toBeDefined();
        expect(api.account.generateSendTransactionQRCodeAddress).toBeDefined();

        expect(api).toBeDefined();
        expect(api.message).toBeDefined();
        expect(api.message.sendMessage).toBeDefined();

    });

});
