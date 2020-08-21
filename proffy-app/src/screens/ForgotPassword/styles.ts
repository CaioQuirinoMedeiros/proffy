import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    resizeMode: 'contain'
  },

  button: {
    height: 150,
    width: '48%',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between'
  },

  buttonPrimary: {
    backgroundColor: '#9871f5'
  },

  buttonSecundary: {
    backgroundColor: '#04d361'
  },

  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Archivo_700Bold'
  },

  buttonsContainer: {
    marginTop: 40,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#8257e5'
  },

  title: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80
  },

  titleBold: {
    fontFamily: 'Poppins_600SemiBold'
  },

  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#d4c2ff',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40
  }
})

export default styles
