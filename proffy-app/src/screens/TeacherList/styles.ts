import { StyleSheet } from 'react-native'
import { color, spacing } from '../../theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7'
  },

  emptyList: {
    borderWidth: 1,
    textAlign: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    color: '#6a6180',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#e6e6f0',
    alignSelf: 'center'
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

  searchForm: {
    marginBottom: 24
  },

  submitButton: {
    marginTop: spacing[2]
  },

  teacherList: {
    marginTop: -40
  },

  teacherListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
