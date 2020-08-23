import { StyleSheet } from 'react-native'

import { color, spacing } from '../../theme'

const styles = StyleSheet.create({
  avatarContainer: {
    borderColor: color.green,
    position: 'relative'
  },

  bioInput: {
    height: 160,
    paddingVertical: spacing[3]
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

  subtitle: {
    color: color.textInPurpleBase,
    fontSize: 14,
    lineHeight: 24,
    maxWidth: 250
  },

  title: {
    color: color.white,
    fontSize: 26,
    lineHeight: 29,
    marginBottom: spacing[3]
  },

  topContainer: {
    width: '100%',
    backgroundColor: color.purple,
    justifyContent: 'center',
    paddingTop: 36,
    paddingHorizontal: spacing[4],
    paddingBottom: 72
  },

  userName: {
    color: color.white,
    fontSize: 22,
    marginTop: 16
  }
})

export default styles
