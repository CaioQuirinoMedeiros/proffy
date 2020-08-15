import React from 'react'

import { FavoritesProvider } from './favorites'

export const RootContextProvider: React.FC = ({ children }) => {
  return <FavoritesProvider>{children}</FavoritesProvider>
}
