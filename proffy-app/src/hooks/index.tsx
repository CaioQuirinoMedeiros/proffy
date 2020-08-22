import React from 'react'

import { FavoritesProvider } from './favorites'
import { AuthProvider } from './auth'
import { SetupProvider } from './setup'
import { ToastProvider } from './toast'

export const RootContextProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <SetupProvider>
        <FavoritesProvider>
          <ToastProvider>{children}</ToastProvider>
        </FavoritesProvider>
      </SetupProvider>
    </AuthProvider>
  )
}
