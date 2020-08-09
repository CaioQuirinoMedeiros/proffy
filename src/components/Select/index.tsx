import React, { useCallback, useState, useMemo } from 'react'
import {
  Text,
  View,
  TextInputProps,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import { RectButton } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'

import styles from './styles'

interface InputProps extends TextInputProps {
  label: string
  value: any
  onValueChange(value: any): void
  options: Array<{
    label: string
    value: any
  }>
}

export const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
)

const Select: React.FC<InputProps> = (props) => {
  const { label, value, onValueChange, options, placeholder, ...rest } = props

  const [optionsOpen, setOptionsOpen] = useState(false)

  const activeOption = useMemo(() => {
    return options.find((option) => option.value === value)
  }, [options, value])

  const closeOptions = useCallback(() => {
    setOptionsOpen(false)
  }, [])

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <RectButton
        style={styles.input}
        onPress={() => {
          setOptionsOpen(true)
        }}
      >
        <Text style={styles.inputText} {...rest}>
          {activeOption?.label || placeholder}
        </Text>
        <FontAwesome5 name='chevron-down' color='#9C98A6' />
      </RectButton>

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
          {options.map((option, index) => {
            const active = option === activeOption
            return (
              <View key={`${option.label}-${index}`}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    active ? styles.optionActive : undefined
                  ]}
                  onPress={() => {
                    onValueChange(option.value)
                    closeOptions()
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      active ? styles.optionActiveText : undefined
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
                {index + 1 < options.length && (
                  <View style={styles.optionsSeparator} />
                )}
              </View>
            )
          })}
        </View>
      </Modal>
    </>
  )
}

export default Select
