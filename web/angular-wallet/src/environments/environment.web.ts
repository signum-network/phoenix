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
  activatorServiceUrl: 'https://burst-account-activator.ohager.now.sh',
};
