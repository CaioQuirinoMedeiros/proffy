import React, { useState, useCallback, useEffect } from 'react'
import { View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons/'

import Text from '../../components/Text'

import studyIcon from '../../assets/images/icons/study.png'
import onboardingImage from '../../assets/images/onboarding.png'

import styles from './styles'
import { color } from '../../theme'
import { BorderlessButton } from 'react-native-gesture-handler'

const Onboarding1: React.FC = () => {
  const navigation = useNavigation()

  const avancar = useCallback(() => {
    navigation.navigate('onboarding_2')
  }, [navigation])

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode='repeat'
        source={onboardingImage}
      >
        <Image style={styles.bannerImage} source={studyIcon} />
      </ImageBackground>

      <View style={styles.content}>
        <Text
          style={styles.number}
          fontFamily='Archivo_400Regular'
          text='01.'
        />
        <Text
          style={styles.heading}
          text='Encontre vários professores para ensinar você'
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.filledDot]} />
          <View style={styles.dot} />
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

export default Onboarding1
