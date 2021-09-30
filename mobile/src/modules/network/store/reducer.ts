import { SuggestedFees } from "@signumjs/core";
import { Reducer } from "../../../core/interfaces";
import { createReducers } from "../../../core/utils/store";
import { actionTypes } from "./actionTypes";

export interface NetworkReduxState {
  suggestedFees: SuggestedFees | null;
}

export const networkState = (): NetworkReduxState => {
  return {
    suggestedFees: null,
  };
};

const getSuggestedFees: Reducer<NetworkReduxState, SuggestedFees> = (
  state,
  action
) => {
  const suggestedFees = action.payload;

  return {
    ...state,
    suggestedFees,
  };
};

const reducers = {
  [actionTypes.getSuggestedFees]: getSuggestedFees,
};

export const network = createReducers(networkState(), reducers);
