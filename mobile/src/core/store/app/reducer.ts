import { ChainService } from '@signumjs/core';
import { defaultSettings } from '../../environment';
import { AppSettings, Reducer } from '../../interfaces';
import { createReducers } from '../../utils/store';
import { actionTypes } from './actionTypes';

export interface AppReduxState {
  isAppLoaded: boolean;
  appSettings: AppSettings;
  chainService: ChainService;
}

export function getDefaultAppSettings (): AppSettings {
  return {
    passcodeTime: defaultSettings.passcodeTime, // 10 min,
    nodeSettings: {
      nodeHost: defaultSettings.nodeHost,
      reliableNodeHosts: defaultSettings.reliableNodeHosts
    },
    coinMarketCapURL: defaultSettings.coinMarketCapURL,
    burstAlertsURL: defaultSettings.burstAlertsURL
  };
}

export const appState = (): AppReduxState => {
  const appSettings = getDefaultAppSettings();

  return {
    isAppLoaded: false,
    appSettings,
    chainService: new ChainService(appSettings.nodeSettings)
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
    appSettings: {
      ...action.payload
    }
  };
};

const setAppSettings: Reducer<AppReduxState, AppSettings> = (state, action) => {
  return {
    ...state,
    appSettings: action.payload
  };
};

const setNode: Reducer<AppReduxState, string> = (state, action) => {
  console.log('setNode', action);
  return {
    ...state,
    chainService: new ChainService({
      nodeHost: action.payload,
      reliableNodeHosts: defaultSettings.reliableNodeHosts
    })
  };
};

const reducers = {
  [actionTypes.appLoaded]: appLoaded,
  [actionTypes.appSettingsLoaded]: appSettingsLoaded,
  [actionTypes.setAppSettings]: setAppSettings,
  [actionTypes.setNode]: setNode
};

export const app = createReducers<AppReduxState>(appState(), reducers);
