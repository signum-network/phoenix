import { TransactionId } from '@burstjs/core';
import { AsyncParticle } from '../../../core/interfaces';
import { initAsyncParticle } from '../../../core/utils/async';
import { createAsyncParticleReducers, createReducers } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';

export interface TransactionsReduxState {
  sendMoney: AsyncParticle<TransactionId>
}

export const transactionsState = (): TransactionsReduxState => {
  return {
    sendMoney: initAsyncParticle<TransactionId>()
  };
};

const sendMoney =
  createAsyncParticleReducers<TransactionsReduxState, void, TransactionId, Error>('sendMoney');

const reducers = {
  [actionTypes.sendMoney]: sendMoney.begin,
  [actionTypes.sendMoneySuccess]: sendMoney.success,
  [actionTypes.sendMoneyFailed]: sendMoney.failed
};

export const transactions = createReducers(transactionsState(), reducers);
