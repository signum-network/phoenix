import {version} from '../../package.json';

export const environment = {
  production: true,
  hmr: false,
  version,
  defaultNode: '',
  defaultNodeEndpoint: '/burst',
  nodeVersion: '2.4.2',
  market: {
    tickerUrl: 'https://api.coinmarketcap.com/v1/ticker/burst/',
    tickerInterval: 30 * 1000
  },
  activatorServiceUrl: 'https://burst-account-activator.ohager.now.sh',
};
