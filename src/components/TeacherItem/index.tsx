import React, { useMemo, useCallback } from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import { formatarMoeda } from '../../utils/currency'
import { subjectsMapping } from '../../constants/subjects'
import api from '../../services/api'

interface TeacherItemProps {
  teacher: {
    id: number
    name: string
    subject: keyof typeof subjectsMapping
    bio: string
    cost: number
    avatar: string
    whatsapp: string
  }
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
  const { teacher } = props

  const preco = useMemo(() => {
    return formatarMoeda(teacher.cost)
  }, [teacher])

  const createNewConnection = useCallback(async () => {
    try {
      await api.post('/connections', { user_id: teacher.id })
    } catch {}
  }, [teacher])

  return (
    <article className='teacher-item'>
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{subjectsMapping[teacher.subject]}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>{preco}</strong>
        </p>
        <a
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}? text=sua%20mensagem.`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={whatsappIcon} alt='Whatsapp' />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default TeacherItem
