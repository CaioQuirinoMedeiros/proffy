import React, { useCallback } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles'
import { formatarMoeda } from '../../utils/currency'
import { subjectsMapping } from '../../constants/subjects'
import api from '../../services/api'
import { useFavorites } from '../../hooks/favorites'

interface TeacherItemProps extends Teacher {}

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
  const {
    id,
    name,
    subject,
    bio,
    whatsapp,
    cost,
    avatar,
    favorited,
    user_id
  } = props

  const { addFavorite, removeFavorite } = useFavorites()

  const handleContactWhatsapp = useCallback(async () => {
    const whatsappUrl = getWhatsappMessage({ name, whatsapp })

    const canOpenWhatsapp = await Linking.canOpenURL(whatsappUrl)

    if (canOpenWhatsapp) {
      try {
        Linking.openURL(whatsappUrl)
        api.post('/connections', { user_id })
      } catch {}
    }
  }, [name, whatsapp, user_id])

  const handleFavorite = useCallback(() => {
    if (favorited) {
      removeFavorite(id)
    } else {
      addFavorite(props)
    }
  }, [props])

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subject}>{subjectsMapping[subject]}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora{'   '}
          <Text style={styles.priceValue}>{formatarMoeda(cost)}</Text>
        </Text>

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
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  )
}

export default TeacherItem
