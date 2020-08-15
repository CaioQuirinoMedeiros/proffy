import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ResetPasswordController from '../controllers/ResetPasswordController'

const passwordRoutes = Router()

const resetPasswordController = new ResetPasswordController()

passwordRoutes.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required()
    }
  }),
  resetPasswordController.create
)

export default passwordRoutes
