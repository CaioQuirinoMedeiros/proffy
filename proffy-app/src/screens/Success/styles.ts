import { StyleSheet } from 'react-native'

import { color, spacing } from '../../theme'

const styles = StyleSheet.create({
  backButton: {
    paddingHorizontal: 40,
    paddingVertical: spacing[3],
    marginLeft: -40,
    alignSelf: 'flex-start'
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: color.purple
  },

  description: {
    marginTop: spacing[3],
    color: color.textInPurpleBase,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 280,
    textAlign: 'center'
  },

  iconContainer: {
    borderWidth: 4,
    borderRadius: 10,
    borderColor: color.green,
    width: 60,
    height: 60,
    marginBottom: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },

  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  okButton: {
    marginVertical: 40,
    backgroundColor: color.green,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },

  title: {
    color: color.white,
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 37,
    maxWidth: 240
  }
})

export default styles
