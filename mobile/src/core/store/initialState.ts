import { AuthReduxState, authState } from '../../modules/auth/store/reducer';
import { priceApiState, PriceInfoReduxState } from '../../modules/price-api/store/reducer';
import { TransactionsReduxState, transactionsState } from '../../modules/transactions/store/reducer';
import { AppReduxState, appState } from './app/reducer';

export interface ApplicationState {
  app: AppReduxState
  auth: AuthReduxState,
  priceApi: PriceInfoReduxState,
  transactions: TransactionsReduxState,
}

export const initialState: ApplicationState = {
  app: appState(),
  auth: authState(),
  priceApi: priceApiState(),
  transactions: transactionsState()
};
