import * as Keychain from 'react-native-keychain';
// There is no types for react-native-passcode-auth
// TODO: write them
import PasscodeAuth from 'react-native-passcode-auth';
import TouchID, { TouchIDError } from 'react-native-touch-id';
import { IKeychainCredentials, ITouchIDOptionalConfig } from '../interfaces';
import { isIOS } from './platform';

function isFallbackTouchIDError (e: TouchIDError) {
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

export async function requireAuth (reason: string) {
  try {
    await authWithTouchId(reason);
  } catch (touchIDError) {
    if (isFallbackTouchIDError(touchIDError)) {
      // try to auth with passcode if it's fallback error or touchID isn't supported
      try {
        await authWithPassCode(reason);
      } catch (passcodeError) {
        throw passcodeError;
      }
    } else {
      throw touchIDError;
    }
  }
}

export async function getCredentials (reason: string, withoutAuth?: boolean)
  : Promise<boolean | IKeychainCredentials> {
  if (!withoutAuth) {
    try {
      await requireAuth(reason);
    } catch (e) {
      throw e;
    }

    return Keychain.getGenericPassword();
  } else {
    return Keychain.getGenericPassword();
  }
}

function authWithTouchId (reason: string, optionalConfig?: ITouchIDOptionalConfig)
  : Promise<boolean | TouchIDError> {
  const config: ITouchIDOptionalConfig = {
    fallbackTitle: '',
    passcodeFallback: isIOS,
    ...optionalConfig
  };
  return TouchID.authenticate(reason, config);
}

function authWithPassCode (reason: string): Promise<boolean | any> {
  return PasscodeAuth.authenticate(reason);
}
