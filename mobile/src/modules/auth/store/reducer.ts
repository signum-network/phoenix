import { Account } from '@burstjs/core';
import { Reducer } from '../../../core/interfaces';
import { createReducers } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';

export interface AuthReduxState {
  accounts: Account[];
  passcodeEnteredTime: number;
  passcode: string;
}

export const authState = (): AuthReduxState => {
  return {
    accounts: [],
    passcodeEnteredTime: 0,
    passcode: ''
  };
};

const addAccount: Reducer<AuthReduxState, Account> = (state, action) => {
  const accounts = [ ...state.accounts, action.payload ];
  return {
    ...state,
    accounts
  };
};

const updateAccount: Reducer<AuthReduxState, Account> = (state, action) => {
  const account = action.payload;
  const accounts = state.accounts.map((existingAccount) => {
    if (existingAccount.account === account.account) {
      return account;
    } else {
      return existingAccount;
    }
  });
  return {
    ...state,
    accounts
  };
};

const removeAccount: Reducer<AuthReduxState, Account> = (state, action) => {
  const accounts = state.accounts.filter((item: Account) => item.account !== action.payload.account);
  return {
    ...state,
    accounts
  };
};

const resetAuthState: Reducer<AuthReduxState, Account> = (_state) => {
  return authState();
};

const loadAccounts: Reducer<AuthReduxState, Account[]> = (state, action) => {
  const accounts = action.payload;
  return {
    ...state,
    accounts
  };
};

const loadPasscodeEnteredTime: Reducer<AuthReduxState, number> = (state, action) => {
  const time = action.payload;
  return {
    ...state,
    passcodeEnteredTime: time
  };
};

const setPasscodeEnteredTime: Reducer<AuthReduxState, number> = (state, action) => {
  const time = action.payload;
  return {
    ...state,
    passcodeEnteredTime: time
  };
};

const loadPasscode: Reducer<AuthReduxState, string> = (state, action) => {
  const passcode = action.payload;
  return {
    ...state,
    passcode
  };
};

const reducers = {
  [actionTypes.addAccount]: addAccount,
  [actionTypes.updateAccount]: updateAccount,
  [actionTypes.removeAccount]: removeAccount,
  [actionTypes.loadAccounts]: loadAccounts,
  [actionTypes.loadPasscodeEnteredTime]: loadPasscodeEnteredTime,
  [actionTypes.setPasscodeEnteredTime]: setPasscodeEnteredTime,
  [actionTypes.loadPasscode]: loadPasscode,
  [actionTypes.resetAuthState]: resetAuthState
};

export const auth = createReducers(authState(), reducers);
