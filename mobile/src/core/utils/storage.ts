import { AsyncStorage } from 'react-native';
import { StorageKey } from '../interfaces';

export function save (key: StorageKey, data: object): Promise<void> {
  return AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function load<Loaded> (key: StorageKey): Promise<Loaded | null> {
  const value = await AsyncStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
}
