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
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as yup from 'yup'

import Text from '../../components/Text'

import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png'

import styles from './styles'
import Input from '../../components/Input'
import PrimaryButton from '../../components/PrimaryButton'
import { useAuth } from '../../hooks/auth'
import { AppStackParams } from '../../routes/AppStack'
import { color, spacing } from '../../theme'
import api from '../../services/api'
import { alert } from '../../utils/alert'
import { getErrorsObject } from '../../utils/getValidationError'
import { getAppError } from '../../utils/getAppError'
import { useToast } from '../../hooks/toast'
import AvatarImage from '../../components/AvatarImage'
import Select from '../../components/Select'
import { subjects as subjectsOptions } from '../../constants/subjects'
import { formatarTelefone } from '../../utils/formatting'
import { week_days as weekDaysOptions } from '../../constants/week_days'
import MultiSelect from '../../components/MultiSelect'

interface UpdateUserData {
  firstName: string
  lastName: string
  email: string
  old_password?: string
  password?: string
  password_confirmation?: string
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
  schedule: yup.array().required('Preenca ao menos um horário disponível')
})

interface ImageDTO {
  uri: string
  type?: any
}

const GiveClasses: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AppStackParams, 'login'>>()
  const { user, updateUser } = useAuth()
  const { addToast } = useToast()

  const [saving, setSaving] = useState(false)
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')
  const [subjects, setSubjects] = useState<string[] | null>(null)
  const [cost, setCost] = useState('')
  const [schedule, setSchedule] = useState([{ week_day: '', from: '', to: '' }])

  const [updatingAvatar, setUpdatingAvatar] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)

  const bioRef = useRef<TextInput>(null)
  const costRef = useRef<TextInput>(null)

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
        addToast({ type: 'info', message: 'Não permitido' })

        return
      }

      setSchedule((oldSchedule) =>
        oldSchedule.filter((scheduleItem, index) => index !== scheduleItemIndex)
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
      await api.post('/classes', { whatsapp, bio, subjects, cost, schedule })
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

  console.log({ errors })

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
          <Text
            style={styles.legend}
            fontFamily='Archivo_700Bold'
            text='Seus dados'
          />

          <Input
            label='Whatsapp'
            value={whatsapp}
            placeholder='Whatsapp'
            onChangeText={(text) => {
              setWhatsapp(formatarTelefone(text))
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
          <Input
            label='Custo da hora/aula'
            value={'cost'}
            placeholder='Custo da hora/aula'
            onChangeText={setCost}
            returnKeyType='next'
            blurOnSubmit={false}
            error={errors.password}
            ref={costRef}
          />

          <Text
            style={styles.legend}
            fontFamily='Archivo_700Bold'
            text='Horários disponíveis'
          />
          {schedule.map((scheduleItem, index) => {
            return (
              <View>
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
                  // error={errors.old_password}
                  // ref={oldPasswordRef}
                />
                <Input
                  label='Das'
                  placeholder='Das'
                  value={scheduleItem.from}
                  onChangeText={(text) => {
                    setScheduleItemValue(index, 'from', text)
                  }}
                />
                <Input
                  label='Até'
                  placeholder='Até'
                  value={scheduleItem.to}
                  onChangeText={(text) => {
                    setScheduleItemValue(index, 'to', text)
                  }}
                />
              </View>
            )
          })}

          <PrimaryButton
            text='Salvar cadastro'
            style={styles.saveButton}
            enabled={!Object.keys(errors).length && !savingProfile}
            loading={savingProfile}
            onPress={handleCreateClass}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default GiveClasses
