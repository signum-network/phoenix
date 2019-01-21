import * as Keychain from 'react-native-keychain';
import TouchID, { TouchIDError } from 'react-native-touch-id';
import { IKeychainCredentials, ITouchIDOptionalConfig } from '../interfaces';
import { isIOS } from './platform';

export function isFallbackTouchIDError (e: TouchIDError) {
  const { name } = e;
  return (
    name === 'LAErrorUserFallback' ||
    name === 'LAErrorTouchIDNotEnrolled' ||
    name === 'RCTTouchIDNotSupported' ||
    name === 'LAErrorTouchIDNotAvailable'
  );
}

export function setCredentials ({ username, password }: IKeychainCredentials): Promise<boolean> {
  return Keychain.setGenericPassword(username, password);
}

export function getCredentials ()
  : Promise<boolean | IKeychainCredentials> {
  return Keychain.getGenericPassword();
}

export function authWithTouchId (reason: string, optionalConfig?: ITouchIDOptionalConfig)
  : Promise<boolean | TouchIDError> {
  const config: ITouchIDOptionalConfig = {
    fallbackTitle: '',
    passcodeFallback: isIOS,
    ...optionalConfig
  };
  return TouchID.authenticate(reason, config);
}
