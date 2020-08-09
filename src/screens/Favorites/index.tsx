import React, { useCallback } from 'react'
import { View, Text, ImageBackground, Linking } from 'react-native'

import PageHeader from '../../components/PageHeader'

import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'

const Favorites: React.FC = () => {
  return (
    <View style={styles.container}>
      <PageHeader title='Meus Proffys disponíveis' />
      <Text style={styles.title}>Favoritos</Text>
    </View>
  )
}

export default Favorites
