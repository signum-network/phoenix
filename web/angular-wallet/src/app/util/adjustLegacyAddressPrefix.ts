import {AddressPrefix} from '@signumjs/core';
import { WalletAccount } from './WalletAccount';

// TODO: this is just a bad quick-fix - remove in the future when Signum has been stabilized
export function adjustLegacyAddressPrefix(account: WalletAccount, isMainNet = true): WalletAccount {
  const OldPrefix = 'BURST';
  const NewPrefix = isMainNet ? AddressPrefix.MainNet : AddressPrefix.TestNet;
  if (account.accountRS.startsWith(OldPrefix)) {
    account.accountRS = account.accountRS.replace(OldPrefix, NewPrefix);
  }

  if (account.accountRSExtended && account.accountRSExtended.startsWith(OldPrefix)) {
    account.accountRSExtended = account.accountRSExtended.replace(OldPrefix, NewPrefix);
  }

  return account;
}
