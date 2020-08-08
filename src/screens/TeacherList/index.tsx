import React, { useCallback } from 'react'
import { View, Text, ImageBackground, Linking } from 'react-native'

import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png'

import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'

const TeacherList: React.FC = () => {
  const handleLinkToWebApp = useCallback(() => {
    Linking.openURL('http://localhost:3000/give-classes')
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista</Text>
    </View>
  )
}

export default TeacherList
