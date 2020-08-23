import { StyleSheet } from 'react-native'
import { color, spacing } from '../../theme'

const styles = StyleSheet.create({
  bio: {
    marginHorizontal: 24,
    fontSize: 15,
    lineHeight: 26,
    textAlign: 'justify',
    color: color.textBase
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 16
  },

  contactButton: {
    backgroundColor: color.green,
    height: 56,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  contactButtonText: {
    color: color.white,
    fontSize: 16,
    marginLeft: 16
  },

  container: {
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.lineInWhite,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },

  favoriteButton: {
    backgroundColor: color.purple,
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },

  favorited: {
    backgroundColor: color.red
  },

  footer: {
    backgroundColor: color.whiteDark,
    borderTopWidth: 1,
    borderColor: color.lineInWhite,
    padding: spacing[4],
    marginTop: spacing[3]
  },

  name: {
    color: '#32264d',
    fontSize: 20
  },

  price: {
    color: color.textBase,
    fontSize: 14
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  priceValue: {
    color: color.purple,
    fontSize: 16
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24
  },

  profileInfo: {
    marginLeft: 16,
    flex: 1
  },

  schedulesList: {
    borderTopWidth: 1,
    marginTop: spacing[3],
    borderTopColor: color.lineInWhite
  },

  schedulesContainer: {
    paddingHorizontal: spacing[4] - spacing[2] / 2,
    paddingTop: spacing[3],
    flexGrow: 1
  },

  scheduleCard: {
    borderWidth: 1,
    borderColor: color.lineInWhite,
    borderRadius: 8,
    marginHorizontal: spacing[2] / 2,
    padding: spacing[3],
    width: 130,
    backgroundColor: color.whiteDark
  },

  scheduleLabel: {
    fontSize: 12,
    color: color.textComplement
  },

  scheduleValue: {
    fontSize: 16,
    marginTop: -5,
    marginBottom: 5,
    color: color.textBase
  },

  subject: {
    fontSize: 12,
    marginTop: 4,
    color: '#6a6180'
  }
})

export default styles
