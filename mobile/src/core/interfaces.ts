import { AuthenticateConfig } from 'react-native-touch-id';
import { AnyAction as ReduxAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AsyncParticleStates, AuthStorageKeys, KeyChainKeys } from './enums';
import { ApplicationState } from './store/initialState';
import { ApiSettings } from '@signumjs/core';

export interface InjectedReduxProps {
  dispatch: any // TODO: fix typings
}

export interface AnyAction<T> extends ReduxAction {
  payload: T;
}

export interface AsyncParticle<T = any> {
  data: T | null;
  state: AsyncParticleStates;
  error: Error | null;
}

/**
 * Original reducer, which takes state and flux-action and returns new state.
 */
export type Reducer<State, Payload> = (state: State, action: AnyAction<Payload>) => State;

export type GetState = () => ApplicationState;
export type Action<Payload, Result> = (payload: Payload) => ThunkAction<Result>;
export type ThunkAction<Result> = (dispatch: ThunkDispatch<ApplicationState, any, any>, getState: GetState) => Result;
export type CustomAction<Payload, Result> =
  (dispatch: ThunkDispatch<ApplicationState, any, any>, getState: GetState, payload: Payload) => Result;

export interface AsyncParticleReducers<State, Begin = any, Success = any, Failed = any> {
  begin: Reducer<State, Begin>;
  success: Reducer<State, Success>;
  failed: Reducer<State, Failed>;
}

export interface KeychainCredentials {
  username: string;
  password: string;
  service?: string;
}

export interface TouchIDOptionalConfig extends AuthenticateConfig {
  title?: string; // Android
  imageColor?: string; // Android
  imageErrorColor?: string; // Android
  sensorDescription?: string; // Android
  sensorErrorDescription?: string; // Android
  cancelText?: string; // Android
  fallbackLabel?: string; // iOS
  unifiedErrors?: boolean; // Both platforms
  passcodeFallback?: boolean; // iOS
}

export interface ChangeLanguageEvent {
  language: string;
  languages: string[];
}

/**
 * [key: string] is an ActionType
 */
export interface Reducers<State> {
  [key: string]: (state: State, action: AnyAction<any>) => State;
}

export interface AppSettings {
  passcodeTime: number; // Time, after then we should ask passcode again, msec.
  apiSettings: ApiSettings;
  coinMarketCapURL: string;
  burstAlertsURL: string;
}

export interface UserSettings {
  isAutomaticNodeSelection?: boolean;
  currentNodeHost?: string;
  agreedToTerms?:boolean;
}

export type StorageKey = AuthStorageKeys;
export type KeyChainKey = KeyChainKeys;
