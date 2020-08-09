import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  backButton: {
    paddingHorizontal: 40,
    marginLeft: -40,
  },

  container: {
    padding: 40,
    backgroundColor: '#8257e5'
  },

  title: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
    marginVertical: 40
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default styles
