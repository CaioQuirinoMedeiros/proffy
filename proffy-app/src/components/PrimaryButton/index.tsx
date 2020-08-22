import React from 'react'
import { ActivityIndicator } from 'react-native'
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler'

import Text from '../Text'

import styles from './styles'
import { color } from '../../theme'

export interface PrimaryButtonProps extends RectButtonProperties {
  text: string
  loading?: boolean
  color?: keyof typeof color
}

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  const {
    style,
    text,
    children,
    enabled,
    loading,
    color: buttonColor,
    ...rest
  } = props

  return (
    <RectButton
      style={[
        styles.button,
        { backgroundColor: color[buttonColor || 'green'] },
        !enabled ? styles.buttonDisabled : null,
        style
      ]}
      enabled={enabled}
      {...rest}
    >
      <Text
        style={[styles.text, !enabled ? styles.textDisabled : null]}
        fontFamily='Archivo_700Bold'
        text={text || children}
      />

      {!!loading && (
        <ActivityIndicator
          style={styles.loading}
          size={22}
          color={enabled ? color.white : color.textComplement}
        />
      )}
    </RectButton>
  )
}

PrimaryButton.defaultProps = {
  enabled: true
}

export default PrimaryButton
