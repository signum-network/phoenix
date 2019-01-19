import { AnyAction, Reducer } from 'redux'
import { actionTypes } from './actionTypes'

export interface IAppReduxState {
  isAppLoaded: boolean
}

export const appState = (): IAppReduxState => {
  return {
    isAppLoaded: false
  }
}

export const app: Reducer = (
  state: IAppReduxState = appState(),
  action: AnyAction
) => {
  switch (action.type) {
    case actionTypes.appLoaded:
      return {
        ...appState(),
        isAppLoaded: true
      }
    default:
      return state
  }
}
