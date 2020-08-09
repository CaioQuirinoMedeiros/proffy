import React, { useCallback, ReactNode } from 'react'
import { View, Text, Image } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

import backIcon from '../../assets/images/icons/back.png'
import logoImage from '../../assets/images/logo.png'

import styles from './styles'
import { useNavigation } from '@react-navigation/native'

interface PageHeaderProps {
  title: string
  headerRight?: ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { title, headerRight, children } = props

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

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>

      {children}
    </View>
  )
}

export default PageHeader
