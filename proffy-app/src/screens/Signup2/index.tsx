import React, { useState, useCallback, useRef, useMemo } from 'react'
import { View, TextInput, ScrollView } from 'react-native'
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp
} from '@react-navigation/native'

import Text from '../../components/Text'
import IconButton from '../../components/IconButton'
import InputMajor from '../../components/InputMajor'
import PrimaryButton from '../../components/PrimaryButton'
import useKeyboard from '../../hooks/custom/useKeyboard'
import { useAuth } from '../../hooks/auth'
import { AppStackParams } from '../../routes/AppStack'
import { getAppError } from '../../utils/getAppError'
import { useToast } from '../../hooks/toast'

import styles from './styles'

const Signup2: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AppStackParams>>()
  const { params } = useRoute<RouteProp<AppStackParams, 'signup_2'>>()
  const keyboardOpen = useKeyboard({ initialOpen: true })

  const { signUp } = useAuth()
  const { addToast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [registering, setRegistering] = useState(false)

  const passwordRef = useRef<TextInput>(null)

  const isLoginFormValid = useMemo(() => {
    return !!email && !!password
  }, [email, password])

  const handleSignup = useCallback(async () => {
    if (!isLoginFormValid) return

    try {
      setRegistering(true)
      await signUp({
        firstName: params?.firstName,
        lastName: params?.lastName,
        email,
        password
      })
      setRegistering(false)

      navigation.navigate('success', {
        title: 'Cadastro concluído!',
        message: 'Agora você faz parte da plataforma da Proffy',
        buttonProps: {
          text: 'Fazer login',
          onPress: () => {
            navigation.navigate('login')
          }
        }
      })
    } catch (err) {
      const appError = getAppError(err)
      addToast({ type: 'error', message: appError.message })
    } finally {
      setRegistering(false)
    }
  }, [isLoginFormValid, params, navigation, email, password])

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      keyboardShouldPersistTaps='handled'
    >
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <IconButton
            style={styles.backIconButton}
            onPress={navigation.goBack}
          />

          <View style={styles.dotsContainer}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.filledDot]} />
          </View>
        </View>
        {!keyboardOpen && (
          <View style={styles.titleContainer}>
            <Text
              style={styles.title}
              fontFamily='Poppins_600SemiBold'
              text={`Crie sua${'\n'}conta gratuita`}
            />
            <Text
              style={styles.intro}
              text={`Basta preencher esses dados${'\n'}e você estará conosco.`}
            />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.contentInner}>
          <Text
            style={styles.label}
            fontFamily='Poppins_600SemiBold'
            text='02. Email e Senha?'
          />

          <InputMajor
            label='E-mail'
            style={styles.nameInput}
            value={email}
            onChangeText={setEmail}
            returnKeyType='next'
            keyboardType='email-address'
            textContentType='emailAddress'
            blurOnSubmit={false}
            autoFocus
            onSubmitEditing={() => {
              passwordRef.current?.focus()
            }}
          />
          <InputMajor
            label='Senha'
            style={styles.lastNameInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType='password'
            autoCapitalize='none'
            onSubmitEditing={handleSignup}
            ref={passwordRef}
          />
        </View>

        <PrimaryButton
          text='Concluir cadastro'
          enabled={isLoginFormValid && !registering}
          loading={registering}
          onPress={handleSignup}
        />
      </View>
    </ScrollView>
  )
}

export default Signup2
