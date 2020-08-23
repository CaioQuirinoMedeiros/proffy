import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker'

import Text from '../../components/Text'

import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png'

import styles from './styles'
import Input from '../../components/Input'
import PrimaryButton from '../../components/PrimaryButton'
import { useAuth } from '../../hooks/auth'
import { AppStackParams } from '../../routes/AppStack'
import { color, spacing } from '../../theme'
import api from '../../services/api'
import { alert } from '../../utils/alert'
import { getErrorsObject } from '../../utils/getValidationError'
import { getAppError } from '../../utils/getAppError'
import { useToast } from '../../hooks/toast'
import AvatarImage from '../../components/AvatarImage'

interface UpdateUserData {
  firstName: string
  lastName: string
  email: string
  old_password?: string
  password?: string
  password_confirmation?: string
}

const profileSchema = yup.object().shape({
  firstName: yup.string().required('Nome não pode ser vazio'),
  lastName: yup.string().required('Sobrenome não pode ser vazio'),
  email: yup
    .string()
    .required('O e-mail é obrigatório')
    .email('Digite um e-mail válido'),
  old_password: yup
    .string()
    .when('password', (password: string, schema: yup.StringSchema) =>
      password ? schema.required('Preencha sua senha atual') : schema
    ),
  password: yup.string(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Confirmação de senha incorreta')
})

interface ImageDTO {
  uri: string
  type?: any
}

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AppStackParams, 'login'>>()
  const { user, updateUser } = useAuth()
  const { addToast } = useToast()
  const { showActionSheetWithOptions } = useActionSheet()

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [old_password, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')

  const [updatingAvatar, setUpdatingAvatar] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)

  const lastNameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const oldPasswordRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const passwordConfirmationRef = useRef<TextInput>(null)

  const isLoginFormValid = useMemo(() => {
    return !!email && !!password
  }, [email, password])

  const errors: { [key: string]: string } = useMemo(() => {
    try {
      profileSchema.validateSync(
        {
          firstName,
          lastName,
          email,
          old_password,
          password,
          password_confirmation
        },
        { abortEarly: false }
      )

      return {}
    } catch (err) {
      return getErrorsObject(err)
    }
  }, [
    firstName,
    lastName,
    email,
    old_password,
    password,
    password_confirmation
  ])

  const uploadAvatar = useCallback(
    async (image: ImageDTO) => {
      try {
        setUpdatingAvatar(true)
        const formData = new FormData()

        const filePaths = image.uri.split('/')

        formData.append('avatar', {
          type: 'image/jpeg',
          // @ts-ignore
          uri: image.uri,
          name: filePaths[filePaths.length - 1]
        })

        const response = await api.patch('/users/avatar', formData)

        updateUser(response.data)

        addToast({ type: 'success', message: 'Foto de perfil atualizada!' })

      } catch (err) {
        const appError = getAppError(err)
        addToast({ type: 'success', message: appError.message })
      } finally {
        setUpdatingAvatar(false)
      }
    },
    [addToast, updateUser]
  )

  const handleOpenGallery = useCallback(async () => {
    try {
      const { granted } = await ImagePicker.requestCameraRollPermissionsAsync()

      if (!granted) {
        return
      }

      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      })

      if (image.cancelled) return

      await uploadAvatar(image)
    } catch {}
  }, [uploadAvatar])

  const handleCamera = useCallback(async () => {
    try {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync()

      if (!granted) {
        return
      }

      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1]
      })

      if (image.cancelled) return

      await uploadAvatar(image)
    } catch {}
  }, [uploadAvatar])

  const handleRemoveAvatar = useCallback(async () => {
    try {
      setUpdatingAvatar(true)
      const response = await api.delete('/users/avatar')

      updateUser(response.data)

      addToast({
        type: 'success',
        message: 'Foto de perfil removida com sucesso'
      })
    } catch (err) {
      const appError = getAppError(err)
      addToast({ type: 'success', message: appError.message })
    } finally {
      setUpdatingAvatar(false)
    }
  }, [addToast])

  const handleUpdateAvatar = useCallback(async () => {
    try {
      showActionSheetWithOptions(
        {
          options: [
            'Abrir galeria',
            'Tirar uma foto',
            'Remover foto',
            'Cancelar'
          ],
          cancelButtonIndex: 3,
          destructiveButtonIndex: 2,
          destructiveColor: color.red,
          message: 'Escolha uma das opções',
          title: 'Atualizar foto de perfil',
          textStyle: {
            fontFamily: 'Poppins_400Regular',
            color: color.textTitulo,
            fontSize: 14
          },
          containerStyle: {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingBottom: spacing[3]
          },
          titleTextStyle: {
            fontFamily: 'Archivo_700Bold',
            fontSize: 18,
            color: color.textTitulo
          },
          messageTextStyle: {
            fontFamily: 'Archivo_400Regular',
            color: color.textComplement
          },
          showSeparators: true,
          separatorStyle: { marginHorizontal: 18 },
          tintColor: color.textBase,
          tintIcons: true,
          icons: [
            <FontAwesome5 name='images' size={20} color={color.textTitulo} />,
            <FontAwesome5 name='camera' size={20} color={color.textTitulo} />,
            <FontAwesome5 name='trash' size={20} color={color.textTitulo} />,
            <FontAwesome5 name='times' size={20} color={color.textTitulo} />
          ]
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            handleOpenGallery()
          } else if (buttonIndex === 1) {
            handleCamera()
          } else if (buttonIndex === 2) {
            handleRemoveAvatar()
          }
        }
      )
    } catch {
    }
  }, [
    showActionSheetWithOptions,
    handleOpenGallery,
    handleCamera,
    handleRemoveAvatar
  ])

  const handleSaveProfile = useCallback(async () => {
    try {
      setSavingProfile(true)

      await profileSchema.validate(
        {
          firstName,
          lastName,
          email,
          password,
          password_confirmation,
          old_password
        },
        { abortEarly: false }
      )

      let updateUserData: UpdateUserData = { firstName, lastName, email }
      if (password) {
        updateUserData = {
          ...updateUserData,
          password,
          password_confirmation,
          old_password
        }
      }
      const { data } = await api.put('profile', updateUserData)

      updateUser(data)
      setPassword('')
      setPasswordConfirmation('')
      setOldPassword('')
      addToast({ type: 'success', message: 'Perfil atualizado!' })
    } catch (err) {
      const appError = getAppError(err)
      alert({ title: appError.title, message: appError.message })
    } finally {
      setSavingProfile(false)
    }
  }, [
    firstName,
    lastName,
    email,
    password,
    updateUser,
    password_confirmation,
    old_password
  ])

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        style={styles.topContainer}
        resizeMode='repeat'
        source={giveClassesBackgroundImage}
      >
        <TouchableOpacity
          style={styles.avatarContainer}
          activeOpacity={0.7}
          onPress={handleUpdateAvatar}
        >
          <AvatarImage user={user} />
          <View style={styles.cameraIconButton}>
            {updatingAvatar ? (
              <ActivityIndicator size={20} color={color.white} />
            ) : (
              <FontAwesome5 name='camera' size={20} color={color.white} />
            )}
          </View>
        </TouchableOpacity>
        <Text
          style={styles.userName}
          fontFamily='Archivo_700Bold'
          text={user.fullName}
        />
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.formContainer}>
          <Text
            style={styles.legend}
            fontFamily='Archivo_700Bold'
            text='Dados do perfil'
          />

          <Input
            label='Nome'
            value={firstName}
            placeholder='Nome'
            onChangeText={setFirstName}
            returnKeyType='next'
            blurOnSubmit={false}
            error={errors.firstName}
            onSubmitEditing={() => {
              lastNameRef.current?.focus()
            }}
          />
          <Input
            label='Sobrenome'
            value={lastName}
            placeholder='Sobrenome'
            onChangeText={setLastName}
            returnKeyType='next'
            blurOnSubmit={false}
            error={errors.lastName}
            onSubmitEditing={() => {
              emailRef.current?.focus()
            }}
            ref={lastNameRef}
          />
          <Input
            label='E-mail'
            value={email}
            placeholder='E-mail'
            onChangeText={setEmail}
            returnKeyType='next'
            keyboardType='email-address'
            textContentType='emailAddress'
            blurOnSubmit={false}
            autoCapitalize='none'
            error={errors.email}
            onSubmitEditing={() => {
              oldPasswordRef.current?.focus()
            }}
            ref={emailRef}
          />

          <Text
            style={styles.legend}
            fontFamily='Archivo_700Bold'
            text='Segurança'
          />

          <Input
            label='Senha atual'
            value={old_password}
            placeholder='Senha atual'
            onChangeText={setOldPassword}
            returnKeyType='next'
            textContentType='password'
            secureTextEntry
            blurOnSubmit={false}
            error={errors.old_password}
            onSubmitEditing={() => {
              passwordRef.current?.focus()
            }}
            ref={oldPasswordRef}
          />
          <Input
            label='Nova senha'
            value={password}
            placeholder='Nova senha'
            onChangeText={setPassword}
            returnKeyType='next'
            textContentType='password'
            secureTextEntry
            blurOnSubmit={false}
            error={errors.password}
            onSubmitEditing={() => {
              passwordConfirmationRef.current?.focus()
            }}
            ref={passwordRef}
          />
          <Input
            label='Confirmação da nova senha'
            value={password_confirmation}
            placeholder='Confirmação da nova senha'
            textContentType='password'
            secureTextEntry
            onChangeText={setPasswordConfirmation}
            blurOnSubmit={false}
            error={errors.password_confirmation}
            ref={passwordConfirmationRef}
          />

          <PrimaryButton
            text='Salvar'
            style={styles.saveButton}
            enabled={!Object.keys(errors).length && !savingProfile}
            loading={savingProfile}
            onPress={handleSaveProfile}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default Profile
