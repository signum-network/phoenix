import {version} from '../../package.json';

export const environment = {
  production: false,
  hmr: true,
  version,
  defaultNode: 'http://localhost:4200',
  market: {
    tickerUrl: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BURST&tsyms=BTC,USD,EUR',
    tickerInterval: 60 * 1000
  },
  activatorServiceUrl: 'https://burst-account-activator-testnet.ohager.now.sh',
};
