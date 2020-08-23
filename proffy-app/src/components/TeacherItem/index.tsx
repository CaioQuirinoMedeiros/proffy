import React, { useCallback, useMemo } from 'react'
import { View, Image, Linking, FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'

import Text from '../../components/Text'
import styles from './styles'
import { formatarMoeda } from '../../utils/formatting'
import { subjectsMapping } from '../../constants/subjects'
import api from '../../services/api'
import { useFavorites } from '../../hooks/favorites'
import AvatarImage from '../AvatarImage'
import { weekDaysMapping } from '../../constants/week_days'
import { color } from '../../theme'

interface TeacherItemProps {
  favorited?: boolean
  teacherClass: {
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
}
interface WhatsappMessageProps {
  name: string
  whatsapp: string
}

const getWhatsappMessage = ({ name, whatsapp }: WhatsappMessageProps) => {
  const hours = new Date().getHours()

  let messageIntro = 'Bom%20dia'
  if (hours >= 18) {
    messageIntro = 'Boa%noite'
  } else if (hours >= 12) {
    messageIntro = 'Boa%20tarde'
  }

  return `https://wa.me/${whatsapp}?text=${messageIntro}%2C%20${name}.%0ATe%20encontrei%20na%20plataforma%20Proffy%20e%20tenho%20interesse%20nas%20suas%20aulas.`
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
  const { favorited, teacherClass } = props
  const {
    id,
    user,
    subjects,
    bio,
    whatsapp,
    cost,
    user_id,
    schedules
  } = teacherClass

  const { addFavorite, removeFavorite } = useFavorites()

  const handleContactWhatsapp = useCallback(async () => {
    const whatsappUrl = getWhatsappMessage({ name: user.fullName, whatsapp })

    const canOpenWhatsapp = await Linking.canOpenURL(whatsappUrl)

    if (canOpenWhatsapp) {
      try {
        Linking.openURL(whatsappUrl)
        api.post('/connections', { user_id })
      } catch {}
    }
  }, [user, whatsapp, user_id])

  const handleFavorite = useCallback(() => {
    if (favorited) {
      removeFavorite(id)
    } else {
      addFavorite(teacherClass)
    }
  }, [props])

  const subjectsString = useMemo(() => {
    return subjects.map((subject) => subjectsMapping[subject]).join(', ')
  }, [subjects])

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <AvatarImage user={user} size={64} />

        <View style={styles.profileInfo}>
          <Text style={styles.name} fontFamily="Archivo_700Bold" text={user.fullName} />
          <Text style={styles.subject} text={subjectsString} />
        </View>
      </View>

      <Text style={styles.bio} text={bio} />

      <FlatList
        data={schedules}
        horizontal
        style={styles.schedulesList}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.schedulesContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item: scheduleItem }) => {
          const horarioInicio = scheduleItem.from.slice(0, 5)
          const horarioFim = scheduleItem.to.slice(0, 5)

          return (
            <View style={styles.scheduleCard}>
              <Text style={styles.scheduleLabel} text='Dia' />
              <Text
                style={styles.scheduleValue}
                fontFamily='Archivo_700Bold'
                text={weekDaysMapping[scheduleItem.week_day]}
              />
              <Text style={styles.scheduleLabel} text='Horário' />
              <Text
                style={styles.scheduleValue}
                fontFamily='Archivo_700Bold'
                text={`${horarioInicio} - ${horarioFim}`}
              />
            </View>
          )
        }}
      />

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price} text='Preço da minha hora:' />
          <Text style={styles.priceValue} fontFamily="Archivo_700Bold" text={formatarMoeda(Number(cost))} />
        </View>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[
              styles.favoriteButton,
              favorited ? styles.favorited : undefined
            ]}
            onPress={handleFavorite}
          >
            <Image source={favorited ? unfavoriteIcon : heartOutlineIcon} />
          </RectButton>
          <RectButton
            style={styles.contactButton}
            onPress={handleContactWhatsapp}
          >
            <FontAwesome5 name='whatsapp' color={color.white} size={22} />
            <Text style={styles.contactButtonText} fontFamily="Archivo_700Bold" text='Entrar em contato' />
          </RectButton>
        </View>
      </View>
    </View>
  )
}

export default TeacherItem
