import React, { forwardRef, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import {
  TextInputProps,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  ViewProps,
  ViewStyle,
  View,
  TouchableOpacity
} from 'react-native'

import Text, { TextProps } from '../Text'

import styles from './styles'
import IconButton from '../IconButton'
import { color } from '../../theme'

export interface InputProps extends TextInputProps {
  label: string
  labelProps?: TextProps
  error?: string
  containerProps?: ViewProps
  containerStyle?: ViewStyle
}

const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const {
    label,
    labelProps,
    style,
    onBlur,
    secureTextEntry,
    containerProps,
    containerStyle,
    error,
    onFocus,
    ...rest
  } = props

  const [secure, setSecure] = useState(secureTextEntry)

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
    <View style={[styles.container, containerStyle]} {...containerProps}>
      {!!label && (
        <Text
          text={label}
          {...labelProps}
          style={[
            styles.label,
            focused ? styles.labelFocused : null,
            labelProps?.style
          ]}
        />
      )}
      <TextInput
        placeholderTextColor={color.textInput}
        {...rest}
        onFocus={handleFocus}
        secureTextEntry={secure}
        onBlur={handleBlur}
        style={[
          styles.input,
          focused ? styles.inputFocused : null,
          style,
          secureTextEntry ? { paddingRight: 48 } : null,
          !!error && dirty ? styles.inputError : null
        ]}
        ref={ref}
      />

      {!!secureTextEntry && (
        <TouchableOpacity
          style={styles.secureIconButton}
          onPress={() => {
            setSecure(!secure)
          }}
        >
          <FontAwesome5
            name={secure ? 'eye' : 'eye-slash'}
            size={18}
            color={color.textComplement}
          />
        </TouchableOpacity>
      )}
    </View>
  )
})

export default Input
