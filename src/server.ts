import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { errors } from 'celebrate'
import 'express-async-errors'
import 'dotenv/config'

import routes from './routes'
import './database'
import AppError from './errors/AppError'

const app = express()

app.use(express.json())
app.use(cors())

app.use(routes)

app.use(errors())

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    console.log('CAPTUROU O ERRO!')
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .send({ status: 'error', message: error.message })
    }

    console.error(error)

    return response.status(500).send({
      status: 'error',
      message: 'Internal server error'
    })
  }
)

const PORT = process.env.PORT || 3333

app.listen(3333, () => {
  console.log(`server running at port ${PORT}`)
})
