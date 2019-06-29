import {version} from '../../package.json';

export const environment = {
  production: false,
  hmr: true,
  version,
  defaultNode: 'http://localhost:4200',
  nodeVersion: '2.4.0',
  market: {
    tickerUrl: 'https://api.coinmarketcap.com/v1/ticker/burst/',
    tickerInterval: 30 * 1000
  }
};
