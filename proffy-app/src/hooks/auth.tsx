import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react'

import api from '../services/api'
import { TOKEN_KEY, USER_KEY } from '../constants/auth'
import { save, load, remove } from '../utils/storage'

interface AuthContextData {
  user: AuthState['user']
  signIn(credentials: {
    email: string
    password: string
    remember: boolean
  }): Promise<void>
  signUp(credentials: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<void>
  signOut(): void
  updateUser(user: AuthState['user']): Promise<void>
  loading: boolean
}

interface LoginResponse {
  token: string
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    fullName: string
    avatar_url: string
  }
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthState {
  token: string
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    fullName: string
    avatar_url: string
  }
}

const AuthProvider: React.FC = ({ children }) => {
  const getInitialState = useCallback(async () => {
    const tokenStorage = await load(TOKEN_KEY)
    const userStorage = await load<AuthState['user']>(USER_KEY)

    if (!!tokenStorage && !!userStorage) {
      api.defaults.headers.authorization = `Bearer ${tokenStorage}`
      return { token: tokenStorage, user: userStorage }
    }

    return {} as AuthState
  }, [])

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AuthState>({} as AuthState)

  const signIn = useCallback(async ({ email, password, remember }) => {
    const response = await api.post<LoginResponse>('/sessions', {
      email,
      password
    })

    const { token, user } = response.data

    api.defaults.headers.authorization = `Bearer ${token}`

    if (remember) {
      await save(TOKEN_KEY, token)
      await save(USER_KEY, user)
    }

    setData({ token, user })
  }, [])

  const signUp = useCallback(
    async ({ firstName, lastName, email, password }) => {
      await api.post('/users', { firstName, lastName, email, password })
    },
    []
  )

  const signOut = useCallback(() => {
    remove(TOKEN_KEY)
    remove(USER_KEY)

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(async (user: AuthState['user']) => {
    setData((oldData) => ({ token: oldData.token, user }))

    await save(USER_KEY, user)
  }, [])

  useEffect(() => {
    getInitialState().then((initialState) => {
      setData(initialState)
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signUp, signOut, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextData => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
