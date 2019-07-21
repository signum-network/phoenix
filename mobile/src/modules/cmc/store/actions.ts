import { defaultSettings } from '../../../core/environment';
import { createAction, createActionFn } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';

const actions = {
  updatePriceInfo: createAction<void>(actionTypes.updatePriceInfo)
};

export const loadCMCData = createActionFn<void, Promise<void>>(
  async (dispatch, _getState) => {
    console.log('in fetch price info');
    const response = await fetch(defaultSettings.coinMarketCapURL);
    const updatedPriceInfo = await response.json();
    console.log(updatedPriceInfo);
    if (updatedPriceInfo.length) {
      dispatch(actions.updatePriceInfo(updatedPriceInfo[0]));
    }
  }
);
