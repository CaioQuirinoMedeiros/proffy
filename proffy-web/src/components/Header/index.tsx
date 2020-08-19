import React from 'react'
import { Link } from 'react-router-dom'

import backIcon from '../../assets/images/icons/back.svg'
import logoImage from '../../assets/images/logo.svg'

import './styles.css'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = (props) => {
  const { title } = props

  return (
    <header id='header'>
      <div className='header-container'>
        <Link to='/'>
          <img src={backIcon} alt='Voltar' color='orange' />
        </Link>
        <span>{title}</span>
        <img src={logoImage} alt='Logo Proffy' />
      </div>
    </header>
  )
}

export default Header
