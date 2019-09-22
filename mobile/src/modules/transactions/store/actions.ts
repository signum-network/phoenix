import { Account,
  generateSendTransactionQRCodeAddress,
  sendMoney as send,
  SuggestedFees,
  Transaction,
  TransactionId } from '@burstjs/core';
import { decryptAES, hashSHA256 } from '@burstjs/crypto';
import { convertNQTStringToNumber } from '@burstjs/util';
import { createAction, createActionFn } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';
import { amountToString } from '../../../core/utils/numbers';

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
    const { amount, address, fee, sender } = payload;
    const service = state.app.burstService;

    const transaction: Transaction = {
      amountNQT: amount,
      feeNQT: fee
    };
    const senderPublicKey = sender.keys.publicKey;
    const senderPrivateKey = decryptAES(sender.keys.signPrivateKey, hashSHA256(state.auth.passcode));

    dispatch(actions.sendMoney(payload));
    try {
      const result = await send(service)(transaction, senderPublicKey, senderPrivateKey, address) as TransactionId;
      dispatch(actions.sendMoneySuccess(result));

      return result;
    } catch (e) {
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
