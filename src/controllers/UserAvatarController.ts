import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { classToClass } from 'class-transformer'
import mime from 'mime'
import aws from 'aws-sdk'
import path from 'path'
import fs from 'fs'

import Storage from '../lib/Storage'
import User from '../entities/User'
import uploadConfig from '../config/upload'
import AppError from '../errors/AppError'

const s3client = new aws.S3({
  region: 'us-east-1'
})

export default class UsersController {
  async update(request: Request, response: Response) {
    const { user_id, file } = request

    const UsersRepository = getRepository(User)

    const user = await UsersRepository.findOne(user_id)

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    if (user.avatar) {
      await Storage.deleteFile(user.avatar)
    }

    const filename = await Storage.saveFile(file.filename)

    user.avatar = filename

    await UsersRepository.save(user)

    return response.status(200).send(user)
  }
}
