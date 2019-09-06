import { defaultSettings } from '../../../core/environment';
import { createAction, createActionFn } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';
import { HistoricalPriceInfo, PriceInfo } from './reducer';

const actions = {
  updatePriceInfo: createAction<PriceInfo>(actionTypes.updatePriceInfo),
  updateHistoricalPriceInfo: createAction<HistoricalPriceInfo>(actionTypes.updateHistoricalPriceInfo)
};

export const loadPriceApiData = createActionFn<void, Promise<void>>(
  async (dispatch, _getState) => {
    const response = await fetch(defaultSettings.coinMarketCapURL);
    const updatedPriceInfo = await response.json();
    if (updatedPriceInfo.length) {
      dispatch(actions.updatePriceInfo(updatedPriceInfo[0]));
    }
  }
);

export const loadHistoricalPriceApiData = createActionFn<void, Promise<void>>(
  async (dispatch, _getState) => {
    const response = await fetch(defaultSettings.cryptoCompareURL);
    const updatedPriceInfo = await response.json();
    if (updatedPriceInfo.Data && updatedPriceInfo.Data.length) {
      dispatch(actions.updateHistoricalPriceInfo(updatedPriceInfo));
    }
  }
);
