import { ValidationError } from 'yup'

import { Toast } from '../hooks/toast'
import { AxiosError } from 'axios'

export default (error: any): Array<Omit<Toast, 'id'>> => {
  if (error instanceof ValidationError) {
    const yupError = error
    return yupError.inner.map((error) => ({
      title: 'Erro de validação',
      description: error.message,
      type: 'error'
    }))
  } else if (error.isAxiosError) {
    const responseError: AxiosError<{ message: string }> = error
    return [
      {
        title: 'Erro do servidor',
        description: responseError.response?.data?.message,
        type: 'error'
      }
    ]
  } else {
    return [
      {
        title: 'Erro inesperado',
        type: 'error'
      }
    ]
  }
}
