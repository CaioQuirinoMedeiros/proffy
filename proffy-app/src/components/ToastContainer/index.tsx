import React from 'react'
import { View } from 'react-native'

import { Toast as ToastType } from '../../hooks/toast'

import styles from './styles'
import Toast from './Toast'

export interface ToastContainerProps {
  toasts: ToastType[]
}

const ToastContainer: React.FC<ToastContainerProps> = (props) => {
  const { toasts } = props

  return (
    <View style={styles.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </View>
  )
}

export default ToastContainer
