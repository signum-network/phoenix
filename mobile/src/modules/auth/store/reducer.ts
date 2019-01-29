import { Account } from '@burstjs/core';
import { Reducer } from '../../../core/interfaces';
import { createReducers } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';

export interface AuthReduxState {
  accounts: Account[];
}

export const authState = (): AuthReduxState => {
  return {
    accounts: []
  };
};

const addAccount: Reducer<AuthReduxState, Account> = (state, action) => {
  const accounts = [ ...state.accounts, action.payload ];
  return {
    ...state,
    accounts
  };
};

const removeAccount: Reducer<AuthReduxState, Account> = (state, action) => {
  const accounts = state.accounts.filter((item: Account) => item.id === action.payload.id);
  return {
    ...state,
    accounts
  };
};

const loadAccounts: Reducer<AuthReduxState, Account[]> = (state, action) => {
  const accounts = action.payload;
  return {
    ...state,
    accounts
  };
};

const reducers = {
  [actionTypes.addAccount]: addAccount,
  [actionTypes.removeAccount]: removeAccount,
  [actionTypes.loadAccounts]: loadAccounts
};

export const auth = createReducers(authState(), reducers);
