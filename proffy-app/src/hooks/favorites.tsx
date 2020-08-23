import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect
} from 'react'
import { save, load } from '../utils/storage'
import { FAVORITE_KEY } from '../constants/favorites'

interface TeacherFavorited {
  id: string
  bio: string
  whatsapp: string
  subjects: string[]
  cost: string
  user_id: string
  user: {
    fullName: string
    firstName: string
    lastName: string
    avatar_url: string
  }
  schedules: Array<{
    id: string
    week_day: number
    from: string
    to: string
  }>
}

interface FavoritesContextData {
  favorites: TeacherFavorited[]
  addFavorite(favorite: TeacherFavorited): void
  removeFavorite(favoriteId: string): void
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData
)

const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<TeacherFavorited[]>([])

  const addFavorite = useCallback(
    async (teacher: TeacherFavorited) => {
      const newFavorites = [
        ...favorites.filter((favorite) => favorite.id !== teacher.id),
        teacher
      ]
      setFavorites(newFavorites)
      await save(FAVORITE_KEY, newFavorites)
    },
    [favorites]
  )

  const removeFavorite = useCallback(
    async (teacherId: string) => {
      const newFavorites = favorites.filter(
        (favorite) => favorite.id !== teacherId
      )

      setFavorites(newFavorites)
      await save(FAVORITE_KEY, newFavorites)
    },
    [favorites]
  )

  useEffect(() => {
    ;(async () => {
      const favoritesStorage = await load<TeacherFavorited[]>(FAVORITE_KEY)
      if (favoritesStorage) {
        setFavorites(favoritesStorage)
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
