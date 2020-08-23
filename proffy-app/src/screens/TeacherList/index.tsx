import React, { useState, useEffect, useCallback } from 'react'
import { View, LayoutAnimation, ActivityIndicator } from 'react-native'
import {
  FlatList,
  BorderlessButton,
  RectButton
} from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'

import PageHeader from '../../components/PageHeader'
import Text from '../../components/Text'

import styles from './styles'
import TeacherItem from '../../components/TeacherItem'
import api from '../../services/api'
import { subjectsOptions } from '../../constants/subjects'
import Input from '../../components/Input'
import Select from '../../components/Select'
import { weekDaysOptions } from '../../constants/week_days'
import { useFavorites } from '../../hooks/favorites'
import { formatarHorario } from '../../utils/formatting'
import PrimaryButton from '../../components/PrimaryButton'
import HourInput from '../../components/HourInput'
import { color } from '../../theme'

interface TeacherClass {
  id: string
  bio: string
  whatsapp: string
  subjects: string[]
  cost: string
  user_id: string
  user: {
    fullName: string
    firstName: string
    lastName: string
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

interface QueryParams {
  subject?: string
  week_day?: string
  time?: string
}

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherClass[]>([])
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [fetching, setFetching] = useState(false)

  const { favorites } = useFavorites()

  const [pages, setPages] = useState<number | null>(null)
  const [page, setPage] = useState(1)

  const [subject, setSubject] = useState()
  const [week_day, setWeekDay] = useState()
  const [time, setTime] = useState('')

  const getTeachers = useCallback(
    async (requestPage: number = 1) => {
      console.log('Chamando teachers', { requestPage })
      try {
        setFetching(true)
        const query: QueryParams = {}
        if (subject) {
          query.subject = subject
        }
        if (week_day) {
          query.week_day = week_day
        }
        if (time) {
          query.time = time
        }

        const { data } = await api.get<ListClassResponse>(
          `/classes?limit=2&page=${requestPage}`,
          {
            params: query
          }
        )

        setPage(requestPage)
        setPages(data.pages)

        if (requestPage === 1) {
          setTeachers(data.classes)
        } else {
          setTeachers((oldTeachers) => [...oldTeachers, ...data.classes])
        }
        if (data.count) {
          closeFilters()
        }
      } catch (err) {
        console.log({ err, response: err.response })
      } finally {
        setFetching(false)
      }
    },
    [week_day, subject, time]
  )

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
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text
            style={styles.title}
            fontFamily='Archivo_700Bold'
            text='Proffys disponíveis'
          />
          <BorderlessButton
            style={styles.filterButton}
            onPress={toggleFiltersVisibility}
          >
            <FontAwesome5
              style={{ opacity: filtersOpen ? 1 : 0.4 }}
              name='filter'
              color={color.white}
              size={20}
            />
          </BorderlessButton>
        </View>
        {filtersOpen && (
          <View style={styles.searchForm}>
            <Select
              label='Matéria'
              labelProps={{ style: styles.inputLabel }}
              placeholder='Qual a matéria'
              options={subjectsOptions}
              value={subject}
              onValueChange={setSubject}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Select
                  label='Dia da semana'
                  labelProps={{ style: styles.inputLabel }}
                  placeholder='Qual o dia'
                  options={weekDaysOptions}
                  value={week_day}
                  onValueChange={setWeekDay}
                />
              </View>
              <View style={styles.inputBlock}>
                <HourInput
                  label='Horário'
                  labelProps={{ style: styles.inputLabel }}
                  placeholder='00:00'
                  value={time}
                  onChangeHour={setTime}
                />
              </View>
            </View>

            <PrimaryButton
              style={styles.submitButton}
              text='Filtrar'
              loading={fetching}
              enabled={!fetching}
              onPress={() => {
                getTeachers()
              }}
            />
          </View>
        )}
      </View>

      <FlatList
        style={styles.teacherList}
        contentContainerStyle={styles.teacherListContainer}
        data={teachers}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        onRefresh={getTeachers}
        refreshing={fetching}
        ListFooterComponent={
          fetching ? <ActivityIndicator size={46} color={color.green} /> : null
        }
        onEndReached={() => {
          console.log('EndReached disparado', { page, pages, fetching })
          if (pages && page < pages && !fetching) {
            console.log('Chamando endReached', { page, pages, fetching })
            getTeachers(page + 1)
          }
        }}
        ListEmptyComponent={() => (
          <Text style={styles.emptyList}>
            Nenhum proffy disponível, tente buscar utilizando o filtro
          </Text>
        )}
        renderItem={({ item: teacher }) => (
          <TeacherItem
            teacherClass={teacher}
            favorited={favorites
              .map((favorite) => favorite.id)
              .includes(teacher.id)}
          />
        )}
      />
    </View>
  )
}

export default TeacherList
