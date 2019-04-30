import { toNumber, toString } from 'lodash';
// @ts-ignore-next-line WARNING: typescript can't check what we have in .env
import { DEFAULT_API_ROOT_URL, DEFAULT_NODE_HOST, DEFAULT_PASSCODE_TIME } from 'react-native-dotenv';

// So we check it like this
if (!DEFAULT_API_ROOT_URL || !DEFAULT_NODE_HOST || !DEFAULT_PASSCODE_TIME) {
  throw new Error('Incorrect .env config!');
}

export const defaultSettings = {
  nodeHost: toString(DEFAULT_NODE_HOST),
  apiRootUrl: toString(DEFAULT_API_ROOT_URL),
  passcodeTime: toNumber(DEFAULT_PASSCODE_TIME)
};
