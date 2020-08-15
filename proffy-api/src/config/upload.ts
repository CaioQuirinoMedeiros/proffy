import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

export const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`.replace(/\ /g, '_')

        return callback(null, fileName)
      }
    })
  },
  awsBucketName: process.env.AWS_BUCKET_NAME || 'bucket'
}
