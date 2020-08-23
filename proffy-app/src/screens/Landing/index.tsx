import React, { useState, useCallback, useEffect } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'

import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import landingImage from '../../assets/images/landing.png'

import Text from '../../components/Text'
import IconButton from '../../components/IconButton'
import AvatarImage from '../../components/AvatarImage'
import api from '../../services/api'
import { color } from '../../theme'
import { useAuth } from '../../hooks/auth'
import { AppStackParams } from '../../routes/AppStack'

import styles from './styles'

const Landing: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AppStackParams>>()
  const { user, signOut } = useAuth()

  const [totalConnections, setTotalConnections] = useState(10)

  const getConnections = useCallback(async () => {
    try {
      const { data } = await api.get('/connections')

      setTotalConnections(data.total)
    } catch {}
  }, [])

  useEffect(() => {
    getConnections()
  }, [])

  const navigateToProfile = useCallback(async () => {
    navigation.navigate('profile')
  }, [navigation])

  const handleLogout = useCallback(async () => {
    signOut()
  }, [signOut])

  const handleNavigateToGiveClasses = useCallback(() => {
    navigation.navigate('give_classes')
  }, [navigation])

  const handleNavigateToStudy = useCallback(() => {
    navigation.navigate('study')
  }, [navigation])

  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={navigateToProfile}
          >
            <AvatarImage size={46} user={user} />
            <Text style={styles.userName} text={user?.fullName} />
          </TouchableOpacity>

          <IconButton
            style={styles.logoutIconButton}
            name='power-off'
            size={16}
            color={color.textInPurpleBase}
            onPress={handleLogout}
          />
        </View>
        <Image style={styles.banner} source={landingImage} />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>
          Seja Bem-vindo,{'\n'}
          <Text fontFamily='Poppins_600SemiBold'>O que deseja fazer?</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.button, styles.buttonPrimary]}
            onPress={handleNavigateToStudy}
          >
            <Image source={studyIcon} />
            <Text
              style={styles.buttonText}
              fontFamily='Archivo_700Bold'
              text='Estudar'
            />
          </RectButton>
          <RectButton
            style={[styles.button, styles.buttonSecundary]}
            onPress={handleNavigateToGiveClasses}
          >
            <Image source={giveClassesIcon} />
            <Text
              style={styles.buttonText}
              fontFamily='Archivo_700Bold'
              text='Dar aulas'
            />
          </RectButton>
        </View>

        <Text style={styles.totalConnections}>
          Total de {totalConnections} conexões já realizadas{' '}
          <FontAwesome5 name='heart' color={color.purple} />
        </Text>
      </View>
    </View>
  )
}

export default Landing
