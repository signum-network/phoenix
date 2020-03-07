import { Reducer } from '../../../core/interfaces';
import { createReducers } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';

export interface PriceInfo {
  price_usd: string;
  price_btc: string;
}

export interface PriceInfoReduxState {
  priceInfo?: PriceInfo;
  historicalPriceInfo?: PairedHistoricalPriceInfo;
  selectedCurrency: PriceTypeStrings;
}

export interface PairedHistoricalPriceInfo {
  BTC: HistoricalPriceInfo;
  USD: HistoricalPriceInfo;
}

export type HistoricalPriceTypeStrings = keyof PairedHistoricalPriceInfo;

export interface HistoricalPriceInfoUpdate {
  historicalPriceInfo: HistoricalPriceInfo,
  type: PriceType
}

export interface Metric {
  time: number;
  close: number;
  high: number;
  low: number;
  open: number;
  volumefrom: number;
  volumeto: number;
}

export interface ConversionType {
  type: string;
  conversionSymbol: string;
}

export interface HistoricalPriceInfo {
  Response?: string;
  Type?: string;
  Aggregated?: string;
  Data: Metric[];
  TimeTo: number;
  TimeFrom: number;
  FirstValueInArray?: boolean;
  ConversionType?: ConversionType;
  HasWarning?: boolean;
}

export enum PriceType {
  BURST = 'BURST',
  BTC = 'BTC',
  USD = 'USD'
}

export type PriceTypeStrings = keyof typeof PriceType;

export const priceApiState = (): PriceInfoReduxState => {
  return {
    selectedCurrency: PriceType.BURST
  };
};

const updatePriceInfo: Reducer<PriceInfoReduxState, PriceInfo> = (state, action) => {
  const priceInfo = action.payload;
  return {
    ...state,
    priceInfo
  };
};

const failedToUpdatePriceInfo: Reducer<PriceInfoReduxState, void> = (state) => {
  return {
    ...state,
    priceInfo: undefined
  };
};

const selectCurrency: Reducer<PriceInfoReduxState, PriceTypeStrings> = (state, action) => {
  const selectedCurrency = action.payload;
  return {
    ...state,
    selectedCurrency
  };
};

const updateHistoricalPriceInfo: Reducer<PriceInfoReduxState, PairedHistoricalPriceInfo> = (state, action) => {
  const historicalPriceInfo = action.payload;
  return {
    ...state,
    historicalPriceInfo
  };
};

const failedToUpdateHistoricalPriceInfo: Reducer<PriceInfoReduxState, void> = (state) => {
  return {
    ...state,
    historicalPriceInfo: undefined
  };
};

const reducers = {
  [actionTypes.updatePriceInfo]: updatePriceInfo,
  [actionTypes.failedToUpdatePriceInfo]: failedToUpdatePriceInfo,
  [actionTypes.selectCurrency]: selectCurrency,
  [actionTypes.updateHistoricalPriceInfo]: updateHistoricalPriceInfo,
  [actionTypes.failedToUpdateHistoricalPriceInfo]: failedToUpdateHistoricalPriceInfo
};

export const priceApi = createReducers(priceApiState(), reducers);
