import { StyleSheet } from 'react-native'

import { color } from '../../theme'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: color.lineInWhite,
    borderWidth: 1,
    backgroundColor: color.white,
    borderRadius: 8,
    height: 24,
    justifyContent: 'center',
    width: 24
  },

  containerAtivo: {
    backgroundColor: color.green,
    borderColor: color.green
  }
})

export default styles
