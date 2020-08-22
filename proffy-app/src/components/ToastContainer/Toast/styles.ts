import { StyleSheet } from 'react-native'

import { spacing, color } from '../../../theme'

const styles = StyleSheet.create({
  commomToast: {
    alignItems: 'center',
    backgroundColor: color.green,
    borderRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    minHeight: 64,
    justifyContent: 'flex-start',
    marginBottom: spacing[1],
    opacity: 0.95,
    padding: spacing[3]
  },

  error: {
    backgroundColor: color.red
  },

  icon: {
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    width: 24,
    marginRight: spacing[2] * 1.25
  },

  success: {
    backgroundColor: color.green
  },

  texto: {
    color: color.textBase,
    fontSize: 16,
    letterSpacing: -0.26,
    lineHeight: 24
  }
})

export default styles
