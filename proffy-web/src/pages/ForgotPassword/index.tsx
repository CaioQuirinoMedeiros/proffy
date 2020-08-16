import React, { useState, useCallback, FormEvent, useMemo } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'

import logoImage from '../../assets/images/logo.svg'
import successBackground from '../../assets/images/success-background.svg'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css'
import InputMajor from '../../components/InputMajor'
import PrimaryButton from '../../components/PrimaryButton'
import { useToast } from '../../hooks/toast'
import getToastErrors from '../../utils/getToastErrors'
import api from '../../services/api'

const Login: React.FC = () => {
  const { addToast } = useToast()

  const [email, setEmail] = useState('')
  const [fetching, setFecthing] = useState(false)

  const history = useHistory()

  const isEmailValid = useMemo(() => {
    return yup.string().email().required().isValidSync(email)
  }, [email])

  const handleForgotPasswordSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        setFecthing(true)
        await api.post('password/reset', { email })
        setFecthing(false)

        history.push('/signup/success', {
          title: 'Redefinição enviada!',
          message:
            'Boa, agora é só checar o e-mail que foi enviado para você com sua nova senha',
          button: {
            text: 'Voltar ao login',
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
    [addToast, email, history]
  )

  return (
    <div id='page-forgot-password'>
      <section className='forgot-password'>
        <Link className='back-button' to='/login'>
          <img src={backIcon} alt='Back' />
        </Link>

        <form onSubmit={handleForgotPasswordSubmit}>
          <legend>
            Eita, esqueceu
            <br />
            sua senha?
          </legend>
          <p>Não esquenta, vamos dar um jeito nisso.</p>

          <InputMajor
            label='E-mail'
            name='email'
            value={email}
            onChangeText={setEmail}
            containerProps={{ id: 'input-email-container' }}
          />

          <PrimaryButton
            type='submit'
            disabled={!isEmailValid || fetching}
            loading={fetching}
          >
            Enviar
          </PrimaryButton>
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
