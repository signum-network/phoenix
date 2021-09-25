import { TransactionId } from "@signumjs/core";
import { AsyncParticle, Reducer } from "../../../core/interfaces";
import { initAsyncParticle } from "../../../core/utils/async";
import {
  createAsyncParticleReducers,
  createReducers,
} from "../../../core/utils/store";
import { actionTypes } from "./actionTypes";

export interface TransactionsReduxState {
  sendMoney: AsyncParticle<TransactionId>;
  imageUrl: string;
}

export const transactionsState = (): TransactionsReduxState => {
  return {
    sendMoney: initAsyncParticle<TransactionId>(),
    imageUrl: "",
  };
};

const sendMoney = createAsyncParticleReducers<
  TransactionsReduxState,
  void,
  TransactionId,
  Error
>("sendMoney");

const updateQRImageUrl: Reducer<TransactionsReduxState, string> = (
  state,
  action
) => {
  const imageUrl = action.payload;
  return {
    ...state,
    imageUrl,
  };
};

const reducers = {
  [actionTypes.sendMoney]: sendMoney.begin,
  [actionTypes.sendMoneySuccess]: sendMoney.success,
  [actionTypes.sendMoneyFailed]: sendMoney.failed,
  [actionTypes.generateQRAddressSuccess]: updateQRImageUrl,
};

export const transactions = createReducers(transactionsState(), reducers);
