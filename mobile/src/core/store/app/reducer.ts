import { Api, composeApi, ApiSettings } from '@signumjs/core';
import { defaultSettings } from '../../environment';
import { AppSettings, Reducer } from '../../interfaces';
import { createReducers } from '../../utils/store';
import { actionTypes } from './actionTypes';

export interface AppReduxState {
  isAppLoaded: boolean;
  appSettings: AppSettings;
  chainApi: Api;
}

export function getDefaultAppSettings (): AppSettings {
  return {
    passcodeTime: defaultSettings.passcodeTime, // 10 min,
    apiSettings: {
      nodeHost: defaultSettings.nodeHost,
      reliableNodeHosts: defaultSettings.reliableNodeHosts
    } as ApiSettings,
    coinMarketCapURL: defaultSettings.coinMarketCapURL,
    burstAlertsURL: defaultSettings.burstAlertsURL,
    isAutomaticNodeSelection: true
  };
}

export const appState = (): AppReduxState => {
  const appSettings = getDefaultAppSettings();
  const chainApi = composeApi(appSettings.apiSettings);
  return {
    isAppLoaded: false,
    appSettings,
    chainApi,
  };
};

const appLoaded: Reducer<AppReduxState, undefined> = (state) => {
  return {
    ...state,
    isAppLoaded: true
  };
};

const appSettingsLoaded: Reducer<AppReduxState, AppSettings> = (state, action) => {

  if(action.payload.apiSettings
      && action.payload.apiSettings.nodeHost
      && action.payload.apiSettings.nodeHost !== state.appSettings.apiSettings.nodeHost)
  {
    console.log('Reconstructin')
  }

  return {
    ...state,
    appSettings: {
      ...action.payload
    }
  };
};

// const setAppSettings: Reducer<AppReduxState, AppSettings> = (state, action) => {
//
//
//   const chainApi = composeApi(state.appSettings.apiSettings);
//   return {
//     ...state,
//     appSettings: action.payload,
//     chainApi
//   };
// };

const setNode: Reducer<AppReduxState, string> = (state, action) => {
  console.log('setNode', action);

  state.appSettings.apiSettings.nodeHost = action.payload;
  const chainApi = composeApi(state.appSettings.apiSettings);

  return {
    ...state,
    chainApi
  };
};

const setAutomaticNodeSelection: Reducer<AppReduxState, boolean> = (state, action) => {
  state.appSettings.isAutomaticNodeSelection = action.payload;
  return {
    ...state,
  };
};


const reducers = {
  [actionTypes.appLoaded]: appLoaded,
  [actionTypes.appSettingsLoaded]: appSettingsLoaded,
  // [actionTypes.setAppSettings]: setAppSettings,
  [actionTypes.setNode]: setNode,
  [actionTypes.setAutomaticNodeSelection]: setAutomaticNodeSelection,
};

export const app = createReducers<AppReduxState>(appState(), reducers);
