import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { auth } from '../../modules/auth/store/reducer';
import { cmc } from '../../modules/cmc/store/reducer';
import { transactions } from '../../modules/transactions/store/reducer';
import { app } from './app/reducer';
import { initialState } from './initialState';

const rootReducer = combineReducers({
  app,
  auth,
  cmc,
  transactions
});

export const getStore = (): Store => {
  // TODO: fix initialState types mismatch
  return createStore(rootReducer, initialState as any, applyMiddleware(thunk));
};
