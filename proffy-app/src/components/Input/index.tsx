import React, { useCallback } from 'react'
import { Text, TextInputProps, TextInput } from 'react-native'

import backIcon from '../../assets/images/icons/back.png'
import logoImage from '../../assets/images/logo.png'

import styles from './styles'
import { useNavigation } from '@react-navigation/native'

interface InputProps extends TextInputProps {
  label: string
}

const Input: React.FC<InputProps> = (props) => {
  const { label, ...rest } = props

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor='#c1bccc'
        {...rest}
      />
    </>
  )
}

export default Input
