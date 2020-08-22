import { ValidationError } from 'yup'

export const getErrorsObject = (yupError: ValidationError) => {
  return yupError.inner.reduce((acc, error) => {
    return { [error.path]: error.message }
  }, {})
}
