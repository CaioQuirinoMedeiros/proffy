import { ValidationError } from 'yup'
import { AxiosError } from 'axios'

export interface AppError {
  title: string
  message: string
}

export const getAppError = (error: any): AppError => {
  if (error instanceof ValidationError) {
    const yupError = error

    return {
      title: `Erro em ${yupError.inner[0].path}`,
      message: yupError.inner[0].message
    }
  } else if (error.isAxiosError) {
    const responseError: AxiosError<{ message: string }> = error
    return {
      title: 'Erro do servidor',
      message:
        responseError.response?.data?.message || 'Por favor, tente novamente'
    }
  } else {
    return {
      title: 'Erro inesperado',
      message: 'Algo não saiu como esperado, por favor, tente novamente'
    }
  }
}
