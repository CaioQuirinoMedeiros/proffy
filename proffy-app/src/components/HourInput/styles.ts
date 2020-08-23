import { StyleSheet } from 'react-native'
import { color, spacing } from '../../theme'

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[3]
  },

  input: {
    height: 54,
    backgroundColor: color.whiteDark,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  inputContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.lineInWhite,
    overflow: 'hidden'
  },

  inputText: {
    color: color.textBase
  },

  label: {
    color: color.textComplement,
    fontSize: 12,
    lineHeight: 22,
    marginBottom: 2
  },

  placeholder: {
    color: color.textComplement
  }
})

export default styles
