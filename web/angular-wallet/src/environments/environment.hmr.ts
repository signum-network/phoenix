import {version} from '../../package.json';

export const environment = {
  production: false,
  hmr: true,
  version,
  defaultNode: 'http://localhost:4200',
  market: {
    tickerUrl: 'https://api.coingecko.com/api/v3/coins/signum?tickers=false&community_data=false&developer_data=false&market_data=true',
    tickerInterval: 60 * 1000
  },
  performance: {
    fcasUrl: 'https://platform-api.flipsidecrypto.com/api/v1/assets/573/metrics/FCAS?api_key=6e9c2808-0c48-41d8-81f1-5363d5ceb1af&change_over=7',
    fcasInterval: 60 * 5 * 1000
  },
  activatorServiceUrl: {
    mainNet: 'https://signum-account-activator.vercel.app',
    testNet: 'https://signum-account-activator-ohager.vercel.app'
  },
};
