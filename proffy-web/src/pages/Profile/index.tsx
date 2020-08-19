import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react'
import PuffLoader from 'react-spinners/PuffLoader'
import * as yup from 'yup'

import Input from '../../components/Input'
import successBackground from '../../assets/images/success-background.svg'

import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'

import './styles.css'
import api from '../../services/api'
import Header from '../../components/Header'
import { useAuth } from '../../hooks/auth'
import { FiCamera } from 'react-icons/fi'
import PrimaryButton from '../../components/PrimaryButton'
import { useToast } from '../../hooks/toast'
import getToastErrors from '../../utils/getToastErrors'

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

const TeacherForm: React.FC = () => {
  const { user, updateUser } = useAuth()
  const { addToast } = useToast()

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [old_password, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')

  const [updatingAvatar, setUpdatingAvatar] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target?.files?.length) return

      try {
        setUpdatingAvatar(true)
        const file = e.target.files[0]

        const formData = new FormData()

        formData.append('avatar', file)

        const response = await api.patch('users/avatar', formData)

        updateUser(response.data)

        addToast({ type: 'success', title: 'Avatar atualizado!' })
      } catch {
        addToast({ type: 'error', title: 'Erro ao atualizar avatar' })
      } finally {
        setUpdatingAvatar(false)
      }
    },
    [addToast, updateUser]
  )

  const handleSaveProfile = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

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
        addToast({ type: 'success', title: 'Perfil atualizado com sucesso!' })
        setPassword('')
        setPasswordConfirmation('')
        setOldPassword('')
      } catch (err) {
        const toastErrors = getToastErrors(err)
        toastErrors.forEach((toastError) => {
          addToast({
            type: toastError.type,
            title: toastError.title,
            description: toastError.description
          })
        })
      } finally {
        setSavingProfile(false)
      }
    },
    [
      firstName,
      lastName,
      email,
      password,
      updateUser,
      addToast,
      password_confirmation,
      old_password
    ]
  )

  return (
    <div id='page-profile' className='container'>
      <Header title='Meu perfil' />

      <div className='avatar-container'>
        <div
          className='avatar-container-background'
          style={{ backgroundImage: `url(${successBackground})` }}
        >
          <label htmlFor='avatar' className='avatar-wrapper'>
            <div className='avatar'>
              <img
                src={user.avatar_url || avatarPlaceholder}
                alt={user.fullName}
              />
            </div>
            <div className='avatar-icon'>
              {updatingAvatar ? (
                <PuffLoader size={30} color='#fff' />
              ) : (
                <FiCamera />
              )}
            </div>
            <input
              type='file'
              id='avatar'
              onChange={handleAvatarChange}
              disabled={updatingAvatar}
            />
          </label>

          <span>{user.fullName}</span>
        </div>
      </div>

      <main>
        <form onSubmit={handleSaveProfile}>
          <fieldset>
            <legend>Dados do perfil</legend>

            <div className='inputs-wrapper'>
              <Input
                name='firstName'
                label='Nome'
                value={firstName}
                onChangeText={setFirstName}
                containerProps={{ className: 'profile-first-name-container ' }}
              />
              <Input
                name='lastName'
                label='Sobrenome'
                value={lastName}
                onChangeText={setLastName}
                containerProps={{ className: 'profile-last-name-container ' }}
              />
            </div>

            <Input
              name='email'
              label='E-mail'
              value={email}
              onChangeText={setEmail}
            />
          </fieldset>

          <fieldset>
            <legend>Segurança</legend>
            <Input
              name='old_password'
              label='Senha atual'
              type='password'
              value={old_password}
              onChangeText={setOldPassword}
            />
            <Input
              name='password'
              label='Nova senha'
              type='password'
              value={password}
              onChangeText={setPassword}
            />
            <Input
              name='old_password'
              label='Confirmação da nova senha'
              type='password'
              value={password_confirmation}
              onChangeText={setPasswordConfirmation}
            />
          </fieldset>

          <PrimaryButton
            type='submit'
            className='save-button'
            disabled={savingProfile}
            loading={savingProfile}
          >
            Salvar
          </PrimaryButton>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm
