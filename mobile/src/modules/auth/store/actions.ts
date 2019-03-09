import { Account } from '@burstjs/core';
import {
  encryptAES,
  generateMasterKeys,
  getAccountIdFromBurstAddress,
  getAccountIdFromPublicKey,
  getBurstAddressFromAccountId,
  hashSHA256
} from '@burstjs/crypto';
import { isValid } from '@burstjs/util';
import { some } from 'lodash';
import { i18n } from '../../../core/i18n';
import { createAction, createActionFn } from '../../../core/utils/store';
import { auth } from '../translations';
import { actionTypes } from './actionTypes';
import { getAccounts, isPassphraseCorrect, setAccounts } from './utils';

const actions = {
  addAccount: createAction<Account>(actionTypes.addAccount),
  removeAccount: createAction<Account>(actionTypes.removeAccount),
  loadAccounts: createAction<Account[]>(actionTypes.loadAccounts)
};

export interface ActiveAccountGeneratorData {
  phrase: any[];
  pin: string;
}

export const createActiveAccount = createActionFn<ActiveAccountGeneratorData, Account>(
  (_dispatch, getState, { phrase, pin }): Account => {
    const passphrase = phrase.join(' ');
    if (!isPassphraseCorrect(passphrase)) {
      throw new Error(i18n.t(auth.errors.incorrectPassphrase));
    }

    const keys = generateMasterKeys(passphrase);
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
    const pinHash = hashSHA256(pin + keys.publicKey);

    // TODO: make fields optional in @burst package
    // @ts-ignore
    return {
      id,
      address,
      type: 'active', // TODO: make type enum in @burst package
      keys: encryptedKeys,
      pinHash
    };
  }
);

export const createOfflineAccount = createActionFn<string, Account>(
  (_dispatch, getState, address): Account => {
    if (!isValid(address)) {
      throw new Error(i18n.t(auth.errors.incorrectAddress));
    }
    const id = getAccountIdFromBurstAddress(address);
    const hasAccount = some(getState().auth.accounts, (item) => item.id === id);

    if (hasAccount) {
      throw new Error(i18n.t(auth.errors.accountExist));
    }

    // TODO: make fields optional in @burst package
    // @ts-ignore
    return {
      type: 'offline', // TODO: make type enum in @burst package
      address,
      id
    };
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
  async (dispatch, _getState) => {
    const accounts: Account[] = await getAccounts();
    dispatch(actions.loadAccounts(accounts));
  }
);
