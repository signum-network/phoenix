import {Api} from '@signumjs/core';
import {ApplicationState} from '../initialState';

export const selectCurrentNode = (state: ApplicationState): string => state.app.appSettings.apiSettings.nodeHost;
export const selectIsAutomaticNodeSelection = (state: ApplicationState): boolean => state.app.appSettings.isAutomaticNodeSelection;
export const selectChainApi = (state: ApplicationState): Api => {
    return state.app.chainApi;
};
