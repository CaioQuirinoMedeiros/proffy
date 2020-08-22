import { Router } from 'express'
import multer from 'multer'
import { celebrate, Segments, Joi } from 'celebrate'

import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'
import authMiddleware from '../middlewares/auth'
import uploadConfig from '../config/upload'

const userRoutes = Router()
const upload = multer(uploadConfig.multer)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

userRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.create
)

userRoutes.get('/', usersController.index)

userRoutes.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  userAvatarController.update
)
userRoutes.delete('/avatar', authMiddleware, userAvatarController.destroy)

export default userRoutes
