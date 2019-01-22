import { AuthenticateConfig } from 'react-native-touch-id';

export interface IInjectedReduxProps {
  dispatch: any // TODO: fix typings
}

export interface IKeychainCredentials {
  username: string;
  password: string;
  service?: string;
}

export interface ITouchIDOptionalConfig extends AuthenticateConfig {
  title?: string; // Android
  imageColor?: string; // Android
  imageErrorColor?: string; // Android
  sensorDescription?: string; // Android
  sensorErrorDescription?: string; // Android
  cancelText?: string; // Android
  fallbackLabel?: string; // iOS
  unifiedErrors?: boolean; // Both platforms
  passcodeFallback?: boolean; // iOS
}
