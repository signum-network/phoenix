import {loadEnvironment} from './helpers/environment';
import {BurstService} from '../../../service/burstService';
import {decryptMessage, generateMasterKeys, getAccountIdFromPublicKey} from '@burstjs/crypto';
import {sendTextMessage} from '../../factories/message/sendTextMessage';
import {sendEncryptedTextMessage} from '../../factories/message/sendEncryptedTextMessage';
import {getTransaction} from '../../factories/transaction/getTransaction';
import {isAttachmentVersion} from '../../../attachment';
import {sendMessage} from '../../factories/message';
import {FeeQuantPlanck} from '../../../constants';


describe('[E2E] Message Api', () => {

    let environment;
    let service;
    let senderKeys;
    let recipientKeys;
    let recipientId;

    beforeAll(() => {
        environment = loadEnvironment();
        service = new BurstService({
            nodeHost: environment.testNetHost,
            apiRootUrl: environment.testNetApiPath
        });
        jest.setTimeout(environment.timeout);

        senderKeys = generateMasterKeys(environment.testPassphrase);
        recipientKeys = generateMasterKeys(environment.testRecipientPassphrase);
        recipientId = getAccountIdFromPublicKey(recipientKeys.publicKey);
    });


    it('should sendTextMessage', async () => {

        const transactionId = await sendTextMessage(service)(
            '[E2E] sendTextMessage TEST',
            recipientId,
            senderKeys.publicKey,
            senderKeys.signPrivateKey,
            1440,
            0.05
        );

        expect(transactionId).not.toBeUndefined();

    });

    it('should sendMessage with recipientPublicKey', async () => {

        const transactionId = await sendMessage(service)({
            message: '[E2E] sendMessage TEST',
            senderPublicKey: senderKeys.publicKey,
            senderPrivateKey: senderKeys.signPrivateKey,
            feePlanck: '' + FeeQuantPlanck,
            recipientId,
            recipientPublicKey: recipientKeys.publicKey,
            deadline: 1440,
        });

        expect(transactionId).not.toBeUndefined();

        const transaction = await getTransaction(service)(transactionId.transaction);
        expect(isAttachmentVersion(transaction, 'PublicKeyAnnouncement')).toBeTruthy();

    });


    it('should sendEncryptedTextMessage', async () => {
        const transactionId = await sendEncryptedTextMessage(service)(
            '[E2E] sendEncryptedTextMessage TEST (encrypted)',
            recipientId,
            recipientKeys.publicKey,
            senderKeys,
            1440,
            0.05
        );

        expect(transactionId).not.toBeUndefined();

    });

    it('should get a transaction from BRS with encrypted message and decrypt successfully', async () => {
        const transaction = await getTransaction(service)(environment.testEncryptedMessageTransactionId);
        expect(transaction).not.toBeUndefined();
        isAttachmentVersion(transaction, 'EncryptedMessage');
        const {encryptedMessage} = transaction.attachment;

        const recipientsMessage = decryptMessage(encryptedMessage, transaction.senderPublicKey, recipientKeys.agreementPrivateKey);
        const sendersMessage = decryptMessage(encryptedMessage, recipientKeys.publicKey, senderKeys.agreementPrivateKey);
        expect(recipientsMessage).toEqual('[E2E] sendEncryptedTextMessage TEST (encrypted)');
        expect(recipientsMessage).toEqual(sendersMessage);

    });



});
