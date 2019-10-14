import { Account, ApiSettings, composeApi, AliasList, Alias } from '@burstjs/core';
import { encryptAES, generateMasterKeys, getAccountIdFromPublicKey, hashSHA256 } from '@burstjs/crypto';
import { convertAddressToNumericId, convertNumericIdToAddress, isValid } from '@burstjs/util';
import { some } from 'lodash';
import { AsyncStorage } from 'react-native';
import { AsyncStorageKeys } from '../../../core/enums';
import { i18n } from '../../../core/i18n';
import { createAction, createActionFn } from '../../../core/utils/store';
import { auth } from '../translations';
import { actionTypes } from './actionTypes';
import {
  getAccounts,
  getAgreeToTerms,
  getPasscode,
  getPasscodeEnteredTime,
  isPassphraseCorrect,
  savePasscode,
  savePasscodeEnteredTime,
  setAccounts
} from './utils';

const actions = {
  addAccount: createAction<Account>(actionTypes.addAccount),
  getAccount: createAction<string>(actionTypes.getAccount),
  updateAccount: createAction<Account>(actionTypes.updateAccount),
  removeAccount: createAction<Account>(actionTypes.removeAccount),
  loadAccounts: createAction<Account[]>(actionTypes.loadAccounts),
  loadPasscodeEnteredTime: createAction<number>(actionTypes.loadPasscodeEnteredTime),
  setPasscodeEnteredTime: createAction<number>(actionTypes.setPasscodeEnteredTime),
  setPasscode: createAction<string>(actionTypes.setPasscode),
  setAgreeToTerms: createAction<boolean>(actionTypes.setAgreeToTerms),
  loadPasscode: createAction<string>(actionTypes.loadPasscode),
  loadAgreeToTerms: createAction<boolean>(actionTypes.loadAgreeToTerms),
  resetAuthState: createAction<void>(actionTypes.resetAuthState)
};

export const createActiveAccount = createActionFn<string[], Account>(
  // @ts-ignore
  async (_dispatch, getState, phrase): Promise<Account> => {

    const pin = getState().auth.passcode;
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
    const state = getState();
    const { nodeHost, apiRootUrl } = state.app.burstService.settings;

    // TODO: unify network request actions, add proper error handling and so on
    const api = composeApi(new ApiSettings(nodeHost, apiRootUrl));
    try {
      const accountDetails = await api.account.getAccount(account.account);
      dispatch(actions.updateAccount(accountDetails));
      dispatch(updateAccountTransactions(accountDetails));
    // tslint:disable-next-line: no-empty
    } catch (e) {}

    await setAccounts(getState().auth.accounts);
    return account;
  }
);

export const getAccount = createActionFn<string, Promise<Account | undefined>>(
  async (_dispatch, getState, account) => {

    const state = getState();
    const { nodeHost, apiRootUrl } = state.app.burstService.settings;
    // TODO: unify network request actions, add proper error handling and so on
    const api = composeApi(new ApiSettings(nodeHost, apiRootUrl));
    try {
      const accountDetails = await api.account.getAccount(account);
      return accountDetails;
    // tslint:disable-next-line: no-empty
    } catch (e) {}
  }
);

export const getAlias = createActionFn<string, Promise<Alias | undefined>>(
  async (_dispatch, getState, account) => {

    const state = getState();
    const { nodeHost, apiRootUrl } = state.app.burstService.settings;
    // TODO: unify network request actions, add proper error handling and so on
    const api = composeApi(new ApiSettings(nodeHost, apiRootUrl));
    try {
      const alias = await api.alias.getAliasByName(account);
      return alias;
    // tslint:disable-next-line: no-empty
    } catch (e) {}
  }
);

export const updateAccountTransactions = createActionFn<Account, Promise<Account>>(
    async (dispatch, getState, account) => {
      const state = getState();
      const { nodeHost, apiRootUrl } = state.app.burstService.settings;

      const updatedAccount: Account = {
        ...account
      };
      const api = composeApi(new ApiSettings(nodeHost, apiRootUrl));
      try {
        const transactions = await api.account.getAccountTransactions(account.account);
        updatedAccount.transactions = transactions.transactions;
        dispatch(actions.updateAccount(updatedAccount));
      // tslint:disable-next-line: no-empty
      } catch (e) {}

      await setAccounts(getState().auth.accounts);
      return updatedAccount;
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

export const resetAuthState = createActionFn<void, Promise<void>>(
  async (dispatch, _getState) => {
    dispatch(actions.resetAuthState());
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

export const setAgreeToTerms = createActionFn<boolean, Promise<void>>(
  async (dispatch, _getState, agree) => {
    try {
      await AsyncStorage.setItem(AsyncStorageKeys.agreeToTerms, JSON.stringify(agree));
    } catch (error) {
      // Error saving data
    }
    dispatch(actions.setAgreeToTerms(agree));
  }
);

export const loadPasscode = createActionFn<void, Promise<void>>(
  async (dispatch, _getState) => {
    const passcode = await getPasscode();
    dispatch(actions.loadPasscode(passcode));
  }
);

export const loadAgreeToTerms = createActionFn<void, Promise<void>>(
  async (dispatch, _getState) => {
    const agree = await getAgreeToTerms();
    dispatch(actions.setAgreeToTerms(agree));
  }
);
