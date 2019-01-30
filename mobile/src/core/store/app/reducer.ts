import { Reducer } from '../../interfaces';
import { createReducers } from '../../utils/store';
import { actionTypes } from './actionTypes';

export interface AppReduxState {
  isAppLoaded: boolean;
}

export const appState = (): AppReduxState => {
  return {
    isAppLoaded: false
  };
};

const appLoaded: Reducer<AppReduxState, undefined> = (state) => {
  return {
    ...state,
    isAppLoaded: true
  };
};

const reducers = {
  [actionTypes.appLoaded]: appLoaded
};

export const app = createReducers<AppReduxState>(appState(), reducers);
