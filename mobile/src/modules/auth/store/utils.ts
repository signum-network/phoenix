import { Account } from '@signumjs/core';
import { KeyChainKeys } from '../../../core/enums';
import { KeychainCredentials } from '../../../core/interfaces';
import { getCredentials, setCredentials } from '../../../core/utils/keychain';

export function savePasscode (passcode: string): Promise<any> {
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
  const accountsWithoutTransactions = accounts.map((account) => {
    return {
      ...account,
      transactions: []
    };
  });
  const data = JSON.stringify(accountsWithoutTransactions);
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

export function resetKeychain (): Promise<boolean[]> {
  return Promise.all([
    setCredentials({ username: KeyChainKeys.passcodeEnteredTime, password: JSON.stringify(0) },
      KeyChainKeys.passcodeEnteredTime),
    setCredentials({ username: KeyChainKeys.accounts, password: JSON.stringify([]) },
      KeyChainKeys.accounts)
  ]);
}

// TODO: seems that this is not necessary at all
export async function getPasscodeEnteredTime (): Promise<number> {
  const credentials: KeychainCredentials =
    await getCredentials(KeyChainKeys.passcodeEnteredTime) as KeychainCredentials;
  if (credentials && credentials.password) {
    return JSON.parse(credentials.password);
  } else {
    return 0;
  }
}
