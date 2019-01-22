import { AnyAction, Dispatch } from 'redux';
import { wait } from '../../utils/async';
import { actionTypes } from './actionTypes';

const appLoadedAction = (): AnyAction => ({ type: actionTypes.appLoaded });

export const loadApp = (): (dispatch: Dispatch) => Promise<void> => {
  return async (dispatch: Dispatch) => {
    // TODO: here we will load all caches and settings
    await wait(3000);
    dispatch(appLoadedAction());
    return;
  };
};
