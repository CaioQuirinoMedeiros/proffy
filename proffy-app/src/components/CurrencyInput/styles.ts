import { StyleSheet } from 'react-native'

import { color } from '../../theme'

const styles = StyleSheet.create({
  input: {
    bottom: 0,
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },

  inputError: {
    borderColor: color.red
  },

  inputFocused: {
    borderColor: color.textInput
  },

  text: {
    marginBottom: 0
  }
})

export default styles
