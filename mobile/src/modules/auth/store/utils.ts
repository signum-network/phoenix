import { Account } from '@burstjs/core';
import { isEmpty } from 'lodash';
import { KeyChainKeys } from '../../../core/enums';
import { KeychainCredentials } from '../../../core/interfaces';
import { getCredentials, setCredentials } from '../../../core/utils/keychain';

export function isPassphraseCorrect (passphrase: string): boolean {
  // TODO: more checks, move to @burst package?
  return passphrase.split(' ').length === 12;
}

export function savePasscode (passcode: string): Promise<boolean> {
  const data = JSON.stringify(passcode);
  return setCredentials({ username: KeyChainKeys.passcode, password: data }, KeyChainKeys.passcode);
}

export async function getPasscode (): Promise<string> {
  const credentials: KeychainCredentials = await getCredentials(KeyChainKeys.passcode) as KeychainCredentials;
  if (credentials && credentials.password) {
    return JSON.parse(credentials.password);
  } else {
    return '';
  }
}

export function setAccounts (accounts: Account[]): Promise<boolean> {
  const data = JSON.stringify(accounts);
  return setCredentials({ username: KeyChainKeys.accounts, password: data }, KeyChainKeys.accounts);
}

export async function getAccounts (): Promise<Account[]> {
  const credentials: KeychainCredentials = await getCredentials(KeyChainKeys.accounts) as KeychainCredentials;
  if (credentials && credentials.password) {
    return JSON.parse(credentials.password);
  } else {
    return [];
  }
}

export function savePasscodeEnteredTime (time: number): Promise<boolean> {
  const data = JSON.stringify(time);
  return setCredentials(
    { username: KeyChainKeys.passcodeEnteredTime, password: data },
    KeyChainKeys.passcodeEnteredTime
  );
}

export async function getPasscodeEnteredTime (): Promise<number> {
  const credentials: KeychainCredentials =
    await getCredentials(KeyChainKeys.passcodeEnteredTime) as KeychainCredentials;
  if (credentials && credentials.password) {
    return JSON.parse(credentials.password);
  } else {
    return 0;
  }
}

export function shouldEnterPIN (passcodeTime: number, lastTimeEntered: number): boolean {
  return lastTimeEntered + passcodeTime <= Date.now();
}

export function isPasscodeSet (passcode: string): boolean {
  return !isEmpty(passcode);
}
