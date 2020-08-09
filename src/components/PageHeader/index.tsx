import React, { useCallback } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

import backIcon from '../../assets/images/icons/back.png'
import logoImage from '../../assets/images/logo.png'

import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

interface PageHeaderProps {
  title: string
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { title } = props

  const navigation = useNavigation()

  const handleGoBack = useCallback(() => {
    navigation.navigate('landing')
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton style={styles.backButton} onPress={handleGoBack}>
          <Image source={backIcon} resizeMode='contain' />
        </BorderlessButton>

        <Image source={logoImage} resizeMode='contain' />
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default PageHeader
