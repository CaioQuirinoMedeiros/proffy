import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import { color } from '../../theme'

const styles = StyleSheet.create({
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46
  },

  banner: {
    width: '100%',
    resizeMode: 'contain'
  },

  bottomContainer: {
    backgroundColor: color.background,
    flexGrow: 1,
    padding: 24
  },

  button: {
    height: 150,
    width: '48%',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between'
  },

  buttonPrimary: {
    backgroundColor: color.purple
  },

  buttonSecundary: {
    backgroundColor: color.green
  },

  buttonText: {
    color: '#fff',
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
    padding: 24,
    marginBottom: 12
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
    marginTop: 12
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
