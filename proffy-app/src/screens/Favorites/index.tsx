import React, { useEffect } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'

import PageHeader from '../../components/PageHeader'
import Text from '../../components/Text'

import styles from './styles'
import TeacherItem from '../../components/TeacherItem'
import { useFavorites } from '../../hooks/favorites'
import { remove } from '../../utils/storage'
import { FAVORITE_KEY } from '../../constants/favorites'

const Favorites: React.FC = () => {
  const { favorites } = useFavorites()

  console.log('favorites', favorites)

  useEffect(() => {
    const clear = async () => {
      await remove(FAVORITE_KEY)
    }
    clear()
  }, [])

  return (
    <View style={styles.container}>
      <PageHeader title='Meus Proffys Favoritos' />

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
          <Text text='Opa' />
          // <TeacherItem
          //   teacherClass={teacher}
          //   favorited={favorites
          //     .map((favorite) => favorite.id)
          //     .includes(teacher.id)}
          // />
        )}
      />
    </View>
  )
}

export default Favorites
