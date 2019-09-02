import { Reducer } from '../../../core/interfaces';
import { createReducers } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';

export interface PriceInfo {
  id: string;
  name: string;
  symbol: string;
  rank: string;
  price_usd: string;
  price_btc: string;
  '24h_volume_usd': string;
  market_cap_usd: string;
  available_supply: string;
  total_supply: string;
  max_supply: string;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  last_updated: string;
}

export interface PriceInfoReduxState {
  priceInfo: PriceInfo;
  historicalPriceInfo: HistoricalPriceInfo;
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

export const priceApiState = (): PriceInfoReduxState => {
  return {
    priceInfo: {
      'id': 'burst',
      'name': 'Burst',
      'symbol': 'BURST',
      'rank': '',
      'price_usd': '',
      'price_btc': '',
      '24h_volume_usd': '',
      'market_cap_usd': '',
      'available_supply': '',
      'total_supply': '',
      'max_supply': '',
      'percent_change_1h': '',
      'percent_change_24h': '',
      'percent_change_7d': '',
      'last_updated': ''
    },
    historicalPriceInfo: {
      Data: [],
      TimeFrom: 1558742400,
      TimeTo: 1567382400
    }
  };
};

const updatePriceInfo: Reducer<PriceInfoReduxState, PriceInfo> = (state, action) => {
  const priceInfo = action.payload;
  return {
    ...state,
    priceInfo
  };
};

const updateHistoricalPriceInfo: Reducer<PriceInfoReduxState, HistoricalPriceInfo> = (state, action) => {
  const historicalPriceInfo = action.payload;
  return {
    ...state,
    historicalPriceInfo
  };
};

const reducers = {
  [actionTypes.updatePriceInfo]: updatePriceInfo,
  [actionTypes.updateHistoricalPriceInfo]: updateHistoricalPriceInfo
};

export const priceApi = createReducers(priceApiState(), reducers);
