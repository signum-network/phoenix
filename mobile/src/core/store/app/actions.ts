import { loadAccounts, loadPasscode, loadPasscodeEnteredTime } from '../../../modules/auth/store/actions';
import { loadHistoricalPriceApiData, loadPriceApiData } from '../../../modules/price-api/store/actions';
import { AppSettings } from '../../interfaces';
import { getAppSettings, saveAppSettings } from '../../utils/keychain';
import { createAction, createActionFn } from '../../utils/store';
import { actionTypes } from './actionTypes';

const actions = {
  appLoaded: createAction<void>(actionTypes.appLoaded),
  appSettingsLoaded: createAction<AppSettings>(actionTypes.appSettingsLoaded),
  setAppSettings: createAction<AppSettings>(actionTypes.setAppSettings)
};

export const loadApp = createActionFn<void, Promise<void>>(
  async (dispatch) => {
    await Promise.all([
      dispatch(loadAccounts()),
      dispatch(loadPasscode()),
      dispatch(loadPasscodeEnteredTime()),
      dispatch(loadAppSettings())
    ]);
    dispatch(loadPriceApiData());
    dispatch(loadHistoricalPriceApiData());
    dispatch(actions.appLoaded());
  }
);

export const loadAppSettings = createActionFn<void, Promise<void>>(
  async (dispatch, _getState) => {
    const settings: AppSettings = await getAppSettings();
    dispatch(actions.appSettingsLoaded(settings));
  }
);

export const setAppSettings = createActionFn<AppSettings, Promise<void>>(
  async (dispatch, _getState, settings) => {
    dispatch(actions.setAppSettings(settings));
    await saveAppSettings(settings);
  }
);
