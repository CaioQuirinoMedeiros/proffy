import { StyleSheet } from 'react-native'

import { color, viewportWidth } from '../../theme'

const styles = StyleSheet.create({
  avatar: {
    width: 140,
    height: 140
  },

  avatarPlaceholder: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center'
  },

  avatarPlaceholderText: {
    color: color.textInPurpleBase,
    fontSize: 38
  },

  avatarWrapper: {
    overflow: 'hidden',
    borderRadius: 70,
    borderWidth: 1,
    borderColor: color.green,
    backgroundColor: color.purpleDark
  }
})

export default styles
