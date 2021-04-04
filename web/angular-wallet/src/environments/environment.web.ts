import {version} from '../../package.json';

export const environment = {
  production: true,
  hmr: false,
  version,
  defaultNode: '',
  market: {
    tickerUrl: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BURST&tsyms=BTC,USD,EUR',
    tickerInterval: 60 * 1000
  },
  performance: {
    fcasUrl: 'https://platform-api.flipsidecrypto.com/api/v1/assets/573/metrics/FCAS?api_key=6e9c2808-0c48-41d8-81f1-5363d5ceb1af&change_over=7',
    fcasInterval: 60 * 5 * 1000
  },
  activatorServiceUrl: 'https://burst-account-activator.now.sh',
};
