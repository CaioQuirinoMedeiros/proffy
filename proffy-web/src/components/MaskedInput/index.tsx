import React from 'react'
import RNMaskedInput, {
  MaskedInputProps as RNMaskedInputProps
} from 'react-text-mask'

import Input, { InputProps } from '../Input'

export interface MaskedInputProps extends RNMaskedInputProps, InputProps {}

const MaskedInput: React.FC<MaskedInputProps> = ({ mask, ...rest }) => {
  return (
    <RNMaskedInput
      mask={mask}
      showMask
      guide={false}
      {...rest}
      render={(ref, innerProps) => {
        return <Input innerRef={ref} {...innerProps} />
      }}
    />
  )
}

export default MaskedInput
