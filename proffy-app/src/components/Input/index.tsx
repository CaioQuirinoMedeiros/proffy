import React, { forwardRef, useState } from 'react'
import {
  TextInputProps,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData
} from 'react-native'

import Text from '../Text'

import styles from './styles'

interface InputProps extends TextInputProps {
  label: string
  error?: string
}

const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const { label, style, onBlur, error, onFocus, ...rest } = props

  const [focused, setFocused] = useState(false)
  const [dirty, setDirty] = useState(false)

  function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    setFocused(false)
    setDirty(true)
    if (onBlur) {
      onBlur(e)
    }
  }

  function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    setFocused(true)
    if (onFocus) {
      onFocus(e)
    }
  }

  return (
    <>
      <Text
        style={[styles.label, focused ? styles.labelFocused : null]}
        text={label}
      />
      <TextInput
        placeholderTextColor='#c1bccc'
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.input,
          focused ? styles.inputFocused : null,
          style,
          !!error && dirty ? styles.inputError : null
        ]}
        ref={ref}
      />
    </>
  )
})

export default Input
