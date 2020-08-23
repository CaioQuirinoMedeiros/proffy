import React, {
  useCallback,
  useMemo,
  useEffect,
  useState,
  forwardRef
} from 'react'
import {
  TextInput,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  View
} from 'react-native'

import Input, { InputProps } from '../Input'
import { formatarMoeda } from '../../utils/formatting'

import styles from './styles'

const VALID = /^[1-9]{1}[0-9]*$/

export interface CurrencyInputProps extends Omit<InputProps, 'value'> {
  value: number
  onValueChange: (data: number) => void
  max?: number
  min?: number
  onChangeValidity?(isValid: boolean): void
}

const CurrencyInput = forwardRef<TextInput, CurrencyInputProps>(
  (props, ref) => {
    const {
      value,
      onValueChange,
      max = 9999999.99,
      min = 0,
      autoFocus,
      returnKeyType,
      onSubmitEditing,
      onChangeValidity,
      style,
      onBlur,
      onFocus,
      blurOnSubmit,
      error,
      ...rest
    } = props

    const [focused, setFocused] = useState(false)
    const [dirty, setDirty] = useState(false)

    const inputStyle = useMemo(
      () => [
        style,
        !!focused ? styles.inputFocused : null,
        !!error && dirty ? styles.inputError : null
      ],
      [style, focused, error, dirty]
    )

    const valueInCents = useMemo(() => {
      return parseInt(value.toFixed(2).replace(/\D+/g, ''))
    }, [value])

    const validade = useMemo(() => {
      const errors = []

      if (max && value > max) {
        errors.push(`Informe um valor menor que ${formatarMoeda(max)}`)
      }
      if ((min || min === 0) && value <= min) {
        errors.push(`Informe um valor maior que ${formatarMoeda(min)}`)
      }

      return !errors.length
    }, [value, max, min])

    useEffect(() => {
      onChangeValidity && onChangeValidity(validade)
    }, [validade])

    function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
      console.log('Setando dirty!!!')
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

    const handleChangeText = useCallback((text: string) => {
      if (text === '') {
        onValueChange(0)
        return
      }
      if (!VALID.test(text)) {
        return
      }
      const nextValue = parseInt(text, 10)

      onValueChange(nextValue / 100)
    }, [])

    const valueInput = useMemo(
      () => (valueInCents === 0 ? '' : valueInCents.toString()),
      [valueInCents]
    )
    const valueDisplay = useMemo(() => formatarMoeda(value), [value])

    return (
      <View>
        <Input
          style={inputStyle}
          value={valueDisplay}
          editable={false}
          error={error}
          placeholder='R$ 0,00'
          {...rest}
        />
        <TextInput
          contextMenuHidden
          keyboardType='numeric'
          onChangeText={handleChangeText}
          value={valueInput}
          autoFocus={autoFocus}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          caretHidden
          maxLength={9}
          selection={{ start: valueInput.length, end: valueInput.length }}
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={ref}
        />
      </View>
    )
  }
)

export default CurrencyInput
