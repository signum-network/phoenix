import { Account } from '@burstjs/core';
import { KeyChainKeys } from '../../../core/enums';
import { KeychainCredentials } from '../../../core/interfaces';
import { getCredentials, setCredentials } from '../../../core/utils/keychain';

export function isPassphraseCorrect (passphrase: string): boolean {
  // TODO: more checks, move to @burst package?
  return passphrase.split(' ').length === 12;
}

export function setPasscode (passcode: string): Promise<boolean> {
  return setCredentials({ username: KeyChainKeys.passcode, password: passcode }, KeyChainKeys.passcode);
}

export async function getPasscode (): Promise<string | null> {
  const credentials: KeychainCredentials = await getCredentials(KeyChainKeys.passcode) as KeychainCredentials;
  if (credentials && credentials.password) {
    return credentials.password;
  } else {
    return null;
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
