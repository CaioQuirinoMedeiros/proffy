import React, { ButtonHTMLAttributes, useMemo } from 'react'
import clsx from 'clsx'
import PuffLoader from 'react-spinners/PuffLoader'

import './styles.css'

interface InputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

const PrimaryButton: React.FC<InputProps> = (props) => {
  const { children, className, disabled, loading, ...rest } = props

  const buttonClassName = useMemo(() => {
    return clsx({
      'button-primary': true,
      'button-primary-disabled': !!disabled,
      className: !!className
    })
  }, [disabled, className])

  const loadingColor = useMemo(() => {
    return disabled ? '#9c98a6' : '#fff'
  }, [disabled])

  return (
    <button
      type='button'
      className={buttonClassName}
      disabled={disabled}
      {...rest}
    >
      {children}
      {!!loading && (
        <PuffLoader
          size={26}
          color={loadingColor}
          css='position: absolute; right: 1.2rem'
        />
      )}
    </button>
  )
}

export default PrimaryButton
