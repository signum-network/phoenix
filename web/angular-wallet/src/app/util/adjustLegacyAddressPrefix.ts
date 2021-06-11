import {AddressPrefix, Account} from '@signumjs/core';

// TODO: this is just a bad quick-fix - remove in the future when Signum has been stabilized
export function adjustLegacyAddressPrefix(account: Account, isMainNet = true): Account {
  const OldPrefix = 'BURST';
  const NewPrefix = isMainNet ? AddressPrefix.MainNet : AddressPrefix.TestNet;
  if (account.accountRS.startsWith(OldPrefix)) {
    account.accountRS = account.accountRS.replace(OldPrefix, NewPrefix);
  }

  if (account.accountRSExtended.startsWith(OldPrefix)) {
    account.accountRS = account.accountRSExtended.replace(OldPrefix, NewPrefix);
  }

  return account;
}
