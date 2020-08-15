import { Router, RequestHandler } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import qs from 'qs'

import ConnectionsController from '../controllers/ConnectionsController'

import authMiddleware from '../middlewares/auth'

const classesRoutes = Router()

const connectionsController = new ConnectionsController()

classesRoutes.post(
  '/',
  authMiddleware,
  celebrate({ [Segments.BODY]: { user_id: Joi.string().required() } }),
  connectionsController.create
)

classesRoutes.get('/', authMiddleware, connectionsController.index)

export default classesRoutes
