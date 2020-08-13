import express, { NextFunction, Request, Response } from 'express'
import { errors } from 'celebrate'

import ClassesController from '../controllers/ClassesController'
import ConnectionsController from '../controllers/ConnectionsController'

import usersRoutes from './users.routes'
import profileRoutes from './profile.routes'
import sessionsRoutes from './sessions.routes'
import passwordRoutes from './password.routes'

const routes = express.Router()

const classesController = new ClassesController()
const connectionsController = new ConnectionsController()

routes.use('/users', usersRoutes)
routes.use('/profile', profileRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/password', passwordRoutes)

routes.post('/classes', classesController.create)
routes.get('/classes', classesController.index)

routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)

export default routes
