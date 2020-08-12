import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ProfileController from '../controllers/ProfileController'

import authMiddleware from '../middlewares/auth'

const profileRoutes = Router()

const profileController = new ProfileController()

profileRoutes.get('/', authMiddleware, profileController.show)

profileRoutes.put(
  '/',
  authMiddleware,
  celebrate({
    [Segments.BODY]: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required()
        }),
      old_password: Joi.string().when('password', {
        is: Joi.exist(),
        then: Joi.required()
      })
    }
  }),
  profileController.update
)

export default profileRoutes
