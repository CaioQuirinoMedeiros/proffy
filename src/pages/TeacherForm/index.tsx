import React, { useState, useCallback, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'

import warningIcon from '../../assets/images/icons/warning.svg'
import { subjects } from '../../constants/subjects'

import './styles.css'
import Select from '../../components/Select'
import { week_days } from '../../constants/week_days'
import api from '../../services/api'

const TeacherForm: React.FC = () => {
  const history = useHistory()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const [schedule, setSchedule] = useState([{ week_day: '', from: '', to: '' }])

  const addNewScheduleItem = useCallback(() => {
    setSchedule((oldSchedule) => [
      ...oldSchedule,
      { week_day: '', from: '', to: '' }
    ])
  }, [])

  const setScheduleItemValue = useCallback(
    (position: number, key: string, value: string) => {
      const newSchedule = schedule.map((scheduleItem, index) =>
        position === index
          ? {
              ...scheduleItem,
              [key]: value
            }
          : scheduleItem
      )

      setSchedule(newSchedule)
    },
    [schedule]
  )

  const clearAllFields = useCallback(() => {
    setName('')
    setAvatar('')
    setWhatsapp('')
    setBio('')
    setSubject('')
    setCost('')
    setSchedule([{ week_day: '', from: '', to: '' }])
  }, [])

  const handleCreateClass = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        await api.post('/classes', {
          name,
          avatar,
          whatsapp,
          bio,
          subject,
          cost: Number(cost),
          schedule
        })

        alert('Cadastro realizado com sucesso!')
        clearAllFields()
        history.push('/')
      } catch {
        alert('Erro no cadastro :/')
      }
    },
    [name, avatar, whatsapp, bio, subject, cost, schedule, clearAllFields, history]
  )

  return (
    <div id='page-teacher-form' className='container'>
      <PageHeader
        title='Que incrível que você quer dar aulas.'
        description='O primeiro passo é preencher esse formulário de inscrição'
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name='name'
              label='Nome Completo'
              value={name}
              onChangeText={setName}
            />
            <Input
              name='avatar'
              label='Avatar'
              value={avatar}
              onChangeText={setAvatar}
            />
            <Input
              name='whatsapp'
              label='WhatsApp'
              value={whatsapp}
              onChangeText={setWhatsapp}
            />
            <Textarea
              name='bio'
              label='Biografia'
              value={bio}
              onChangeText={setBio}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name='subject'
              label='Matéria'
              options={subjects}
              placeholder='Selecione uma matéria'
              value={subject}
              onChangeValue={setSubject}
            />
            <Input
              name='cost'
              label='Custo da sua hora/aula'
              value={cost}
              onChangeText={setCost}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type='button' onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {schedule.map((scheduleItem, index) => (
              <div
                key={`${scheduleItem.week_day}-${index}`}
                className='schedule-item'
              >
                <Select
                  name='week_day'
                  label='Dia da semana'
                  options={week_days}
                  value={scheduleItem.week_day}
                  onChangeValue={(value) => {
                    setScheduleItemValue(index, 'week_day', value)
                  }}
                />
                <Input
                  type='time'
                  name='from'
                  label='Das'
                  value={scheduleItem.from}
                  onChangeText={(value) => {
                    setScheduleItemValue(index, 'from', value)
                  }}
                />
                <Input
                  type='time'
                  name='to'
                  label='Até'
                  value={scheduleItem.to}
                  onChangeText={(value) => {
                    setScheduleItemValue(index, 'to', value)
                  }}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt='Aviso importante' />
              Importante!
              <br />
              Preencha todos os dados
            </p>
            <button type='submit'>Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm
