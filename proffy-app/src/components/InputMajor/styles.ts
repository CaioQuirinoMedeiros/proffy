import { StyleSheet } from 'react-native'
import { color } from '../../theme'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  label: {
    color: color.textComplement,
    opacity: 0.75,
    fontFamily: 'Poppins_400Regular',
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
    color: '#6a6180'
  }
})

export default styles
