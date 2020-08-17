import React from 'react'
import { Link } from 'react-router-dom'

import backIcon from '../../assets/images/icons/back.svg'
import logoImage from '../../assets/images/logo.svg'

import './styles.css'

interface PageHeaderProps {
  title: string
  description?: string
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { title, description, children } = props

  return (
    <header className='page-header'>
      <div className='top-bar-container'>
        <Link to='/'>
          <img src={backIcon} alt='Voltar' color='orange' />
        </Link>
        <img src={logoImage} alt='Logo Proffy' />
      </div>

      {children}

      {/* <div className='header-content'>
        <strong>{title}</strong>
        {!!description && <p >{description}</p>}
      </div> */}
    </header>
  )
}

export default PageHeader
