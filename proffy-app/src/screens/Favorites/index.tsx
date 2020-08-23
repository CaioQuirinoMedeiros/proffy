import React from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import Text from '../../components/Text'
import TeacherItem from '../../components/TeacherItem'
import { useFavorites } from '../../hooks/favorites'

import styles from './styles'

const Favorites: React.FC = () => {
  const { favorites } = useFavorites()

  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <Text
          style={styles.title}
          fontFamily='Archivo_700Bold'
          text={`Meus Proffys${'\n'}Favoritos`}
        />
      </View>

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
            teacherClass={teacher}
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
