import React from 'react'
import { View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import { color } from '../../theme'

import styles from './styles'
interface CheckboxProps {
  value: boolean
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { value, ...rest } = props

  return (
    <View
      style={[styles.container, !!value ? styles.containerAtivo : null]}
      {...rest}
    >
      {!!value && <FontAwesome5 name='check' size={11} color={color.white} />}
    </View>
  )
}

export default Checkbox
