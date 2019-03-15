import {version} from '../../package.json';

export const environment = {
  production: false,
  hmr: true,
  version,
  defaultNode: 'http://localhost:4200/burst',
  market: {
    tickerUrl: '/v1/ticker/burst/',
    tickerInterval: 30 * 1000
  }
};
