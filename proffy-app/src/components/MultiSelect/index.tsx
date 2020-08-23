import React, { useCallback, useState, useMemo } from 'react'
import {
  View,
  TextInputProps,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import { RectButton } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'

import Text from '../Text'
import { color } from '../../theme'

import styles from './styles'
import Checkbox from '../Checkbox'
import PrimaryButton from '../PrimaryButton'

interface InputProps {
  label?: string
  placeholder?: string
  value: any[] | null
  onChangeValue(value: any): void
  error?: string
  options: Array<{
    label: string
    value: any
  }>
}

export const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
)

const MultiSelect: React.FC<InputProps> = (props) => {
  const {
    label,
    value,
    onChangeValue,
    error,
    options,
    placeholder,
    ...rest
  } = props

  const [optionsOpen, setOptionsOpen] = useState(false)
  const [dirty, setDirty] = useState(false)

  const activeOptions = useMemo(() => {
    if (!value) return []

    return options.filter((option) => value.includes(option.value))
  }, [options, value])

  const activeOptionsString = useMemo(() => {
    return activeOptions.map((activeOption) => activeOption.label).join(', ')
  }, [activeOptions])

  const closeOptions = useCallback(() => {
    setOptionsOpen(false)
    setDirty(true)
  }, [])

  const handleSelectOption = useCallback(
    (option: InputProps['options'][0]) => {
      const newValue = value || []
      const activeIndex = newValue.findIndex((item) => item === option.value)

      console.log({ value, option, activeIndex })

      if (activeIndex !== -1) {
        onChangeValue(newValue.filter((_, index) => index !== activeIndex))
      } else {
        onChangeValue([...newValue, option.value])
      }
    },
    [value]
  )

  // console.log({ activeOptions, value })

  return (
    <View style={styles.container}>
      <Text style={styles.label} text={label} />
      <View
        style={[styles.inputContainer, !!error && dirty ? styles.error : null]}
      >
        <RectButton
          style={styles.input}
          onPress={() => {
            setOptionsOpen(true)
          }}
        >
          <Text
            style={[
              styles.inputText,
              !value?.length ? styles.placeholder : null
            ]}
            {...rest}
            numberOfLines={1}
            text={activeOptionsString || placeholder || label}
          />

          <FontAwesome5 name='chevron-down' color={color.textComplement} />
        </RectButton>
      </View>

      <Modal
        isVisible={optionsOpen}
        onBackdropPress={closeOptions}
        hasBackdrop={true}
        onSwipeComplete={closeOptions}
        swipeDirection='down'
        avoidKeyboard={true}
        deviceHeight={viewportHeight}
        deviceWidth={viewportWidth}
        onBackButtonPress={closeOptions}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.gripIndicator} />

          <Text
            style={styles.title}
            fontFamily='Archivo_700Bold'
            text={placeholder || label}
          />

          {options.map((option, index) => {
            const active = activeOptionsString.includes(option.label)
            return (
              <View key={`${option.label}-${index}`}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    active ? styles.optionActive : undefined
                  ]}
                  onPress={() => {
                    handleSelectOption(option)
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      active ? styles.optionActiveText : undefined
                    ]}
                    text={option.label}
                  />

                  <Checkbox value={active} />
                </TouchableOpacity>
                {index + 1 < options.length && (
                  <View style={styles.optionsSeparator} />
                )}
              </View>
            )
          })}
        </View>
      </Modal>
    </View>
  )
}

export default MultiSelect
