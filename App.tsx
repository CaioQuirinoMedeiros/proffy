import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { AppLoading } from 'expo'
import { Platform, UIManager } from 'react-native'
import {
  Archivo_400Regular,
  Archivo_700Bold,
  useFonts
} from '@expo-google-fonts/archivo'
import {
  Poppins_400Regular,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins'

import { RootContextProvider } from './src/hooks'
import AppStack from './src/routes/AppStack'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <RootContextProvider>
      <StatusBar style='light' />
      <AppStack />
    </RootContextProvider>
  )
}
