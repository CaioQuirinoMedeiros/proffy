import React, { useMemo } from 'react'
import RNSelect, { Props, Theme } from 'react-select'

import './styles.css'

interface SelectProps extends Props {
  name?: string
  selected?: any | any[]
  onChangeValue?(value: any): void
}

const theme = (theme: Theme): Theme => ({
  ...theme,
  borderRadius: 8,
  spacing: { baseUnit: 4, controlHeight: 56, menuGutter: 5 },
  colors: {
    ...theme.colors,
    primary: '#8257e5',
    primary75: '#9f82e0',
    primary50: '#b5a2e0',
    primary25: '#beb2db',
    danger: '#F44E4E',
    neutral0: '#f8f8fc',
    neutral20: '#e6e6f0',
    neutral30: '#c5c5e0'
  }
})

const Select: React.FC<SelectProps> = (props) => {
  const {
    label,
    name,
    onChangeValue,
    options,
    onChange,
    isMulti,
    selected,
    value,
    ...rest
  } = props

  const selectedValue = useMemo(() => {
    if (isMulti) {
      // @ts-ignore
      return options?.filter((option) => selected?.includes(option.value))
    } else {
      // @ts-ignore
      return options?.find((option) => option.value === selected)
    }
  }, [isMulti, options, selected])

  return (
    <div className='select-block'>
      {!!label && <label htmlFor={name}>{label}</label>}
      <RNSelect
        name={name}
        theme={theme}
        isMulti={isMulti}
        options={options}
        value={selectedValue}
        onChange={(value, actionMeta) => {
          onChange && onChange(value, actionMeta)
          if (!value) {
            onChangeValue && onChangeValue(value)
          } else if (Array.isArray(value)) {
            onChangeValue && onChangeValue(value.map((item) => item.value))
          } else {
            // @ts-ignore
            onChangeValue && onChangeValue(value.value)
          }
        }}
        {...rest}
      />
    </div>
  )
}

Select.defaultProps = {
  placeholder: 'Selecione uma opção',
  noOptionsMessage: ({ inputValue }) => `Nenhuma opção para ${inputValue}`
}

export default Select
