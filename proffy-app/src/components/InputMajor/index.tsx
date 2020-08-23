import React, { forwardRef, useState, useMemo } from 'react'
import {
  View,
  TextInputProps,
  TextInput,
  ViewProps,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import Text from '../../components/Text'

import styles from './styles'
import { color } from '../../theme'

interface MajorInputProps extends TextInputProps {
  label: string
  containerProps?: ViewProps
  containerStyle?: ViewStyle
}

const InputMajor = forwardRef<TextInput, MajorInputProps>((props, ref) => {
  const {
    style,
    label,
    containerProps,
    containerStyle,
    onFocus,
    onBlur,
    secureTextEntry,
    value,
    ...rest
  } = props

  const [focused, setFocused] = useState(false)
  const [secure, setSecure] = useState(secureTextEntry)

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
        placeholderTextColor={color.textInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        secureTextEntry={secure}
        {...rest}
        ref={ref}
        placeholder={undefined}
      />
      <Text
        style={[styles.label, labelUp ? styles.labelFocused : undefined]}
        text={label}
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

export default InputMajor
