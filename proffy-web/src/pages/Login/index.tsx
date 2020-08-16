import React, { useState, useEffect, useCallback, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'

import logoImage from '../../assets/images/logo.svg'
import successBackground from '../../assets/images/success-background.svg'
import api from '../../services/api'

import './styles.css'
import InputMajor from '../../components/InputMajor'
import Checkbox from '../../components/Checkbox'
import { useToast } from '../../hooks/toast'
import { useAuth } from '../../hooks/auth'

const Login: React.FC = () => {
  const { addToast } = useToast()
  const { signIn } = useAuth()

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

      <section className='login'>
        <form onSubmit={handleLoginSubmit}>
          <legend>Fazer login</legend>
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

          <div className='options-container'>
            <Checkbox
              name='remember'
              label='Lembrar-me'
              checked={remember}
              onChangeValue={setRemember}
            />
            <Link to='/forgot-password'>Esqueci minha senha</Link>
          </div>

          <button type='submit'>Entrar</button>
        </form>

        <div className='login-footer'>
          <div>
            <span>Não tem conta?</span>
            <Link to='signup'>Cadastre-se</Link>
          </div>

          <span>
            É de graça
            <FiHeart color='#8257e5' style={{ marginLeft: 6 }} />
          </span>
        </div>
      </section>
    </div>
  )
}

export default Login
