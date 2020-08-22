import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { classToClass } from 'class-transformer'

import Storage from '../lib/Storage'
import User from '../entities/User'
import AppError from '../errors/AppError'

export default class UsersController {
  async update(request: Request, response: Response) {
    const { user_id, file } = request

    const UsersRepository = getRepository(User)

    const user = await UsersRepository.findOne(user_id)

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    const filename = await Storage.saveFile(file.filename)

    if (user.avatar) {
      await Storage.deleteFile(user.avatar)
    }

    user.avatar = filename

    await UsersRepository.save(user)

    return response.status(200).send(classToClass(user))
  }

  async destroy(request: Request, response: Response) {
    const { user_id } = request

    const UsersRepository = getRepository(User)

    const user = await UsersRepository.findOne(user_id)

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    if (user.avatar) {
      await Storage.deleteFile(user.avatar)
    }

    // @ts-ignore
    user.avatar = null

    await UsersRepository.save(user)

    return response.status(200).send(classToClass(user))
  }
}
