import { Router, RequestHandler } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import qs from 'qs'

import ClassesController from '../controllers/ClassesController'

import authMiddleware from '../middlewares/auth'

const classesRoutes = Router()

const classesController = new ClassesController()

classesRoutes.post(
  '/',
  authMiddleware,
  celebrate({
    [Segments.BODY]: {
      whatsapp: Joi.string().required(),
      bio: Joi.string().required(),
      subjects: Joi.array().items(Joi.string()),
      cost: Joi.number().required(),
      schedule: Joi.array()
        .items(
          Joi.object({
            week_day: Joi.number().valid(0, 1, 2, 3, 4, 5, 6).required(),
            from: Joi.string().required(),
            to: Joi.string().required()
          })
        )
        .required()
    }
  }),
  classesController.create
)

classesRoutes.get('/me', authMiddleware, classesController.show)

classesRoutes.get(
  '/',
  authMiddleware,
  celebrate({
    [Segments.QUERY]: {
      week_day: Joi.number().valid(0, 1, 2, 3, 4, 5, 6),
      subject: Joi.string(),
      time: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer()
    }
  }),
  classesController.index
)

export default classesRoutes
