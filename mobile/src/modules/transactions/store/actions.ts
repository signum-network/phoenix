import {
    Account,
    ApiSettings,
    AttachmentEncryptedMessage,
    AttachmentMessage,
    composeApi,
    TransactionId,
    SendAmountArgs
} from '@signumjs/core';
import {decryptAES, encryptData, EncryptedData, EncryptedMessage, encryptMessage, hashSHA256} from '@signumjs/crypto';
import {
    convertHexStringToByteArray,
    convertNQTStringToNumber,
    convertNumberToNQTString
} from '@signumjs/util';
import {Alert} from 'react-native';
import {i18n} from '../../../core/i18n';
import {createAction, createActionFn} from '../../../core/utils/store';
import {getAccount} from '../../auth/store/actions';
import {transactions} from '../translations';
import {actionTypes} from './actionTypes';
import {selectChainApi} from '../../../core/store/app/selectors';

const actions = {
    sendMoney: createAction<SendAmountPayload>(actionTypes.sendMoney),
    sendMoneySuccess: createAction<TransactionId>(actionTypes.sendMoneySuccess),
    sendMoneyFailed: createAction<Error>(actionTypes.sendMoneyFailed),
    generateQRAddress: createAction<SendAmountPayload>(actionTypes.generateQRAddress),
    generateQRAddressSuccess: createAction<string>(actionTypes.generateQRAddressSuccess),
    generateQRAddressFailed: createAction<Error>(actionTypes.generateQRAddressFailed)
};

export interface SendAmountPayload {
    address: string;
    amount: string;
    fee: string;
    attachment?: any;
    sender: Account;
    encrypt: boolean;
    message?: string;
    messageIsText?: boolean;
}

export interface ReceiveAmountPayload {
    recipient: string;
    amount: string;
    fee: string;
    immutable: boolean;
    message?: string;
}

export const sendMoney = createActionFn<SendAmountPayload, Promise<TransactionId>>(
    async (dispatch, getState, payload): Promise<TransactionId> => {
        const state = getState();
        const {amount, address, fee, sender, message, encrypt, messageIsText} = payload;
        const senderPublicKey = sender.keys.publicKey;
        const senderPrivateKey = decryptAES(sender.keys.signPrivateKey, hashSHA256(state.auth.passcode));

        const sendMoneyPayload: SendAmountArgs = {
            amountPlanck: convertNumberToNQTString(parseFloat(amount)),
            feePlanck: convertNumberToNQTString(parseFloat(fee)),
            recipientId: address,
            senderPublicKey,
            senderPrivateKey,
            deadline: 1440
        };

        if (message && encrypt) {
            const encryptedMessage: EncryptedMessage | EncryptedData =
                await getEncryptedMessage(dispatch, address, sender, messageIsText, message, state.auth.passcode);

            sendMoneyPayload.attachment = new AttachmentEncryptedMessage(encryptedMessage);
        } else if (message) {
            sendMoneyPayload.attachment = new AttachmentMessage({message, messageIsText});
        }

        try {
            const api = selectChainApi(state);
            const result = await api.transaction.sendAmountToSingleRecipient(sendMoneyPayload);

            Alert.alert(i18n.t(transactions.screens.send.success, {
                amount: convertNQTStringToNumber(sendMoneyPayload.amountPlanck),
                address: sendMoneyPayload.recipientId
            }));

            dispatch(actions.sendMoneySuccess(result));

            return result;
        } catch (e) {

            Alert.alert(i18n.t(transactions.screens.send.failure));

            dispatch(actions.sendMoneyFailed(e));

            throw e;
        }
    }
);

async function getEncryptedMessage(dispatch: any,
                                   address: string,
                                   sender: Account,
                                   messageIsText: boolean | undefined,
                                   message: string,
                                   passcode: string): Promise<EncryptedMessage | EncryptedData> {
    const recipient = await dispatch(getAccount(address));
    const agreementPrivateKey = decryptAES(sender.keys.agreementPrivateKey, hashSHA256(passcode));
    let encryptedMessage: EncryptedMessage | EncryptedData;
    if (messageIsText) {
        encryptedMessage = encryptMessage(message,
            recipient.publicKey, agreementPrivateKey);
    } else {
        encryptedMessage = encryptData(new Uint8Array(convertHexStringToByteArray(message)),
            recipient.publicKey, agreementPrivateKey);
    }
    return encryptedMessage;
}
