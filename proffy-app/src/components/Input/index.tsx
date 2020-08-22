import React from 'react'
import { Text, TextInputProps, TextInput } from 'react-native'

import styles from './styles'

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
