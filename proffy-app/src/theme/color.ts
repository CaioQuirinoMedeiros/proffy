import { palette } from './palette'

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  background: '#F0F0F7',
  purple: '#8257E5',
  textBase: '#6A6180',
  textInput: '#C1BCCC',
  textComplement: '#9C98A6',
  textInPurpleBase: '#D4C2FF',
  textDark: '#32264D',
  green: '#04D361',
  white: '#ffffff',
  lineInWhite: '#E6E6F0',
  disabled: '#DCDCE5'
}
