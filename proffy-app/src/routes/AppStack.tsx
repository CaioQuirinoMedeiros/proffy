import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { useAuth } from '../hooks/auth'
import { useSetup } from '../hooks/setup'

import logoImage from '../assets/images/logo.png'

import GiveClasses from '../screens/GiveClasses'
import Landing from '../screens/Landing'
import StudyTabs from './StudyTabs'
import Login from '../screens/Login'
import Success from '../screens/Success'
import Onboarding1 from '../screens/Onboarding1'
import Onboarding2 from '../screens/Onboarding2'
import Signup1 from '../screens/Signup1'
import Signup2 from '../screens/Signup2'
import ForgotPassword from '../screens/ForgotPassword'
import Profile from '../screens/Profile'

import { PrimaryButtonProps } from '../components/PrimaryButton'
import { color } from '../theme'
import Text from '../components/Text'

export type AppStackParams = {
  onboarding_1: undefined
  onboarding_2: undefined
  login: undefined
  signup_1: undefined
  signup_2: {
    firstName: string
    lastName: string
  }
  forgot_password: undefined
  landing: undefined
  give_classes: undefined
  study: undefined
  profile: undefined
  success: {
    title: string
    message: string
    buttonProps: PrimaryButtonProps
  }
}

const { Navigator, Screen } = createStackNavigator<AppStackParams>()

const AppStack: React.FC = () => {
  const { user } = useAuth()
  const { finishedIntro } = useSetup()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: color.textInPurpleBase,
        headerTitle: ({ children, ...headerProps }) => (
          <Text
            {...headerProps}
            fontFamily='Archivo_400Regular'
            text={children}
          />
        ),
        headerTitleStyle: {
          color: color.textInPurpleBase,
          fontSize: 15
        },
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: color.littlePurple,
          elevation: 0,
          borderBottomWidth: 2,
          borderBottomColor: color.purpleDark
        },
        headerRightContainerStyle: {
          paddingRight: 18
        },
        headerRight: () => <Image source={logoImage} resizeMode='contain' />
      }}
      keyboardHandlingEnabled={false}
    >
      {!!user ? (
        <>
          <Screen name='landing' component={Landing} />
          <Screen
            name='give_classes'
            component={GiveClasses}
            options={{
              headerShown: true,
              title: 'Dar aulas'
            }}
          />
          <Screen
            name='study'
            component={StudyTabs}
            options={{
              headerShown: true,
              title: 'Estudar'
            }}
          />
          <Screen
            name='profile'
            component={Profile}
            options={{
              headerShown: true,
              title: 'Meu perfil'
            }}
          />
        </>
      ) : (
        <>
          {!finishedIntro && (
            <>
              <Screen name='onboarding_1' component={Onboarding1} />
              <Screen name='onboarding_2' component={Onboarding2} />
            </>
          )}
          <Screen name='login' component={Login} />
          <Screen name='signup_1' component={Signup1} />
          <Screen name='signup_2' component={Signup2} />
          <Screen name='forgot_password' component={ForgotPassword} />
        </>
      )}

      <Screen name='success' component={Success} />
    </Navigator>
  )
}

export default AppStack
