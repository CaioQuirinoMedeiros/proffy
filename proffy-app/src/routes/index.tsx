import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from '../hooks/auth'
import { useSetup } from '../hooks/setup'

import AppStack from './AppStack'

const RootNavigator: React.FC = () => {
  const { loading: loadingAuth } = useAuth()
  const { loading: loadingSetup } = useSetup()

  if (loadingAuth || loadingSetup) return null

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  )
}

export default RootNavigator
