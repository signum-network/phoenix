import { defaultSettings } from '../../../core/environment';
import { createAction, createActionFn } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';
import { PairedHistoricalPriceInfo, PriceInfo } from './reducer';

const actions = {
  updatePriceInfo: createAction<PriceInfo>(actionTypes.updatePriceInfo),
  updateHistoricalPriceInfo: createAction<PairedHistoricalPriceInfo>(actionTypes.updateHistoricalPriceInfo)
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
    const response = await Promise.all([
      fetch(defaultSettings.cryptoCompareURL.replace('$SYMBOL', 'BTC')),
      fetch(defaultSettings.cryptoCompareURL.replace('$SYMBOL', 'USD'))
    ]);
    console.log(defaultSettings.cryptoCompareURL);

    const updatedPriceInfo = await Promise.all([response[0].json(), response[1].json()]);
    console.log(updatedPriceInfo);
    if (updatedPriceInfo[0].Data && updatedPriceInfo[0].Data.length &&
        updatedPriceInfo[1].Data && updatedPriceInfo[1].Data.length) {
      dispatch(actions.updateHistoricalPriceInfo({
        BTC: updatedPriceInfo[0],
        USD: updatedPriceInfo[1]
      }));
    }
  }
);
