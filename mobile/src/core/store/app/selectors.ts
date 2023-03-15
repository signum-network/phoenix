import {Api} from '@signumjs/core';
import {ApplicationState} from '../initialState';

export const selectCurrentNode = (state: ApplicationState): string =>
  state.app.userSettings.currentNodeHost ||
  state.app.appSettings.apiSettings.nodeHost;
export const selectIsAutomaticNodeSelection = (
  state: ApplicationState,
): boolean => state.app.userSettings.isAutomaticNodeSelection || false;
export const selectAgreedToTerms = (state: ApplicationState): boolean =>
  state.app.userSettings.agreedToTerms || false;
export const selectChainApi = (state: ApplicationState): Api => {
  return state.app.chainApi;
};
