import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7'
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

  searchForm: {
    marginBottom: 24
  },

  submitButton: {
    backgroundColor: '#04d361',
    height: 56,
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },

  submitButtonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16
  },

  teacherList: {
    marginTop: -40
  },

  teacherListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },

  title: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180
  }
})

export default styles
