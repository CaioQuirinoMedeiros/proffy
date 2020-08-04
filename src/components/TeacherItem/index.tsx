import React, { useMemo } from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import { formatarMoeda } from '../../utils/currency'

interface TeacherItemProps {
  teacher: {
    id: string
    nome: string
    materia: string
    descricao: string
    preco: number
    avatar: string
  }
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
  const { teacher } = props

  const preco = useMemo(() => {
    return formatarMoeda(teacher.preco)
  }, [teacher])

  return (
    <article className='teacher-item'>
      <header>
        <img src={teacher.avatar} alt={teacher.nome} />
        <div>
          <strong>{teacher.nome}</strong>
          <span>{teacher.materia}</span>
        </div>
      </header>

      <p>{teacher.descricao}</p>

      <footer>
        <p>
          Preço/hora
          <strong>{preco}</strong>
        </p>
        <button type='button'>
          <img src={whatsappIcon} alt='Whatsapp' />
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem
