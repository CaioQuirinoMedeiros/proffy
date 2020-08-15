import React, { useCallback } from 'react'
import { View, Text, ImageBackground, Linking, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png'
import backIcon from '../../assets/images/icons/back.png'

import styles from './styles'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler'

const GiveClasses: React.FC = () => {
  const navigation = useNavigation()

  const handleLinkToWebApp = useCallback(() => {
    Linking.openURL('http://localhost:3000/give-classes')
  }, [])

  const handleGoBack = useCallback(() => {
    navigation.navigate('landing')
  }, [])

  return (
    <View style={styles.container}>
      <BorderlessButton style={styles.backButton} onPress={handleGoBack}>
        <Image source={backIcon} resizeMode='contain' />
      </BorderlessButton>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode='contain'
        source={giveClassesBackgroundImage}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web
        </Text>
      </ImageBackground>

      <RectButton style={styles.okButton} onPress={handleLinkToWebApp}>
        <Text style={styles.okButtonText}>Acessar plataforma web</Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses
