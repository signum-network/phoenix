import {version} from '../../package.json';

export const environment = {
  production: false,
  hmr: true,
  version,
  defaultNode: 'http://localhost:4200/burst',
  marketUrl: 'http://localhost:4200/v1/ticker/burst/',

};
