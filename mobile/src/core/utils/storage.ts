import { AsyncStorage } from 'react-native';
import { AsyncStorageKeys } from '../enums';

export function save (key: AsyncStorageKeys, data: object | string): Promise<void> {
  return AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function load<Loaded> (key: AsyncStorageKeys): Promise<Loaded | null> {
  const value = await AsyncStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
}
