import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { classToClass } from 'class-transformer'
import { hash, compare } from 'bcryptjs'

import User from '../entities/User'
import AppError from '../errors/AppError'

export default class ProfileController {
  async show(request: Request, response: Response) {
    const { user_id } = request

    const UsersRepository = getRepository(User)

    const user = await UsersRepository.findOne(user_id)

    return response.status(200).send(classToClass(user))
  }

  async update(request: Request, response: Response) {
    const UsersRepository = getRepository(User)

    const { firstName, lastName, email, password, old_password } = request.body
    const { user_id } = request

    const user = await UsersRepository.findOne(user_id)

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    if (email && email !== user.email) {
      const userWithNewEmail = await UsersRepository.findOne({ email })

      if (userWithNewEmail) {
        throw new AppError('Já existe um usuário com esse e-mail')
      }
    }

    user.email = email
    user.firstName = firstName
    user.lastName = lastName

    if (password) {
      if (!old_password) {
        throw new AppError('Informe a sua senha atual')
      }

      const passwordMatched = await compare(old_password, user.password)

      if (!passwordMatched) {
        throw new AppError('Credenciais incorretas')
      }

      user.password = await hash(password, 8)
    }

    const updatedUser = await UsersRepository.save(user)

    return response.status(200).send(classToClass(updatedUser))
  }
}
