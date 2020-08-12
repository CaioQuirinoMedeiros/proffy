import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { classToClass } from 'class-transformer'
import mime from 'mime'
import aws from 'aws-sdk'
import path from 'path'
import fs from 'fs'

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
      await s3client
        .deleteObject({
          Bucket: uploadConfig.awsBucketName,
          Key: user.avatar
        })
        .promise()
    }

    const tmpFilePath = path.resolve(uploadConfig.tmpFolder, file.filename)

    const fileContent = await fs.promises.readFile(tmpFilePath)

    const ContentType = mime.getType(tmpFilePath)

    if (!ContentType) {
      throw new AppError('File not found')
    }

    await s3client
      .putObject({
        Bucket: uploadConfig.awsBucketName,
        Key: file.filename,
        ACL: 'public-read',
        Body: fileContent,
        ContentType
      })
      .promise()

    user.avatar = file.filename

    await fs.promises.unlink(tmpFilePath)

    await UsersRepository.save(user)

    return response.status(200).send(user)
  }
}
