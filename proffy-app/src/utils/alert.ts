import {
  Alert,
  AlertButton,
  AlertOptions as RNAlertOptions
} from 'react-native'

interface AlertOptions extends RNAlertOptions {
  title?: string
  message?: string
  buttons?: AlertButton[]
}

interface AsyncAlertButton extends AlertButton {
  value: any
}
interface AsyncAlertOptions extends RNAlertOptions {
  title?: string
  message?: string
  buttons?: AsyncAlertButton[]
}

export const alert = (options: AlertOptions) => {
  const {
    title = 'Erro',
    message = 'Erro inesperado',
    buttons,
    ...rest
  } = options

  return Alert.alert(title, message, buttons, rest)
}

export const asyncAlert = (options: AsyncAlertOptions) => {
  const {
    title = 'Erro',
    message = 'Erro inesperado',
    buttons,
    ...rest
  } = options

  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      buttons
        ? buttons.map((button) => ({
            text: button.text,
            style: button.style,
            onPress: (e) => {
              button.onPress && button.onPress(e)
              resolve(button.value)
            }
          }))
        : undefined,
      rest
    )
  })
}
