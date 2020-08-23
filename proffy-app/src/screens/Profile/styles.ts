import { StyleSheet } from 'react-native'

import { color, viewportWidth, spacing } from '../../theme'

const styles = StyleSheet.create({
  avatarContainer: {
    borderColor: color.green,
    position: 'relative'
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
    right: 2
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
    padding: spacing[4],
    paddingTop: 0,
    marginBottom: spacing[4]
  },

  emailInput: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },

  headerIconButton: {
    paddingHorizontal: spacing[3]
  },

  legend: {
    fontSize: 24,
    lineHeight: 34,
    color: color.textTitulo,
    marginBottom: spacing[3],
    borderBottomWidth: 1,
    paddingBottom: spacing[2],
    borderBottomColor: color.lineInWhite,
    marginTop: spacing[4]
  },

  saveButton: {
    marginTop: spacing[4]
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
    paddingTop: spacing[5],
    paddingBottom: 72
  },

  userName: {
    color: color.white,
    fontSize: 22,
    marginTop: spacing[3]
  }
})

export default styles
