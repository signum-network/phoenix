import { Account, getAccount, composeApi, ApiSettings } from '@burstjs/core';
import {
  encryptAES,
  generateMasterKeys,
  getAccountIdFromPublicKey,
  hashSHA256
} from '@burstjs/crypto';
import { convertAddressToNumericId, convertNumericIdToAddress, isValid } from '@burstjs/util';
import { some } from 'lodash';
import { i18n } from '../../../core/i18n';
import { createAction, createActionFn } from '../../../core/utils/store';
import { auth } from '../translations';
import { actionTypes } from './actionTypes';
import {
  getAccounts, getPasscode,
  getPasscodeEnteredTime,
  isPassphraseCorrect, savePasscode,
  savePasscodeEnteredTime,
  setAccounts
} from './utils';

const actions = {
  addAccount: createAction<Account>(actionTypes.addAccount),
  updateAccount: createAction<Account>(actionTypes.updateAccount),
  removeAccount: createAction<Account>(actionTypes.removeAccount),
  loadAccounts: createAction<Account[]>(actionTypes.loadAccounts),
  loadPasscodeEnteredTime: createAction<number>(actionTypes.loadPasscodeEnteredTime),
  setPasscodeEnteredTime: createAction<number>(actionTypes.setPasscodeEnteredTime),
  setPasscode: createAction<string>(actionTypes.setPasscode),
  loadPasscode: createAction<string>(actionTypes.loadPasscode)
};

export interface ActiveAccountGeneratorData {
  phrase: any[];
  pin: string;
}

export const createActiveAccount = createActionFn<ActiveAccountGeneratorData, Account>(
  // @ts-ignore
  async (_dispatch, getState, { phrase, pin }): Promise<Account> => {
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
    const account = getAccountIdFromPublicKey(keys.publicKey);
    const hasAccount = some(getState().auth.accounts, (item) => item.account === account);

    if (hasAccount) {
      throw new Error(i18n.t(auth.errors.accountExist));
    }
    const accountRS = convertNumericIdToAddress(account);
    const pinHash = hashSHA256(pin + keys.publicKey);

    setPasscode(pin);

    // TODO: make fields optional in @burst package
    return new Account({
      account,
      accountRS,
      type: 'active', // TODO: make type enum in @burst package
      keys: encryptedKeys,
      pinHash
    });
  }
);

export const createOfflineAccount = createActionFn<string, Account>(
  (_dispatch, getState, accountRS): Account => {
    if (!isValid(accountRS)) {
      throw new Error(i18n.t(auth.errors.incorrectAddress));
    }
    const account = convertAddressToNumericId(accountRS);
    const hasAccount = some(getState().auth.accounts, (item) => item.account === account);

    if (hasAccount) {
      throw new Error(i18n.t(auth.errors.accountExist));
    }

    // TODO: make fields optional in @burst package
    return new Account({
      type: 'offline', // TODO: make type enum in @burst package
      account,
      accountRS
    });
  }
);

export const hydrateAccount = createActionFn<Account, Promise<Account>>(
  async (dispatch, getState, account) => {

    const api = composeApi(new ApiSettings('https://wallet1.burst-team.us:2083', 'burst'));
    try {
      const accountDetails = await api.account.getAccount(account.account);
      dispatch(actions.updateAccount(accountDetails));
    // @ts-ignore
    } catch (e) { }

    await setAccounts(getState().auth.accounts);
    return account;
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

export const loadPasscodeEnteredTime = createActionFn<void, Promise<void>>(
  async (dispatch, _getState) => {
    const time = await getPasscodeEnteredTime();
    dispatch(actions.loadPasscodeEnteredTime(time));
  }
);

export const setPasscodeEnteredTime = createActionFn<number, Promise<void>>(
  async (dispatch, _getState, time) => {
    dispatch(actions.setPasscodeEnteredTime(time));
    await savePasscodeEnteredTime(time);
  }
);

export const setPasscode = createActionFn<string, Promise<void>>(
  async (dispatch, _getState, passcode) => {
    dispatch(actions.setPasscode(passcode));
    await savePasscode(passcode);
  }
);

export const loadPasscode = createActionFn<void, Promise<void>>(
  async (dispatch, _getState) => {
    const passcode = await getPasscode();
    dispatch(actions.loadPasscode(passcode));
  }
);
