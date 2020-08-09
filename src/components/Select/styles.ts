import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular'
  },

  gripIndicator: {
    height: 6,
    borderRadius: 8,
    width: 100,
    backgroundColor: '#cdcdcd',
    alignSelf: 'center',
    marginBottom: 8,
    marginTop: 4
  },

  input: {
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },

  inputText: {
    color: '#6a6180'
  },

  option: {
    paddingVertical: 16,
    alignItems: 'center'
  },

  optionActive: {
    backgroundColor: '#fafafa'
  },

  optionActiveText: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#8257e5'
  },

  optionText: {
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180'
  },

  optionsSeparator: {
    height: 1,
    backgroundColor: '#C1BCCC',
    marginHorizontal: 16
  },

  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },

  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 8
  }
})

export default styles
