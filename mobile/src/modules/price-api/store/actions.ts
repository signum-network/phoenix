import { defaultSettings } from '../../../core/environment';
import { createAction, createActionFn } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';
import { PairedHistoricalPriceInfo, PriceInfo, PriceTypeStrings } from './reducer';

const actions = {
  updatePriceInfo: createAction<PriceInfo>(actionTypes.updatePriceInfo),
  selectCurrency: createAction<PriceTypeStrings>(actionTypes.selectCurrency),
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

export const selectCurrency = createActionFn<PriceTypeStrings, Promise<void>>(
  async (dispatch, _getState, currency) => {
    dispatch(actions.selectCurrency(currency));
  }
);

export const loadHistoricalPriceApiData = createActionFn<void, Promise<void>>(
  async (dispatch, _getState) => {
    const response = await Promise.all([
      fetch(defaultSettings.cryptoCompareURL.replace('$SYMBOL', 'BTC')),
      fetch(defaultSettings.cryptoCompareURL.replace('$SYMBOL', 'USD'))
    ]);

    const updatedPriceInfo = await Promise.all([response[0].json(), response[1].json()]);
    if (updatedPriceInfo[0].Data && updatedPriceInfo[0].Data.length &&
        updatedPriceInfo[1].Data && updatedPriceInfo[1].Data.length) {
      dispatch(actions.updateHistoricalPriceInfo({
        BTC: updatedPriceInfo[0],
        USD: updatedPriceInfo[1]
      }));
    }
  }
);
