import React, { createContext, useCallback, useState, useContext } from 'react'

import ToastContainer from '../components/ToastContainer'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'info'
  message?: string
  duration?: number
}

interface ToastContextData {
  addToast(toast: Omit<Toast, 'id'>): void
  removeToast(id: string): void
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id) => {
    setToasts((oldToasts) => oldToasts.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const { message, type, duration } = toast
    const id = Math.random().toString(36).substr(2, 9)

    setToasts((oldToasts) => [
      ...oldToasts,
      { id, message, type, duration }
    ])
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

const useToast = (): ToastContextData => {
  const toastContext = useContext(ToastContext)

  if (!toastContext) {
    throw new Error('useToast must be used within an ToastProvider')
  }

  return toastContext
}

export { ToastProvider, useToast }
