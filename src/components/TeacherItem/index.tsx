import React, { useCallback } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles'
import { formatarMoeda } from '../../utils/currency'
import { subjectsMapping } from '../../constants/subjects'

interface TeacherItemProps {
  name: string
  subject: keyof typeof subjectsMapping
  bio: string
  whatsapp: string
  cost: number
  avatar: string
  favorited?: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
  const { name, subject, bio, whatsapp, cost, avatar, favorited } = props

  const navigation = useNavigation()

  const handleContactWhatsapp = useCallback(() => {
    const hours = new Date().getHours()
    let messageIntro = 'Bom%20dia'
    if (hours >= 18) {
      messageIntro = 'Boa%noite'
    } else if (hours >= 12) {
      messageIntro = 'Boa%20tarde'
    }
    Linking.openURL(
      `https://wa.me/${whatsapp}?text=${messageIntro}%2C%20${name}.%0ATe%20encontrei%20na%20plataforma%20Proffy%20e%20tenho%20interesse%20nas%20suas%20aulas.`
    )
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              'https://avatars0.githubusercontent.com/u/48543208?s=460&u=f056bca652dc7e1619b6e275ac220a4b91a0cf88&v=4'
          }}
        />

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
          >
            <Image source={heartOutlineIcon} />
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
