import { StyleSheet } from 'react-native'
import { color, spacing } from '../../theme'

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[3]
  },

  gripIndicator: {
    height: 6,
    borderRadius: 8,
    width: 100,
    backgroundColor: color.grey,
    alignSelf: 'center',
    marginBottom: 8,
    marginTop: 4
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

  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },

  modalContent: {
    backgroundColor: color.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 8
  },

  option: {
    paddingVertical: 16,
    alignItems: 'center'
  },

  optionActive: {
    // backgroundColor: '#fafafa'
  },

  optionActiveText: {
    fontFamily: 'Poppins_600SemiBold',
    color: color.green
  },

  optionText: {
    color: color.textBase
  },

  optionsSeparator: {
    height: 1,
    backgroundColor: color.lineInWhite,
    marginHorizontal: 16
  },

  placeholder: {
    color: color.textComplement
  }
})

export default styles
