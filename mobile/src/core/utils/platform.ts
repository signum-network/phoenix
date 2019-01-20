import { Platform } from 'react-native'

export const isIOS = (): boolean => {
  return Platform.OS === 'ios'
}
