import React, { useState, useEffect, useCallback } from 'react'
import { View, LayoutAnimation, Text } from 'react-native'
import {
  FlatList,
  BorderlessButton,
  RectButton
} from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'

import PageHeader from '../../components/PageHeader'

import styles from './styles'
import TeacherItem from '../../components/TeacherItem'
import api from '../../services/api'
import { subjectsMapping, subjects } from '../../constants/subjects'
import Input from '../../components/Input'
import Select from '../../components/Select'
import { week_days } from '../../constants/week_days'
import { formatarHorario } from '../../utils/formatting'

interface Teacher {
  id: number
  subject: keyof typeof subjectsMapping
  name: string
  bio: string
  whatsapp: string
  cost: number
  user_id: number
  avatar: string
}

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [fetching, setFetching] = useState(false)

  const [subject, setSubject] = useState('matematica')
  const [week_day, setWeekDay] = useState(1)
  const [time, setTime] = useState('13:00')

  const getTeachers = useCallback(async () => {
    try {
      setFetching(true)
      const { data } = await api.get('/classes', {
        params: { week_day, subject, time }
      })

      setTeachers(data)
      if (data.length) {
        closeFilters()
      }
    } catch {
    } finally {
      setFetching(false)
    }
  }, [week_day, subject, time])

  const closeFilters = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setFiltersOpen(false)
  }, [])

  const toggleFiltersVisibility = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setFiltersOpen((oldFiltersOpen) => !oldFiltersOpen)
  }, [])

  useEffect(() => {
    getTeachers()
  }, [])

  return (
    <View style={styles.container}>
      <PageHeader
        title='Proffys disponíveis'
        headerRight={
          <BorderlessButton
            style={styles.filterButton}
            onPress={toggleFiltersVisibility}
          >
            <FontAwesome5
              style={{ opacity: filtersOpen ? 1 : 0.4 }}
              name='filter'
              color='#fff'
              size={20}
            />
          </BorderlessButton>
        }
      >
        {filtersOpen && (
          <View style={styles.searchForm}>
            <Select
              label='Matéria'
              placeholder='Qual a matéria'
              options={subjects}
              value={subject}
              onValueChange={setSubject}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Select
                  label='Dia da semana'
                  placeholder='Qual o dia'
                  options={week_days}
                  value={week_day}
                  onValueChange={setWeekDay}
                />
              </View>
              <View style={styles.inputBlock}>
                <Input
                  label='Horário'
                  placeholder='00:00'
                  keyboardType='numeric'
                  value={time}
                  onChangeText={(text) => {
                    setTime(formatarHorario(text))
                  }}
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={getTeachers}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <FlatList
        style={styles.teacherList}
        contentContainerStyle={styles.teacherListContainer}
        data={teachers}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        onRefresh={getTeachers}
        refreshing={fetching}
        ListEmptyComponent={() => (
          <Text style={styles.emptyList}>
            Nenhum proffy disponível, tente buscar utilizando o filtro
          </Text>
        )}
        renderItem={({ item: teacher }) => <TeacherItem {...teacher} />}
      />
    </View>
  )
}

export default TeacherList
