import React, { useState, useCallback } from 'react'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'

import warningIcon from '../../assets/images/icons/warning.svg'
import { subjects } from '../../constants/subjects'

import './styles.css'
import Select from '../../components/Select'
import { week_days } from '../../constants/week_days'

const TeacherForm: React.FC = () => {
  const [schedule, setSchedule] = useState([
    { week_day: '', from: '', to: '' }
  ])

  const addNewScheduleItem = useCallback(() => {
    setSchedule((oldSchedule) => [
      ...oldSchedule,
      { week_day: '', from: '', to: '' }
    ])
  }, [])

  return (
    <div id='page-teacher-form' className='container'>
      <PageHeader
        title='Que incrível que você quer dar aulas.'
        description='O primeiro passo é preencher esse formulário de inscrição'
      />

      <main>
        <fieldset>
          <legend>Seus dados</legend>

          <Input name='name' label='Nome Completo' />
          <Input name='avatar' label='Avatar' />
          <Input name='whatsapp' label='WhatsApp' />
          <Textarea name='bio' label='Biografia' />
        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>

          <Select
            name='subject'
            label='Matéria'
            options={subjects}
            placeholder='Selecione uma matéria'
            onChange={(event) => {
              console.log({ event: event.target.value })
            }}
          />
          <Input name='cost' label='Custo da sua hora/aula' />
        </fieldset>

        <fieldset>
          <legend>
            Horários disponíveis
            <button type='button' onClick={addNewScheduleItem}>
              + Novo horário
            </button>
          </legend>

          {schedule.map((scheduleItem, i) => (
            <div
              key={`${scheduleItem.week_day}-${i}`}
              className='schedule-item'
            >
              <Select
                name='week_day'
                label='Dia da semana'
                options={week_days}
                value={scheduleItem.week_day}
                onChange={(e) => {
                  console.log(e.target.value)
                  setSchedule((oldSchedule) =>
                    oldSchedule.map((oldScheduleItem) => ({
                      ...oldScheduleItem,
                      week_day: e.target.value
                    }))
                  )
                }}
              />
              <Input
                type='time'
                name='from'
                label='Das'
                value={scheduleItem.to}
              />
              <Input
                type='time'
                name='to'
                label='Até'
                value={scheduleItem.from}
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
          <button type='button'>Salvar cadastro</button>
        </footer>
      </main>
    </div>
  )
}

export default TeacherForm
