import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserSettings} from '../interfaces';
import {defaultSettings} from '../environment';

export enum AsyncStorageKeys {
  userSettings = 'USER_SETTINGS',
}

const DefaultUserSettings: UserSettings = {
  currentNodeHost: defaultSettings.nodeHost,
  isAutomaticNodeSelection: true,
  agreedToTerms: false,
};

function save(key: AsyncStorageKeys, data: object | string): Promise<void> {
  return AsyncStorage.setItem(key, JSON.stringify(data));
}

async function load<TData>(key: AsyncStorageKeys): Promise<TData> {
  const value = await AsyncStorage.getItem(key);
  if (!value) {
    throw new Error(`Could not load data for key: ${key}`);
  }
  return JSON.parse(value);
}

export async function resetUserSettings(): Promise<UserSettings> {
  return updateUserSettings(DefaultUserSettings);
}

export async function updateUserSettings(
  userSettings: UserSettings,
): Promise<UserSettings> {
  const currentSettings = await fetchUserSettings();
  const updatedSettings = {...currentSettings, ...userSettings};
  await save(AsyncStorageKeys.userSettings, updatedSettings);
  console.log('updated user settings', updatedSettings);
  return updatedSettings;
}

export async function fetchUserSettings(): Promise<UserSettings> {
  try {
    // do not inline!
    const usersettings = await load(AsyncStorageKeys.userSettings);
    return usersettings;
  } catch {
    return DefaultUserSettings;
  }
}
