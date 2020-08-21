import React from 'react'

import { FavoritesProvider } from './favorites'
import { AuthProvider } from './auth'
import { SetupProvider } from './setup'

export const RootContextProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <SetupProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </SetupProvider>
    </AuthProvider>
  )
}
