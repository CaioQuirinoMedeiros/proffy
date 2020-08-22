import { StyleSheet } from 'react-native'

import { color, viewportWidth } from '../../theme'

const styles = StyleSheet.create({
  backIconButton: {
    padding: 24,
    alignSelf: 'flex-start',
    marginLeft: -24,
    marginTop: -24
  },

  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 24
  },

  contentInner: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 24
  },

  heading: {
    fontSize: 24,
    lineHeight: 34,
    color: color.textTitulo,
    marginBottom: 18
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
    marginTop: 8
  },

  logoImage: {
    width: 168,
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
