import React, { useState, useCallback, FormEvent, useEffect } from 'react'
import { GiTeacher } from 'react-icons/gi'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'

import './styles.css'
import TeacherItem from '../../components/TeacherItem'
import Select from '../../components/Select'
import { week_days } from '../../constants/week_days'
import { subjects } from '../../constants/subjects'
import api from '../../services/api'
import clsx from 'clsx'

interface TeacherClass {
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

interface ListClassResponse {
  pages: number
  count: number
  classes: TeacherClass[]
}

const TeacherList: React.FC = () => {
  const [subject, setSubject] = useState(null)
  const [week_day, setWeekDay] = useState(null)
  const [time, setTime] = useState('')

  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState([])
  const [classes, setClasses] = useState<TeacherClass[]>([])

  const searchTeachers = useCallback(
    async (e?: FormEvent<HTMLFormElement>, requestPage: number = 1) => {
      e && e.preventDefault()

      try {
        const { data } = await api.get<ListClassResponse>(
          `/classes?limit=8&page=${requestPage}`,
          {
            params: { subject, week_day, time: time || null }
          }
        )

        setClasses(data.classes)
        setCount(data.count)
        // @ts-ignore
        setPages([...Array(data.pages).keys()])
      } catch {}
    },
    [subject, week_day, time]
  )

  useEffect(() => {
    if (page === 1) {
      searchTeachers()
    }
    setPage(1)
  }, [subject, week_day, time]) // eslint-disable-line

  useEffect(() => {
    searchTeachers(undefined, page)
  }, [page]) // eslint-disable-line

  const canPreviousPage = page - 1 >= 1
  const canNextPage = pages.length > page

  const paginationClassName = clsx({
    pagination: true,
    hide: pages.length <= 1
  })

  return (
    <div id='page-teacher-list' className='container'>
      <PageHeader title='Estes são os proffys disponíveis.'>
        <div className='header-content'>
          <strong>Estes são os proffys disponíveis.</strong>
          {!!count && (
            <div>
              <GiTeacher color='#04d361' size={30} />
              <p>
                {`Nós temos ${count}`}
                <br />
                professores.
              </p>
            </div>
          )}
        </div>
      </PageHeader>

      <form id='search-teachers' onSubmit={searchTeachers}>
        <Select
          name='subject'
          label='Matéria'
          options={subjects}
          placeholder='Selecione uma matéria'
          selected={subject}
          onChangeValue={setSubject}
          isClearable
        />
        <Select
          name='week_day'
          label='Dia da semana'
          options={week_days}
          placeholder='Selecione um dia'
          selected={week_day}
          onChangeValue={setWeekDay}
          isClearable
        />
        <Input
          name='time'
          label='Hora'
          type='time'
          value={time}
          onChangeText={setTime}
        />
      </form>

      <div className={paginationClassName}>
        <button
          className={!canPreviousPage ? 'hide' : ''}
          type='button'
          onClick={() => {
            setPage(page - 1)
          }}
        >
          <FiChevronLeft size={26} />
        </button>

        <div>
          {pages.map((_, index) => {
            const pageDotClassName = clsx({
              'page-dot': true,
              'page-dot-active': index + 1 === page
            })
            return (
              <button
                type='button'
                className={pageDotClassName}
                key={index + 1}
                onClick={() => {
                  setPage(index + 1)
                }}
              ></button>
            )
          })}
        </div>

        <button
          className={!canNextPage ? 'hide' : ''}
          type='button'
          onClick={() => {
            if (pages.length >= page) {
              setPage(page + 1)
            }
          }}
        >
          <FiChevronRight size={26} />
        </button>
      </div>

      <main>
        {classes.map((teacher) => (
          <TeacherItem key={teacher.id} teacherClass={teacher} />
        ))}
      </main>
    </div>
  )
}

export default TeacherList
