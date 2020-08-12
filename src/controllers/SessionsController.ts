import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { classToClass } from 'class-transformer'

import authConfig from '../config/auth'
import User from '../entities/User'
import AppError from '../errors/AppError'

export default class SessionsController {
  async create(request: Request, response: Response) {
    const UsersRepository = getRepository(User)

    const { email, password } = request.body

    const user = await UsersRepository.findOne({ email })

    if (!user) {
      throw new AppError('Credenciais incorretas')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination')
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return response.status(201).send({ token, user: classToClass(user) })
  }
}
