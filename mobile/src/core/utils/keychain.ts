import * as Keychain from 'react-native-keychain';
import TouchID, {TouchIDError} from 'react-native-touch-id';
import {KeyChainKeys} from '../enums';
import {
  AppSettings,
  KeychainCredentials,
  TouchIDOptionalConfig,
} from '../interfaces';
import {getDefaultAppSettings} from '../store/app/reducer';

export function isFallbackTouchIDError(e: TouchIDError): boolean {
  const {name} = e;
  return (
    name === 'LAErrorUserFallback' ||
    name === 'LAErrorTouchIDNotEnrolled' ||
    name === 'RCTTouchIDNotSupported' ||
    name === 'LAErrorTouchIDNotAvailable'
  );
}

export function setCredentials(
  {username, password}: KeychainCredentials,
  service?: string,
): Promise<false | Keychain.Result> {
  return Keychain.setGenericPassword(username, password, {
    service,
    accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK,
  });
}

export function getCredentials(
  service?: string,
): Promise<boolean | KeychainCredentials> {
  return Keychain.getGenericPassword({service});
}

export function authWithTouchId(
  reason: string,
  optionalConfig?: TouchIDOptionalConfig,
): Promise<boolean | TouchIDError> {
  const config: TouchIDOptionalConfig = {
    fallbackTitle: '',
    passcodeFallback: false,
    ...optionalConfig,
  };
  return TouchID.authenticate(reason, config);
}

export function isTouchIDSupported(): Promise<boolean> {
  return TouchID.isSupported()
    .then(() => true)
    .catch(() => false);
}

// export function saveAppSettings(settings: AppSettings): Promise<false|Keychain.Result> {
//     // TODO: refactor get/setCredentials
//     console.log('Saving App Settings', settings);
//     return setCredentials({
//         username: KeyChainKeys.settings,
//         password: JSON.stringify(settings)
//     });
// }

export async function fetchAppSettings(): Promise<AppSettings> {
  const credentials: KeychainCredentials = (await getCredentials(
    KeyChainKeys.accounts,
  )) as KeychainCredentials;
  if (credentials && credentials.password) {
    return {
      ...getDefaultAppSettings(),
      ...JSON.parse(credentials.password),
    };
  } else {
    return getDefaultAppSettings();
  }
}
