import React, { InputHTMLAttributes, HTMLAttributes, useMemo } from 'react'
import clsx from 'clsx'

import './styles.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name?: string
  onChangeText?(text: string): void
  containerProps?: HTMLAttributes<HTMLDivElement>
  innerRef?: any
}

const Input: React.FC<InputProps> = (props) => {
  const {
    label,
    name,
    onChangeText,
    onChange,
    containerProps,
    innerRef,
    ...rest
  } = props

  const inputContainerClassName = useMemo(() => {
    return clsx({ 'input-block': true }, containerProps?.className)
  }, [containerProps])

  return (
    <div {...containerProps} className={inputContainerClassName}>
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
        ref={innerRef}
      />
    </div>
  )
}

export default Input
