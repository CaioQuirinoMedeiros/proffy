import React, { useCallback } from 'react'
import { View, ImageBackground, Linking, Image } from 'react-native'
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'

import Text from '../../components/Text'
import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png'
import backIcon from '../../assets/images/icons/back.png'

import styles from './styles'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler'
import { AppStackParams } from '../../routes/AppStack'
import PrimaryButton from '../../components/PrimaryButton'
import IconButton from '../../components/IconButton'
import { color } from '../../theme'

const Success: React.FC = () => {
  const navigation = useNavigation()
  const { params } = useRoute<RouteProp<AppStackParams, 'success'>>()

  const handleGoBack = useCallback(() => {
    navigation.navigate('landing')
  }, [])

  console.log({ params })

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode='contain'
        source={giveClassesBackgroundImage}
      >
        <View style={styles.iconContainer}>
          <FontAwesome5 name='check' size={20} color={color.green} />
        </View>

        <Text
          style={styles.title}
          fontFamily='Archivo_700Bold'
          text={params?.title}
        />
        <Text style={styles.description} text={params?.message} />
      </ImageBackground>

      <PrimaryButton {...params?.buttonProps} />
    </View>
  )
}

export default Success
