import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import { color, spacing } from '../../theme'

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    resizeMode: 'contain'
  },

  bottomContainer: {
    backgroundColor: color.background,
    flexGrow: 1,
    padding: spacing[4]
  },

  button: {
    height: 150,
    width: '48%',
    borderRadius: 8,
    padding: spacing[4],
    justifyContent: 'space-between'
  },

  buttonPrimary: {
    backgroundColor: color.purple
  },

  buttonSecundary: {
    backgroundColor: color.green
  },

  buttonText: {
    color: color.white,
    fontSize: 20
  },

  buttonsContainer: {
    marginTop: 40,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    marginBottom: spacing[2]
  },

  logoutIconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: color.littlePurple
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.purple,
    paddingTop: Constants.statusBarHeight
  },

  title: {
    color: color.textBase,
    fontSize: 20,
    lineHeight: 30,
    marginTop: spacing[3]
  },

  topContainer: {
    flexGrow: 1
  },

  totalConnections: {
    color: color.textComplement,
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40
  },

  userName: {
    fontSize: 14,
    marginLeft: 12,
    color: color.textInPurpleBase
  }
})

export default styles
