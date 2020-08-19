import React from 'react'
import { Link } from 'react-router-dom'
import { FiCheckSquare } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'

import successBackground from '../../assets/images/success-background.svg'

import './styles.css'
import PrimaryButton from '../../components/PrimaryButton'

interface SuccessState {
  title: string
  message: string
  button: {
    text: string
    path: string
  }
}

const Success: React.FC = () => {
  const location = useLocation<SuccessState>()

  return (
    <main id='page-success'>
      <div
        className='success-background'
        style={{ backgroundImage: `url(${successBackground})` }}
      >
        <FiCheckSquare />

        <div>
          <h1>{location.state?.title}</h1>
          <p>{location.state?.message}</p>
        </div>

        <Link to={location.state?.button.path}>
          <PrimaryButton type='button'>
            {location.state?.button.text}
          </PrimaryButton>
        </Link>
      </div>
    </main>
  )
}

export default Success
