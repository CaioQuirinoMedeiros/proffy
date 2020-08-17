import React, { useMemo } from 'react'
import { conformToMask } from 'react-text-mask'

import MaskedInput, { MaskedInputProps } from '../MaskedInput'

export interface PhoneInputProps extends MaskedInputProps {}

const PhoneInput: React.FC<PhoneInputProps> = ({
  mask,
  value,
  onChangeText,
  ...rest
}) => {
  const maskedValue = useMemo(() => {
    if (!value || !mask) return value

    return conformToMask(value?.toString(), mask, { guide: false })
      .conformedValue
  }, [value, mask])

  return (
    <MaskedInput
      mask={mask}
      showMask
      guide={false}
      value={maskedValue}
      placeholder='(00) 00000-0000'
      onChangeText={(text) => {
        onChangeText && onChangeText(text.replace(/\D+/g, ''))
      }}
      {...rest}
    />
  )
}

export default PhoneInput
