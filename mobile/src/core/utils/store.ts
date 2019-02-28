import { isFunction } from 'lodash';
import { AnyAction as ReduxAction, Reducer } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action, AnyAction, CustomAction, GetState, Reducers } from '../interfaces';
import { ApplicationState } from '../store/initialState';

/**
 * Helper-function to get rid of switch statements and typecasting in every app module.
 * Also this should be faster then switching Infinity cases.
 *
 * @param {any} defaultState
 * @param {Reducers<any>} reducers
 */
export function createReducers<State> (defaultState: State, reducers: Reducers<any>): Reducer {
  return (state: State = defaultState, action: ReduxAction) => {
    const reducerFn = reducers[action.type];

    return isFunction(reducerFn) ? reducerFn(state, action as AnyAction<any>) : state;
  };
}

/**
 * Helper-function to get rid of writing types many times.
 * Returns action function with some thunk-wrappers.
 * Actually, we got action function, but with allowed async operations
 *
 * @param {CustomAction<Payload, Result>} action Function, where we doing something.
 */
export function createActionFn<Payload, Result>
(action: CustomAction<Payload, Result>): Action<Payload, Result> {
  return (payload: Payload) => {
    return (dispatch: ThunkDispatch<ApplicationState, any, any>, getState: GetState) => {
      return action(dispatch, getState, payload);
    };
  };
}

/**
 * Another helper-function for typecasting. Creates Flux-action object with payload.
 * @param {string} type Action type.
 */
export function createAction<Payload> (type: string): (payload: Payload) => AnyAction<Payload> {
  return (payload) => ({ type, payload });
}
