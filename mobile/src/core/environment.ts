import { toNumber, toString } from 'lodash';
// @ts-ignore-next-line WARNING: typescript can't check what we have in .env
import { CMC_HOST_URL, DEFAULT_API_ROOT_URL, DEFAULT_NODE_HOST, DEFAULT_PASSCODE_TIME } from 'react-native-dotenv';

// So we check it like this
if (!DEFAULT_API_ROOT_URL || !DEFAULT_NODE_HOST || !DEFAULT_PASSCODE_TIME || !CMC_HOST_URL) {
  throw new Error('Incorrect .env config!');
}

export const defaultSettings = {
  nodeHost: toString(DEFAULT_NODE_HOST),
  apiRootUrl: toString(DEFAULT_API_ROOT_URL),
  passcodeTime: toNumber(DEFAULT_PASSCODE_TIME),
  coinMarketCapURL: toString(CMC_HOST_URL)
};
