import { AppSettings, Reducer } from '../../interfaces';
import { createReducers } from '../../utils/store';
import { actionTypes } from './actionTypes';

export interface AppReduxState {
  isAppLoaded: boolean;
  appSettings: AppSettings;
}

export function getDefaultAppSettings (): AppSettings {
  return {
    passcodeTime: 600000 // 10 min
  };
}

export const appState = (): AppReduxState => {
  return {
    isAppLoaded: false,
    appSettings: getDefaultAppSettings()
  };
};

const appLoaded: Reducer<AppReduxState, undefined> = (state) => {
  return {
    ...state,
    isAppLoaded: true
  };
};

const appSettingsLoaded: Reducer<AppReduxState, AppSettings> = (state, action) => {
  return {
    ...state,
    appSettings: action.payload
  };
};

const setAppSettings: Reducer<AppReduxState, AppSettings> = (state, action) => {
  return {
    ...state,
    appSettings: action.payload
  };
};

const reducers = {
  [actionTypes.appLoaded]: appLoaded,
  [actionTypes.appSettingsLoaded]: appSettingsLoaded,
  [actionTypes.setAppSettings]: setAppSettings
};

export const app = createReducers<AppReduxState>(appState(), reducers);
