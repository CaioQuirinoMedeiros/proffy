import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import crypto from 'crypto'

import Mail from '../lib/Mail'
import User from '../entities/User'
import AppError from '../errors/AppError'

export default class ResetPasswordController {
  async create(request: Request, response: Response) {
    const { email } = request.body

    const UsersRepository = getRepository(User)

    const user = await UsersRepository.findOne({ email })

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    const randomPassword = crypto.randomBytes(10).toString('hex')

    const hashedPassword = await hash(randomPassword, 8)

    user.password = hashedPassword

    await UsersRepository.save(user)

    await Mail.sendMail({
      to: { name: `${user.getFullname()}`, email: user.email },
      subject: '[Proffy] Redefinição de senha',
      text: `Olá, ${user.getFullname()}, sua nova senha é: ${randomPassword}\n\nVocê pode alterar sua senha dentro da plataforma!`
    })

    return response.status(200).send()
  }
}
