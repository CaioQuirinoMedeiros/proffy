import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useMemo
} from 'react'
import { save, load } from '../utils/storage'
import { FAVORITE_KEY } from '../constants/favorites'
import { useAuth } from './auth'

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
  const { user } = useAuth()

  const FAVORITE_USER_KEY = useMemo(() => {
    return `${FAVORITE_KEY}:${user?.id}`
  }, [user])

  const addFavorite = useCallback(
    async (teacher: TeacherFavorited) => {
      const newFavorites = [
        ...favorites.filter((favorite) => favorite.id !== teacher.id),
        teacher
      ]
      setFavorites(newFavorites)
      await save(FAVORITE_USER_KEY, newFavorites)
    },
    [favorites, FAVORITE_USER_KEY]
  )

  const removeFavorite = useCallback(
    async (teacherId: string) => {
      const newFavorites = favorites.filter(
        (favorite) => favorite.id !== teacherId
      )

      setFavorites(newFavorites)
      await save(FAVORITE_USER_KEY, newFavorites)
    },
    [favorites, FAVORITE_USER_KEY]
  )

  useEffect(() => {
    ;(async () => {
      const favoritesStorage = await load<TeacherFavorited[]>(FAVORITE_USER_KEY)
      if (favoritesStorage) {
        setFavorites(favoritesStorage)
      }
    })()
  }, [FAVORITE_USER_KEY])

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
