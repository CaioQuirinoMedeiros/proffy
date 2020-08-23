import { StyleSheet } from 'react-native'

import { color, spacing } from '../../theme'

const styles = StyleSheet.create({
  addScheduleButton: {
    backgroundColor: color.green,
    width: 24,
    marginTop: 6,
    height: 24,
    borderRadius: 8
  },

  attentionContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  attentionIcon: {
    marginRight: spacing[3],
    padding: spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    width: 40,
    height: 40,
    borderColor: color.purple,
    borderWidth: 2
  },

  attentionMessage: {
    color: color.textComplement
  },

  attentionTitle: {
    color: color.purple
  },

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

  footer: {
    backgroundColor: color.whiteDark,
    marginHorizontal: -spacing[4],
    marginBottom: -spacing[4],
    padding: spacing[4],
    borderTopColor: color.lineInWhite,
    borderTopWidth: 1
  },

  formContainer: {
    flexGrow: 1,
    marginTop: -36,
    backgroundColor: color.white,
    elevation: 2,
    borderRadius: 8,
    padding: 24,
    overflow: 'hidden',
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

  hourInputContainer: {
    flex: 1
  },

  hoursContainer: {
    flexDirection: 'row'
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

  line: {
    height: 1,
    backgroundColor: color.red,
    flex: 1
  },

  loading: {
    marginTop: spacing[6]
  },

  removeHourButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4]
  },

  removeHourText: {
    color: color.red,
    marginHorizontal: spacing[3]
  },

  saveButton: {
    marginBottom: spacing[4]
  },

  scheduleLegend: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 0
  },

  scheduleTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom: 18,
    marginTop: 24,
    paddingBottom: 8,
    borderBottomColor: color.lineInWhite
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
