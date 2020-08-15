import React, { TextareaHTMLAttributes } from 'react'

import './styles.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
  onChangeText?(text: string): void
}

const Textarea: React.FC<TextareaProps> = (props) => {
  const { label, name, onChangeText, onChange, ...rest } = props

  return (
    <div className='textarea-block'>
      <label htmlFor={name}>{label}</label>
      <textarea
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

export default Textarea
