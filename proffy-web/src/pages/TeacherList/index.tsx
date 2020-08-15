import React, { useState, useCallback, FormEvent, useEffect } from 'react'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'

import './styles.css'
import TeacherItem from '../../components/TeacherItem'
import Select from '../../components/Select'
import { week_days } from '../../constants/week_days'
import { subjects, subjectsMapping } from '../../constants/subjects'
import api from '../../services/api'

interface Class {
  id: number
  subject: keyof typeof subjectsMapping
  cost: number
  user_id: number
  name: string
  avatar: string
  whatsapp: string
  bio: string
}

const TeacherList: React.FC = () => {
  const [subject, setSubject] = useState(subjects[5].value)
  const [week_day, setWeekDay] = useState(week_days[1].value)
  const [time, setTime] = useState('13:00')

  const [classes, setClasses] = useState<Class[]>([])

  const searchTeachers = useCallback(
    async (e?: FormEvent<HTMLFormElement>) => {
      e && e.preventDefault()

      try {
        const { data } = await api.get('/classes', {
          params: { subject, week_day, time }
        })

        setClasses(data)
      } catch {}
    },
    [subject, week_day, time]
  )

  useEffect(() => {
    searchTeachers()
  }, [searchTeachers])

  return (
    <div id='page-teacher-list' className='container'>
      <PageHeader title='Estes são os proffys disponíveis.' />

      <form id='search-teachers' onSubmit={searchTeachers}>
        <Select
          name='subject'
          label='Matéria'
          options={subjects}
          placeholder='Selecione uma matéria'
          value={subject}
          onChangeValue={setSubject}
        />
        <Select
          name='week_day'
          label='Dia da semana'
          options={week_days}
          placeholder='Selecione um dia'
          value={week_day}
          onChangeValue={setWeekDay}
        />
        <Input
          name='time'
          label='Hora'
          type='time'
          value={time}
          onChangeText={setTime}
        />
      </form>

      <main>
        {classes.map(teacher => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  )
}

export default TeacherList
