import mime from 'mime'
import aws from 'aws-sdk'
import path from 'path'
import fs from 'fs'

import uploadConfig from '../config/upload'
import AppError from '../errors/AppError'

class Storage {
  client: aws.S3

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1'
    })
  }

  async saveFile(filename: string) {
    const tmpFilePath = path.resolve(uploadConfig.tmpFolder, filename)

    const fileContent = await fs.promises.readFile(tmpFilePath)

    const ContentType = mime.getType(tmpFilePath)

    if (!ContentType) {
      throw new AppError('File not found')
    }

    await this.client
      .putObject({
        Bucket: uploadConfig.awsBucketName,
        Key: filename,
        ACL: 'public-read',
        Body: fileContent,
        ContentType
      })
      .promise()

    await fs.promises.unlink(tmpFilePath)

    return filename
  }

  async deleteFile(filename: string) {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.awsBucketName,
        Key: filename
      })
      .promise()
  }
}

export default new Storage()
