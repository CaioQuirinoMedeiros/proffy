import { StyleSheet } from 'react-native'

import { color, viewportWidth } from '../../theme'

const styles = StyleSheet.create({
  imageBackground: {
    width: viewportWidth,
    flex: 1,
    backgroundColor: color.green,
    alignItems: 'center',
    color: 'red',
    justifyContent: 'center'
  },

  bannerImage: {
    height: 100,
    width: 100,
    marginTop: 60,
    resizeMode: 'contain'
  },

  screen: {
    flex: 1,
    backgroundColor: color.background
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 26
  },

  number: {
    fontFamily: 'Archivo_400Regular',
    fontSize: 40,
    marginBottom: 16,
    opacity: 0.2
  },

  heading: {
    fontSize: 24,
    width: 210,
    lineHeight: 34
  },

  dotsContainer: {
    flexDirection: 'row'
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 2,
    backgroundColor: color.textInput,
    marginRight: 12
  },

  filledDot: {
    backgroundColor: color.purple
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 56,
    paddingLeft: 26,
    alignItems: 'center'
  },

  nextButton: {
    padding: 26
  }
})

export default styles
