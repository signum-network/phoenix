import { Account } from '@burstjs/core';
import * as Keychain from 'react-native-keychain';
import TouchID, { TouchIDError } from 'react-native-touch-id';
import { KeychainCredentials, TouchIDOptionalConfig } from '../interfaces';

export function isFallbackTouchIDError (e: TouchIDError) {
  const { name } = e;
  return (
    name === 'LAErrorUserFallback' ||
    name === 'LAErrorTouchIDNotEnrolled' ||
    name === 'RCTTouchIDNotSupported' ||
    name === 'LAErrorTouchIDNotAvailable'
  );
}

export function setCredentials ({ username, password }: KeychainCredentials, service?: string): Promise<boolean> {
  return Keychain.setGenericPassword(username, password, { service });
}

export function getCredentials (service?: string)
  : Promise<boolean | KeychainCredentials> {
  return Keychain.getGenericPassword({ service });
}

export function authWithTouchId (reason: string, optionalConfig?: TouchIDOptionalConfig)
  : Promise<boolean | TouchIDError> {
  const config: TouchIDOptionalConfig = {
    fallbackTitle: '',
    passcodeFallback: false,
    ...optionalConfig
  };
  return TouchID.authenticate(reason, config);
}
