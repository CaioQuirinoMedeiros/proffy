import { StyleSheet } from 'react-native'

import { color, spacing } from '../../theme'

const styles = StyleSheet.create({
  emptyList: {
    borderWidth: 1,
    textAlign: 'center',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
    color: color.textBase,
    backgroundColor: color.white,
    borderRadius: 8,
    borderColor: color.lineInWhite,
    alignSelf: 'center',
    marginBottom: spacing[3]
  },

  filterButton: {
    padding: 8,
    marginRight: -8
  },

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  inputBlock: {
    width: '48%'
  },

  inputLabel: {
    color: color.textInPurpleBase
  },

  screen: {
    flex: 1,
    backgroundColor: color.background
  },

  searchForm: {
    marginBottom: spacing[4]
  },

  submitButton: {
    marginTop: spacing[2]
  },

  teacherList: {
    marginTop: -40
  },

  teacherListContainer: {
    paddingHorizontal: spacing[3],
    paddingBottom: spacing[3],
    flexGrow: 1
  },

  title: {
    color: color.white,
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spacing[3]
  },

  topContainer: {
    backgroundColor: color.purple,
    padding: spacing[4],
    paddingBottom: 60
  }
})

export default styles
