import { Account } from '@burstjs/core';
import {
  encryptAES,
  generateMasterKeys,
  getAccountIdFromBurstAddress,
  getAccountIdFromPublicKey,
  getBurstAddressFromAccountId,
  hashSHA256,
  BurstUtil
} from '@burstjs/crypto';
import { some } from 'lodash';
import { ThunkAction } from '../../../core/interfaces';
import { i18n } from '../../../core/localization/i18n';
import { createAction, createActionFn } from '../../../core/utils/store';
import { auth } from '../translations';
import { actionTypes } from './actionTypes';
import { getAccounts, setAccounts } from './utils';

const actions = {
  addAccount: createAction<Account>(actionTypes.addAccount),
  removeAccount: createAction<Account>(actionTypes.removeAccount),
  loadAccounts: createAction<Account[]>(actionTypes.loadAccounts)
};

export interface ActiveAccountGeneratorData {
  phrase: any[];
  pin: string;
}

export const createActiveAccount = createActionFn<ActiveAccountGeneratorData, ThunkAction<Promise<Account>>>(
  (dispatch, getState, { phrase, pin }) => {
    const type = 'active';
    const keys = generateMasterKeys(phrase.join(' '));
    const encryptedKeys = {
      publicKey: keys.publicKey,
      agreementPrivateKey: encryptAES(keys.agreementPrivateKey, hashSHA256(pin)),
      signPrivateKey: encryptAES(keys.signPrivateKey, hashSHA256(pin))
    };
    const id = getAccountIdFromPublicKey(keys.publicKey);
    const hasAccount = some(getState().auth.accounts, (item) => item.id === id);

    if (hasAccount) {
      throw new Error(i18n.t(auth.errors.accountExist));
    }
    const address = getBurstAddressFromAccountId(id);

    const account: Account = {
      id,
      address,
      type,
      keys: encryptedKeys,
      pinHash: hashSHA256(pin + keys.publicKey)
    };
    return dispatch(addAccount(account));
  }
);

export const createOfflineAccount = createActionFn<string, ThunkAction<Promise<Account>>>(
  (dispatch, getState, address) => {
    if (!BurstUtil.isValid(address)) {
      throw new Error(i18n.t(auth.errors.incorrectAddress));
    }
    const id = BurstUtil.decode(address);
    const hasAccount = some(getState().auth.accounts, (item) => item.id === id);

    if (hasAccount) {
      throw new Error(i18n.t(auth.errors.accountExist));
    }
    const account: any = {
      type: 'offline',
      address,
      id: getAccountIdFromBurstAddress(address)
    };

    return dispatch(addAccount(account));
  }
);

export const addAccount = createActionFn<Account, Promise<Account>>(
  async (dispatch, getState, account) => {
    dispatch(actions.addAccount(account));
    await setAccounts(getState().auth.accounts);
    return account;
  }
);

export const removeAccount = createActionFn<Account, Promise<void>>(
  async (dispatch, getState, account) => {
    dispatch(actions.removeAccount(account));
    await setAccounts(getState().auth.accounts);
    return;
  }
);

export const loadAccounts = createActionFn<void, Promise<void>>(
  async (dispatch, getState) => {
    const accounts: Account[] = await getAccounts();
    dispatch(actions.loadAccounts(accounts));
  }
);
