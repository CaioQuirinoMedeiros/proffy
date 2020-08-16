import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react'

import api from '../services/api'
import { TOKEN_KEY, USER_KEY } from '../constants/auth'

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
  updateUser(user: AuthState['user']): void
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
  const getInitialState = useCallback(() => {
    const tokenStorage = localStorage.getItem(TOKEN_KEY)
    const userStorage = localStorage.getItem(USER_KEY)

    if (tokenStorage && userStorage) {
      api.defaults.headers.authorization = `Bearer ${tokenStorage}`
      return { token: tokenStorage, user: JSON.parse(userStorage) }
    }

    return {} as AuthState
  }, [])

  const [data, setData] = useState<AuthState>(getInitialState())

  const signIn = useCallback(async ({ email, password, remember }) => {
    const response = await api.post<LoginResponse>('/sessions', {
      email,
      password
    })

    const { token, user } = response.data

    api.defaults.headers.authorization = `Bearer ${token}`

    if (remember) {
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(USER_KEY, JSON.stringify(user))
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
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback((user: AuthState['user']) => {
    setData((oldData) => ({ token: oldData.token, user }))

    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }, [])

  useEffect(() => {
    const interceptor = api.interceptors.response.use((response) => {
      if (response.status === 401) {
        signOut()
      }

      return response
    })

    return () => {
      api.interceptors.response.eject(interceptor)
    }
  })

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signUp, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextData => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
