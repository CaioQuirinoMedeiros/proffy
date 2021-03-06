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
  purpleDark: '#6842C2',
  littlePurple: '#774DD6',
  textBase: '#6A6180',
  textInput: '#C1BCCC',
  textComplement: '#9C98A6',
  textTitulo: '#32264D',
  textInPurpleBase: '#D4C2FF',
  green: '#04D361',
  white: '#ffffff',
  whiteDark: "#FAFAFC",
  grey: "#cdcdcd",
  lineInWhite: '#E6E6F0',
  disabled: '#DCDCE5',
  red: '#E83F5B'
}
