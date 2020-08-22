import React from 'react'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

import { FavoritesProvider } from './favorites'
import { AuthProvider } from './auth'
import { SetupProvider } from './setup'
import { ToastProvider } from './toast'

export const RootContextProvider: React.FC = ({ children }) => {
  return (
    <ActionSheetProvider>
      <AuthProvider>
        <SetupProvider>
          <FavoritesProvider>
            <ToastProvider>{children}</ToastProvider>
          </FavoritesProvider>
        </SetupProvider>
      </AuthProvider>
    </ActionSheetProvider>
  )
}
