import { createAction, createActionFn } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';

const actions = {
  fetchPriceInfo: createAction<void>(actionTypes.fetchPriceInfo)
};

export const loadCMCData = createActionFn<void, Promise<void>>(
  async (dispatch, _getState) => {
    console.log('in cmc data');
    dispatch(actions.fetchPriceInfo());
  }
);
