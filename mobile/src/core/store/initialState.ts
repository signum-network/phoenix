import { AuthReduxState, authState } from '../../modules/auth/store/reducer';
import { NetworkReduxState, networkState } from '../../modules/network/store/reducer';
import { priceApiState, PriceInfoReduxState } from '../../modules/price-api/store/reducer';
import { TransactionsReduxState, transactionsState } from '../../modules/transactions/store/reducer';
import { AppReduxState, getInitialAppState } from './app/reducer';

export interface ApplicationState {
  app: AppReduxState;
  auth: AuthReduxState;
  priceApi: PriceInfoReduxState;
  transactions: TransactionsReduxState;
  network: NetworkReduxState;
}

export const initialState: ApplicationState = {
  app: getInitialAppState(),
  auth: authState(),
  priceApi: priceApiState(),
  transactions: transactionsState(),
  network: networkState()
};
