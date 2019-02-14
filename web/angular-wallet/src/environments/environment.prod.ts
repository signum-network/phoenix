import {version} from '../../package.json';

export const environment = {
  production: true,
  hmr: false,
  version,
  // TODO: correct urls, once they are established
  defaultNode: 'http://localhost:4200',
  marketUrl: 'http://localhost:4200/v1/ticker/burstjs/',
};
