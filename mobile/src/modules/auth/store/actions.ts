import {Account, Alias, ApiSettings, composeApi} from '@burstjs/core';
import {encryptAES, generateMasterKeys, getAccountIdFromPublicKey, hashSHA256} from '@burstjs/crypto';
import {convertAddressToNumericId, convertNumericIdToAddress, isValid} from '@burstjs/util';
import {some} from 'lodash';
import {AsyncStorage} from 'react-native';
import {AsyncStorageKeys} from '../../../core/enums';
import {i18n} from '../../../core/i18n';
import {createAction, createActionFn} from '../../../core/utils/store';
import {auth} from '../translations';
import {actionTypes} from './actionTypes';
import {
    getAccounts,
    getAgreeToTerms,
    getPasscode,
    getPasscodeEnteredTime,
    resetKeychain,
    savePasscode,
    savePasscodeEnteredTime,
    setAccounts
} from './utils';
import {AmountPrefix} from '../../../core/utils/numbers';
import {trimAddressPrefix} from '../../../core/utils/account';
import {Address} from '@signumjs/core';

interface ZilResponse {
    addresses: {
        BURST: string
    };
    meta: {
        owner: string;
        ttl: number;
    };
}

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

export const createActiveAccount = createActionFn<string, Account>(
    // @ts-ignore
    async (_dispatch, getState, phrase): Promise<Account> => {

        const pin = getState().auth.passcode;
        const keys = generateMasterKeys(phrase);
        const encryptedKeys = {
            publicKey: keys.publicKey,
            agreementPrivateKey: encryptAES(keys.agreementPrivateKey, hashSHA256(pin)),
            signPrivateKey: encryptAES(keys.signPrivateKey, hashSHA256(pin))
        };

        const address = Address.fromPublicKey(keys.publicKey);
        const hasAccount = some(getState().auth.accounts, (item) => item.account === address.getNumericId());

        if (hasAccount) {
            throw new Error(i18n.t(auth.errors.accountExist));
        }
        const pinHash = hashSHA256(pin + keys.publicKey);

        return new Account({
            type: 'active',
            account: address.getNumericId(),
            accountRS: address.getReedSolomonAddress(),
            keys: encryptedKeys,
            pinHash
        });
    }
);


export const createOfflineAccount = createActionFn<string, Account>(
    (_dispatch, getState, accountRS): Account => {

        let address: Address;
        try {
            address = Address.fromReedSolomonAddress(accountRS);
        } catch (e) {
            throw new Error(i18n.t(auth.errors.incorrectAddress));
        }

        const hasAccount = some(getState().auth.accounts, (item) => item.account === address.getNumericId());
        if (hasAccount) {
            throw new Error(i18n.t(auth.errors.accountExist));
        }
        return new Account({
            type: 'offline',
            account: address.getNumericId(),
            accountRS: address.getReedSolomonAddress(),
        });
    }
);

export const hydrateAccount = createActionFn<Account, Promise<Account>>(
    async (dispatch, getState, account) => {
        const state = getState();
        const {nodeHost} = state.app.chainService.settings;
        console.log(nodeHost);

        // TODO: unify network request actions, add proper error handling and so on
        const api = composeApi(new ApiSettings(nodeHost));
        try {
            const accountDetails = await api.account.getAccount(account.account);
            console.log('Got account', accountDetails);
            dispatch(actions.updateAccount(accountDetails));
            dispatch(updateAccountTransactions(accountDetails));
            // tslint:disable-next-line: no-empty
        } catch (e) {
            console.error('Something failed', e);
        }

        await setAccounts(getState().auth.accounts);
        return account;
    }
);

export const getAccount = createActionFn<string, Promise<Account | undefined>>(
    async (_dispatch, getState, account) => {

        const state = getState();
        const {nodeHost, apiRootUrl} = state.app.chainService.settings;
        // TODO: unify network request actions, add proper error handling and so on
        const api = composeApi(new ApiSettings(nodeHost, apiRootUrl));
        try {
            const accountDetails = await api.account.getAccount(account);
            return accountDetails;
            // tslint:disable-next-line: no-empty
        } catch (e) {
        }
    }
);

export const getAlias = createActionFn<string, Promise<Alias | undefined>>(
    async (_dispatch, getState, account) => {

        const state = getState();
        const {nodeHost, apiRootUrl} = state.app.chainService.settings;
        // TODO: unify network request actions, add proper error handling and so on
        const api = composeApi(new ApiSettings(nodeHost, apiRootUrl));
        try {
            const alias = await api.alias.getAliasByName(account);
            return alias;
            // tslint:disable-next-line: no-empty
        } catch (e) {
        }
    }
);

export const getZilAddress = createActionFn<string, Promise<string | null>>(
    async (_dispatch, _getState, address) => {
        return fetch(`https://unstoppabledomains.com/api/v1/${address.toLowerCase()}`)
            .then((response) => response.json())
            .then((response: ZilResponse) => {
                return response.addresses.BURST;
            });
    }
);

export const updateAccountTransactions = createActionFn<Account, Promise<Account>>(
    async (dispatch, getState, account) => {
        const state = getState();
        const {nodeHost, apiRootUrl} = state.app.chainService.settings;

        const updatedAccount: Account = {
            ...account
        };
        const api = composeApi(new ApiSettings(nodeHost, apiRootUrl));
        try {
            const transactions = await api.account.getAccountTransactions(
                account.account,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                true
            );
            updatedAccount.transactions = transactions.transactions;
            dispatch(actions.updateAccount(updatedAccount));
            // tslint:disable-next-line: no-empty
        } catch (e) {
        }

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
        // tslint:disable-next-line: max-line-length
        // fetch(`https://burstalerts.com/api/v1/unsubscribe/${removeAccountPayload.deviceId}/${removeAccountPayload.account.accountRS}`);
        dispatch(actions.removeAccount(account));
        await setAccounts(getState().auth.accounts);
        return;
    }
);

export const loadAccounts = createActionFn<void, Promise<void>>(
    async (dispatch, _getState) => {
        const accounts: Account[] = await getAccounts();
        accounts.map((account) => hydrateAccount(account));
        dispatch(actions.loadAccounts(accounts));
    }
);

export const resetAuthState = createActionFn<void, Promise<void>>(
    async (dispatch, _getState) => {
        resetKeychain();
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

        // reset the redux store
        dispatch(loadPasscode());
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
