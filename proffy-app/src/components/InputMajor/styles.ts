import { StyleSheet } from 'react-native'
import { color, spacing } from '../../theme'

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },

  label: {
    color: color.textComplement,
    opacity: 0.75,
    fontSize: 14,
    position: 'absolute',
    top: 22,
    left: 18
  },

  labelFocused: {
    fontSize: 10,
    top: 12
  },

  labelUnfocused: {},

  input: {
    height: 64,
    borderColor: color.lineInWhite,
    borderWidth: 1,
    backgroundColor: color.white,
    borderRadius: 8,
    fontSize: 14,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingTop: 16,
    color: color.textBase
  },

  secureIconButton: {
    height: 64,
    width: 40,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    paddingRight: spacing[3],
    bottom: 0
  }
})

export default styles
