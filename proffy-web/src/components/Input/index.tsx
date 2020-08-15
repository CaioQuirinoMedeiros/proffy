import React, { InputHTMLAttributes } from 'react'

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  onChangeText?(text: string): void
}

const Input: React.FC<InputProps> = (props) => {
  const { label, name, onChangeText, onChange, ...rest } = props

  return (
    <div className='input-block'>
      <label htmlFor={name}>{label}</label>
      <input
        type='text'
        id={name}
        onChange={(e) => {
          onChange && onChange(e)
          onChangeText && onChangeText(e.target.value)
        }}
        {...rest}
      />
    </div>
  )
}

export default Input
