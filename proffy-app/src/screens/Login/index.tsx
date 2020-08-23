import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  Alert
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'

import Text from '../../components/Text'

import logoImage from '../../assets/images/logo.png'
import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png'

import styles from './styles'
import Input from '../../components/Input'
import InputMajor from '../../components/InputMajor'
import Checkbox from '../../components/Checkbox'
import PrimaryButton from '../../components/PrimaryButton'
import useKeyboard from '../../hooks/custom/useKeyboard'
import { useAuth } from '../../hooks/auth'
import { AppStackParams } from '../../routes/AppStack'

const Login: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AppStackParams, 'login'>>()
  const keyboardOpen = useKeyboard()
  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [fetching, setFetching] = useState(false)

  const passwordRef = useRef<TextInput>(null)

  const isLoginFormValid = useMemo(() => {
    return !!email && !!password
  }, [email, password])

  const navigateToSignup = useCallback(() => {
    navigation.navigate('signup_1')
  }, [])

  const navigateToForgotPassword = useCallback(() => {
    navigation.navigate('forgot_password')
  }, [])

  const handleLogin = useCallback(async () => {
    if (!isLoginFormValid) return

    try {
      setFetching(true)
      await signIn({ email, password, remember })
      setFetching(false)
    } catch {
    } finally {
      setFetching(false)
    }
  }, [isLoginFormValid, signIn, email, password, remember])

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      keyboardShouldPersistTaps='handled'
    >
      <ImageBackground
        style={styles.imageBackground}
        resizeMode='repeat'
        source={giveClassesBackgroundImage}
      >
        {!keyboardOpen && (
          <View>
            <Image
              style={styles.logoImage}
              source={logoImage}
              resizeMode='contain'
            />
            <Text
              style={styles.intro}
              text={`Sua plataforma de${'\n'}estudos online`}
            />
          </View>
        )}
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.contentInner}>
          <View style={styles.headerTitleWrapper}>
            <Text
              style={styles.heading}
              fontFamily='Poppins_600SemiBold'
              text='Fazer login'
            />

            <TouchableOpacity
              style={styles.newAccountButton}
              onPress={navigateToSignup}
            >
              <Text style={styles.newAccount} text='Criar uma conta' />
            </TouchableOpacity>
          </View>

          <InputMajor
            label='E-mail'
            style={styles.emailInput}
            value={email}
            onChangeText={setEmail}
            returnKeyType='next'
            keyboardType='email-address'
            textContentType='emailAddress'
            blurOnSubmit={false}
            autoCapitalize='none'
            onSubmitEditing={() => {
              passwordRef.current?.focus()
            }}
          />
          <InputMajor
            label='Senha'
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType='password'
            autoCapitalize='none'
            onSubmitEditing={handleLogin}
            ref={passwordRef}
          />

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.rememberContainer}
              onPress={() => {
                setRemember(!remember)
              }}
            >
              <Checkbox value={remember} />
              <Text style={styles.rememberText} text='Lembrar-me' />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={navigateToForgotPassword}
            >
              <Text style={styles.forgotPassword} text='Esqueci minha senha' />
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton
          text='Entrar'
          enabled={isLoginFormValid && !fetching}
          loading={fetching}
          onPress={handleLogin}
        />
      </View>
    </ScrollView>
  )
}

export default Login
