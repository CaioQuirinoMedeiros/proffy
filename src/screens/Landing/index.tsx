import React, { useState, useCallback } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import landingImage from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'

import styles from './styles'

const Landing: React.FC = () => {
  const navigation = useNavigation()

  const [totalConnections, setTotalConnections] = useState(10)

  const handleNavigateToGiveClasses = useCallback(() => {
    navigation.navigate('give_classes')
  }, [navigation])

  const handleNavigateToStudy = useCallback(() => {
    navigation.navigate('study')
  }, [navigation])

  return (
    <View style={styles.container}>
      <Image style={styles.banner} source={landingImage} />
      <Text style={styles.title}>
        Seja Bem-vindo,{'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudy}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton
          style={[styles.button, styles.buttonSecundary]}
          onPress={handleNavigateToGiveClasses}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas{' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  )
}

export default Landing
