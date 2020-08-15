import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import GiveClasses from '../screens/GiveClasses'
import Landing from '../screens/Landing'
import StudyTabs from './StudyTabs'

const { Navigator, Screen } = createStackNavigator()

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='landing' component={Landing} />
        <Screen name='give_classes' component={GiveClasses} />
        <Screen name='study' component={StudyTabs} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack
