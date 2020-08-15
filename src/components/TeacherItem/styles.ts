import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: '#fff'
  },

  bio: {
    marginHorizontal: 24,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    lineHeight: 26,
    color: '#6a6180'
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 16
  },

  contactButton: {
    backgroundColor: '#04d361',
    height: 56,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },

  contactButtonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    marginLeft: 16
  },

  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6e6f0',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden'
  },

  favoriteButton: {
    backgroundColor: '#8257e5',
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },

  favorited: {
    backgroundColor: '#e33d3d'
  },

  footer: {
    backgroundColor: '#fafafc',
    padding: 24,
    alignItems: 'center',
    marginTop: 24
  },

  name: {
    fontFamily: 'Archivo_700Bold',
    color: '#32264d',
    fontSize: 20
  },

  price: {
    fontFamily: 'Poppins_400Regular',
    color: '#6a6180',
    fontSize: 14
  },

  priceValue: {
    fontFamily: 'Archivo_700Bold',
    color: '#8257e5',
    fontSize: 16
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24
  },

  profileInfo: {
    marginLeft: 16
  },

  subject: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginTop: 4,
    color: '#6a6180'
  }
})

export default styles
