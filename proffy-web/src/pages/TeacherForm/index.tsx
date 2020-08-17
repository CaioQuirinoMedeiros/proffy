import React, { useState, useCallback, FormEvent, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { GoRocket } from 'react-icons/go'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'

import warningIcon from '../../assets/images/icons/warning.svg'
import { subjects } from '../../constants/subjects'
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'

import './styles.css'
import Select from '../../components/Select'
import { week_days } from '../../constants/week_days'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import getToastErrors from '../../utils/getToastErrors'

const TeacherForm: React.FC = () => {
  const history = useHistory()
  const { user } = useAuth()
  const { addToast } = useToast()

  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const [schedule, setSchedule] = useState([{ week_day: '', from: '', to: '' }])

  useEffect(() => {
    const getMyClass = async () => {
      try {
        const { data } = await api.get('classes/me')
        console.log({ data })
        if (data) {
          setBio(data.bio)
          setCost(data.cost)
          setWhatsapp(data.whatsapp)
        }
      } catch {}
    }

    getMyClass()
  }, [])

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

  const handleRemoveScheduleItem = useCallback(
    (scheduleItemIndex: number) => {
      if (schedule.length === 1) {
        addToast({
          type: 'info',
          title: 'Não permitido',
          description: 'Você precisa ter ao menos um horário disponível'
        })

        return
      }

      setSchedule((oldSchedule) =>
        oldSchedule.filter((scheduleItem, index) => index !== scheduleItemIndex)
      )
    },
    [schedule.length, addToast]
  )

  const handleCreateClass = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        await api.post('/classes', {
          whatsapp,
          bio,
          subjects: [subject],
          cost: Number(cost),
          schedule
        })

        alert('Cadastro realizado com sucesso!')
        history.push('give-classes/success', {
          title: 'Aula cadastrada!',
          message:
            'Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsaApp',
          button: {
            text: 'Entendido!',
            path: '/'
          }
        })
      } catch (err) {
        const toastErrors = getToastErrors(err)
        toastErrors.forEach((toastError) => {
          addToast({
            type: toastError.type,
            title: toastError.title,
            description: toastError.description
          })
        })
      }
    },
    [whatsapp, bio, subject, cost, schedule, history, addToast]
  )

  return (
    <div id='page-teacher-form' className='container'>
      <PageHeader
        title='Que incrível que você quer dar aulas.'
        description='O primeiro passo é preencher esse formulário de inscrição'
      >
        <div className='header-content'>
          <strong>Que incrível que você quer dar aulas.</strong>
          <div className='header-description-container'>
            <p>O primeiro passo é preencher esse formulário de inscrição</p>

            <div>
              <GoRocket color='#04d361' size={30} />
              <p>
                Prepase-se!
                <br />
                Vai ser o máximo.
              </p>
            </div>
          </div>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <div className='inputs-wrapper'>
              <div className='user-info'>
                <div className='avatar'>
                  <img
                    src={user.avatar_url || avatarPlaceholder}
                    alt={user.fullName}
                  />
                </div>
                <span>{user.fullName}</span>
              </div>

              <Input
                name='whatsapp'
                label='Whatsapp'
                value={whatsapp}
                placeholder='(00) 00000-0000'
                onChangeText={setWhatsapp}
              />
            </div>

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
              <div key={`${scheduleItem.week_day}-${index}`}>
                <div className='schedule-item'>
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

                <button
                  type='button'
                  className='remove-schedule'
                  onClick={() => {
                    handleRemoveScheduleItem(index)
                  }}
                >
                  <div />
                  <span>Excluir horário</span>
                  <div />
                </button>
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
