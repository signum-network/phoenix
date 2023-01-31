import {ApplicationState} from '../../../core/store/initialState';
import {Account} from '@signumjs/core';
export const selectAccounts = (state: ApplicationState): Account[] =>
  state.auth.accounts || [];
export const selectPasscode = (state: ApplicationState): string =>
  state.auth.passcode;
export const selectIsPasscodeModalVisible = (
  state: ApplicationState,
): boolean => state.auth.passcodeModalVisible;
export const selectAccount =
  (accountId: string) =>
  (state: ApplicationState): Account | undefined => {
    const accounts = state.auth.accounts || [];
    return accounts.find(a => a.account === accountId);
  };
