import { Account, sendMoney as send, Transaction, TransactionId } from '@burstjs/core';
import { decryptAES, hashSHA256 } from '@burstjs/crypto';
import { createAction, createActionFn } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';

const actions = {
  sendMoney: createAction<SendMoneyPayload>(actionTypes.sendMoney),
  sendMoneySuccess: createAction<TransactionId>(actionTypes.sendMoneySuccess),
  sendMoneyFailed: createAction<Error>(actionTypes.sendMoneyFailed)
};

export interface SendMoneyPayload {
  address: string;
  amount: string;
  fee: string;
  attachment?: any;
  sender: Account;
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
