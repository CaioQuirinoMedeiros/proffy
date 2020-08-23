import { StyleSheet } from 'react-native'

import { color, viewportWidth, spacing } from '../../theme'

const styles = StyleSheet.create({
  backIconButton: {
    padding: spacing[4],
    alignSelf: 'flex-start',
    marginLeft: -spacing[4],
    marginTop: -spacing[4]
  },

  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: spacing[4]
  },

  contentInner: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: spacing[4]
  },

  heading: {
    fontSize: 24,
    lineHeight: 34,
    color: color.textTitulo,
    marginBottom: spacing[3]
  },

  imageBackground: {
    width: viewportWidth,
    flexGrow: 1,
    backgroundColor: color.purple,
    alignItems: 'center',
    justifyContent: 'center'
  },

  intro: {
    color: color.textInPurpleBase,
    fontSize: 16,
    marginTop: spacing[2]
  },

  logoImage: {
    width: 204,
    height: 60,
    borderWidth: 1,
    marginTop: 80
  },

  message: {
    fontSize: 14,
    lineHeight: 24
  },

  screen: {
    flex: 1,
    backgroundColor: color.background
  }
})

export default styles
