import express from 'express'

import usersRoutes from './users.routes'
import profileRoutes from './profile.routes'
import sessionsRoutes from './sessions.routes'
import passwordRoutes from './password.routes'
import classesRoutes from './classes.routes'
import connectionsRoutes from './connections.routes'

const routes = express.Router()

routes.use('/users', usersRoutes)
routes.use('/profile', profileRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/password', passwordRoutes)
routes.use('/classes', classesRoutes)
routes.use('/connections', connectionsRoutes)

export default routes
