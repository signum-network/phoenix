import { Account,
  ApiSettings,
  AttachmentEncryptedMessage,
  AttachmentMessage,
  composeApi,
  generateSendTransactionQRCodeAddress,
  SuggestedFees,
  TransactionId} from '@burstjs/core';
import { SendAmountArgs } from '@burstjs/core/out/typings/args/sendAmountArgs';
import { decryptAES, encryptData, EncryptedData, EncryptedMessage, encryptMessage, hashSHA256 } from '@burstjs/crypto';
import {
  convertHexStringToByteArray,
  convertNQTStringToNumber,
  convertNumberToNQTString
} from '@burstjs/util';
import { Alert } from 'react-native';
import { i18n } from '../../../core/i18n';
import { createAction, createActionFn } from '../../../core/utils/store';
import { getAccount } from '../../auth/store/actions';
import { transactions } from '../translations';
import { actionTypes } from './actionTypes';

const actions = {
  sendMoney: createAction<SendMoneyPayload>(actionTypes.sendMoney),
  sendMoneySuccess: createAction<TransactionId>(actionTypes.sendMoneySuccess),
  sendMoneyFailed: createAction<Error>(actionTypes.sendMoneyFailed),
  generateQRAddress: createAction<SendMoneyPayload>(actionTypes.generateQRAddress),
  generateQRAddressSuccess: createAction<string>(actionTypes.generateQRAddressSuccess),
  generateQRAddressFailed: createAction<Error>(actionTypes.generateQRAddressFailed)
};

export interface SendMoneyPayload {
  address: string;
  amount: string;
  fee: string;
  attachment?: any;
  sender: Account;
  encrypt: boolean;
  message?: string;
  messageIsText?: boolean;
}

export interface ReceiveBurstPayload {
  recipient: Account;
  amount: string;
  feeSuggestionType: keyof SuggestedFees;
  fee: string;
  immutable: boolean;
}

export interface ReceiveBurstPayload {
  recipient: Account;
  amount: string;
  feeSuggestionType: keyof SuggestedFees;
  fee: string;
  immutable: boolean;
}

export const sendMoney = createActionFn<SendMoneyPayload, Promise<TransactionId>>(
  async (dispatch, getState, payload): Promise<TransactionId> => {
    const state = getState();
    const { amount, address, fee, sender, message, encrypt, messageIsText } = payload;
    const { nodeHost, apiRootUrl } = state.app.burstService.settings;
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
          getEncryptedMessage(dispatch, address, sender, messageIsText, message);

      sendMoneyPayload.attachment = new AttachmentEncryptedMessage(encryptedMessage);
    } else if (message) {
      sendMoneyPayload.attachment = new AttachmentMessage({ message, messageIsText });
    }

    // TODO: unify network request actions, add proper error handling and so on
    const api = composeApi(new ApiSettings(nodeHost, apiRootUrl));
    try {

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

export const generateQRAddress = createActionFn<ReceiveBurstPayload, Promise<string>>(
  async (dispatch, getState, payload): Promise<string> => {
    const state = getState();
    const { amount, fee, feeSuggestionType, recipient, immutable } = payload;
    const service = state.app.burstService;

    try {
      const result = await generateSendTransactionQRCodeAddress(service)(
        recipient.account,
        // @ts-ignore
        amount,
        feeSuggestionType,
        // @ts-ignore
        fee,
        immutable);
      dispatch(actions.generateQRAddressSuccess(result));
      return result;
    } catch (e) {
      dispatch(actions.generateQRAddressFailed(e));

      throw e;
    }
  }
);

function getEncryptedMessage (dispatch: any,
                              address: string,
                              sender: Account,
                              messageIsText: boolean | undefined,
                              message: string) {
  const recipient = dispatch(getAccount(address));
  const agreementPrivateKey = sender.keys.agreementPrivateKey;
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
