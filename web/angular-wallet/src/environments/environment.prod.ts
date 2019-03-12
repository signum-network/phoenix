import {version} from '../../package.json';

export const environment = {
  production: true,
  hmr: false,
  version,
  defaultNode: 'https://wallet1.burst-team.us:2083',
  marketUrl: 'http://localhost:4200/v1/ticker/burstjs/',
};
