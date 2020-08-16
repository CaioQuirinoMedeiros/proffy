import React, { InputHTMLAttributes, HTMLAttributes } from 'react'

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  onChangeValue?(value: boolean): void
  containerProps?: HTMLAttributes<HTMLDivElement>
}

const Checkbox: React.FC<InputProps> = (props) => {
  const {
    label,
    name,
    onChangeValue,
    onChange,
    containerProps,
    value,
    ...rest
  } = props

  return (
    <label className='checkbox-container'>
      {label}
      <input
        type='checkbox'
        onChange={(e) => {
          console.log('Mudou', e.target.checked)
          onChange && onChange(e)
          onChangeValue && onChangeValue(e.target.checked)
        }}
        {...rest}
      />
      <span className='checkmark'></span>
    </label>
  )
}

export default Checkbox
