import React, { useState, useEffect, useCallback, FormEvent } from 'react'
import { Link } from 'react-router-dom'

import logoImage from '../../assets/images/logo.svg'
import successBackground from '../../assets/images/success-background.svg'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css'
import InputMajor from '../../components/InputMajor'
import { useToast } from '../../hooks/toast'
import { useAuth } from '../../hooks/auth'

const Login: React.FC = () => {
  const { addToast } = useToast()
  const { signIn } = useAuth()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  useEffect(() => {
    console.log({ remember })
  }, [remember])

  const handleLoginSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        await signIn({ email, password })
      } catch {
        addToast({
          title: 'Erro ao fazer login',
          description: 'Verifique suas credenciais e tente novamente'
        })
      }
    },
    [email, password, addToast, signIn]
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
