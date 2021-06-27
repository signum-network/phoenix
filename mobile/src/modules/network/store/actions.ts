import { ApiSettings, composeApi, SuggestedFees } from '@burstjs/core';
import { createAction, createActionFn } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';

const actions = {
  getSuggestedFees: createAction(actionTypes.getSuggestedFees)
};

export const getSuggestedFees = createActionFn<void, Promise<SuggestedFees | undefined>>(
  async (dispatch, getState) => {

    const state = getState();
    const { nodeHost, apiRootUrl } = state.app.chainService.settings;
    // TODO: unify network request actions, add proper error handling and so on
    const api = composeApi(new ApiSettings(nodeHost, apiRootUrl));
    try {
      const suggestedFees = await api.network.suggestFee();
      dispatch(actions.getSuggestedFees(suggestedFees));
      return suggestedFees;
    // tslint:disable-next-line: no-empty
    } catch (e) {}
  }
);
