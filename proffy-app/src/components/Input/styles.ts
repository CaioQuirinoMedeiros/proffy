import { StyleSheet } from 'react-native'
import { color, spacing } from '../../theme'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 16
  },

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
    color: color.textBase
  },

  inputError: {
    borderColor: color.red
  },

  inputFocused: {
    borderColor: color.textInput
  },

  secureIconButton: {
    height: 54,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    paddingRight: spacing[3],
    bottom: 0
  }
})

export default styles
