import {defaultSettings} from '../../../core/environment';
import {createAction, createActionFn} from '../../../core/utils/store';
import {actionTypes} from './actionTypes';
import {
  PairedHistoricalPriceInfo,
  PriceInfo,
  PriceType,
  PriceTypeStrings,
} from './reducer';

const actions = {
  updatePriceInfo: createAction<PriceInfo>(actionTypes.updatePriceInfo),
  selectCurrency: createAction<PriceTypeStrings>(actionTypes.selectCurrency),
  updateHistoricalPriceInfo: createAction<PairedHistoricalPriceInfo>(
    actionTypes.updateHistoricalPriceInfo,
  ),
  failedToUpdatePriceInfo: createAction<void>(
    actionTypes.failedToUpdatePriceInfo,
  ),
  failedToUpdateHistoricalPriceInfo: createAction<void>(
    actionTypes.failedToUpdateHistoricalPriceInfo,
  ),
};

export const selectCurrency = createActionFn<PriceTypeStrings, Promise<void>>(
  async (dispatch, _getState, currency) => {
    dispatch(actions.selectCurrency(currency));
  },
);

export const loadHistoricalPriceApiData = createActionFn<void, Promise<void>>(
  async (dispatch, _getState) => {
    try {
      const response = await Promise.all([
        fetch(
          defaultSettings.cryptoCompareURL.replace('$SYMBOL', PriceType.BTC),
        ),
        fetch(
          defaultSettings.cryptoCompareURL.replace('$SYMBOL', PriceType.USD),
        ),
      ]);

      const updatedPriceInfo = await Promise.all([
        response[0].json(),
        response[1].json(),
      ]);

      console.log('updatePriceInfo', updatedPriceInfo);

      if (
        updatedPriceInfo[0].Data &&
        updatedPriceInfo[0].Data.length &&
        updatedPriceInfo[1].Data &&
        updatedPriceInfo[1].Data.length
      ) {
        dispatch(
          actions.updatePriceInfo({
            price_btc:
              updatedPriceInfo[0].Data[updatedPriceInfo[0].Data.length - 1]
                .close,
            price_usd:
              updatedPriceInfo[1].Data[updatedPriceInfo[1].Data.length - 1]
                .close,
          }),
        );
        dispatch(
          actions.updateHistoricalPriceInfo({
            [PriceType.BTC]: updatedPriceInfo[0],
            [PriceType.USD]: updatedPriceInfo[1],
          }),
        );
      }
    } catch (e) {
      dispatch(actions.failedToUpdateHistoricalPriceInfo());
    }
  },
);
