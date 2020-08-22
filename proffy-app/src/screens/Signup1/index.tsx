import React, { useState, useCallback, useRef, useMemo } from 'react'
import { View, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Text from '../../components/Text'
import InputMajor from '../../components/InputMajor'
import PrimaryButton from '../../components/PrimaryButton'
import useKeyboard from '../../hooks/custom/useKeyboard'
import { useAuth } from '../../hooks/auth'
import IconButton from '../../components/IconButton'

import styles from './styles'

const Signup1: React.FC = () => {
  const navigation = useNavigation()
  const keyboardOpen = useKeyboard()
  const { signIn } = useAuth()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const lastNameRef = useRef<TextInput>(null)

  const isLoginFormValid = useMemo(() => {
    return !!firstName && !!lastName
  }, [firstName, lastName])

  const handleNext = useCallback(async () => {
    if (!isLoginFormValid) return

    navigation.navigate('signup_2', { firstName, lastName })
  }, [isLoginFormValid, navigation, firstName, lastName])

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
            <View style={[styles.dot, styles.filledDot]} />
            <View style={styles.dot} />
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
            text='01. Quem é você?'
          />

          <InputMajor
            label='Nome'
            style={styles.nameInput}
            value={firstName}
            onChangeText={setFirstName}
            returnKeyType='next'
            blurOnSubmit={false}
            autoCapitalize='words'
            onSubmitEditing={() => {
              lastNameRef.current?.focus()
            }}
          />
          <InputMajor
            label='Sobrenome'
            style={styles.lastNameInput}
            value={lastName}
            onChangeText={setLastName}
            blurOnSubmit={false}
            autoCapitalize='words'
            onSubmitEditing={handleNext}
            ref={lastNameRef}
          />
        </View>

        <PrimaryButton
          color='purple'
          text='Próximo'
          enabled={isLoginFormValid}
          onPress={handleNext}
        />
      </View>
    </ScrollView>
  )
}

export default Signup1
