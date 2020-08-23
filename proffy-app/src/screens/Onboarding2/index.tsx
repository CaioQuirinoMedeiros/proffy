import React, { useCallback } from 'react'
import { View, Image, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons/'
import { BorderlessButton } from 'react-native-gesture-handler'

import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import onboardingImage from '../../assets/images/onboarding.png'

import Text from '../../components/Text'
import { color } from '../../theme'
import { useSetup } from '../../hooks/setup'

import styles from './styles'

const Onboarding2: React.FC = () => {
  const navigation = useNavigation()
  const { finishIntro } = useSetup()

  const avancar = useCallback(() => {
    finishIntro()
    navigation.navigate('login')
  }, [navigation])

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode='repeat'
        source={onboardingImage}
      >
        <Image style={styles.bannerImage} source={giveClassesIcon} />
      </ImageBackground>

      <View style={styles.content}>
        <Text
          style={styles.number}
          fontFamily='Archivo_400Regular'
          text='02.'
        />
        <Text
          style={styles.heading}
          text='Ou dê aulas sobre o que você mais conhece'
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.filledDot]} />
        </View>

        <BorderlessButton style={styles.nextButton} onPress={avancar}>
          <FontAwesome5
            name='long-arrow-alt-right'
            size={32}
            color={color.textComplement}
          />
        </BorderlessButton>
      </View>
    </View>
  )
}

export default Onboarding2
