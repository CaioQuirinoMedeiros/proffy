import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { classToClass } from 'class-transformer'
import { hash } from 'bcryptjs'

import User from '../entities/User'
import AppError from '../errors/AppError'

export default class UsersController {
  async index(request: Request, response: Response) {
    const UsersRepository = getRepository(User)

    const users = await UsersRepository.findAndCount()

    return response.status(200).send(classToClass(users))
  }

  async create(request: Request, response: Response) {
    const UsersRepository = getRepository(User)

    const { firstName, lastName, email, password } = request.body

    const userWithEmail = await UsersRepository.find({ email })

    if (userWithEmail) {
      throw new AppError('E-mail já utilizado')
    }

    const hashedPassword = await hash(password, 8)

    const user = UsersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    await UsersRepository.save(user)

    return response.status(201).send(user)
  }
}
