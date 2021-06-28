import { toNumber, toString } from 'lodash';

// @ts-ignore-next-line WARNING: typescript can't check what we have in .env
// tslint:disable-next-line: max-line-length
import { BURSTALERTS_HOST_URL, CMC_HOST_URL, CRYPTOCOMPARE_HOST_URL, DEFAULT_NODE_HOST, DEFAULT_PASSCODE_TIME, RELIABLE_NODE_HOSTS } from 'react-native-dotenv';

// So we check it like this
// tslint:disable-next-line: max-line-length
if (!DEFAULT_NODE_HOST || !DEFAULT_PASSCODE_TIME || !CMC_HOST_URL || !CRYPTOCOMPARE_HOST_URL || !BURSTALERTS_HOST_URL || !RELIABLE_NODE_HOSTS) {
  throw new Error('Incorrect .env config!');
}

export const defaultSettings = {
  nodeHost: toString(DEFAULT_NODE_HOST),
  reliableNodeHosts: toString(RELIABLE_NODE_HOSTS).split(';').map(node => node.trim()),
  passcodeTime: toNumber(DEFAULT_PASSCODE_TIME),
  coinMarketCapURL: toString(CMC_HOST_URL),
  cryptoCompareURL: toString(CRYPTOCOMPARE_HOST_URL),
  burstAlertsURL: toString(BURSTALERTS_HOST_URL)
};
