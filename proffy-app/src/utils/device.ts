import { Platform, StatusBar } from 'react-native'
import { modelId } from 'expo-device'

export const isIos = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'

export const iPhoneXVersion = 10.6
export const iPhoneVersion = isIos
  ? parseFloat(modelId().replace('iPhone', '').replace(',', '.'))
  : 0

export const isNewScreeniPhones = iPhoneVersion >= 10.6

export const getStatusBarHeight = (): number => {
  return Platform.select({
    ios: isNewScreeniPhones ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0
  })
}
