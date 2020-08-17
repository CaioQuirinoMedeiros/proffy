import React, { useMemo } from 'react'

import Input, { InputProps } from '../Input'
import { formatarMoeda } from '../../utils/currency'


interface CurrencyInputProps extends InputProps {
  onChangeValue(value: number): void
  value: number
}

const CurrencyInput = (props: CurrencyInputProps) => {
  const { value, onChangeValue } = props

  const maskedValue = useMemo(() => {
    if (!value) return ''
    return formatarMoeda(value)
  }, [value])

  return (
    <Input
      {...props}
      value={maskedValue}
      maxLength={11}
      placeholder='R$ 00,00'
      onChangeText={(text) => {
        const value = Number(text.replace(/[a-zA-Z$ ,.]/g, '')) / 100
        console.log({ value })
        onChangeValue(Number(value))
      }}
    />
  )
}

export default CurrencyInput
