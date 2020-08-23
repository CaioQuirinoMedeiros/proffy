import React, { useState, useCallback, useRef, useMemo } from 'react'
import {
  View,
  Image,
  ImageBackground,
  TextInput,
  ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as yup from 'yup'

import logoImage from '../../assets/images/logo.png'
import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png'

import Text from '../../components/Text'
import IconButton from '../../components/IconButton'
import InputMajor from '../../components/InputMajor'
import PrimaryButton from '../../components/PrimaryButton'
import useKeyboard from '../../hooks/custom/useKeyboard'
import api from '../../services/api'

import styles from './styles'

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation()
  const keyboardOpen = useKeyboard()

  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)

  const passwordRef = useRef<TextInput>(null)

  const isEmailValid = useMemo(() => {
    return yup.string().email().required().isValidSync(email)
  }, [email])

  const handleForgotPassword = useCallback(async () => {
    if (!isEmailValid) return

    try {
      setSending(true)
      await api.post('password/reset', { email })
      setSending(false)

      navigation.navigate('success', {
        title: 'Redefinição enviada!',
        message:
          'Boa, agora é só checar o e-mail que foi enviado para você com sua nova senha e aproveitar os estudos.',
        buttonProps: {
          text: 'Voltar ao login',
          onPress: () => {
            navigation.navigate('login')
          }
        }
      })
    } catch {
    } finally {
      setSending(false)
    }
  }, [isEmailValid, email])

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
          <IconButton
            style={styles.backIconButton}
            onPress={navigation.goBack}
          />

          <View>
            <Text
              style={styles.heading}
              fontFamily='Poppins_600SemiBold'
              text='Esqueceu sua senha?'
            />

            <Text
              style={styles.message}
              text={`Não esquenta,${'\n'}vamos dar um jeito nisso.`}
            />
          </View>

          <InputMajor
            label='E-mail'
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
        </View>

        <PrimaryButton
          text='Enviar'
          enabled={isEmailValid && !sending}
          loading={sending}
          onPress={handleForgotPassword}
        />
      </View>
    </ScrollView>
  )
}

export default ForgotPassword
