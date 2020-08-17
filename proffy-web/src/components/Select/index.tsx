import React, { SelectHTMLAttributes, OptionHTMLAttributes } from 'react'

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  options: OptionHTMLAttributes<HTMLOptionElement>[]
  onChangeValue?(value: any): void
}

const Select: React.FC<SelectProps> = (props) => {
  const {
    label,
    name,
    options,
    placeholder,
    onChangeValue,
    onChange,
    ...rest
  } = props

  return (
    <div className='select-block'>
      {!!label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        placeholder={placeholder}
        value=''
        onChange={(e) => {
          onChange && onChange(e)
          onChangeValue && onChangeValue(e.target.value)
        }}
        {...rest}
      >
        <option value='' disabled hidden label={placeholder} />
        {options.map((option, i) => (
          <option key={`${option.value}-${i}`} {...option} />
        ))}
      </select>
    </div>
  )
}

Select.defaultProps = {
  placeholder: 'Selecione uma opção'
}

export default Select
