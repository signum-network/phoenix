import {version} from '../../package.json';

export const environment = {
  production: true,
  hmr: false,
  version,
  defaultNode: 'https://wallet.burst-alliance.org:8125',
  market: {
    tickerUrl: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BURST&tsyms=BTC,USD,EUR',
    tickerInterval: 60 * 1000
  },
  activatorServiceUrl: 'https://burst-account-activator.ohager.now.sh',
};
