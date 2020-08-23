import React, { useState, useEffect, useMemo } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { View, ViewProps, ViewStyle, StyleProp } from 'react-native'
import { format, parse } from 'date-fns'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'

import { color } from '../../theme'
import Text from '../Text'

import styles from './styles'

export interface DateInputProps {
  value: string
  label?: string
  placeholder?: string
  onChangeHour: (data: string) => void
  containerProps?: ViewProps
  containerStyle?: StyleProp<ViewStyle>
}

const HourInput: React.FC<DateInputProps> = (props) => {
  const {
    label,
    value,
    placeholder,
    onChangeHour,
    containerProps,
    containerStyle
  } = props

  const [showDatePicker, setShowDatePicker] = useState(false)

  const datePickerDate = useMemo(() => {
    if (!value) return new Date()
    return parse(value, 'HH:mm', new Date())
  }, [value])

  function handleSelectDate(_: Event, selectedDate: Date | undefined) {
    setShowDatePicker(false)
    if (selectedDate) {
      onChangeHour(format(selectedDate, 'HH:mm'))
    }
  }

  return (
    <View {...containerProps} style={[styles.container, containerStyle]}>
      {!!label && <Text style={styles.label} text={label} />}
      <View style={styles.inputContainer}>
        <RectButton
          style={styles.input}
          onPress={() => {
            setShowDatePicker(true)
          }}
        >
          <Text
            style={[styles.inputText, !value ? styles.placeholder : null]}
            text={value || placeholder}
          />
          <FontAwesome5 name='clock' color={color.textComplement} />
        </RectButton>
      </View>

      {showDatePicker && (
        <DateTimePicker
          mode='time'
          value={datePickerDate}
          onChange={handleSelectDate}
        />
      )}
    </View>
  )
}

export default HourInput
