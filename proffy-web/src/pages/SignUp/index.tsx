import React, { useState, useCallback, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'

import logoImage from '../../assets/images/logo.svg'
import successBackground from '../../assets/images/success-background.svg'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css'
import InputMajor from '../../components/InputMajor'
import { useToast } from '../../hooks/toast'
import { useAuth } from '../../hooks/auth'
import getToastErrors from '../../utils/getToastErrors'

const signupSchema = yup.object().shape({
  firstName: yup.string().required('Preencha o seu nome'),
  lastName: yup.string().required('Preencha o seu sobrenome'),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('Preencha seu email'),
  password: yup.string().required('Preencha uma senha')
})

const Login: React.FC = () => {
  const { addToast } = useToast()
  const { signUp } = useAuth()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()
  const handleLoginSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        await signupSchema.validate(
          { firstName, lastName, email, password },
          { abortEarly: false }
        )

        await signUp({ firstName, lastName, email, password })

        history.push('/signup/success', {
          title: 'Cadastro concluído',
          message:
            'Agora você faz parte da plataforma do Proffy.\nTenha uma ótima experiência',
          button: {
            text: 'Fazer login',
            path: '/login'
          }
        })
      } catch (err) {
        const toastErrors = getToastErrors(err)

        toastErrors.forEach((toastError) => {
          addToast({
            type: toastError.type,
            title: toastError.title,
            description: toastError.description
          })
        })
      }
    },
    [addToast, email, firstName, history, lastName, password, signUp]
  )

  return (
    <div id='page-login'>
      <section className='signup'>
        <Link className='back-button' to='/login'>
          <img src={backIcon} alt='Back' />
        </Link>

        <form onSubmit={handleLoginSubmit}>
          <legend>Cadastro</legend>
          <p>
            Preencha os dados abaixo
            <br />
            para começar
          </p>
          <InputMajor
            label='Nome'
            name='firstName'
            value={firstName}
            onChangeText={setFirstName}
            containerProps={{ id: 'input-firstName-container' }}
          />
          <InputMajor
            label='Sobrenome'
            name='lastName'
            value={lastName}
            onChangeText={setLastName}
            containerProps={{ id: 'input-lastName-container' }}
          />
          <InputMajor
            label='Email'
            name='email'
            value={email}
            onChangeText={setEmail}
            containerProps={{ id: 'input-email-container' }}
          />
          <InputMajor
            label='Senha'
            type='password'
            name='password'
            placeholder='Senha'
            value={password}
            onChangeText={setPassword}
            containerProps={{ id: 'input-password-container' }}
          />

          <button type='submit'>Concluir cadastro</button>
        </form>
      </section>

      <section className='hero'>
        <div
          className='hero-background'
          style={{ backgroundImage: `url(${successBackground})` }}
        >
          <div>
            <img src={logoImage} alt='Proffy logo' />
            <h2>
              Sua plataforma de
              <br />
              estudos online
            </h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
