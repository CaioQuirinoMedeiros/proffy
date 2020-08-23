import React from 'react'
import { View, ImageBackground } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'

import Text from '../../components/Text'
import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png'

import PrimaryButton from '../../components/PrimaryButton'
import { AppStackParams } from '../../routes/AppStack'
import { color } from '../../theme'

import styles from './styles'

const Success: React.FC = () => {
  const { params } = useRoute<RouteProp<AppStackParams, 'success'>>()

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
