import { sendMoney as send, Transaction, TransactionId } from '@burstjs/core';
import { decryptAES, hashSHA256 } from '@burstjs/crypto';
import { isEmpty } from 'lodash';
import { createAction, createActionFn } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';

const actions = {
  sendMoney: createAction<SendMoneyPayload>(actionTypes.sendMoney),
  sendMoneySuccess: createAction<any>(actionTypes.sendMoneySuccess),
  sendMoneyFailed: createAction<any>(actionTypes.sendMoneyFailed)
};

export interface SendMoneyPayload {
  address: string;
  amount: string;
  fee: string;
  attachment?: any;
}

export const sendMoney = createActionFn<SendMoneyPayload, Promise<TransactionId>>(
  async (dispatch, getState, payload): Promise<TransactionId> => {
    const state = getState();
    const { amount, address, fee } = payload;
    const service = state.app.burstService;
    const accounts = state.auth.accounts;

    // TODO: pass selected account with payload or so.
    if (isEmpty(accounts)) {
      throw new Error('No accounts');
    }
    const account = accounts[0];

    const transaction: Transaction = {
      amountNQT: amount,
      feeNQT: fee
    };
    const senderPublicKey = account.keys.publicKey;
    const senderPrivateKey = decryptAES(account.keys.signPrivateKey, hashSHA256(state.auth.passcode));

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
