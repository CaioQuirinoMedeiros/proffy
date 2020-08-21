import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import { color, viewportWidth } from '../../theme'

const styles = StyleSheet.create({
  backIconButton: {
    paddingHorizontal: 24,
    paddingVertical: 12
  },

  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 26
  },

  contentInner: {
    flexGrow: 1,
    justifyContent: 'center'
  },

  label: {
    fontSize: 24,
    lineHeight: 26,
    color: color.textTitulo,
    marginBottom: 24
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 2,
    backgroundColor: color.textInput,
    marginRight: 12
  },

  dotsContainer: {
    flexDirection: 'row',
    marginRight: 12
  },

  nameInput: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },

  filledDot: {
    backgroundColor: color.purple
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  intro: {
    color: color.textBase,
    fontSize: 14,
    lineHeight: 24,
    marginTop: 12
  },

  lastNameInput: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    marginTop: -1
  },

  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: color.background
  },

  title: {
    fontSize: 32,
    lineHeight: 42,
    color: color.textTitulo
  },

  titleContainer: {
    padding: 24
  },

  topContainer: {
    flexGrow: 1,
    justifyContent: 'space-between'
  }
})

export default styles
