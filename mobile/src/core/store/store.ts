import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { app } from './app/reducer';
import { initialState } from './initialState';

const rootReducer = combineReducers({
  app
});

export const getStore = (): Store => {
  // TODO: fix initialState types mismatch
  return createStore(rootReducer, initialState as any, applyMiddleware(thunk));
};
