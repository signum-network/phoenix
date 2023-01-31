import {SuggestedFees} from '@signumjs/core';
import {createAction, createActionFn} from '../../../core/utils/store';
import {actionTypes} from './actionTypes';
import {selectChainApi} from '../../../core/store/app/selectors';

const actions = {
  getSuggestedFees: createAction(actionTypes.getSuggestedFees),
};

export const getSuggestedFees = createActionFn<
  void,
  Promise<SuggestedFees | undefined>
>(async (dispatch, getState) => {
  // const state = getState();
  //
  // const { nodeHost, apiRootUrl } = state.app.chainService.settings;
  //   composeApi(new ApiSettings(nodeHost, apiRootUrl));
  // TODO: unify network request actions, add proper error handling and so on
  const chainApi = selectChainApi(getState());
  try {
    const suggestedFees = await chainApi.network.getSuggestedFees();
    dispatch(actions.getSuggestedFees(suggestedFees));
    return suggestedFees;
    // tslint:disable-next-line: no-empty
  } catch (e) {}
});
