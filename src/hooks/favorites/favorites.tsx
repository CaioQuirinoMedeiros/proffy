import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

interface FavoritesContextData {
  favorites: Array<Teacher>
  addFavorite(favorite: Teacher): void
  removeFavorite(favoriteId: number): void
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData
)

const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Teacher[]>([])

  const addFavorite = useCallback(async (teacher: Teacher) => {
    const newFavorites = [
      ...favorites.filter((favorite) => favorite.id !== teacher.id),
      teacher
    ]
    setFavorites(newFavorites)
    console.log({ newFavorites })
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites))
  }, [favorites])

  const removeFavorite = useCallback(
    async (teacherId: number) => {
      const newFavorites = favorites.filter(
        (favorite) => favorite.id !== teacherId
      )

      setFavorites(newFavorites)
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites))
    },
    [favorites]
  )

  useEffect(() => {
    ;(async () => {
      const favoritesStorage = await AsyncStorage.getItem('favorites')
      if (favoritesStorage) {
        setFavorites(JSON.parse(favoritesStorage))
      }
    })()
  }, [])

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

const useFavorites = (): FavoritesContextData => {
  return useContext(FavoritesContext)
}

export { FavoritesProvider, useFavorites }
