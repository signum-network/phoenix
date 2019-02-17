import { AuthReduxState, authState } from '../../modules/auth/store/reducer';
import { AppReduxState, appState } from './app/reducer';

export interface ApplicationState {
  app: AppReduxState
  auth: AuthReduxState
}

export const initialState: ApplicationState = {
  app: appState(),
  auth: authState()
};
