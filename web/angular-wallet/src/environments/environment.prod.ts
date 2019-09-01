import {version} from '../../package.json';

export const environment = {
  production: true,
  hmr: false,
  version,
  defaultNode: 'https://wallet.burst-alliance.org:8125',
  defaultNodeEndpoint: '/burst',
  market: {
    tickerUrl: 'https://api.coinmarketcap.com/v1/ticker/burst/',
    tickerInterval: 30 * 1000
  }
};
