import { StyleSheet } from 'react-native'

import { color, spacing } from '../../theme'

const styles = StyleSheet.create({
  emptyList: {
    borderWidth: 1,
    textAlign: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    color: color.textBase,
    backgroundColor: color.white,
    borderRadius: 8,
    borderColor: color.lineInWhite,
    alignSelf: 'center'
  },

  screen: {
    flex: 1,
    backgroundColor: color.background
  },

  teacherList: {
    marginTop: -40
  },

  teacherListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexGrow: 1
  },

  title: {
    color: color.white,
    fontSize: 32,
    lineHeight: 37,
    marginVertical: spacing[3]
  },

  topContainer: {
    backgroundColor: color.purple,
    padding: spacing[4],
    paddingBottom: 60
  }
})

export default styles
