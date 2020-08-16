import React, { InputHTMLAttributes, HTMLAttributes } from 'react'

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  onChangeText?(text: string): void
  containerProps?: HTMLAttributes<HTMLDivElement>
}

const Input: React.FC<InputProps> = (props) => {
  const { label, name, onChangeText, onChange, containerProps, ...rest } = props

  return (
    <div
      {...containerProps}
      className={'input-block ' + containerProps?.className}
    >
      {!!label && <label htmlFor={name}>{label}</label>}
      <input
        type='text'
        id={name}
        onChange={(e) => {
          onChange && onChange(e)
          onChangeText && onChangeText(e.target.value)
        }}
        name={name}
        {...rest}
      />
    </div>
  )
}

export default Input
