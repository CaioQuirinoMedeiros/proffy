import { StyleSheet } from 'react-native'
import { color } from '../../theme'

const styles = StyleSheet.create({
  button: {
    backgroundColor: color.green,
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 40,
    justifyContent: 'center',
    borderRadius: 8,
    position: 'relative'
  },

  buttonDisabled: {
    backgroundColor: color.disabled
  },

  loading: {
    position: 'absolute',
    right: 14
  },

  text: {
    color: color.white,
    fontSize: 16
  },

  textDisabled: {
    color: color.textComplement
  }
})

export default styles
