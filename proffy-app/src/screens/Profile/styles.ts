import { StyleSheet } from 'react-native'

import { color, viewportWidth } from '../../theme'

const styles = StyleSheet.create({
  avatar: {
    width: 140,
    height: 140
  },

  avatarContainer: {
    borderColor: color.green,
    position: 'relative'
  },

  avatarWrapper: {
    overflow: 'hidden',
    borderRadius: 70,
    borderWidth: 1,
    borderColor: color.green
  },

  cameraIconButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: color.green,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 2,
    right: 2,
    zIndex: 99
  },

  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 14
  },

  formContainer: {
    flexGrow: 1,
    marginTop: -36,
    backgroundColor: color.white,
    elevation: 2,
    borderRadius: 8,
    padding: 24,
    paddingTop: 0,
    marginBottom: 24
  },

  emailInput: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },

  headerIconButton: {
    paddingHorizontal: 16
  },

  legend: {
    fontSize: 24,
    lineHeight: 34,
    color: color.textTitulo,
    marginBottom: 18,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderBottomColor: color.lineInWhite,
    marginTop: 24
  },

  saveButton: {
    marginTop: 24
  },

  screen: {
    flexGrow: 1,
    backgroundColor: color.background
  },

  topContainer: {
    width: viewportWidth,
    backgroundColor: color.purple,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 36,
    paddingBottom: 72
  },

  userName: {
    color: color.white,
    fontSize: 22,
    marginTop: 16
  }
})

export default styles
