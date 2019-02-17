import { loadAccounts } from '../../../modules/auth/store/actions';
import { createAction, createActionFn } from '../../utils/store';
import { actionTypes } from './actionTypes';

const appLoadedAction = createAction<void>(actionTypes.appLoaded);

export const loadApp = createActionFn<void, Promise<void>>(
  async (dispatch) => {
    await Promise.all([
      dispatch(loadAccounts())
    ]);
    dispatch(appLoadedAction());
    return;
  }
);
