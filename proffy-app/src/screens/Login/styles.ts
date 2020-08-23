import { StyleSheet } from 'react-native'

import { color, viewportWidth, spacing } from '../../theme'

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: spacing[4]
  },

  contentInner: {
    flexGrow: 1,
    justifyContent: 'center'
  },

  emailInput: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },

  forgotPassword: {
    color: color.textComplement,
    fontSize: 12,
    textAlign: 'right'
  },

  forgotPasswordButton: {
    padding: 8,
    paddingRight: spacing[4],
    marginRight: -spacing[4]
  },

  headerTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  heading: {
    fontSize: 24,
    lineHeight: 34,
    color: color.textTitulo
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

  newAccount: {
    color: color.purple,
    fontSize: 12
  },

  newAccountButton: {
    padding: 12,
    paddingRight: spacing[4],
    marginRight: -spacing[4]
  },

  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing[3]
  },

  passwordInput: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    marginTop: -1
  },

  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  rememberText: {
    fontSize: 12,
    marginLeft: 10,
    color: color.textComplement
  },

  screen: {
    flex: 1,
    backgroundColor: color.background
  }
})

export default styles
