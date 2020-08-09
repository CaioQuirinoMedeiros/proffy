import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import TeacherList from '../screens/TeacherList'
import Favorites from '../screens/Favorites'

const { Navigator, Screen } = createBottomTabNavigator()

const StudyTabs: React.FC = () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264d',
        keyboardHidesTabBar: true
      }}
    >
      <Screen
        name='teacher_list'
        component={TeacherList}
        options={{
          title: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name='ios-easel' color={focused ? '#8257e5' : color} size={size} />
          )
        }}
      />
      <Screen
        name='favorites'
        component={Favorites}
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name='ios-heart' color={focused ? '#8257e5' : color} size={size} />
          )
        }}
      />
    </Navigator>
  )
}

export default StudyTabs
