import { AuthReduxState, authState } from '../../modules/auth/store/reducer';
import { cmcState, PriceInfoReduxState } from '../../modules/cmc/store/reducer';
import { TransactionsReduxState, transactionsState } from '../../modules/transactions/store/reducer';
import { AppReduxState, appState } from './app/reducer';

export interface ApplicationState {
  app: AppReduxState
  auth: AuthReduxState,
  cmc: PriceInfoReduxState,
  transactions: TransactionsReduxState,
}

export const initialState: ApplicationState = {
  app: appState(),
  auth: authState(),
  cmc: cmcState(),
  transactions: transactionsState()
};
