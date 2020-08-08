import React, { useCallback } from 'react'
import { View, Text, ImageBackground, Linking } from 'react-native'

import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png'

import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'

const GiveClasses: React.FC = () => {
  const handleLinkToWebApp = useCallback(() => {
    Linking.openURL('http://localhost:3000/give-classes')
  }, [])

  return (
    <View style={styles.container}>
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
