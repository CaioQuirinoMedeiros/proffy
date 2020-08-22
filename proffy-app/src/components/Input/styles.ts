import { StyleSheet } from 'react-native'
import { color } from '../../theme'

const styles = StyleSheet.create({
  label: {
    color: color.textComplement,
    fontSize: 12,
    lineHeight: 22,
    marginBottom: 2
  },

  labelFocused: {
    color: color.textBase
  },

  input: {
    height: 54,
    backgroundColor: color.whiteDark,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.lineInWhite,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    color: color.textBase
  },

  inputError: {
    borderColor: color.red
  },

  inputFocused: {
    borderColor: color.textInput
  }
})

export default styles
