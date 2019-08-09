import { defaultSettings } from '../../../core/environment';
import { createAction, createActionFn } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';
import { PriceInfoReduxState } from './reducer';

const actions = {
  updatePriceInfo: createAction<PriceInfoReduxState>(actionTypes.updatePriceInfo)
};

export const loadCMCData = createActionFn<void, Promise<void>>(
  async (dispatch, _getState) => {
    const response = await fetch(defaultSettings.coinMarketCapURL);
    const updatedPriceInfo = await response.json();
    if (updatedPriceInfo.length) {
      dispatch(actions.updatePriceInfo(updatedPriceInfo[0]));
    }
  }
);
