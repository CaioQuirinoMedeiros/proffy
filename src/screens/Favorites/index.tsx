import React from 'react'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'

import PageHeader from '../../components/PageHeader'

import styles from './styles'
import TeacherItem from '../../components/TeacherItem'
import { useFavorites } from '../../hooks/favorites'

const Favorites: React.FC = () => {
  const { favorites } = useFavorites()

  return (
    <View style={styles.container}>
      <PageHeader title='Meus Proffys disponíveis' />

      <FlatList
        style={styles.teacherList}
        contentContainerStyle={styles.teacherListContainer}
        data={favorites}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyList}>
            Nenhum proffy favorito.{'\n\n'}Procure por proffys disponíveis e
            aperte no coração para salvar como favorito
          </Text>
        )}
        renderItem={({ item: teacher }) => (
          <TeacherItem
            {...teacher}
            favorited={favorites
              .map((favorite) => favorite.id)
              .includes(teacher.id)}
          />
        )}
      />
    </View>
  )
}

export default Favorites
