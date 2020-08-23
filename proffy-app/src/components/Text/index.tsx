import React, { ReactNode } from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'

import styles from './styles'

export interface TextProps extends RNTextProps {
  text?: ReactNode
  fontFamily?:
    | 'Archivo_400Regular'
    | 'Archivo_700Bold'
    | 'Poppins_400Regular'
    | 'Poppins_600SemiBold'
}

const Text: React.FC<TextProps> = (props) => {
  const {
    text,
    children,
    fontFamily = 'Poppins_400Regular',
    style,
    ...rest
  } = props

  return (
    <RNText style={[styles.text, { fontFamily }, style]} {...rest}>
      {text || children}
    </RNText>
  )
}

export default Text
