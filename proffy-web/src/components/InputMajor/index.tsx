import React, {
  InputHTMLAttributes,
  HTMLAttributes,
  useState,
  useMemo
} from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  onChangeText?(text: string): void
  containerProps?: HTMLAttributes<HTMLDivElement>
}

const InputMajor: React.FC<InputProps> = (props) => {
  const {
    value,
    label,
    placeholder,
    name,
    onChangeText,
    onChange,
    containerProps,
    type: initialType,
    ...rest
  } = props

  const [type, setType] = useState(initialType)

  const PasswordIcon = useMemo(() => {
    return type === 'password' ? FiEye : FiEyeOff
  }, [type])

  return (
    <div
      {...containerProps}
      className={'input-major-block ' + containerProps?.className}
    >
      <input
        value={value}
        type={type || 'text'}
        id={name}
        onChange={(e) => {
          onChange && onChange(e)
          onChangeText && onChangeText(e.target.value)
        }}
        name={name}
        required
        {...rest}
        placeholder=''
      />
      <span className='floating-label'>{value ? label : placeholder || label}</span>
      {initialType === 'password' && (
        <PasswordIcon
          size={20}
          onClick={() => {
            setType(type === 'password' ? 'text' : 'password')
          }}
        />
      )}
    </div>
  )
}

export default InputMajor
