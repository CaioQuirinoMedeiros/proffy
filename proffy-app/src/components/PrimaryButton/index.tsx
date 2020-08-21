import React, { useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler'

import backIcon from '../../assets/images/icons/back.png'
import logoImage from '../../assets/images/logo.png'
import Text from '../Text'

import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { color } from '../../theme'

interface PrimaryButtonProps extends RectButtonProperties {
  text: string
  loading?: boolean
}

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  const { text, children, enabled, loading, ...rest } = props

  return (
    <RectButton
      style={[styles.button, !enabled ? styles.buttonDisabled : null]}
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

export default PrimaryButton
