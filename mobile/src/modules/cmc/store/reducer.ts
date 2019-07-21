import { defaultSettings } from '../../../core/environment';
import { Reducer } from '../../../core/interfaces';
import { createReducers } from '../../../core/utils/store';
import { actionTypes } from './actionTypes';

export interface PriceInfoReduxState {
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

export const cmcState = (): PriceInfoReduxState => {
  return {
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
  };
};

const fetchPriceInfo: Reducer<Promise<PriceInfoReduxState>, void> = async (state) => {

  console.log('in fetch price info');
  const response = await fetch(defaultSettings.coinMarketCapURL);
  const updatedPriceInfo = await response.json();
  console.log(updatedPriceInfo);

  return updatedPriceInfo.length && updatedPriceInfo[0] || state;
};

const reducers = {
  [actionTypes.fetchPriceInfo]: fetchPriceInfo
};

export const cmc = createReducers(cmcState(), reducers);
