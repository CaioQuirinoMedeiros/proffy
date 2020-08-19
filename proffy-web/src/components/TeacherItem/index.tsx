import React, { useMemo, useCallback } from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'

import './styles.css'
import { formatarMoeda } from '../../utils/currency'
import { subjectsMapping } from '../../constants/subjects'
import api from '../../services/api'

interface TeacherItemProps {
  teacherClass: {
    id: string
    bio: string
    whatsapp: string
    subjects: string[]
    cost: string
    user_id: string
    user: {
      fullName: string
      avatar_url: string
    }
    schedules: Array<{
      id: string
      week_day: number
      from: string
      to: string
    }>
  }
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
  const { teacherClass } = props

  const preco = useMemo(() => {
    return formatarMoeda(Number(teacherClass.cost))
  }, [teacherClass])

  const subjects = useMemo(() => {
    return teacherClass.subjects
      .map((subject) => subjectsMapping[subject])
      .join(', ')
  }, [teacherClass])

  const createNewConnection = useCallback(async () => {
    try {
      await api.post('/connections', { user_id: teacherClass.user_id })
    } catch {}
  }, [teacherClass])

  return (
    <article className='teacher-item'>
      <header>
        <img
          src={teacherClass.user?.avatar_url || avatarPlaceholder}
          alt={teacherClass.user?.fullName}
        />
        <div>
          <strong>{teacherClass.user?.fullName}</strong>
          <span>{subjects}</span>
        </div>
      </header>

      <p>{teacherClass.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>{preco}</strong>
        </p>
        <a
          onClick={createNewConnection}
          href={`https://wa.me/${teacherClass.whatsapp}? text=sua%20mensagem.`}
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
