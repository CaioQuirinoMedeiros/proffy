import React, { forwardRef, useState, useMemo } from 'react'
import {
  Text,
  View,
  TextInputProps,
  TextInput,
  ViewProps,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  LayoutAnimation
} from 'react-native'

import styles from './styles'

interface InputProps extends TextInputProps {
  label: string
  containerProps?: ViewProps
  containerStyle?: ViewStyle
}

const InputMajor = forwardRef<TextInput, InputProps>((props, ref) => {
  const {
    style,
    label,
    containerProps,
    containerStyle,
    onFocus,
    onBlur,
    value,
    ...rest
  } = props

  const [focused, setFocused] = useState(false)

  const labelUp = useMemo(() => {
    return focused || value?.length
  }, [focused, value])

  function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    setFocused(false)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    if (onBlur) {
      onBlur(e)
    }
  }

  function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    setFocused(true)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    if (onFocus) {
      onFocus(e)
    }
  }

  return (
    <View
      {...containerProps}
      style={[styles.container, containerStyle, containerProps?.style]}
    >
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor='#c1bccc'
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        {...rest}
        ref={ref}
        placeholder={undefined}
      />
      <Text style={[styles.label, labelUp ? styles.labelFocused : undefined]}>
        {label}
      </Text>
    </View>
  )
})

export default InputMajor
