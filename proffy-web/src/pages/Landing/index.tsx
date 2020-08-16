import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FiPower } from 'react-icons/fi'

import logoImage from '../../assets/images/logo.svg'
import landingImage from '../../assets/images/landing.svg'
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'

import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import api from '../../services/api'

import './styles.css'
import { useAuth } from '../../hooks/auth'

const Landing: React.FC = () => {
  const { signOut, user } = useAuth()

  const [totalConnections, setTotalConnections] = useState(0)

  const getConnections = useCallback(async () => {
    try {
      const { data } = await api.get('/connections')

      setTotalConnections(data.total)
    } catch {}
  }, [])

  const handleLogout = useCallback(() => {
    signOut()
  }, [signOut])

  useEffect(() => {
    getConnections()
  }, [getConnections])

  return (
    <div id='page-landing'>
      <header className='header container'>
        <Link to='profile'>
          <img src={user.avatar_url || avatarPlaceholder} alt={user.fullName} />
          <span>{user.fullName}</span>
        </Link>
        <button className='logout-button' onClick={handleLogout}>
          <FiPower />
        </button>
      </header>

      <div id='page-landing-content' className='container'>
        <div className='logo-container'>
          <img src={logoImage} alt='Proffy logo' />
          <h2>Sua plataforma de estudo online</h2>
        </div>

        <img
          src={landingImage}
          alt='Plataforma de estudos'
          className='hero-image'
        />

        <div className='buttons-container'>
          <Link to='/study' className='study'>
            <img src={studyIcon} alt='Estudar' />
            Estudar
          </Link>
          <Link to='/give-classes' className='give-classes'>
            <img src={giveClassesIcon} alt='Dar aulas' />
            Dar aulas
          </Link>
        </div>

        <span className='total-connections'>
          Total de {totalConnections} conexões já realizadas{' '}
          <img src={purpleHeartIcon} alt='Coração roxo' />
        </span>
      </div>
    </div>
  )
}

export default Landing
