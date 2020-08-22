import React from 'react'
import { View, Image, ViewProps, ImageProps } from 'react-native'

import Text from '../../components/Text'

import styles from './styles'

interface AvatarImageProps extends ViewProps {
  size?: number
  user: {
    firstName: string
    lastName: string
    avatar_url: string
  }
}

const AvatarImage: React.FC<AvatarImageProps> = (props) => {
  const { size = 140, style, user, ...rest } = props

  return (
    <View
      style={[
        styles.avatarWrapper,
        { width: size, height: size, borderRadius: size / 2 },
        style
      ]}
      {...rest}
    >
      {user?.avatar_url ? (
        <Image
          style={{ width: size, height: size }}
          source={{ uri: user.avatar_url }}
          resizeMode='contain'
        />
      ) : (
        <View style={[styles.avatarPlaceholder, { width: size, height: size }]}>
          <Text
            style={styles.avatarPlaceholderText}
            text={`${user?.firstName[0]?.toUpperCase()}${user?.lastName[0]?.toUpperCase()}`}
          />
        </View>
      )}
    </View>
  )
}

AvatarImage.defaultProps = {
  size: 140
}

export default AvatarImage
