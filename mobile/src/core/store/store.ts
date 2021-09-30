import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { auth } from "../../modules/auth/store/reducer";
import { network } from "../../modules/network/store/reducer";
import { priceApi } from "../../modules/price-api/store/reducer";
import { transactions } from "../../modules/transactions/store/reducer";
import { app } from "./app/reducer";
import { initialState } from "./initialState";

const rootReducer = combineReducers({
  app,
  auth,
  priceApi,
  transactions,
  network,
});

export const getStore = (): Store => {
  // TODO: fix initialState types mismatch
  return createStore(rootReducer, initialState as any, applyMiddleware(thunk));
};
