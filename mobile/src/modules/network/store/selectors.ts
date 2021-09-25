import { ApplicationState } from "../../../core/store/initialState";
import { SuggestedFees } from "@signumjs/core";

export const selectSuggestedFees = (
  state: ApplicationState
): SuggestedFees | null => state.network.suggestedFees;
