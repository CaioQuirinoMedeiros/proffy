import React, { SelectHTMLAttributes, OptionHTMLAttributes } from 'react'

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  options: OptionHTMLAttributes<HTMLOptionElement>[]
}

const Select: React.FC<SelectProps> = (props) => {
  const { label, name, options, placeholder, ...rest } = props

  return (
    <div className='select-block'>
      <label htmlFor={name}>{label}</label>
      <select id={name} placeholder={placeholder} defaultValue='' {...rest}>
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
