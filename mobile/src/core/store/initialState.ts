import { appState, IAppReduxState } from './app/reducer';

export interface IApplicationState {
  app: IAppReduxState
}

export const initialState: IApplicationState = {
  app: appState()
};
