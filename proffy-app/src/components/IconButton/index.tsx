import React from 'react'
import { ViewStyle } from 'react-native'
import {
  BorderlessButton,
  BorderlessButtonProperties
} from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'

import { color } from '../../theme'

import styles from './styles'

interface IconButtonProps extends BorderlessButtonProperties {
  name?: string
  size?: number
  color?: string
  iconStyle?: ViewStyle
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { style, name, size, color, ...rest } = props

  return (
    <BorderlessButton {...rest} style={[styles.iconButton, style]}>
      <FontAwesome5 name={name} size={size} color={color} />
    </BorderlessButton>
  )
}

IconButton.defaultProps = {
  name: 'long-arrow-alt-left',
  size: 32,
  color: color.textComplement
}

export default IconButton
