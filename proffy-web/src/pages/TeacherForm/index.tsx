import React, { useState, useCallback, FormEvent, useEffect } from 'react'
import { GoRocket } from 'react-icons/go'
import PacmanLoader from 'react-spinners/PacmanLoader'
import * as yup from 'yup'

import warningIcon from '../../assets/images/icons/warning.svg'
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png'

import { subjects as subjectsOptions } from '../../constants/subjects'
import { week_days as weekDaysOptions } from '../../constants/week_days'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import getToastErrors from '../../utils/getToastErrors'
import { phoneMask } from '../../utils/masks'
import CurrencyInput from '../../components/CurrencyInput'
import PhoneInput from '../../components/PhoneInput'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import './styles.css'
import PrimaryButton from '../../components/PrimaryButton'

interface ClassResponse {
  bio: string
  whatsapp: string
  subjects: string[]
  cost: string
  schedules: Array<{
    week_day: number
    from: string
    to: string
  }>
}

const classFormSchema = yup.object().shape({
  whatsapp: yup.string().min(10, 'Número de Whatsapp incompleto'),
  bio: yup.string().required('Conte um pouco sobre você no campo Biografia'),
  subjects: yup
    .array()
    .of(yup.string())
    .required('Você precisa ter ao menos uma matéria cadastrada'),
  cost: yup
    .number()
    .required('Informe o custo da sua hora/aula')
    .min(5, 'Coloque um valor acima de R$5,00 na sua hora/aula!'),
  schedule: yup
    .array()
    .required('Preenca ao menos um horário disponível')
    .of(
      yup.object({
        week_day: yup
          .string()
          .oneOf(weekDaysOptions.map((weekDay) => weekDay.value))
          .required('Preencha os horários corretamente'),
        from: yup
          .string()
          .matches(/\d\d:\d\d/, 'O horário deve ser no formato 00:00')
          .required('Preencha os horários corretamente'),
        to: yup
          .string()
          .matches(/\d\d:\d\d/, 'O horário deve ser no formato 00:00')
          .required('Preencha os horários corretamente')
      })
    )
})

const TeacherForm: React.FC = () => {
  const { user } = useAuth()
  const { addToast } = useToast()

  const [fetching, setFetching] = useState(true)
  const [saving, setSaving] = useState(false)
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')
  const [subjects, setSubjects] = useState<string[] | null>(null)
  const [cost, setCost] = useState(0)

  const [schedule, setSchedule] = useState([{ week_day: '', from: '', to: '' }])

  useEffect(() => {
    const getMyClass = async () => {
      try {
        setFetching(true)
        const { data } = await api.get<ClassResponse>('classes/me')

        if (data) {
          setBio(data.bio)
          setSubjects(data.subjects)
          setCost(Number(data.cost))
          setWhatsapp(data.whatsapp)
          setSchedule(
            data.schedules.map((scheduleItem) => ({
              from: scheduleItem.from.slice(0, 5),
              to: scheduleItem.to.slice(0, 5),
              week_day: scheduleItem.week_day.toString()
            }))
          )
        }
      } catch {
      } finally {
        setFetching(false)
      }
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
    (position: number, key: string, value: any) => {
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
        setSaving(true)
        await classFormSchema.validate(
          { whatsapp, bio, subjects, cost, schedule },
          { abortEarly: false }
        )
        await api.post('/classes', { whatsapp, bio, subjects, cost, schedule })
        setSaving(false)

        addToast({
          type: 'success',
          title: 'Aula cadastrada',
          description:
            'Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsaApp',
          duration: 6000
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
      } finally {
        setSaving(false)
      }
    },
    [whatsapp, bio, subjects, cost, schedule, addToast]
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

      {fetching ? (
        <div className='loading-container'>
          <PacmanLoader color='#04d361' size={30} />
        </div>
      ) : (
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

                <PhoneInput
                  name='whatsapp'
                  label='Whatsapp'
                  value={whatsapp}
                  mask={phoneMask}
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
                options={subjectsOptions}
                isMulti
                onChangeValue={setSubjects}
                selected={subjects}
                placeholder='Selecione uma matéria'
              />
              <CurrencyInput
                name='cost'
                label='Custo da sua hora/aula'
                value={cost}
                onChangeValue={setCost}
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
                      options={weekDaysOptions}
                      selected={scheduleItem.week_day}
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
              <PrimaryButton type='submit' loading={saving} disabled={saving}>
                Salvar Cadastro
              </PrimaryButton>
            </footer>
          </form>
        </main>
      )}
    </div>
  )
}

export default TeacherForm
