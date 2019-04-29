import { TransactionId } from '@burstjs/core';
import { AsyncParticleStates } from '../../../core/enums';
import { AsyncParticle, Reducer } from '../../../core/interfaces';
import { initAsyncParticle } from '../../../core/utils/async';
import { createReducers } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';

export interface TransactionsReduxState {
  sendMoney: AsyncParticle<TransactionId>
}

export const transactionsState = (): TransactionsReduxState => {
  return {
    sendMoney: initAsyncParticle<TransactionId>()
  };
};

type TransactionsReducer<T> = Reducer<TransactionsReduxState, T>;

// TODO: make helper for simple data-loading things
const sendMoney: TransactionsReducer<void> = (state, _action) => {
  return {
    ...state,
    sendMoney: {
      ...state.sendMoney,
      state: AsyncParticleStates.LOADING
    }
  };
};

const sendMoneySuccess: TransactionsReducer<TransactionId> = (state, action) => {
  return {
    ...state,
    sendMoney: {
      ...state.sendMoney,
      data: action.payload,
      state: AsyncParticleStates.SUCCESS,
      error: null
    }
  };
};

const sendMoneyFailed: TransactionsReducer<Error> = (state, action) => {
  return {
    ...state,
    sendMoney: {
      ...state.sendMoney,
      state: AsyncParticleStates.FAILED,
      error: action.payload
    }
  };
};

const reducers = {
  [actionTypes.sendMoney]: sendMoney,
  [actionTypes.sendMoneySuccess]: sendMoneySuccess,
  [actionTypes.sendMoneyFailed]: sendMoneyFailed
};

export const transactions = createReducers(transactionsState(), reducers);
