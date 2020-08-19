import React, { useEffect } from 'react'
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi'
import { animated } from 'react-spring'

import { Toast as ToastType, useToast } from '../../../hooks/toast'

import './styles.css'

interface ToastProps {
  toast: ToastType
  style: object
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />
}

const Toast: React.FC<ToastProps> = (props) => {
  const { removeToast } = useToast()

  const {
    toast: { id, title, description, type, duration },
    style
  } = props

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id)
    }, duration || 3500)

    return () => {
      clearTimeout(timer)
    }
  }, [id, removeToast]) // eslint-disable-line

  return (
    <animated.div
      className={`toast toast-${type || 'info'} ${
        !!description && 'toast-description'
      }`}
      style={style}
    >
      {icons[type || 'info']}

      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>

      <button type='button' onClick={() => removeToast(id)}>
        <FiXCircle size={18} />
      </button>
    </animated.div>
  )
}

export default Toast
