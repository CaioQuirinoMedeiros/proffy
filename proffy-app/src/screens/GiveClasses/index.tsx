import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import * as yup from 'yup'
import { isAfter, parse } from 'date-fns'

import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png'

import Text from '../../components/Text'
import HourInput from '../../components/HourInput'
import Input from '../../components/Input'
import MultiSelect from '../../components/MultiSelect'
import CurrencyInput from '../../components/CurrencyInput'
import IconButton from '../../components/IconButton'
import PrimaryButton from '../../components/PrimaryButton'
import Select from '../../components/Select'
import { color } from '../../theme'
import api from '../../services/api'
import { getErrorsObject } from '../../utils/getValidationError'
import { getAppError } from '../../utils/getAppError'
import { useToast } from '../../hooks/toast'
import { subjectsOptions } from '../../constants/subjects'
import { formatarTelefone } from '../../utils/formatting'
import { weekDaysOptions } from '../../constants/week_days'

import styles from './styles'

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

const classSchema = yup.object().shape({
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
          .required(),
        from: yup
          .string()
          .matches(/\d\d:\d\d/)
          .required(),
        to: yup
          .string()
          .matches(/\d\d:\d\d/)
          .required()
      })
    )
})

const GiveClasses: React.FC = () => {
  const { addToast } = useToast()

  const [fetching, setFetching] = useState(true)
  const [saving, setSaving] = useState(false)

  const [whatsappFormatted, setWhatsappFormatted] = useState('')
  const [bio, setBio] = useState('')
  const [subjects, setSubjects] = useState<string[] | null>(null)
  const [cost, setCost] = useState(0)
  const [schedule, setSchedule] = useState([{ week_day: '', from: '', to: '' }])

  const bioRef = useRef<TextInput>(null)
  const costRef = useRef<TextInput>(null)

  const whatsapp = useMemo(() => {
    return whatsappFormatted.replace(/\D+/g, '')
  }, [whatsappFormatted])

  const errors: { [key: string]: string } = useMemo(() => {
    try {
      classSchema.validateSync(
        {
          whatsapp,
          bio,
          subjects,
          cost,
          schedule
        },
        { abortEarly: false }
      )

      return {}
    } catch (err) {
      return getErrorsObject(err)
    }
  }, [whatsapp, bio, subjects, cost, schedule])

  useEffect(() => {
    const getMyClass = async () => {
      try {
        setFetching(true)
        const { data } = await api.get<ClassResponse>('classes/me')

        if (data) {
          setBio(data.bio)
          setSubjects(data.subjects)
          setCost(Number(data.cost))
          setWhatsappFormatted(formatarTelefone(data.whatsapp))
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
    if (schedule.length > 10) {
      addToast({
        type: 'info',
        message: 'Limite máximo de 10 horários diferentes'
      })
      return
    }

    setSchedule((oldSchedule) => [
      ...oldSchedule,
      { week_day: '', from: '', to: '' }
    ])
  }, [schedule.length])

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
          message: 'Você deve ter pelo menos um horário disponível'
        })

        return
      }

      setSchedule((oldSchedule) =>
        oldSchedule.filter((_, index) => index !== scheduleItemIndex)
      )
    },
    [schedule.length, addToast]
  )

  const handleCreateClass = useCallback(async () => {
    try {
      setSaving(true)
      await classSchema.validate(
        { whatsapp, bio, subjects, cost, schedule },
        { abortEarly: false }
      )
      await api.post('/classes', {
        whatsapp,
        bio,
        subjects,
        cost,
        schedule
      })
      setSaving(false)

      addToast({
        type: 'success',
        message: 'Aula cadastrada',
        duration: 6000
      })
    } catch (err) {
      const appError = getAppError(err)
      addToast({ type: 'error', message: appError.message })
    } finally {
      setSaving(false)
    }
  }, [whatsapp, bio, subjects, cost, schedule, addToast])

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        style={styles.topContainer}
        resizeMode='repeat'
        source={giveClassesBackgroundImage}
      >
        <Text
          style={styles.title}
          fontFamily='Archivo_700Bold'
          text={`Que incrível que você${'\n'}quer dar aulas.`}
        />
        <Text
          style={styles.subtitle}
          text='O primeiro passo é preencher esse formulário de inscrição'
        />
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.formContainer}>
          {fetching ? (
            <ActivityIndicator
              style={styles.loading}
              size={40}
              color={color.green}
            />
          ) : (
            <>
              <Text
                style={styles.legend}
                fontFamily='Archivo_700Bold'
                text='Seus dados'
              />

              <Input
                label='Whatsapp'
                value={whatsappFormatted}
                placeholder='Whatsapp'
                onChangeText={(text) => {
                  setWhatsappFormatted(formatarTelefone(text))
                }}
                returnKeyType='next'
                keyboardType='number-pad'
                blurOnSubmit={false}
                error={errors.whatsapp}
                maxLength={15}
                onSubmitEditing={() => {
                  bioRef.current?.focus()
                }}
              />
              <Input
                label='Bio'
                style={styles.bioInput}
                textAlignVertical='top'
                value={bio}
                placeholder='Bio'
                onChangeText={setBio}
                maxLength={400}
                multiline
                returnKeyType='next'
                blurOnSubmit={false}
                error={errors.bio}
                onSubmitEditing={() => {
                  costRef.current?.focus()
                }}
                ref={bioRef}
              />

              <Text
                style={styles.legend}
                fontFamily='Archivo_700Bold'
                text='Sobre a aula'
              />

              <MultiSelect
                label='Matérias'
                value={subjects}
                options={subjectsOptions}
                onChangeValue={setSubjects}
                placeholder='Selecione as matérias'
                error={errors.subjects}
              />
              <CurrencyInput
                label='Custo da hora/aula'
                value={cost}
                placeholder='Custo da hora/aula'
                onValueChange={setCost}
                maxLength={8}
                error={errors.cost}
                ref={costRef}
              />

              <View style={styles.scheduleTitleContainer}>
                <Text
                  style={[styles.legend, styles.scheduleLegend]}
                  fontFamily='Archivo_700Bold'
                  text='Horários disponíveis'
                />
                <IconButton
                  style={styles.addScheduleButton}
                  name='plus'
                  color={color.white}
                  size={14}
                  onPress={addNewScheduleItem}
                />
              </View>
              {schedule.map((scheduleItem, index) => {
                const dateFrom = parse(scheduleItem.from, 'HH:mm', new Date())
                const dateTo = parse(scheduleItem.to, 'HH:mm', new Date())
                const isDateToAfterDateFrom = isAfter(dateTo, dateFrom)

                const dateToIsInvalid =
                  !!scheduleItem.from &&
                  !!scheduleItem.to &&
                  !isDateToAfterDateFrom

                return (
                  <View
                    key={`${index}-${Math.random().toString(36).substr(2, 9)}`}
                  >
                    <Select
                      label='Dia da semana'
                      value={scheduleItem.week_day}
                      options={weekDaysOptions}
                      onValueChange={(value) => {
                        setScheduleItemValue(index, 'week_day', value)
                      }}
                      placeholder='Escolha um dia'
                      returnKeyType='next'
                      blurOnSubmit={false}
                    />
                    <View style={styles.hoursContainer}>
                      <HourInput
                        value={scheduleItem.from}
                        containerStyle={[
                          styles.hourInputContainer,
                          { marginRight: 8 }
                        ]}
                        label='Das'
                        placeholder='00:00'
                        onChangeHour={(hour) => {
                          setScheduleItemValue(index, 'from', hour)
                        }}
                      />
                      <HourInput
                        value={scheduleItem.to}
                        containerStyle={[
                          styles.hourInputContainer,
                          { marginLeft: 8 }
                        ]}
                        label='Até'
                        error={dateToIsInvalid ? 'Horário inválido' : undefined}
                        placeholder='00:00'
                        onChangeHour={(hour) => {
                          setScheduleItemValue(index, 'to', hour)
                        }}
                      />
                    </View>

                    {schedule.length > 1 && (
                      <TouchableOpacity
                        style={styles.removeHourButton}
                        onPress={() => {
                          handleRemoveScheduleItem(index)
                        }}
                      >
                        <View style={styles.line} />
                        <Text
                          style={styles.removeHourText}
                          text='Excluir horário'
                        />
                        <View style={styles.line} />
                      </TouchableOpacity>
                    )}
                  </View>
                )
              })}

              <View style={styles.footer}>
                <PrimaryButton
                  text='Salvar cadastro'
                  style={styles.saveButton}
                  enabled={!Object.keys(errors).length && !saving}
                  loading={saving}
                  onPress={handleCreateClass}
                />

                <View style={styles.attentionContainer}>
                  <View style={styles.attentionIcon}>
                    <FontAwesome5
                      name='exclamation'
                      size={20}
                      color={color.purple}
                    />
                  </View>
                  <View>
                    <Text style={styles.attentionTitle} text='Importante!' />
                    <Text
                      style={styles.attentionMessage}
                      text='Preencha todos os dados'
                    />
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default GiveClasses
